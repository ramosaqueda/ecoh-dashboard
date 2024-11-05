import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)'
  ]
};
// 1. /((?!.*\\..*|_next).*): ignore todos los paths o recursos que sean estáticos: imágenes, scripts, css, etc...
// 2. / : ruta posterior a la autenticacion del usuario para acceder a la app: automáticamente protegida/privada
// 3. /(api|trpc)(.*): protege todas las ruta que comiencen con api o trpc. Ser accesibles solo los usuarios que hayan iniciado sesión
