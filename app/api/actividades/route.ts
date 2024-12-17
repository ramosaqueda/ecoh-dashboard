import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { EstadoActividad } from '@prisma/client';
import { auth } from '@clerk/nextjs/server';
 


export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id');
    const causaId = searchParams.get('causaId');
    const tipoActividadId = searchParams.get('tipoActividadId');
    const estado = searchParams.get('estado');
    const fechaDesde = searchParams.get('fechaDesde');
    const fechaHasta = searchParams.get('fechaHasta');

    // Configuración base de include para todas las consultas
    const includeConfig = {
      causa: true,
      tipoActividad: true,
      usuario: {
        select: {
          id: true,
          nombre: true,
          email: true
        }
      },
    };

    // Buscar por ID específico
    if (id) {
      const actividad = await prisma.actividad.findUnique({
        where: { id: Number(id) },
        include: includeConfig,
      });

      if (!actividad) {
        return NextResponse.json(
          { message: 'Actividad no encontrada' },
          { status: 404 }
        );
      }

      return NextResponse.json(actividad);
    }

    // Construir filtros para búsqueda
    const where: any = {
      AND: [
        causaId ? { causaId: Number(causaId) } : {},
        tipoActividadId ? { tipoActividadId: Number(tipoActividadId) } : {},
        estado ? { estado: estado as EstadoActividad } : {},
        fechaDesde ? { fechaInicio: { gte: new Date(fechaDesde) } } : {},
        fechaHasta ? { fechaTermino: { lte: new Date(fechaHasta) } } : {},
      ],
    };

    const actividades = await prisma.actividad.findMany({
      where,
      include: includeConfig,
      orderBy: {
        fechaInicio: 'desc',
      },
    });

    return NextResponse.json(actividades);
  } catch (error) {
    console.error('Error en GET /api/actividades:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
   
    if (!userId) {
      return NextResponse.json(
        { message: 'No autorizado' },
        { status: 401 }
      );
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

    const data = await req.json();
    
    const actividad = await prisma.actividad.create({
      data: {
        fechaInicio: new Date(data.fechaInicio),
        fechaTermino: new Date(data.fechaTermino),
        estado: data.estado as EstadoActividad,
        causa: {
          connect: { id: parseInt(data.causaId) }
        },
        tipoActividad: {
          connect: { id: parseInt(data.tipoActividadId) }
        },
        usuario: {
          connect: { id: usuario.id }
        }
      },
      include: {
        causa: true,
        tipoActividad: true,
        usuario: {
          select: {
            id: true,
            nombre: true,
            email: true
          }
        }
      },
    });

    return NextResponse.json(actividad, { status: 201 });
  } catch (error) {
    console.error('Error en POST /api/actividades:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor', error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { message: 'ID no proporcionado' },
        { status: 400 }
      );
    }

    const data = await req.json();
    const actividad = await prisma.actividad.update({
      where: { id: Number(id) },
      data: {
        tipoActividadId: data.tipoActividadId ? parseInt(data.tipoActividadId) : undefined,
        fechaInicio: data.fechaInicio ? new Date(data.fechaInicio) : undefined,
        fechaTermino: data.fechaTermino ? new Date(data.fechaTermino) : undefined,
        estado: data.estado
      },
      include: {
        causa: true,
        tipoActividad: true,
      },
    });

    return NextResponse.json(actividad);
  } catch (error) {
    console.error('Error en PUT /api/actividades:', error);
    if (error.code === 'P2025') {
      return NextResponse.json(
        { message: 'Actividad no encontrada' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { message: 'ID no proporcionado' },
        { status: 400 }
      );
    }

    await prisma.actividad.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(
      { message: 'Actividad eliminada correctamente' }
    );
  } catch (error) {
    console.error('Error en DELETE /api/actividades:', error);
    if (error.code === 'P2025') {
      return NextResponse.json(
        { message: 'Actividad no encontrada' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}