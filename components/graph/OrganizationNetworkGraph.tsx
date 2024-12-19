import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ForceGraph2D } from 'react-force-graph';
import { GraphControls } from './controls/GraphControls';
import { DetailPanel } from './detail/DetailPanel';
import { Building2, User } from 'lucide-react';

interface Organization {
  id: number;
  nombre: string;
  activa: boolean;
  tipoOrganizacionId: number;
  miembros?: Member[];
}

interface Member {
  imputadoId: number;
  activo: boolean;
  rol?: string;
  imputado?: Imputado;
}

interface Imputado {
  id: number;
  nombreSujeto: string;
  organizaciones?: Organization[];
}

interface GraphNode {
  id: string;
  name: string;
  val: number;
  type: 'organization' | 'imputado';
  color: string;
  x?: number;
  y?: number;
  org?: Organization;
  imputado?: Imputado;
  organizaciones?: Organization[];
}

interface GraphLink {
  source: string;
  target: string;
  value: number;
  rol?: string;
}

interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

interface Dimensions {
  width: number;
  height: number;
}

interface Filters {
  tipoOrganizacion: string;
  showActiveOnly: boolean;
}

interface VisualConfig {
  linkDistance: number;
  dagMode: string;
  nodeSize: number;
}

const OrganizationNetworkGraph: React.FC = () => {
  const forceRef = useRef<any>();
  
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });
  const [rawData, setRawData] = useState<Organization[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [tipos, setTipos] = useState<any[]>([]);

  const [filters, setFilters] = useState<Filters>({
    tipoOrganizacion: 'all',
    showActiveOnly: false
  });

  const [visualConfig, setVisualConfig] = useState<VisualConfig>({
    linkDistance: 100,
    dagMode: 'none',
    nodeSize: 10
  });

  const [dimensions, setDimensions] = useState<Dimensions>({
    width: typeof window !== 'undefined' ? window.innerWidth - 100 : 800,
    height: typeof window !== 'undefined' ? window.innerHeight - 300 : 600
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth - 100,
        height: window.innerHeight - 300
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (rawData.length > 0) {
      const updatedGraphData = processGraphData(rawData, '');
      setGraphData(updatedGraphData);
      if (forceRef.current) {
        forceRef.current.d3ReheatSimulation();
      }
    }
  }, [visualConfig, rawData]);

  const drawShape = (
    ctx: CanvasRenderingContext2D,
    node: GraphNode,
    size: number
  ): void => {
    // Configura el fondo
    ctx.fillStyle = node.color;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 2;
  
   
  
    // Configura el estilo del icono
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1.5;
  
    // Ajusta la escala y posición para el icono
    ctx.save();
    ctx.translate(node.x || 0, node.y || 0);
    const scale = size/24;
    ctx.scale(scale, scale);
    ctx.translate(-12, -12); // Centra el icono (24x24 es el tamaño base de Lucide)
  
    // Dibuja el icono según el tipo
    if (node.type === 'organization') {
      // Building2 icon path de Lucide
      ctx.beginPath();
      ctx.moveTo(3, 9);
      ctx.lineTo(3, 21);
      ctx.lineTo(21, 21);
      ctx.lineTo(21, 9);
      ctx.moveTo(3, 9);
      ctx.lineTo(21, 9);
      ctx.moveTo(9, 21);
      ctx.lineTo(9, 9);
      ctx.moveTo(15, 21);
      ctx.lineTo(15, 9);
      ctx.moveTo(6, 9);
      ctx.lineTo(6, 3);
      ctx.lineTo(18, 3);
      ctx.lineTo(18, 9);

      
    } else {
      // User icon path de Lucide
      ctx.beginPath();
      ctx.arc(12, 8, 4, 0, Math.PI * 2);
      ctx.moveTo(20, 21);
      ctx.arc(12, 21, 8, 0, Math.PI, true);
    }
    ctx.stroke();
    ctx.restore();
  };

  const handleNodeClick = async (node: GraphNode) => {
    try {
      if (!node) return;

      if (node.type === 'organization' && node.org?.id) {
        const response = await fetch(`/api/organizacion/${node.org.id}`);
        if (!response.ok) throw new Error('Error al cargar detalles de la organización');
        const orgData = await response.json();
        
        setSelectedNode({
          ...node,
          org: orgData
        });
      } else if (node.type === 'imputado' && node.imputado?.id) {
        const response = await fetch(`/api/imputado/${node.imputado.id}`);
        if (!response.ok) throw new Error('Error al cargar detalles del imputado');
        const imputadoData = await response.json();

        setSelectedNode({
          ...node,
          imputado: imputadoData,
          organizaciones: imputadoData.organizaciones || []
        });
      }
    } catch (error) {
      console.error('Error loading node details:', error);
      setError('Error al cargar los detalles. Por favor, intente nuevamente.');
    }
  };

  const processGraphData = (data: Organization[], searchTerm: string): GraphData => {
    const nodes: GraphNode[] = [];
    const links: GraphLink[] = [];
    
    data.filter(org => {
      const matchesSearch = !searchTerm || 
        org.nombre.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTipo = filters.tipoOrganizacion === 'all' || 
        org.tipoOrganizacionId.toString() === filters.tipoOrganizacion;
      const matchesActive = !filters.showActiveOnly || org.activa;
      
      return matchesSearch && matchesTipo && matchesActive;
    })
    .forEach(org => {
      nodes.push({
        id: `org-${org.id}`,
        name: org.nombre,
        val: visualConfig.nodeSize * 2,
        type: 'organization',
        color: org.activa ? '#1E88E5' : '#0D47A1',
        org
      });

      org.miembros?.forEach(member => {
        if (!member.imputado) return;

        const imputadoNodeId = `imp-${member.imputadoId}`;
        
        if (!nodes.find(n => n.id === imputadoNodeId)) {
          nodes.push({
            id: imputadoNodeId,
            name: member.imputado.nombreSujeto,
            val: visualConfig.nodeSize,
            type: 'imputado',
            color: member.activo ? '#FB8C00' : '#EF6C00',
            imputado: member.imputado,
            organizaciones: []
          });
        }

        links.push({
          source: `org-${org.id}`,
          target: imputadoNodeId,
          value: visualConfig.linkDistance,
          rol: member.rol || 'Sin rol'
        });
      });
    });

    return { nodes, links };
  };

  const handleSearch = async (searchTerm: string) => {
    try {
      setLoading(true);
      setError(null);

      const [orgResponse, tiposResponse] = await Promise.all([
        fetch('/api/organizacion'),
        fetch('/api/tipo-organizacion')
      ]);
      
      if (!orgResponse.ok || !tiposResponse.ok) 
        throw new Error('Error al cargar datos');
      
      const orgData = await orgResponse.json();
      const tiposData = await tiposResponse.json();
      
      setTipos(tiposData);
      setRawData(orgData.data);
      
      const graphData = processGraphData(orgData.data, searchTerm);
      setGraphData(graphData);
    } catch (error) {
      console.error('Error:', error);
      setError('Error al cargar los datos. Por favor, intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch('');
  }, [filters.tipoOrganizacion, filters.showActiveOnly]);

  if (loading) {
    return (
      <Card className="p-4">
        <div className="flex items-center justify-center h-[600px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <span className="ml-2">Cargando grafo...</span>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <GraphControls
        onSearch={handleSearch}
        tipoOrganizacion={filters.tipoOrganizacion}
        onTipoChange={(value) => setFilters(prev => ({ ...prev, tipoOrganizacion: value }))}
        showActiveOnly={filters.showActiveOnly}
        onActiveChange={(value) => setFilters(prev => ({ ...prev, showActiveOnly: value }))}
        tipos={tipos}
        linkDistance={visualConfig.linkDistance}
        onLinkDistanceChange={(value) => {
          setVisualConfig(prev => ({ ...prev, linkDistance: value }));
        }}
        dagMode={visualConfig.dagMode}
        onDagModeChange={(value) => {
          setVisualConfig(prev => ({ ...prev, dagMode: value }));
        }}
        nodeSize={visualConfig.nodeSize}
        onNodeSizeChange={(value) => {
          setVisualConfig(prev => ({ ...prev, nodeSize: value }));
        }}
        className="mb-4"
      />

      <Card className="p-4">
        <ForceGraph2D
          ref={forceRef}
          graphData={graphData}
          width={dimensions.width}
          height={dimensions.height}
          nodeLabel="name"
          nodeColor={node => (node as GraphNode).color}
          nodeVal={node => (node as GraphNode).val}
          linkLabel={link => (link as GraphLink).rol}
          linkDistance={visualConfig.linkDistance}
          dagMode={visualConfig.dagMode}
          dagLevelDistance={50}
          nodeCanvasObjectMode={() => 'after'}
          nodeCanvasObject={(node, ctx, globalScale) => {
            const typedNode = node as GraphNode;
            const label = typedNode.name;
            const fontSize = 12/globalScale;
            const size = typedNode.val;
            
            ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
            ctx.shadowBlur = 5;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;

            drawShape(ctx, typedNode, size);

            ctx.shadowColor = 'none';
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;

            ctx.font = `${fontSize}px Sans-Serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            const textWidth = ctx.measureText(label).width;
            const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.4);
            
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.fillRect(
              typedNode.x! - bckgDimensions[0] / 2,
              typedNode.y! + size,
              bckgDimensions[0],
              bckgDimensions[1]
            );

            ctx.fillStyle = '#333';
            ctx.fillText(label, typedNode.x!, typedNode.y! + size + fontSize/2);
          }}
          onNodeClick={handleNodeClick}
          linkColor={() => 'rgba(100, 100, 100, 0.4)'}
          linkWidth={2}
          enableNodeDrag={true}
          enableZoomInteraction={true}
          minZoom={0.5}
          maxZoom={5}
          cooldownTime={2000}
          d3VelocityDecay={0.3}
        />
      </Card>

      <DetailPanel 
        node={selectedNode} 
        onClose={() => setSelectedNode(null)}
      />
    </div>
  );
};

export default OrganizationNetworkGraph;