// middleware/adminProtection.ts
import { Role, hasPermission } from '@/utils/roles';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function adminProtection() {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.redirect(
      new URL('/', process.env.NEXT_PUBLIC_BASE_URL!)
    );
  }

  try {
    // Obtener el usuario de la base de datos
    const user = await prisma.usuario.findUnique({
      where: { clerkId: userId }
    });

    if (!user || !hasPermission(user.rol as Role, Role.ADMIN)) {
      return NextResponse.redirect(
        new URL('/', process.env.NEXT_PUBLIC_BASE_URL!)
      );
    }
  } catch (error) {
    console.error('Error checking user role:', error);
    return NextResponse.redirect(
      new URL('/', process.env.NEXT_PUBLIC_BASE_URL!)
    );
  }
}
