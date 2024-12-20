import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import ForceGraph3D from 'react-force-graph-3d';
import { GraphControls } from './controls/GraphControls';
import { DetailPanel } from './detail/DetailPanel';
import * as THREE from 'three';

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
  z?: number;
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

const OrganizationNetworkGraph: React.FC = () => {
  const forceRef = useRef<any>();
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });
  const [rawData, setRawData] = useState<Organization[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [tipos, setTipos] = useState<any[]>([]);

  const [filters, setFilters] = useState({
    tipoOrganizacion: 'all',
    showActiveOnly: false
  });

  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth - 50 : 800,
    height: typeof window !== 'undefined' ? window.innerHeight - 200 : 600
  });

  // Estado visualConfig corregido con setter
  const [visualConfig, setVisualConfig] = useState({
    linkDistance: 250,
    nodeSize: 20,
    charge: -150
  });

  // Generar colores únicos usando HSL
  const generateUniqueColor = (index: number) => {
    const hue = (index * 137.508) % 360;
    return `hsl(${hue}, 70%, 50%)`;
  };

  // Crear objeto 3D para los nodos
  const createNodeObject = (node: GraphNode) => {
    if (node.type === 'organization') {
      // Cubo para organizaciones
      const geometry = new THREE.BoxGeometry(2, 2, 2);
      const group = new THREE.Group();
      
      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color(node.color),
        shininess: 100,
        specular: new THREE.Color(0x444444)
      });
      const mesh = new THREE.Mesh(geometry, material);
      
      // Agregar bordes al cubo
      const edges = new THREE.EdgesGeometry(geometry);
      const line = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({ 
          color: 0xffffff, 
          transparent: true, 
          opacity: 0.3 
        })
      );
      
      group.add(mesh);
      group.add(line);
      return group;
    } else {
      // Esfera para imputados
      const geometry = new THREE.SphereGeometry(1, 32, 32);
      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color(node.color),
        shininess: 100,
        specular: new THREE.Color(0x444444),
        transparent: true,
        opacity: 0.9
      });
      return new THREE.Mesh(geometry, material);
    }
  };

  const handleNodeClick = async (node: GraphNode) => {
    try {
      if (!node) return;

      if (node.type === 'organization' && node.org?.id) {
        const response = await fetch(`/api/organizacion/${node.org.id}`);
        if (!response.ok) throw new Error('Error al cargar detalles de la organización');
        const orgData = await response.json();
        setSelectedNode({ ...node, org: orgData });
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
    let colorIndex = 0;
    
    data.filter(org => {
      const matchesSearch = !searchTerm || 
        org.nombre.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTipo = filters.tipoOrganizacion === 'all' || 
        org.tipoOrganizacionId.toString() === filters.tipoOrganizacion;
      const matchesActive = !filters.showActiveOnly || org.activa;
      
      return matchesSearch && matchesTipo && matchesActive;
    })
    .forEach(org => {
      const orgColor = generateUniqueColor(colorIndex);
      colorIndex++;

      nodes.push({
        id: `org-${org.id}`,
        name: org.nombre,
        val: visualConfig.nodeSize * 1.5,
        type: 'organization',
        color: orgColor,
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
            color: orgColor,
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
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth - 50,
        height: window.innerHeight - 200
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (forceRef.current && graphData.nodes.length > 0) {
      setTimeout(() => {
        forceRef.current.zoomToFit(1000, 50);
      }, 500);
    }
  }, [graphData]);

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
        nodeSize={visualConfig.nodeSize}
        onNodeSizeChange={(value) => {
          setVisualConfig(prev => ({ ...prev, nodeSize: value }));
        }}
        className="mb-4"
      />

      <Card className="p-4">
        <ForceGraph3D
          ref={forceRef}
          graphData={graphData}
          width={dimensions.width}
          height={dimensions.height}
          backgroundColor="#1a1a1a"
          nodeLabel="name"
          nodeVal={(node) => (node as GraphNode).val}
          linkLabel={(link) => (link as GraphLink).rol}
          linkColor={() => "#ffffff"}
          linkOpacity={0.2}
          linkWidth={1}
          nodeThreeObject={(node) => createNodeObject(node as GraphNode)}
          nodeThreeObjectExtend={false}
          showNavInfo={false}
          enableNodeDrag={true}
          enableNavigationControls={true}
          controlType="orbit"
          onNodeClick={handleNodeClick}
          d3AlphaDecay={0.02}
          d3VelocityDecay={0.3}
          linkDistance={visualConfig.linkDistance}
          d3Force={'charge'}
          d3ForceStrength={visualConfig.charge}
          warmupTicks={100}
          cooldownTime={5000}
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