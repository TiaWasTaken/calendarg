import { cancelMeetingAction } from "@/app/actions";
import { EmptyState } from "@/app/components/EmptyState";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { auth } from "@/app/lib/auth";
import prisma from "@/app/lib/db";
import { nylas } from "@/app/lib/nylas";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Video } from "lucide-react";
import React from "react";

async function getData(userId: string) {
  const userData = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      grantId: true,
      grantEmail: true,
    },
  });

  if (!userData) {
    throw new Error("User not found");
  }

  const data = await nylas.events.list({
    identifier: userData?.grantId as string,
    queryParams: {
      calendarId: userData?.grantEmail as string,
    },
  });

  return data;
}

const MeetingsPage = async () => {
  const session = await auth();
  const data = await getData(session?.user?.id as string);

  return (
    <>
      {data.data.length < 1 ? (
        <EmptyState
          title="No meetings found"
          description="You don't have any meetings yet."
          buttonText="Create a new event type"
          href="/dashboard/new"
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Bookings</CardTitle>
            <CardDescription>
              See upcoming and past events booked through your event type links.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {data.data.map((item) => {
              let startTime, endTime;

              // Check for timespan or datespan
              if (item.when.object === "timespan") {
                startTime = new Date(item.when.startTime * 1000); // Unix timestamp in seconds
                endTime = new Date(item.when.endTime * 1000);     // Unix timestamp in seconds
              } else if (item.when.object === "datespan") {
                startTime = new Date(item.when.startDate);        // ISO date string
                endTime = new Date(item.when.endDate);            // ISO date string
              } else {
                // Handle unknown cases
                return <p key={item.id}>Unknown event format</p>;
              }

              // Safe check for item.conferencing and item.conferencing.details.url
              const conferencingUrl = item.conferencing?.details?.url ?? null;

              // Safe check for participants[0].name
              const participantName = item.participants?.[0]?.name ?? "Unknown participant";

              return (
                <form key={item.id} action={cancelMeetingAction}>
                  <input type="hidden" name="eventId" value={item.id} />
                  <div className="grid grid-cols-3 justify-between items-center">
                    <div>
                      {/* Format and display the date */}
                      <p className="text-muted-foreground text-sm">
                        {format(startTime, "EEE, dd MMM")}
                      </p>
                      <p className="text-muted-foreground text-xs pt-1">
                        {format(startTime, "hh:mm a")} - {format(endTime, "hh:mm a")}
                      </p>

                      {/* Display the meeting link if available */}
                      {conferencingUrl ? (
                        <div className="flex items-center mt-1">
                          <Video className="size-4 mr-2 text-primary" />
                          <a
                            className="text-xs text-primary underline underline-offset-4"
                            target="_blank"
                            href={conferencingUrl}
                          >
                            Join Meeting
                          </a>
                        </div>
                      ) : (
                        <p className="text-xs text-muted-foreground mt-1">
                          No conferencing details available
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-start">
                      <h2 className="text-sm font-medium">{item.title}</h2>
                      <p className="text-sm text-muted-foreground">
                        You and {participantName}
                      </p>
                    </div>
                    <SubmitButton
                      text="Cancel Event"
                      variant="destructive"
                      className="w-fit flex ml-auto"
                    />
                  </div>
                  <Separator className="my-3" />
                </form>
              );
            })}
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default MeetingsPage;

