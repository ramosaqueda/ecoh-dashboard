'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
// Importamos directamente los estilos de Leaflet para asegurar que estén disponibles
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet-draw/dist/leaflet.draw.css';

// Carga dinámica del mapa para evitar problemas de SSR
const LeafletMap = dynamic(() => import('@/components/LeafletMap'), {
  ssr: false,
  loading: () => <p>Cargando mapa...</p>
});

export default function FullscreenMapPage() {
  const [mapData, setMapData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      // Recuperamos los datos del hash de la URL
      if (typeof window !== 'undefined') {
        const hash = window.location.hash;
        
        if (hash && hash.startsWith('#data=')) {
          // Extraer los datos serializados del hash
          const serializedData = hash.substring(6); // Quitar '#data='
          
          // Decodificar y parsear los datos
          const decodedData = decodeURIComponent(serializedData);
          const parsedData = JSON.parse(decodedData);
          
          console.log('Datos recuperados correctamente', {
            causasCount: parsedData.causas?.length,
            showCrimenOrganizado: parsedData.showCrimenOrganizado,
            filters: parsedData.filters
          });
          
          setMapData(parsedData);
        } else {
          console.warn('No se encontraron datos en la URL');
        }
      }
    } catch (error) {
      console.error('Error al recuperar datos del mapa:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const closeFullscreen = () => {
    window.close();
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="text-lg">Cargando mapa...</div>
      </div>
    );
  }

  if (!mapData) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center">
        <div className="text-lg">No se encontraron datos del mapa</div>
        <Button onClick={closeFullscreen} className="mt-4">
          Cerrar ventana
        </Button>
      </div>
    );
  }

  const { causas, showCrimenOrganizado, filters } = mapData;

  return (
    <div className="flex h-screen w-screen flex-col">
      {/* Barra superior con información y botón de cerrar */}
      <div className="flex items-center justify-between bg-card p-4 shadow">
        <div className="text-lg font-bold">
          Mapa de Causas
          {filters.delito !== 'todos' && ' - Delito específico'}
          {filters.ecoh && ' - ECOH'}
          {filters.crimenOrganizado && ' - Crimen Organizado'}
        </div>
        <div className="flex items-center gap-2">
          <div className="text-sm text-muted-foreground">
            Mostrando {causas.length} causas
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={closeFullscreen}
            className="ml-4"
          >
            <X className="h-4 w-4 mr-2" />
            Cerrar
          </Button>
        </div>
      </div>

      {/* Mapa a pantalla completa */}
      <div className="flex-1">
        <LeafletMap 
          causas={causas} 
          showCrimenOrganizado={showCrimenOrganizado}
        />
      </div>
    </div>
  );
}