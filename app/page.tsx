import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default function Page() {
  const { userId }: { userId: string | null } = auth();

  if (userId) {
    redirect('/dashboard');
  }
}
