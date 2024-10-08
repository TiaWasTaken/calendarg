import NextAuth from 'next-auth';
import Github from 'next-auth/providers/github'
import Google from 'next-auth/providers/github'

export const { handlers, signIn, signOut, auth } = NextAuth({
  // The providers for auth in the calendar
  providers:[Github, Google],
});
