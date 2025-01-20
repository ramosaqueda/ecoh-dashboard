import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
    try {
        const causasCrimenOrg = await prisma.causasCrimenOrganizado.findMany({
            include: {
                parametro: true,
                causa: {
                    select: {
                        esCrimenOrganizado: true
                    }
                }
            }
        });

        return NextResponse.json(causasCrimenOrg);
    } catch (error) {
        console.error('Error fetching causas: ', error);
        return NextResponse.json(
            { error: 'Error fetching causas' },
            { status: 500 }
        );
    }
    
}