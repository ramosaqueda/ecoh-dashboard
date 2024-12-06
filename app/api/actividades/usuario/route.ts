import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
    }

    const usuario = await prisma.usuario.findUnique({
      where: { clerk_id: userId }
    });

    if (!usuario) {
      return NextResponse.json(
        { message: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    const actividades = await prisma.actividad.findMany({
      where: {
        usuario_id: usuario.id, // Cambiado a snake_case
        estado: {
          not: 'terminado'
        }
      },
      include: {
        causa: {
          select: {
            ruc: true,
            denominacionCausa: true
          }
        },
        tipoActividad: {
          select: {
            nombre: true
          }
        }
      },
      orderBy: [
        {
          estado: 'asc'
        },
        {
          fechaTermino: 'asc'
        }
      ]
    });

    return NextResponse.json(actividades);
  } catch (error) {
    console.error('Error completo:', error);
    return NextResponse.json(
      {
        message: 'Error interno del servidor',
        details: error.message,
        type: error.name
      },
      { status: 500 }
    );
  }
}
