'use client';

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface Node {
  id: string;
  name: string;
  type: 'organizacion' | 'imputado' | 'tipoOrganizacion';
  group: number;
}

interface Link {
  source: string;
  target: string;
  type: string;
}

interface NetworkData {
  nodes: Node[];
  links: Link[];
}

interface NetworkGraphProps {
  data: {
    tiposOrganizacion: Array<{
      id: number;
      nombre: string;
      organizaciones: Array<{
        id: number;
        nombre: string;
        miembros: Array<{
          imputado: {
            id: number;
            nombre: string;
          };
          rol: string;
        }>;
      }>;
    }>;
  };
}

const NetworkGraph: React.FC<NetworkGraphProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data) return;

    // Preparar datos para D3
    const nodes: Node[] = [];
    const links: Link[] = [];

    // Agregar tipos de organización
    data.tiposOrganizacion.forEach((tipo) => {
      nodes.push({
        id: `tipo-${tipo.id}`,
        name: tipo.nombre,
        type: 'tipoOrganizacion',
        group: 1
      });

      // Agregar organizaciones y sus conexiones
      tipo.organizaciones.forEach((org) => {
        nodes.push({
          id: `org-${org.id}`,
          name: org.nombre,
          type: 'organizacion',
          group: 2
        });

        links.push({
          source: `tipo-${tipo.id}`,
          target: `org-${org.id}`,
          type: 'tipoOrganizacion'
        });

        // Agregar miembros y sus conexiones
        org.miembros.forEach((miembro) => {
          nodes.push({
            id: `imputado-${miembro.imputado.id}`,
            name: miembro.imputado.nombre,
            type: 'imputado',
            group: 3
          });

          links.push({
            source: `org-${org.id}`,
            target: `imputado-${miembro.imputado.id}`,
            type: miembro.rol || 'miembro'
          });
        });
      });
    });

    // Eliminar nodos duplicados
    const uniqueNodes = Array.from(
      new Map(nodes.map((node) => [node.id, node])).values()
    );

    // Configuración del gráfico
    const width = 1200;
    const height = 800;

    // Limpiar SVG existente
    d3.select(svgRef.current).selectAll('*').remove();

    // Crear SVG
    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g');

    // Zoom
    const zoom = d3
      .zoom()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        svg.attr('transform', event.transform);
      });

    d3.select(svgRef.current).call(zoom as any);

    // Crear simulación de fuerzas
    const simulation = d3
      .forceSimulation(uniqueNodes as any)
      .force(
        'link',
        d3
          .forceLink(links)
          .id((d: any) => d.id)
          .distance(100)
      )
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(50));

    // Definir colores por tipo
    const colorScale = d3
      .scaleOrdinal()
      .domain(['tipoOrganizacion', 'organizacion', 'imputado'])
      .range(['#4f46e5', '#10b981', '#f59e0b']);

    // Crear enlaces
    const link = svg
      .append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 2);

    // Crear nodos
    const node = svg
      .append('g')
      .selectAll('g')
      .data(uniqueNodes)
      .join('g')
      .call(
        d3
          .drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended) as any
      );

    // Agregar círculos a los nodos
    node
      .append('circle')
      .attr('r', 20)
      .attr('fill', (d: any) => colorScale(d.type));

    // Agregar etiquetas a los nodos
    node
      .append('text')
      .text((d: any) => d.name)
      .attr('x', 25)
      .attr('y', 5)
      .style('font-size', '12px')
      .style('fill', '#374151');

    // Funciones de arrastre
    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    // Actualizar posiciones
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });

    return () => {
      simulation.stop();
    };
  }, [data]);

  return (
    <div className="relative h-screen w-full bg-white">
      <svg ref={svgRef} className="h-full w-full" />
      <div className="absolute right-4 top-4 rounded-lg bg-white p-4 shadow">
        <h3 className="mb-2 font-bold">Leyenda</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <div className="mr-2 h-4 w-4 rounded-full bg-[#4f46e5]" />
            <span>Tipo de Organización</span>
          </div>
          <div className="flex items-center">
            <div className="mr-2 h-4 w-4 rounded-full bg-[#10b981]" />
            <span>Organización</span>
          </div>
          <div className="flex items-center">
            <div className="mr-2 h-4 w-4 rounded-full bg-[#f59e0b]" />
            <span>Imputado</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkGraph;
