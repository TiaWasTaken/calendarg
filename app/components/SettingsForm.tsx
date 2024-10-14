"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SubmitButton } from "./SubmitButtons"
import { useFormState } from "react-dom"
import { SettingsAction } from "../actions"
import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import { settingsSchema } from "../lib/zodSchemas"
import { useState } from "react"
import { Image, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UploadDropzone } from "../lib/uploadthing"
import { toast } from "sonner"

interface iAppProps {
  fullName: string;
  email: string;
  profileImage: string;
  userName: string;
}

export function SettingsForm({email, profileImage, fullName, userName}: iAppProps) {

  // Import the action result in the settings form
  const [lastResult, action] = useFormState(SettingsAction, undefined);

  const [currentProfileImage, setCurrentProfileImage] = useState(profileImage);

  const [form, fields] = useForm({
    lastResult,

    onValidate({formData}) {
      return parseWithZod(formData, {
        schema: settingsSchema,
      });
    },

    // Once we leave the input it tries to validate it
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  })

  
  const handleDeleteImage = () => {
    setCurrentProfileImage("");
  }

  return(
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your account settings.</CardDescription>
      </CardHeader>

      <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
        <CardContent className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-2">
            <Label>Full Name</Label>
            <Input placeholder="John Doe" defaultValue={fullName} name={fields.fullName.name} key={fields.fullName.key}/>
            <p className="text-red-500 text-small">{fields.fullName.errors}</p>
          </div>

          <div className="flex flex-col gap-y-2">
            <Label>Email</Label>
            <Input placeholder="example@example.com" defaultValue={email} disabled/>
          </div>

          <div className="flex flex-col gap-y-2">
            <Label>Username</Label>
            <Input placeholder="user-name-1" defaultValue={userName} disabled/>
          </div>

          <div className="grid gap-y-5">
            <Label>Profile Image</Label>
            <input type="hidden" name={fields.profileImage.name} key={fields.profileImage.key} value={currentProfileImage}/>
            {currentProfileImage ? (
              <div className="relative size-16">
                <img src={currentProfileImage} alt="Profile Image" className="size-16 rounded-lg"/>

                <Button variant="destructive" type="button" size="icon" className="absolute -top-3 -right-3 size-8" onClick={handleDeleteImage}>
                  <X className="size-4"/>
                </Button>
              </div>
            ) : (
              <UploadDropzone onClientUploadComplete={(res) => {
                  setCurrentProfileImage(res[0].url);
                  toast.success("Profile Image has been uploaded");
                }} 
                onUploadError={(error) =>{
                    console.log("something went wrong.", error);
                    toast.error(error.message);
                  }}
                endpoint="imageUploader" />
            )}
            <p className="text-red-500 text-small">{fields.profileImage.errors}</p>
          </div>

        </CardContent>

        <CardFooter>
          <SubmitButton text="Save changes"/>
        </CardFooter>
      </form>
    </Card>
  )
}
