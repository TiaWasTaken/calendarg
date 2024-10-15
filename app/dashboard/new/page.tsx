"use client"

import { CreateEventTypeAction } from "@/app/actions";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { eventTypeSchema } from "@/app/lib/zodSchemas";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/ButtonGroup";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import Link from "next/link";
import { useState } from "react";
import { useFormState } from "react-dom";

type VideoCallProvider = "Zoom Meeting" | "Google Meet" | "Microsoft Teams"

export default function NewEventRoute() {

  const [activePlatform, setActivePlatform] = useState<VideoCallProvider>("Google Meet");

  const [lastResult, action] = useFormState(CreateEventTypeAction, undefined);

  const [form, fields] = useForm({
    lastResult,

    onValidate({formData}){
      return parseWithZod(formData, {
        schema: eventTypeSchema,
      });
    },

    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  return(
    <div className="w-full h-full flex flex-1 items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Add a new Appointment Type</CardTitle>
          <CardDescription>Create a new Appointment Type which will allow people to book you.</CardDescription>
        </CardHeader>

        <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
          <CardContent className="grid gap-y-5">
            <div className="flex flex-col gap-y-2">
              <Label>Title</Label>
              <Input name={fields.title.name} placeholder="30 minute meeting"/>
            </div>

            <div className="flex flex-col gap-y-2">
              <Label>URL Slug</Label>
              <div className="flex rounded-md">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-sm text-muted-foreground">calendarg.com/</span>
                <Input className="rounded-l none" placeholder="Example-url-1"/>
              </div>
            </div>

            <div className="flex flex-col gap-y-2">
              <Label>Description</Label>
              <Textarea placeholder="Join me in this meeting."/>
            </div>

            <div className="flex flex-col gap-y-2">
              <Label>Duration</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration"/>
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Duration</SelectLabel>
                    <SelectItem value="15">15 Mins</SelectItem>
                    <SelectItem value="30">30 Mins</SelectItem>
                    <SelectItem value="45">45 Mins</SelectItem>
                    <SelectItem value="60">60 Mins</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-y-2">
              <Label>Video Call Provider</Label>
              <ButtonGroup >
                <Button onClick={() => setActivePlatform("Zoom Meeting")} className="w-full" variant={activePlatform === 'Zoom Meeting' ? "secondary" : "outline"} type="button">Zoom</Button>
                <Button onClick={() => setActivePlatform("Google Meet")} className="w-full" variant={activePlatform === 'Google Meet' ? "secondary" : "outline"} type="button">Google Meet</Button>
                <Button onClick={() => setActivePlatform("Microsoft Teams")} className="w-full" variant={activePlatform === 'Microsoft Teams' ? "secondary" : "outline"} type="button">Microsoft Teams</Button>
              </ButtonGroup>
            </div>
          </CardContent>

          <CardFooter className="w-full flex justify-between">
            <Button variant="destructive" asChild>
              <Link href="/dashboard">Cancel</Link>
            </Button>
            <SubmitButton text="Create Event Type"/>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
