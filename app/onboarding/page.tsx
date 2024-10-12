"use client"

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "react-dom";
import { OnboardingAction } from "../actions";
import { useForm } from '@conform-to/react';
import { parseWithZod } from "@conform-to/zod";
import { onboardingSchema } from "../lib/zodSchemas";
import { SubmitButton } from "../components/SubmitButtons";

export default function OnboardingRoute() {
  
  // It has to be client sided
  const [lastResult, action] = useFormState(OnboardingAction, undefined);

  // Each time the user types something the userName gets revalidate to tell if it is legit or not
  const [form, fields] = useForm({

    lastResult,
    onValidate({formData}) {
      return parseWithZod(formData, {
        schema: onboardingSchema,
      });
    },

    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',

  });

  return(
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle><span className="text-primary">Welcome</span> to Calend<span className="text-primary">Arg</span></CardTitle>
          <CardDescription>We need the following informations in order to set up your account.</CardDescription>
        </CardHeader>
        <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
          <CardContent className="grid gap-y-5">
            <div className="grid gap-y-3">
              <Label>Full Name</Label>
              <Input name={fields.fullName.name} defaultValue={fields.fullName.initialValue} key={fields.fullName.key} placeholder="John Doe"/>
              <p className="text-small text-red-500">{fields.fullName.errors}</p>
            </div>
            <div className="grid gap-y-3">
              <Label>Username</Label>
              <div className="flex rounded-md">
                <span className="inline-flex items-center px-3 rounded-l-md border-r-0 border-muted bg-muted text-small text-primary">calendarg.com/</span>
                <Input placeholder="your-username" className="rounded-l-none" name={fields.userName.name} key={fields.userName.key} defaultValue={fields.userName.initialValue}/>
              </div>
              <p className="text-red-500 text-small">{fields.userName.errors}</p> 
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton text="Submit" className="w-full" />
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
