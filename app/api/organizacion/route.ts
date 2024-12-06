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

// GET: Obtener todas las organizaciones
export async function GET() {
  try {
    const organizaciones = await prisma.organizacionDelictual.findMany({
      include: {
        tipoOrganizacion: true,
        miembros: {
          include: {
            imputado: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    return NextResponse.json(organizaciones);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// POST: Crear una nueva organización
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = OrganizacionSchema.parse(body);

    const organizacion = await prisma.organizacionDelictual.create({
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

    return NextResponse.json(organizacion, { status: 201 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
