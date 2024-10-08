// Named page.tsx in order to have a route

import { auth } from '../lib/auth';
import { redirect } from 'next/navigation';
import { requireUser } from '../lib/hooks';

export default async function DashboardPage() {

  const session = await requireUser()

  return(
    <div>
      <h1>Hello from the dashboard</h1>
    </div>
  )
}
