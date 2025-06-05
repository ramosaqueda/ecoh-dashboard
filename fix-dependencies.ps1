# fix-dependencies.ps1
# Script para arreglar conflictos de dependencias

Write-Host "=== ARREGLANDO CONFLICTOS DE DEPENDENCIAS ===" -ForegroundColor Blue

# Analizar el problema
Write-Host "[ANALISIS] Conflicto detectado:" -ForegroundColor Yellow
Write-Host "  - React: 19.1.0 (instalado)" -ForegroundColor Gray
Write-Host "  - @hello-pangea/dnd: requiere React ^18.0.0" -ForegroundColor Gray
Write-Host ""

# Mostrar opciones
Write-Host "[OPCIONES] Selecciona una solucion:" -ForegroundColor Cyan
Write-Host "1. Instalar con --legacy-peer-deps (recomendado)" -ForegroundColor Green
Write-Host "2. Downgrade React a v18" -ForegroundColor Yellow
Write-Host "3. Remover @hello-pangea/dnd y usar solo @dnd-kit" -ForegroundColor Yellow
Write-Host "4. Instalar con --force (puede causar problemas)" -ForegroundColor Red

$choice = Read-Host "Selecciona opcion (1-4)"

switch ($choice) {
    "1" {
        Write-Host "[SOLUCION 1] Instalando con --legacy-peer-deps..." -ForegroundColor Green
        
        # Limpiar instalación previa
        if (Test-Path "node_modules") { Remove-Item -Recurse -Force node_modules }
        if (Test-Path "package-lock.json") { Remove-Item -Force package-lock.json }
        
        # Instalar con legacy peer deps
        npm install --legacy-peer-deps
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "[SUCCESS] Dependencias instaladas exitosamente!" -ForegroundColor Green
            Write-Host "[INFO] Probando build..." -ForegroundColor Cyan
            npm run build
            
            if ($LASTEXITCODE -eq 0) {
                Write-Host "[SUCCESS] Build exitoso! Problema resuelto." -ForegroundColor Green
            } else {
                Write-Host "[ERROR] Build fallo. Revisa errores de build." -ForegroundColor Red
            }
        } else {
            Write-Host "[ERROR] Instalacion fallo aun con --legacy-peer-deps" -ForegroundColor Red
        }
    }
    
    "2" {
        Write-Host "[SOLUCION 2] Downgrading React a v18..." -ForegroundColor Yellow
        
        # Backup package.json
        Copy-Item package.json package.json.backup
        
        # Downgrade React
        npm install react@^18.0.0 react-dom@^18.0.0
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "[SUCCESS] React downgraded a v18" -ForegroundColor Green
            Write-Host "[INFO] Probando instalacion completa..." -ForegroundColor Cyan
            npm install
            
            if ($LASTEXITCODE -eq 0) {
                Write-Host "[SUCCESS] Todas las dependencias instaladas!" -ForegroundColor Green
                npm run build
            }
        }
    }
    
    "3" {
        Write-Host "[SOLUCION 3] Removiendo @hello-pangea/dnd..." -ForegroundColor Yellow
        
        # Backup package.json
        Copy-Item package.json package.json.backup
        
        # Remover hello-pangea/dnd
        npm uninstall @hello-pangea/dnd
        
        Write-Host "[INFO] @hello-pangea/dnd removido. Usa @dnd-kit que ya tienes instalado." -ForegroundColor Cyan
        Write-Host "[INFO] Revisa tu codigo y reemplaza imports de @hello-pangea/dnd con @dnd-kit" -ForegroundColor Cyan
        
        # Instalar dependencias restantes
        npm install
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "[SUCCESS] Dependencias instaladas sin conflictos!" -ForegroundColor Green
        }
    }
    
    "4" {
        Write-Host "[SOLUCION 4] Instalando con --force..." -ForegroundColor Red
        Write-Host "[WARNING] Esta opcion puede causar problemas en runtime!" -ForegroundColor Yellow
        
        # Limpiar
        if (Test-Path "node_modules") { Remove-Item -Recurse -Force node_modules }
        if (Test-Path "package-lock.json") { Remove-Item -Force package-lock.json }
        
        # Forzar instalacion
        npm install --force
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "[SUCCESS] Dependencias forzadas instaladas" -ForegroundColor Green
            Write-Host "[WARNING] Prueba bien la aplicacion antes de desplegar" -ForegroundColor Yellow
        }
    }
    
    default {
        Write-Host "[ERROR] Opcion invalida" -ForegroundColor Red
        exit 1
    }
}

# Verificar resultado final
if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "[FINAL] Verificando instalacion final..." -ForegroundColor Cyan
    
    if (Test-Path "node_modules") {
        Write-Host "[SUCCESS] node_modules existe" -ForegroundColor Green
        
        # Probar build
        Write-Host "[TEST] Probando build..." -ForegroundColor Cyan
        npm run build
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "[SUCCESS] Build exitoso! Problema completamente resuelto." -ForegroundColor Green
            Write-Host ""
            Write-Host "[NEXT] Ahora puedes ejecutar:" -ForegroundColor Blue
            Write-Host "  .\build-local-deploy.ps1" -ForegroundColor Gray
            Write-Host "  o el script Docker original" -ForegroundColor Gray
        } else {
            Write-Host "[ERROR] Build aun falla. Revisa errores de compilacion." -ForegroundColor Red
        }
    }
}