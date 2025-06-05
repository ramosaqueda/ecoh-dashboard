# fix-prisma-simple.ps1
# Script específico para solucionar Prisma en Docker

Write-Host "=== SOLUCIONANDO PRISMA EN DOCKER ===" -ForegroundColor Blue
Write-Host ""

# Verificar que estamos en el directorio correcto
if (-not (Test-Path "prisma/schema.prisma")) {
    Write-Host "[ERROR] No se encuentra prisma/schema.prisma" -ForegroundColor Red
    Write-Host "[INFO] Ejecuta este script desde el directorio raíz del proyecto" -ForegroundColor Yellow
    exit 1
}

Write-Host "[SUCCESS] prisma/schema.prisma encontrado" -ForegroundColor Green

# Parar contenedor actual
Write-Host "[STEP] Deteniendo contenedor actual..." -ForegroundColor Magenta
$existingContainer = docker ps -q --filter "name=actividades-app"
if ($existingContainer) {
    docker stop actividades-app
    docker rm actividades-app
    Write-Host "[SUCCESS] Contenedor detenido" -ForegroundColor Green
} else {
    Write-Host "[INFO] No hay contenedor corriendo" -ForegroundColor Cyan
}

# Crear Dockerfile específico para Prisma
Write-Host "[STEP] Creando Dockerfile optimizado para Prisma..." -ForegroundColor Magenta

@"
FROM node:18-alpine

WORKDIR /app

# Instalar dependencias del sistema (OpenSSL necesario para Prisma)
RUN apk add --no-cache libc6-compat curl openssl

# Copiar package files
COPY package.json package-lock.json* ./

# Instalar dependencias
RUN npm ci --legacy-peer-deps

# Copiar prisma EXPLÍCITAMENTE antes del resto
COPY prisma ./prisma/

# Generar cliente de Prisma para Linux
RUN npx prisma generate

# Copiar resto del código
COPY . .

# Build
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Usuario no-root
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs && \
    chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["npm", "start"]
"@ | Out-File -FilePath "Dockerfile" -Encoding UTF8

Write-Host "[SUCCESS] Dockerfile creado" -ForegroundColor Green

# Construir imagen
Write-Host "[STEP] Construyendo imagen Docker..." -ForegroundColor Magenta
Write-Host "[INFO] Esto tomará unos minutos..." -ForegroundColor Cyan

docker build -t actividades-app:latest . --no-cache

if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Error al construir imagen" -ForegroundColor Red
    exit 1
}

Write-Host "[SUCCESS] Imagen construida exitosamente" -ForegroundColor Green

# Crear contenedor
Write-Host "[STEP] Creando contenedor..." -ForegroundColor Magenta
docker run -d `
    --name actividades-app `
    --env-file .env.production `
    -p 3000:3000 `
    actividades-app:latest

if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Error al crear contenedor" -ForegroundColor Red
    exit 1
}

# Verificar Prisma en contenedor
Write-Host "[STEP] Verificando Prisma en contenedor..." -ForegroundColor Magenta
Start-Sleep -Seconds 10

Write-Host "[INFO] Verificando directorio prisma:" -ForegroundColor Cyan
docker exec actividades-app ls -la ./prisma/

Write-Host "[INFO] Verificando cliente de Prisma:" -ForegroundColor Cyan
docker exec actividades-app ls -la node_modules/.prisma/client/

# Verificar logs
Write-Host "[STEP] Verificando logs..." -ForegroundColor Magenta
Start-Sleep -Seconds 5

$logs = docker logs actividades-app --tail=10 2>&1
$hasError = $logs | Select-String -Pattern "error|failed|Error"

if ($hasError) {
    Write-Host "[WARNING] Posibles errores en logs:" -ForegroundColor Yellow
    $hasError | ForEach-Object { Write-Host "  $_" -ForegroundColor Gray }
} else {
    Write-Host "[SUCCESS] No hay errores en los logs" -ForegroundColor Green
}

# Probar aplicación
Write-Host "[STEP] Probando aplicación..." -ForegroundColor Magenta
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -TimeoutSec 10 -ErrorAction Stop
    Write-Host "[SUCCESS] ¡Aplicación funciona correctamente!" -ForegroundColor Green
} catch {
    Write-Host "[INFO] Aplicación aún se está iniciando..." -ForegroundColor Cyan
}

Write-Host ""
Write-Host "=== COMPLETADO ===" -ForegroundColor Blue
Write-Host "URL: http://172.17.100.49:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Si hay problemas, verifica con:" -ForegroundColor Yellow
Write-Host "  docker logs actividades-app" -ForegroundColor Gray
Write-Host "  docker exec actividades-app npx prisma generate" -ForegroundColor Gray