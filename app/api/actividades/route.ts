import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { EstadoActividad } from '@prisma/client';
import { auth } from '@clerk/nextjs/server';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id');
    const ruc = searchParams.get('ruc');
    const tipo_actividad_id = searchParams.get('tipo_actividad_id');
    const estado = searchParams.get('estado');
    const fechaDesde = searchParams.get('fechaDesde');
    const fechaHasta = searchParams.get('fechaHasta');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

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

    const whereConditions = [];

    if (ruc) {
      whereConditions.push({ causa: { ruc } });
    }

    if (tipo_actividad_id) {
      whereConditions.push({ tipo_actividad_id: Number(tipo_actividad_id) });
    }

    if (estado) {
      whereConditions.push({ estado: estado as EstadoActividad });
    }

    if (fechaDesde) {
      whereConditions.push({ fechaInicio: { gte: new Date(fechaDesde) } });
    }

    if (fechaHasta) {
      whereConditions.push({ fechaTermino: { lte: new Date(fechaHasta) } });
    }

    const where = whereConditions.length > 0 ? { AND: whereConditions } : {};

    // Get total count for pagination
    const total = await prisma.actividad.count({ where });

    const actividades = await prisma.actividad.findMany({
      where,
      include: includeConfig,
      orderBy: {
        fechaInicio: 'desc',
      },
      skip,
      take: limit,
    });

    return NextResponse.json({
      data: actividades,
      metadata: {
        total,
        page,
        limit,
        hasMore: skip + actividades.length < total
      }
    });
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
        causa_id: parseInt(data.causaId),
        tipo_actividad_id: parseInt(data.tipoActividadId),
        usuario_id: usuario.id,
        fechaInicio: new Date(data.fechaInicio),
        fechaTermino: new Date(data.fechaTermino),
        estado: data.estado as EstadoActividad,
        observacion: data.observacion
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
        tipo_actividad_id: data.tipoActividadId ? parseInt(data.tipoActividadId) : undefined,
        fechaInicio: data.fechaInicio ? new Date(data.fechaInicio) : undefined,
        fechaTermino: data.fechaTermino ? new Date(data.fechaTermino) : undefined,
        estado: data.estado as EstadoActividad,
        observacion: data.observacion
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