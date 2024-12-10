'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ForceGraph2D } from 'react-force-graph';
import { GraphControls } from './controls/GraphControls';
import { DetailPanel } from './detail/DetailPanel';

const OrganizationNetworkGraph = () => {
  const forceRef = useRef();
  
  // Estados base
  const [graphData, setGraphData] = useState<{ nodes: any[]; links: any[] }>({ nodes: [], links: [] });
  const [rawData, setRawData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [tipos, setTipos] = useState([]);

  // Estados para filtros
  const [filters, setFilters] = useState({
    tipoOrganizacion: 'all',
    showActiveOnly: false
  });

  // Estados para visualización
  const [visualConfig, setVisualConfig] = useState({
    linkDistance: 100,
    dagMode: 'none',
    nodeSize: 10
  });

  // Estado para dimensiones
  const [dimensions, setDimensions] = useState({
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

  // Efecto para reaccionar a cambios en la configuración visual
  useEffect(() => {
    if (rawData.length > 0) {
      const updatedGraphData = processGraphData(rawData, '');
      setGraphData(updatedGraphData);
      if (forceRef.current) {
        forceRef.current.d3ReheatSimulation();
      }
    }
  }, [visualConfig.nodeSize, visualConfig.linkDistance, visualConfig.dagMode]);

  const handleNodeClick = async (node: any) => {
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

  const processGraphData = (data: any[], searchTerm: string) => {
    const nodes: any[] = [];
    const links: any[] = [];
    
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
        color: org.activa ? '#4CAF50' : '#f44336',
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
            color: member.activo ? '#2196F3' : '#9E9E9E',
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
          nodeColor={node => node.color}
          nodeVal={node => node.val}
          linkLabel={link => link.rol}
          linkDistance={visualConfig.linkDistance}
          dagMode={visualConfig.dagMode}
          dagLevelDistance={50}
          nodeCanvasObjectMode={() => 'after'}
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.name;
            const fontSize = 12/globalScale;
            const size = node.val;
            
            ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
            ctx.shadowBlur = 5;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;

            if (node.type === 'organization') {
              ctx.beginPath();
              ctx.arc(node.x, node.y, size/2, 0, 2 * Math.PI);
              ctx.fillStyle = node.color;
              ctx.fill();
              
              ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
              ctx.lineWidth = 2;
              ctx.stroke();
            } else {
              const rectSize = size * 0.8;
              ctx.fillStyle = node.color;
              ctx.fillRect(node.x - rectSize/2, node.y - rectSize/2, rectSize, rectSize);
              
              ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
              ctx.lineWidth = 2;
              ctx.strokeRect(node.x - rectSize/2, node.y - rectSize/2, rectSize, rectSize);
            }

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
              node.x - bckgDimensions[0] / 2,
              node.y + size,
              bckgDimensions[0],
              bckgDimensions[1]
            );

            ctx.fillStyle = '#333';
            ctx.fillText(label, node.x, node.y + size + fontSize/2);
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