import Image from "next/image";
import { Navbar } from "./components/Navbar";
import { redirect } from 'next/navigation';
import { auth } from './lib/auth';
import { Hero } from "./components/Hero";
import { Logos } from "./components/Logos";

export default async function Home() {

  const session = await auth();

  if(session?.user) {
    return redirect("/dashboard");
  }

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
      <Navbar />
      <Hero />
      <Logos />
    </div>
  );
}
