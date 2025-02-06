import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface Props {
    params: { id: string };
  }

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {

        const causaId = parseInt(params.id);

        if(!causaId || isNaN(causaId)) {
            return NextResponse.json(
                { error: 'ID de causa inválido' },
                { status: 400}
            );
        }

        const causa = await prisma.causa.findUnique({
            where: { id: causaId }, 
            include: {
                causasCrimenOrg: {
                    select: {
                        causaId: true,
                        parametroId: true,
                        estado: true,
                        parametro: {
                            select: {
                                label: true,
                            }
                        }
                    },
                }
            }
        });

        if(!causa) {
            return NextResponse.json(
                { error: 'Datos no encontrados' },
                { status: 404 }
            );
        }

        const causaCrimOrgFormateada = causa.causasCrimenOrg.map((cco) => ({
            id: `${cco.causaId}-${cco.parametroId}`,
            causaId: cco.causaId,
            parametroId: cco.parametroId,
            estado: cco.estado,
            label: cco.parametro.label
        }));

        return NextResponse.json(causaCrimOrgFormateada);
    } catch (error) {
        console.error('Error fetching causa: ', error);
        return NextResponse.json(
            { error: 'Error fetching causa' },
            { status: 500 }
        );
    }
    
}

export async function PUT(req: Request, { params }: Props) {
    try {
        const data = await req.json();
        const causaId =  parseInt(params.id);

        const { parametroId, estado } = data;

        if (!parametroId || isNaN(parametroId)) {
            return NextResponse.json({ error: "parametroId es inválido o está ausente" }, { status: 400 });
        }

        const updateData = {
            parametroId: parametroId,
            estado: estado || false
        };

        const updated = await prisma.causasCrimenOrganizado.update({
            where: {
                causaId_parametroId : {
                    causaId: causaId,
                    parametroId: parametroId,
                }
            },
            data: { estado },
            include: {
                parametro: true,
                causa: true,
            }
        });
        
        return NextResponse.json(updated);
    } catch (error) {
        console.error('Error updating causa: ', error);
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}

export async function POST(
    req: NextRequest,
    { params }: Props) {
    try {
        const data = await req.json();
        const id = await parseInt(params.id);
        const { parametroId, estado } = data;

        const causaCrimenOrg = await prisma.causasCrimenOrganizado.create({
            data: {
                causaId: id,
                parametroId: parametroId,
                estado: estado ?? false

            },
            include: {
                causa: true,
                parametro: true
            }
        });

        return NextResponse.json(causaCrimenOrg, {status: 201});
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { message: 'Error al agregar parámetro a causa', error },
            { status: 500 }
        );
    }

}
