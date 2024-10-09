import React from 'react';
import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/public/logo.png';
import { DashboardLinks } from '../components/DashboardLinks.tsx';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button.tsx';
import { Menu } from 'lucide-react';
import { SheetContent } from '../../components/ui/sheet.tsx';
import { ThemeToggle } from '../components/ThemeToggle.tsx';
import { DropdownMenu, DropdownMenuTrigger } from '../../components/ui/dropdown-menu.tsx';
import { auth } from '../lib/auth';

export default async function DashboardLayout({children}: {children: ReactNode}) {

  const session = await auth();

  return(
    <>
      <div className="min-h-screen w-full grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden md:block border-r bg-muted/40">
          <div className="flex h-full max-h-screen flex-col gap-2">

            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href="/" className="flex items-center gap-2">
                <Image src={Logo} alt="Logo" className="size-8"/>
                <p className="text-xl font-bold">Calend<span className="text-primary">Arg</span></p>
              </Link>
            </div>
 
            <div className="flex-1">
              <nav className="grid items-start px-2 lg:px-4">
               <DashboardLinks /> 
              </nav>
            </div>

          </div>
        </div>

        
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button className="md:hidden shrink-0" size="icon" variant="outline">
                  <div>
                    <Menu className="size-5"/>
                  </div>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-2 mt-10">
                  <DashboardLinks />
                </nav>
              </SheetContent>
            </Sheet>

            <div className="ml-auto flex items-center gap-x-4">
              <ThemeToggle />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button>
                    <img src={session?.user?.image as string} alt="Profile Image" width={20} height={20} />
                  </Button>
                </DropdownMenuTrigger>
              </DropdownMenu>
            </div>
          </header>
        </div>

      </div>
    </>
  )
}
