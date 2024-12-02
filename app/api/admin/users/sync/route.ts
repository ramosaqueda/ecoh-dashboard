// app/api/admin/users/sync/route.ts
import { prisma } from '@/lib/prisma';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { clerkId, rolId } = await request.json();

    // Obtener datos del usuario de Clerk
    const clerkUser = await clerkClient.users.getUser(clerkId);

    // Crear usuario en la base de datos
    const user = await prisma.usuarios.create({
      data: {
        clerk_id: clerkId,
        email: clerkUser.emailAddresses[0]?.emailAddress || '',
        nombre: `${clerkUser.firstName || ''} ${
          clerkUser.lastName || ''
        }`.trim(),
        rolId
      }
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error al sincronizar usuario' },
      { status: 500 }
    );
  }
}
