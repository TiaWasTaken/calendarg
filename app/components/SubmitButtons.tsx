"use client"

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import GoogleLogo from '@/public/google.svg';
import GithubLogo from '@/public/github.svg';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';

export function GoogleAuthButton() {
  const {pending} = useFormStatus();

  return (
    <>
      { pending ? (
          <Button disabled variant="outline" className="w-full">
              <Loader2 className="size-4 mr-2 animate-spin"/>
              Loading...
          </Button>
      ) : (
          <Button variant="outline" className="w-full">
            <Image src={GoogleLogo} alt="Google Logo" className="size-4 mr-2"/>
            Sign in with Google
          </Button>
      )}
    </>
  )
}

export function GithubAuthButton() {
  const {pending} = useFormStatus();

  return (
    <>
      { pending ? (
          <Button disabled variant="outline" className="w-full">
              <Loader2 className="size-4 mr-2 animate-spin"/>
              Loading...
          </Button>
      ) : (
          <Button variant="outline" className="w-full">
            <Image src={GithubLogo} alt="Github Logo" className="size-4 mr-2"/>
            Sign in with Github
          </Button>
      )}
    </>
  )
}

