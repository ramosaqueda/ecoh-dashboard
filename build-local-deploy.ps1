# build-local-deploy.ps1
# Script que hace build local y luego crea contenedor

Write-Host "=== BUILD LOCAL + DEPLOY DOCKER ===" -ForegroundColor Blue

# 1. Verificar que estamos en el directorio correcto
if (-not (Test-Path "package.json")) {
    Write-Host "[ERROR] No se encuentra package.json" -ForegroundColor Red
    exit 1
}

# 2. Limpiar instalaciones previas
Write-Host "[STEP] Limpiando instalaciones previas..." -ForegroundColor Magenta
if (Test-Path "node_modules") {
    Remove-Item -Recurse -Force node_modules
}
if (Test-Path ".next") {
    Remove-Item -Recurse -Force .next
}

# 3. Instalar dependencias localmente
Write-Host "[STEP] Instalando dependencias localmente..." -ForegroundColor Magenta
npm cache clean --force
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Falló npm install local" -ForegroundColor Red
    exit 1
}

# 4. Verificar/crear next.config.js
Write-Host "[STEP] Verificando next.config.js..." -ForegroundColor Magenta
if (-not (Test-Path "next.config.js")) {
    Write-Host "[INFO] Creando next.config.js con output standalone..."
    @"
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: __dirname,
  },
}

module.exports = nextConfig
"@ | Out-File -FilePath "next.config.js" -Encoding UTF8
} else {
    $configContent = Get-Content "next.config.js" -Raw
    if ($configContent -notmatch "output.*standalone") {
        Write-Host "[WARNING] next.config.js no tiene 'output: standalone'" -ForegroundColor Yellow
        Write-Host "[INFO] Revisa que tu next.config.js tenga: output: 'standalone'"
    }
}

# 5. Build local
Write-Host "[STEP] Haciendo build local..." -ForegroundColor Magenta
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Falló npm run build" -ForegroundColor Red
    exit 1
}

# 6. Verificar que se generó el build
if (-not (Test-Path ".next")) {
    Write-Host "[ERROR] No se generó la carpeta .next" -ForegroundColor Red
    exit 1
}

Write-Host "[SUCCESS] Build local completado exitosamente!" -ForegroundColor Green

# 7. Crear .env.production si no existe
if (-not (Test-Path ".env.production")) {
    Write-Host "[STEP] Creando .env.production..." -ForegroundColor Magenta
    
    # Detectar IP local
    $localIP = "localhost"
    try {
        $networkAdapter = Get-NetIPConfiguration | Where-Object { $_.IPv4DefaultGateway -ne $null }
        if ($networkAdapter) {
            $localIP = $networkAdapter.IPv4Address.IPAddress
        }
    } catch {
        Write-Host "[WARNING] No se pudo detectar IP local, usando localhost" -ForegroundColor Yellow
    }
    
    $secret = [System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes([System.Guid]::NewGuid().ToString()))
    
    @"
# Configuracion de produccion
NODE_ENV=production
PORT=3000

# Base de datos (CAMBIAR CON TUS DATOS REALES)
DATABASE_URL="postgresql://tu_usuario:tu_password@host.docker.internal:5432/tu_bd"

# NextAuth
NEXTAUTH_SECRET="$secret"
NEXTAUTH_URL="http://${localIP}:3000"

# URL base
NEXT_PUBLIC_BASE_URL="http://${localIP}:3000"
NEXT_PUBLIC_API_URL="http://${localIP}:3000/api"
"@ | Out-File -FilePath ".env.production" -Encoding UTF8

    Write-Host "[WARNING] Archivo .env.production creado. EDITA LAS VARIABLES DE BASE DE DATOS!" -ForegroundColor Yellow
    $editEnv = Read-Host "Desea editar .env.production ahora? (y/n)"
    if ($editEnv -eq "y") {
        notepad .env.production
        Write-Host "Presiona Enter cuando termines de editar..." -ForegroundColor Cyan
        Read-Host
    }
}

# 8. Parar contenedores existentes
Write-Host "[STEP] Deteniendo contenedores existentes..." -ForegroundColor Magenta
$existingContainer = docker ps -q --filter "name=actividades-app"
if ($existingContainer) {
    docker stop actividades-app
    docker rm actividades-app
}

# 9. Construir imagen Docker
Write-Host "[STEP] Construyendo imagen Docker..." -ForegroundColor Magenta

# Crear Dockerfile optimizado
@"
FROM node:18-alpine

WORKDIR /app

# Instalar curl para healthcheck
RUN apk add --no-cache curl

# Copiar archivos necesarios
COPY package.json ./
COPY .next ./.next
COPY public ./public

# Instalar solo dependencias de producción
RUN npm ci --only=production --ignore-scripts

# Crear usuario
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs && \
    chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Usar el build de Next.js
CMD ["npm", "start"]
"@ | Out-File -FilePath "Dockerfile" -Encoding UTF8

docker build -t actividades-app:latest .

if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Error al construir imagen Docker" -ForegroundColor Red
    exit 1
}

# 10. Ejecutar contenedor
Write-Host "[STEP] Ejecutando contenedor..." -ForegroundColor Magenta
docker run -d `
    --name actividades-app `
    --env-file .env.production `
    -p 3000:3000 `
    actividades-app:latest

if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Error al ejecutar contenedor" -ForegroundColor Red
    exit 1
}

# 11. Verificar que funciona
Write-Host "[STEP] Verificando despliegue..." -ForegroundColor Magenta
Start-Sleep -Seconds 5

$containerStatus = docker ps --filter "name=actividades-app" --filter "status=running" --format "{{.Names}}"
if ($containerStatus -contains "actividades-app") {
    Write-Host "[SUCCESS] Contenedor corriendo exitosamente!" -ForegroundColor Green
    
    # Probar conectividad
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:3000" -TimeoutSec 10 -ErrorAction Stop
        Write-Host "[SUCCESS] Aplicacion responde correctamente!" -ForegroundColor Green
    } catch {
        Write-Host "[WARNING] Aplicacion podria no estar lista aun" -ForegroundColor Yellow
        Write-Host "[INFO] Verificando logs..." -ForegroundColor Cyan
        docker logs --tail=10 actividades-app
    }
} else {
    Write-Host "[ERROR] Contenedor no esta corriendo" -ForegroundColor Red
    docker logs actividades-app
    exit 1
}

# 12. Mostrar información final
$localIP = "localhost"
try {
    $networkAdapter = Get-NetIPConfiguration | Where-Object { $_.IPv4DefaultGateway -ne $null }
    if ($networkAdapter) {
        $localIP = $networkAdapter.IPv4Address.IPAddress
    }
} catch {}

Write-Host ""
Write-Host "=== DESPLIEGUE COMPLETADO ===" -ForegroundColor Green
Write-Host "URL: http://$localIP:3000" -ForegroundColor Cyan
Write-Host "Comandos utiles:" -ForegroundColor Cyan
Write-Host "  - Ver logs: docker logs actividades-app" -ForegroundColor Gray
Write-Host "  - Parar: docker stop actividades-app" -ForegroundColor Gray
Write-Host "  - Reiniciar: docker restart actividades-app" -ForegroundColor Gray
Write-Host ""