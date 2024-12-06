import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const OrganizacionSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido'),
  descripcion: z.string().optional(),
  fechaIdentificacion: z.string().transform((str) => new Date(str)),
  activa: z.boolean().default(true),
  tipoOrganizacionId: z.number().int()
});

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const organizacion = await prisma.organizacionDelictual.findUnique({
      where: {
        id: parseInt(params.id)
      },
      include: {
        tipoOrganizacion: true,
        miembros: {
          include: {
            imputado: true
          }
        }
      }
    });

    if (!organizacion) {
      return NextResponse.json(
        { error: 'Organización no encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json(organizacion);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const validatedData = OrganizacionSchema.parse(body);

    const organizacion = await prisma.organizacionDelictual.update({
      where: {
        id: parseInt(params.id)
      },
      data: validatedData,
      include: {
        tipoOrganizacion: true,
        miembros: {
          include: {
            imputado: true
          }
        }
      }
    });

    return NextResponse.json(organizacion);
  } catch (error) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Organización no encontrada' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Primero eliminamos los miembros asociados
    await prisma.miembrosOrganizacion.deleteMany({
      where: {
        organizacionId: parseInt(params.id)
      }
    });

    // Luego eliminamos la organización
    await prisma.organizacionDelictual.delete({
      where: {
        id: parseInt(params.id)
      }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Organización no encontrada' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
