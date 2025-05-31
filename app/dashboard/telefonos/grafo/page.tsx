'use client';

import { useState, useEffect } from 'react';
import TelefonosGraph from '@/components/graph/TelefonosGraph';
import CausaSelector from '@/components/select/CausaSelector';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

// Interfaces TypeScript para el grafo
interface GraphNode {
  id: string;
  label: string;
  type: 'telefono' | 'causa';
  denominacion?: string; // Solo para nodos de tipo 'causa'
}

interface GraphLink {
  source: string;
  target: string;
}

interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

// Interfaces para los datos de la API
interface Causa {
  id: number;
  ruc: string;
  denominacionCausa: string;
}

interface TelefonoCausa {
  causa: Causa;
}

interface Telefono {
  id: number;
  numeroTelefonico?: string;
  telefonosCausa: TelefonoCausa[];
}

export default function TelefonosGrafoPage() {
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedCausa, setSelectedCausa] = useState<string>('');

  const fetchData = async (causaId: string = ''): Promise<void> => {
    setIsLoading(true);
    try {
      // Construir la URL con el filtro de causa si existe
      let url = '/api/telefonos';
      if (causaId) {
        url += `?causa_id=${causaId}`;
      }

      const response = await fetch(url);
      const telefonos: Telefono[] = await response.json();

      // Preparar los datos para el grafo con tipos específicos
      const nodes: GraphNode[] = [];
      const links: GraphLink[] = [];
      const causasSet = new Set<string>();

      // Procesar teléfonos y sus causas
      telefonos.forEach(telefono => {
        // Filtrar las causas según la selección
        const telefonosCausa = causaId 
          ? telefono.telefonosCausa.filter(tc => tc.causa.id.toString() === causaId)
          : telefono.telefonosCausa;

        if (telefonosCausa.length > 0) {
          // Agregar nodo del teléfono
          nodes.push({
            id: `tel-${telefono.id}`,
            label: telefono.numeroTelefonico || `Tel. ${telefono.id}`,
            type: 'telefono'
          });

          // Procesar causas asociadas
          telefonosCausa.forEach(tc => {
            const causaNodeId = `causa-${tc.causa.id}`;
            
            // Agregar nodo de causa si no existe
            if (!causasSet.has(causaNodeId)) {
              nodes.push({
                id: causaNodeId,
                label: tc.causa.ruc,
                denominacion: tc.causa.denominacionCausa,
                type: 'causa'
              });
              causasSet.add(causaNodeId);
            }

            // Agregar enlace entre teléfono y causa
            links.push({
              source: `tel-${telefono.id}`,
              target: causaNodeId
            });
          });
        }
      });

      setGraphData({ nodes, links });
    } catch (error) {
      console.error('Error al cargar los datos:', error);
      toast.error('Error al cargar los datos del grafo');
    } finally {
      setIsLoading(false);
    }
  };

  // Efecto inicial para cargar los datos
  useEffect(() => {
    fetchData();
  }, []);

  // Manejar cambio de causa seleccionada
  const handleCausaChange = (causaId: string): void => {
    setSelectedCausa(causaId);
    fetchData(causaId);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="mt-2 text-sm text-muted-foreground">
            Cargando datos del grafo...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col space-y-4">
            <CardTitle>Grafo de Relaciones Teléfonos-Causas</CardTitle>
            <div className="w-full max-w-md">
              <CausaSelector
                value={selectedCausa}
                onChange={handleCausaChange}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {graphData && graphData.nodes.length > 0 ? (
            <div className="rounded-lg border">
              <TelefonosGraph data={graphData} />
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No hay datos para mostrar en el grafo
            </div>
          )}
          {graphData && (
            <div className="mt-4 text-sm text-muted-foreground">
              {graphData.nodes.filter(n => n.type === 'telefono').length} teléfonos y{' '}
              {graphData.nodes.filter(n => n.type === 'causa').length} causas mostradas
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}