// app/api/user/role/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const { userId } = await auth();
    console.log('🔍 Clerk userId:', userId);

    if (!userId) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const user = await prisma.Usuario.findUnique({
      where: {
        clerk_id: userId
      },
      select: {
        rolId: true
      }
    });

    console.log('Query result:', user);

    if (!user) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ rolId: user.rolId });
  } catch (error) {
    console.error('Error completo:', error);
    return NextResponse.json(
      { error: 'Error al obtener rol del usuario' },
      { status: 500 }
    );
  }
}
