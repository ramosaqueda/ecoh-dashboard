'use client';

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { useLeafletContext } from '@react-leaflet/core';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

interface CustomMarkerClusterProps {
  children: React.ReactNode;
  chunkedLoading?: boolean;
  maxClusterRadius?: number;
  iconCreateFunction?: (cluster: L.MarkerCluster) => L.DivIcon;
  showCoverageOnHover?: boolean;
  spiderfyOnMaxZoom?: boolean;
}

// Implementación simplificada que funciona con la versión más reciente de React Leaflet
const CustomMarkerCluster: React.FC<CustomMarkerClusterProps> = ({
  children,
  chunkedLoading = false,
  maxClusterRadius = 80,
  iconCreateFunction,
  showCoverageOnHover = true,
  spiderfyOnMaxZoom = true
}) => {
  const context = useLeafletContext();
  const groupRef = useRef<L.MarkerClusterGroup | null>(null);
  const propsRef = useRef({ chunkedLoading, maxClusterRadius, iconCreateFunction, showCoverageOnHover, spiderfyOnMaxZoom });

  // Actualizar las props cuando cambien
  useEffect(() => {
    propsRef.current = { chunkedLoading, maxClusterRadius, iconCreateFunction, showCoverageOnHover, spiderfyOnMaxZoom };
  }, [chunkedLoading, maxClusterRadius, iconCreateFunction, showCoverageOnHover, spiderfyOnMaxZoom]);

  // Crear y configurar el grupo de marcadores al montar
  useEffect(() => {
    // Asegurarse de que estamos en el cliente
    if (typeof window === 'undefined') return;
    
    const { map } = context;
    // Verificar que Leaflet y L.MarkerClusterGroup estén disponibles
    if (!map || !L.MarkerClusterGroup) return;

    try {
      // Crear un grupo de marcadores con las opciones proporcionadas
      const clusterGroup = L.markerClusterGroup({
        chunkedLoading: propsRef.current.chunkedLoading,
        maxClusterRadius: propsRef.current.maxClusterRadius,
        iconCreateFunction: propsRef.current.iconCreateFunction,
        showCoverageOnHover: propsRef.current.showCoverageOnHover,
        spiderfyOnMaxZoom: propsRef.current.spiderfyOnMaxZoom
      });

      // Añadir al mapa
      clusterGroup.addTo(map);
      groupRef.current = clusterGroup;

      // Limpiar al desmontar
      return () => {
        map.removeLayer(clusterGroup);
        groupRef.current = null;
      };
    } catch (error) {
      console.error('Error al crear MarkerClusterGroup:', error);
    }
  }, [context]);

  // No renderizar nada directamente, usar un enfoque imperativo
  return (
    <div style={{ display: 'none' }}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && groupRef.current) {
          // Clonar y pasar el grupo como prop
          return React.cloneElement(child, {
            leafletMarkerClusterGroup: groupRef.current
          });
        }
        return child;
      })}
    </div>
  );
};

export default CustomMarkerCluster;