import { SettingsForm } from "@/app/components/SettingsForm";
import prisma from "@/app/lib/db";
import { requireUser } from "@/app/lib/hooks";
import { notFound } from "next/navigation";

async function getData(id: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      name: true,
      email: true,
      image: true,
      userName: true,
    },
  });

  if(!data){
    // The not found function is a next.js function to render the 404 not found file
    return notFound();
  }

  return data;
}

// Safe to be async since it is a server component
export default async function Settingsroute() {

  const session = await requireUser();
  const data = await getData(session.user?.id as string);

  return(
    <SettingsForm email={data.email} fullName={data.name as string} profileImage={data.image as string} userName={data.userName as string}/>
  )
}
