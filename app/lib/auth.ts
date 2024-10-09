import NextAuth from 'next-auth';
import Github from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from './db'

export const { handlers, signIn, signOut, auth } = NextAuth({
  // The providers for auth in the calendar
  adapter: PrismaAdapter(prisma),
  providers:[Github, Google],
});
