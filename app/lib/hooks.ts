import { auth } from './auth';
import { redirect } from 'next/navigation';

export async function requireUser() {
  const session = await auth();


  // If the user does not have a session return him to the initial homepage
  if(!session?.user){
    return redirect("/");
  }

  // Else return the current session
  return session;
}
