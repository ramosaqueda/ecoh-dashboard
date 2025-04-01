'use client';

import { useRef, useMemo } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  FeatureGroup,
  useMap
} from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import L from 'leaflet';
import 'leaflet-draw';
import html2canvas from 'html2canvas';
import MarkerClusterGroup from 'react-leaflet-cluster';

// Fix para los iconos
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png'
});

// Componente para herramientas de dibujo
function DrawTools() {
  return (
    <FeatureGroup>
      <EditControl
        position="topright"
        draw={{
          rectangle: {
            shapeOptions: {
              color: '#3388ff',
              weight: 2
            }
          },
          polygon: {
            allowIntersection: false,
            drawError: {
              color: '#e1e100',
              message: '<strong>Error:</strong> Los bordes no pueden cruzarse!'
            },
            shapeOptions: {
              color: '#3388ff',
              weight: 2
            }
          },
          circle: {
            shapeOptions: {
              color: '#3388ff',
              weight: 2
            }
          },
          polyline: {
            shapeOptions: {
              color: '#3388ff',
              weight: 2
            }
          },
          circlemarker: false,
          marker: false
        }}
        edit={{
          edit: true,
          remove: true
        }}
      />
    </FeatureGroup>
  );
}

// Componente para el botón de exportar
function ExportButton() {
  const map = useMap();

  const handleExport = async () => {
    try {
      const mapContainer = map.getContainer();

      const canvas = await html2canvas(mapContainer, {
        useCORS: true,
        allowTaint: true,
        foreignObjectRendering: true
      });

      const link = document.createElement('a');
      link.download = `mapa-causas-${new Date()
        .toISOString()
        .slice(0, 10)}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error al exportar mapa:', error);
      alert('Error al exportar el mapa. Por favor, intente nuevamente.');
    }
  };

  return (
    <div className="leaflet-top leaflet-left" style={{ marginTop: '80px' }}>
      <div className="leaflet-control leaflet-bar">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleExport();
          }}
          title="Exportar mapa"
          className="export-button flex items-center justify-center"
          style={{ width: '34px', height: '34px' }}
        >
          📸
        </a>
      </div>
    </div>
  );
}

interface LeafletMapProps {
  causas: Array<{
    id: number;
    denominacionCausa: string;
    ruc: string;
    coordenadasSs: string | null;
    esCrimenOrganizado?: boolean | number;
    delito?: {
      id: number;
      nombre: string;
    };
  }>;
  showCrimenOrganizado?: boolean;
}

function LeafletMap({ causas, showCrimenOrganizado = false }: LeafletMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const memoizedCausas = useMemo(() => {
    // Si está activado el filtro de crimen organizado, filtramos las causas
    if (showCrimenOrganizado) {
      return causas.filter(causa => {
        // Manejar el caso donde esCrimenOrganizado puede ser un número o un booleano
        if (typeof causa.esCrimenOrganizado === 'boolean') {
          return causa.esCrimenOrganizado === true;
        } else if (typeof causa.esCrimenOrganizado === 'number') {
          return causa.esCrimenOrganizado === 1;
        }
        return false;
      });
    }
    return causas;
  }, [causas, showCrimenOrganizado]);

  console.log(`Total causas sin filtrar: ${causas.length}`);
  console.log(`Total causas filtradas por crimen organizado: ${memoizedCausas.length}`);

  if (memoizedCausas.length === 0) return null;

  const getPosicion = (coordStr: string | null) => {
    const defaultCoords = {
      lat: -33.4489,
      lng: -70.6693,
      isValid: false
    };

    if (!coordStr) return defaultCoords;

    try {
      const [lat, lng] = coordStr.split(',').map((coord) => {
        const num = parseFloat(coord.trim());
        if (isNaN(num)) throw new Error('Coordenada inválida');
        return num;
      });

      if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
        console.warn('Coordenadas fuera de rango:', coordStr);
        return defaultCoords;
      }

      return { lat, lng, isValid: true };
    } catch (error) {
      console.warn('Error al procesar coordenadas:', coordStr, error);
      return defaultCoords;
    }
  };

  const primerPuntoValido = memoizedCausas.find((causa) => {
    const coords = getPosicion(causa.coordenadasSs);
    return coords.isValid;
  });

  const centroInicial = primerPuntoValido
    ? getPosicion(primerPuntoValido.coordenadasSs)
    : getPosicion(null);

  const createClusterCustomIcon = function (cluster: any) {
    const count = cluster.getChildCount();
    let size = 'small';

    if (count > 50) size = 'large';
    else if (count > 20) size = 'medium';

    return L.divIcon({
      html: `<div class="cluster-icon-inner">${count}</div>`,
      className: `custom-cluster-icon cluster-${size}`,
      iconSize: L.point(40, 40, true)
    });
  };

  const getMarkerColor = (causa: any) => {
    // Si está en modo crimen organizado, mostrar marcadores rojos
    if (showCrimenOrganizado) {
      return '#e74c3c'; // Rojo para crimen organizado
    }

    // Color por tipo de delito
    const colorMap: { [key: number]: string } = {
      1: '#e74c3c', // Rojo
      2: '#3498db', // Azul
      3: '#2ecc71', // Verde
      4: '#f1c40f' // Amarillo
    };

    return causa.delito?.id ? colorMap[causa.delito.id] || '#95a5a6' : '#95a5a6';
  };

  const createCustomMarker = (causa: any) => {
    const color = getMarkerColor(causa);
    const isCrimenOrg = typeof causa.esCrimenOrganizado === 'boolean' 
      ? causa.esCrimenOrganizado 
      : causa.esCrimenOrganizado === 1;
    
    // Tamaño ligeramente mayor para marcadores de crimen organizado
    const size = showCrimenOrganizado || isCrimenOrg ? 24 : 20;
    const anchorSize = size / 2;

    return L.divIcon({
      html: `
        <div style="
          background-color: ${color};
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 0 4px rgba(0,0,0,0.3);
          ${(showCrimenOrganizado || isCrimenOrg) ? 'animation: pulse 1.5s infinite;' : ''}
        "></div>
      `,
      className: 'custom-marker',
      iconSize: [size, size],
      iconAnchor: [anchorSize, anchorSize]
    });
  };

  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <div className="relative h-full w-full">
      <style>{`
        .custom-cluster-icon {
          background: rgba(63, 81, 181, 0.8);
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          font-weight: bold;
          font-size: 14px;
          border: 2px solid white;
          box-shadow: 0 0 10px rgba(0,0,0,0.3);
          transition: all 0.3s ease;
        }
        
        .custom-cluster-icon:hover {
          transform: scale(1.1);
          background: rgba(63, 81, 181, 0.9);
        }
        
        .cluster-small {
          background: rgba(52, 152, 219, 0.8);
          width: 35px;
          height: 35px;
        }
        
        .cluster-medium {
          background: rgba(155, 89, 182, 0.8);
          width: 45px;
          height: 45px;
        }
        
        .cluster-large {
          background: rgba(231, 76, 60, 0.8);
          width: 55px;
          height: 55px;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.8;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .cluster-icon-inner {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .export-button {
          background: white !important;
          cursor: pointer;
          font-size: 1.2rem;
        }
        
        .export-button:hover {
          background: #f4f4f4 !important;
        }

        .leaflet-draw-toolbar a {
          background-color: white;
        }

        .leaflet-draw-toolbar a:hover {
          background-color: #f4f4f4;
        }

        .leaflet-draw-actions a {
          background-color: white;
          color: #333;
          padding: 5px 10px;
        }

        .leaflet-draw-actions a:hover {
          background-color: #f4f4f4;
        }
      `}</style>

      <MapContainer
        ref={(map) => {
          mapRef.current = map;
        }}
        key={`map-container-${showCrimenOrganizado ? 'crimen-org' : 'normal'}`}  // Añade una key única que cambie con el filtro
        center={[centroInicial.lat, centroInicial.lng]}
        zoom={12}
        className="h-full w-full rounded-lg shadow-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Herramientas de dibujo */}
        <DrawTools />

        {/* Botón de exportar */}
        <ExportButton />

        <MarkerClusterGroup
          chunkedLoading
          maxClusterRadius={60}
          iconCreateFunction={createClusterCustomIcon}
          showCoverageOnHover={false}
          spiderfyOnMaxZoom={true}
          animate={true}
          animateAddingMarkers={true}
        >
          {memoizedCausas.map((causa) => {
            const coordenadas = getPosicion(causa.coordenadasSs);
            if (!coordenadas.isValid) return null;

            const isCrimenOrg = typeof causa.esCrimenOrganizado === 'boolean' 
              ? causa.esCrimenOrganizado 
              : causa.esCrimenOrganizado === 1;

            return (
              <Marker
                key={causa.id}
                position={[coordenadas.lat, coordenadas.lng]}
                icon={createCustomMarker(causa)}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-bold">{causa.denominacionCausa}</h3>
                    <p className="text-sm">RUC: {causa.ruc}</p>
                    {causa.delito && (
                      <p className="text-sm text-blue-600">
                        Delito: {causa.delito.nombre}
                      </p>
                    )}
                    {isCrimenOrg && (
                      <p className="text-sm font-semibold text-red-600">
                        Crimen Organizado
                      </p>
                    )}
                    <p className="mt-1 text-xs text-gray-600">
                      {coordenadas.lat.toFixed(6)}, {coordenadas.lng.toFixed(6)}
                    </p>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}

export default LeafletMap;