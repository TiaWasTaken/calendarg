// Named page.tsx in order to have a route

import { auth } from '../lib/auth';
import { notFound, redirect } from 'next/navigation';
import { requireUser } from '../lib/hooks';
import prisma from '../lib/db';
import { EmptyState } from '../components/EmptyState';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Users2 } from 'lucide-react';

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },

    select: {
      userName: true,
      eventType: {
        select: {
          id: true,
          active: true,
          title: true,
          url: true,
          duration: true,
        }
      }
    }
  })

  if(!data) {
    return notFound();
  }

  return data;
}

export default async function DashboardPage() {

  const session = await requireUser();

  const data = await getData(session.user?.id as string);

  return(
    <>
      
      {data.eventType.length === 0 ? (
        <EmptyState title="You have no Event Types" description="You can create your first Event Type by clicking the button below" buttonText='Add Event Type' href='/dashboard/new'/>
      ) : (
      <>
        <div className="flex items-center justify-between px-2">
          <div className="hidden sm:grid gap-y-1">
            <h1 className="text-3xl md:text-4xl font-semibold">Event Types</h1>
            <p className="text-muted-foreground">Create and manage your event types right here.</p>
          </div>

          <Button asChild>
            <Link href="/dashboard/new">Create new event</Link>
          </Button>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.eventType.map((item) => (

          <div className="overflow-hidden shadow rounded-lg border relative" key={item.id}>
            <Link href="/" className="flex items-center p-5">
              <div className="flex shrink-0">
                <Users2 className="size-6"/>  
              </div>

              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt>

                  </dt>
                </dl>
              </div>
            </Link>
          </div>

          ))}
        </div>
      </>
      )}
    </>
  )
}
