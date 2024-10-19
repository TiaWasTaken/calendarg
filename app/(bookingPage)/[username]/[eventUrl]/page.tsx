
import { Calendar } from "@/app/components/bookingForm/Calendar";
import { RenderCalendar } from "@/app/components/bookingForm/RenderCalendar";
import { TimeTable } from "@/app/components/bookingForm/TimeTable";
import prisma from "@/app/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CalendarX2, Clock, VideoIcon } from "lucide-react";
import { notFound } from "next/navigation";


// findFind first because url is not unique for all the web app (only for the user)
async function getData(eventUrl: string, userName: string) {
  const data = await prisma.eventType.findFirst({
    where: {
      url: eventUrl,
      User: {
        userName: userName,
      },
      active: true,
    },

    select: {
      id: true,
      description: true,
      title: true,
      duration: true,
      videoCallSoftware: true,
      User: {
        select: {
          image: true,
          name: true,
          availability: {
            select: {
              day: true,
              isActive: true,
            }
          }
        }
      }
    }
  })

  if(!data){
    return notFound();
  }

  return data;
}

export default async function BookingFormRoute({params, searchParams}: {params: {username: string; eventUrl: string}; searchParams: {date?: string ; time?: string }}) {

  const data = await getData(params.eventUrl, params.username);

  const selectedDate = searchParams.date ? new Date(searchParams.date) : new Date(); 
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(selectedDate);

  const showForm = !!searchParams.date && !!searchParams.time;


  return(
    <div className="min-h-screen w-screen flex items-center justify-center">
      {showForm ? (
          <Card className="max-w-[600px]">
            <CardContent className="p-5 md:grid md:grid-cols-[1fr,auto,1fr,auto,1fr]">
              <div>
                <img src={data.User?.image as string} alt="Profile Image of User" className="size-10 rounded-full"/>
                <p className="text-sm font-medium text-muted-foreground mt-1">{data.User?.name}</p>
                <h1 className="text-xl font-bold mt-2">{data.title}</h1>
                <p className="text-sm font-medium text-muted-foreground">{data.description}</p>

                <div className="grid mt-5 gap-y-3">
                  <p className="flex items-center">
                    <CalendarX2 className="size-4 mr-2 text-primary"/>
                    <span className="text-sm font-medium text-muted-foreground">{formattedDate.toString()}</span>
                  </p>

                  <p className="flex items-center">
                    <Clock className="size-4 mr-2 text-primary"/>
                    <span className="text-sm font-medium text-muted-foreground">{data.duration} Minutes</span>
                  </p>

                  <p className="flex items-center">
                    <VideoIcon className="size-4 mr-2 text-primary"/>
                    <span className="text-sm font-medium text-muted-foreground">{data.videoCallSoftware}</span>
                  </p>
                </div>
              </div>

              <Separator orientation="vertical" className="h-full w-[2px]" /> 

              <RenderCalendar availability={data.User?.availability as any}/> 

              <Separator orientation="vertical" className="h-full w-[2px" />

              <TimeTable selectedDate={selectedDate} userName={params.username} duration={data.duration}/>
            </CardContent>
          </Card>
      ) : (
          <Card className="max-w-[1000px] w-full mx-auto">
            <CardContent className="p-5 md:grid md:grid-cols-[1fr,auto,1fr,auto,1fr]">
              <div>
                <img src={data.User?.image as string} alt="Profile Image of User" className="size-10 rounded-full"/>
                <p className="text-sm font-medium text-muted-foreground mt-1">{data.User?.name}</p>
                <h1 className="text-xl font-bold mt-2">{data.title}</h1>
                <p className="text-sm font-medium text-muted-foreground">{data.description}</p>

                <div className="grid mt-5 gap-y-3">
                  <p className="flex items-center">
                    <CalendarX2 className="size-4 mr-2 text-primary"/>
                    <span className="text-sm font-medium text-muted-foreground">{formattedDate.toString()}</span>
                  </p>

                  <p className="flex items-center">
                    <Clock className="size-4 mr-2 text-primary"/>
                    <span className="text-sm font-medium text-muted-foreground">{data.duration} Minutes</span>
                  </p>

                  <p className="flex items-center">
                    <VideoIcon className="size-4 mr-2 text-primary"/>
                    <span className="text-sm font-medium text-muted-foreground">{data.videoCallSoftware}</span>
                  </p>
                </div>
              </div>

              <Separator orientation="vertical" className="h-full w-[2px]" /> 

              <RenderCalendar availability={data.User?.availability as any}/> 

              <Separator orientation="vertical" className="h-full w-[2px" />

              <TimeTable selectedDate={selectedDate} userName={params.username} duration={data.duration}/>
            </CardContent>
          </Card>
      )}
    </div>
  )
}
