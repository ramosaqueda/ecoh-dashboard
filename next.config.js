/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['utfs.io']
  },
  // Añadir estas opciones para mejor depuración
  reactStrictMode: true,
  // Opcionalmente puedes añadir esto en desarrollo para mejorar mensajes de error
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  }
};

module.exports = nextConfig;