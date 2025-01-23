import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    req: NextRequest,
    { params }: { params: {id: string } }
  ) {
    try {
      const {id} = await params;
      
      const relatoHecho = await prisma.relatoHecho.findUnique({
        where: { causaId: parseInt(id) },
        include: {
          causa: {
            select: {
              ruc: true,
              denominacionCausa: true
            }
          }
          
        }
      });

      return NextResponse.json(relatoHecho);
    } catch (error) {
      console.error('Error fetching relato:', error);
      return NextResponse.json(
        { error: 'Error fetching relato' },
        { status: 500 }
      );
    }
  }
  