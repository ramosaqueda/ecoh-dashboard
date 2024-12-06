import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const MiembroSchema = z.object({
  imputadoId: z.number().int(),
  rol: z.string().optional(),
  fechaIngreso: z.union([
    z.string().transform((str) => new Date(str)),
    z.date()
  ]),
  fechaSalida: z
    .union([z.string().transform((str) => new Date(str)), z.date(), z.null()])
    .nullable()
    .optional(),
  activo: z.boolean().default(true)
});

// GET: Obtener miembros de una organización específica
// En /api/organizacion/[id]/route.ts
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

// PUT: Actualizar todos los miembros de una organización
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const organizacionId = parseInt(params.id);

    // Validar el array de miembros
    const miembros = z.array(MiembroSchema).parse(body);

    // Usar una transacción para asegurar la integridad de los datos
    const result = await prisma.$transaction(async (tx) => {
      // 1. Eliminar miembros existentes
      await tx.miembrosOrganizacion.deleteMany({
        where: { organizacionId }
      });

      // 2. Crear los nuevos miembros
      const createdMiembros = await Promise.all(
        miembros.map((miembro) =>
          tx.miembrosOrganizacion.create({
            data: {
              ...miembro,
              organizacionId,
              fechaIngreso: new Date(miembro.fechaIngreso),
              fechaSalida: miembro.fechaSalida
                ? new Date(miembro.fechaSalida)
                : null
            },
            include: {
              imputado: true
            }
          })
        )
      );

      return createdMiembros;
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: error.errors },
        { status: 400 }
      );
    }
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Uno o más imputados ya son miembros de esta organización' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// DELETE: Eliminar todos los miembros de una organización
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.miembrosOrganizacion.deleteMany({
      where: {
        organizacionId: parseInt(params.id)
      }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
