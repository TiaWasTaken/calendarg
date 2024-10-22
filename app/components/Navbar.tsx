import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/public/logo.png';
import { AuthModal } from './AuthModal.tsx';
import { ThemeToggle } from './ThemeToggle.tsx';

export function Navbar() {
  return(
    <div className="flex py-5 items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <Image src={Logo} alt="Logo" className="size-10" />
        <h4 className="text-3xl font-semibold">Calend<span className="text-[#884DEE]">Arg</span></h4>
      </Link>
      <div className="hidden md:flex md:justify-end md:space-x-4">
        <ThemeToggle />
        <AuthModal />
      </div>
    </div>
  )
}
