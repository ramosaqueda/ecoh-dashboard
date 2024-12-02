// middleware/clerk-sync.ts
import { authMiddleware } from '@clerk/nextjs';
import { prisma } from '@/lib/prisma';

export default authMiddleware({
  async afterAuth(auth, req, evt) {
    // Solo proceder si hay un usuario autenticado
    if (auth.userId) {
      try {
        // Verificar si el usuario ya existe en nuestra base de datos
        const existingUser = await prisma.usuario.findUnique({
          where: {
            clerkId: auth.userId
          }
        });

        // Si no existe, crear el usuario en nuestra base de datos
        if (!existingUser && auth.sessionClaims?.email) {
          await prisma.usuario.create({
            data: {
              clerkId: auth.userId,
              email: auth.sessionClaims.email as string,
              nombre: (auth.sessionClaims?.firstName as string) || 'Usuario'
            }
          });
        }
      } catch (error) {
        console.error('Error sincronizando usuario:', error);
      }
    }
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
};
