// app/api/usuarios/[clerkId]/route.ts

import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { clerkId: string } }
) {
  try {

    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const clerkId = params.clerkId;
    
    // Buscar usuario por clerkId
    const usuario = await prisma.usuario.findUnique({
      where: { clerkId },
      include: {
        rol: true
      }
    });

    if (!usuario) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(usuario);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error al obtener usuario' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { clerkId: string } }
) {
  try {
    const auth = getAuth();
    const { userId } = auth;
    if (!userId) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const clerkId = params.clerkId;
    const data = await request.json();
    
    // Actualizar usuario por clerkId
    const usuario = await prisma.usuario.update({
      where: { clerkId },
      data: {
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email,
        rolId: data.rolId,
        // Otros campos que quieras actualizar
      }
    });

    return NextResponse.json(usuario);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error al actualizar usuario' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { clerkId: string } }
) {
  try {
    const auth = getAuth();
    const { userId } = auth;
    if (!userId) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const clerkId = params.clerkId;
    
    // Eliminar usuario por clerkId
    const usuario = await prisma.usuario.delete({
      where: { clerkId }
    });

    return NextResponse.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error al eliminar usuario' },
      { status: 500 }
    );
  }
}