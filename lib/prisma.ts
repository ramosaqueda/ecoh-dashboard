import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: [
      {
        emit: 'event',
        level: 'query',
      },
      {
        emit: 'stdout',
        level: 'error',
      },
      {
        emit: 'stdout',
        level: 'info',
      },
      {
        emit: 'stdout',
        level: 'warn',
      },
    ],
  });
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// Event listeners para logging detallado
prisma.$on('query', (e) => {
  console.log('='.repeat(50));
  console.log('Query:', e.query);
  console.log('Params:', e.params);
  console.log('Duration:', e.duration + 'ms');
  console.log('Timestamp:', new Date().toISOString());
  console.log('='.repeat(50));
});

prisma.$on('error', (e) => {
  console.error('='.repeat(50));
  console.error('Prisma Error:', e);
  console.error('Timestamp:', new Date().toISOString());
  console.error('Stack:', new Error().stack);
  console.error('='.repeat(50));
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Manejo de errores de conexión
prisma.$connect()
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch((e) => {
    console.error('Failed to connect to the database:', e);
  });