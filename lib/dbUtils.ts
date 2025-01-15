import { prisma } from '@/lib/prisma';

export async function countCausas() {
  const count = await prisma.causa.count();
  return count;
}

// Aquí puedes agregar más funciones de utilidad para la base de datos

export async function otherDatabaseOperation() {
  // Implementa otras operaciones de base de datos aquí
}
