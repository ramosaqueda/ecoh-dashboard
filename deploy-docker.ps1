# deploy-docker-clean.ps1
# Script de Despliegue Docker para Windows PowerShell
# Version sin caracteres especiales para compatibilidad

param(
    [string]$AppName = "actividades-app",
    [string]$ContainerName = "actividades-app",
    [string]$EnvFile = ".env.production"
)

# Funciones de logging
function Write-Info {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

function Write-Step {
    param([string]$Message)
    Write-Host "[STEP] $Message" -ForegroundColor Magenta
}

# Banner
function Show-Banner {
    Write-Host "==================================================" -ForegroundColor Blue
    Write-Host "DESPLIEGUE DOCKER - APLICACION DE ACTIVIDADES" -ForegroundColor Blue
    Write-Host "==================================================" -ForegroundColor Blue
}

# Verificar dependencias
function Test-Dependencies {
    Write-Step "Verificando dependencias del sistema..."
    
    # Docker
    if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
        Write-Error "Docker no esta instalado"
        Write-Info "Descarga e instala Docker Desktop desde: https://www.docker.com/products/docker-desktop"
        exit 1
    }
    
    # Docker Compose
    $composeVersion = docker compose version 2>$null
    if (-not $composeVersion) {
        Write-Error "Docker Compose no esta disponible"
        exit 1
    }
    
    # Git
    if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
        Write-Error "Git no esta instalado"
        Write-Info "Descarga e instala Git desde: https://git-scm.com/download/win"
        exit 1
    }
    
    Write-Success "Dependencias verificadas"
}

# Verificar archivos necesarios
function Test-RequiredFiles {
    Write-Step "Verificando archivos necesarios..."
    
    $requiredFiles = @(
        "package.json",
        "next.config.js", 
        "Dockerfile",
        "docker-compose.yml"
    )
    
    foreach ($file in $requiredFiles) {
        if (-not (Test-Path $file)) {
            Write-Error "Archivo requerido no encontrado: $file"
            exit 1
        }
    }
    
    Write-Success "Archivos verificados"
}

# Configurar variables de entorno
function Set-Environment {
    Write-Step "Configurando variables de entorno..."
    
    if (-not (Test-Path $EnvFile)) {
        if (Test-Path ".env.example") {
            Write-Info "Creando $EnvFile desde .env.example..."
            Copy-Item ".env.example" $EnvFile
        } else {
            Write-Info "Creando $EnvFile..."
            
            # Obtener IP local
            $localIP = "localhost"
            try {
                $networkAdapter = Get-NetIPConfiguration | Where-Object { $_.IPv4DefaultGateway -ne $null }
                if ($networkAdapter) {
                    $localIP = $networkAdapter.IPv4Address.IPAddress
                }
            } catch {
                Write-Warning "No se pudo detectar IP local, usando localhost"
            }
            
            # Generar secreto
            $secret = [System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes([System.Guid]::NewGuid().ToString()))
            
            $envContent = @"
# Configuracion de produccion
NODE_ENV=production
PORT=3000

# Base de datos (ajustar segun tu configuracion)
DATABASE_URL="postgresql://postgres:password@host.docker.internal:5432/actividades_db"

# NextAuth
NEXTAUTH_SECRET="$secret"
NEXTAUTH_URL="http://${localIP}:3000"

# URL base
NEXT_PUBLIC_BASE_URL="http://${localIP}:3000"
NEXT_PUBLIC_API_URL="http://${localIP}:3000/api"
"@
            
            Set-Content -Path $EnvFile -Value $envContent
        }
        
        Write-Warning "Archivo $EnvFile creado. EDITA LAS VARIABLES ANTES DE CONTINUAR!"
        $editEnv = Read-Host "Desea editar el archivo ahora? (y/n)"
        if ($editEnv -eq "y") {
            notepad $EnvFile
            Write-Info "Presiona Enter cuando hayas terminado de editar..."
            Read-Host
        }
    } else {
        Write-Info "Archivo $EnvFile ya existe"
    }
    
    Write-Success "Variables de entorno configuradas"
}

# Parar contenedores existentes
function Stop-ExistingContainers {
    Write-Step "Deteniendo contenedores existentes..."
    
    $runningContainer = docker ps -q --filter "name=$ContainerName"
    if ($runningContainer) {
        Write-Info "Deteniendo contenedor $ContainerName..."
        docker stop $ContainerName
        docker rm $ContainerName
    }
    
    $nginxContainer = docker ps -q --filter "name=actividades-nginx"
    if ($nginxContainer) {
        Write-Info "Deteniendo contenedor actividades-nginx..."
        docker stop actividades-nginx
        docker rm actividades-nginx
    }
    
    Write-Success "Contenedores detenidos"
}

# Construir imagen
function Build-Image {
    Write-Step "Construyendo imagen Docker..."
    
    $imageName = "${AppName}:latest"
    
    # Limpiar imagen anterior
    $existingImage = docker images -q $imageName
    if ($existingImage) {
        Write-Info "Eliminando imagen anterior..."
        docker rmi $imageName 2>$null
    }
    
    # Construir nueva imagen
    Write-Info "Construyendo nueva imagen..."
    docker build -t $imageName .
    
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Error al construir la imagen"
        exit 1
    }
    
    Write-Success "Imagen construida exitosamente"
}

# Crear directorios
function New-Directories {
    Write-Step "Creando directorios necesarios..."
    
    $directories = @(".\logs", ".\uploads", ".\nginx\logs")
    
    foreach ($dir in $directories) {
        if (-not (Test-Path $dir)) {
            New-Item -ItemType Directory -Path $dir -Force | Out-Null
            Write-Info "Directorio creado: $dir"
        }
    }
    
    Write-Success "Directorios verificados"
}

# Desplegar contenedores
function Deploy-Containers {
    Write-Step "Desplegando contenedores..."
    
    # Copiar variables de entorno
    Copy-Item $EnvFile ".env"
    
    # Desplegar servicios
    docker compose up -d
    
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Error al desplegar contenedores"
        exit 1
    }
    
    Write-Success "Contenedores desplegados"
}

# Verificar despliegue
function Test-Deployment {
    Write-Step "Verificando despliegue..."
    
    # Esperar a que la aplicacion este lista
    Write-Info "Esperando a que la aplicacion este lista..."
    Start-Sleep -Seconds 10
    
    # Verificar contenedor
    $runningContainer = docker ps --filter "name=$ContainerName" --filter "status=running" --format "{{.Names}}"
    if ($runningContainer -contains $ContainerName) {
        Write-Success "Contenedor de aplicacion esta corriendo"
    } else {
        Write-Error "Contenedor de aplicacion no esta corriendo"
        docker logs $ContainerName
        exit 1
    }
    
    # Verificar conectividad
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:3000" -TimeoutSec 10 -ErrorAction Stop
        Write-Success "Aplicacion responde correctamente"
    } catch {
        Write-Warning "La aplicacion podria no estar completamente lista"
        Write-Info "Verificando logs..."
        docker logs --tail=10 $ContainerName
    }
    
    Write-Success "Verificacion completada"
}

# Mostrar informacion final
function Show-FinalInfo {
    $localIP = "localhost"
    try {
        $networkAdapter = Get-NetIPConfiguration | Where-Object { $_.IPv4DefaultGateway -ne $null }
        if ($networkAdapter) {
            $localIP = $networkAdapter.IPv4Address.IPAddress
        }
    } catch {
        # Si falla, usar localhost
    }
    
    Write-Host ""
    Write-Success "Despliegue completado exitosamente!"
    Write-Host ""
    Write-Host "Informacion del despliegue:"
    Write-Host "   - Aplicacion: $AppName"
    Write-Host "   - Contenedor: $ContainerName"
    Write-Host "   - URL directa: http://${localIP}:3000"
    Write-Host "   - URL con Nginx: http://${localIP}"
    Write-Host ""
    Write-Host "Comandos utiles:"
    Write-Host "   - Ver estado: docker ps"
    Write-Host "   - Ver logs de la app: docker logs $ContainerName"
    Write-Host "   - Reiniciar app: docker restart $ContainerName"
    Write-Host "   - Parar todo: docker compose down"
    Write-Host "   - Actualizar: .\deploy-docker.ps1"
    Write-Host ""
    Write-Host "Archivos importantes:"
    Write-Host "   - Variables de entorno: $EnvFile"
    Write-Host "   - Logs de aplicacion: .\logs\"
    Write-Host "   - Uploads: .\uploads\"
    Write-Host ""
}

# Funcion principal
function Main {
    try {
        Show-Banner
        Write-Info "Iniciando despliegue Docker para intranet..."
        
        Test-Dependencies
        Test-RequiredFiles
        Set-Environment
        New-Directories
        Stop-ExistingContainers
        Build-Image
        Deploy-Containers
        Test-Deployment
        Show-FinalInfo
        
    } catch {
        Write-Error "Error durante el despliegue: $($_.Exception.Message)"
        exit 1
    }
}

# Ejecutar funcion principal
Main