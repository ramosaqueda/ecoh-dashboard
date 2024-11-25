'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Imputado {
  id: number;
  nombre: string;
  apellido: string;
  rut: string;
}

interface Miembro {
  id: number;
  organizacionId: number;
  imputadoId: number;
  rol: string | null;
  fechaIngreso: string;
  fechaSalida: string | null;
  activo: boolean;
  imputado: Imputado;
}

interface TipoOrganizacion {
  id: number;
  nombre: string;
}

interface OrganizacionDelictual {
  id: number;
  nombre: string;
  descripcion: string | null;
  fechaIdentificacion: string;
  activa: boolean;
  tipoOrganizacionId: number;
  tipoOrganizacion: TipoOrganizacion;
  miembros: Miembro[];
}

interface Node extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  type: 'organizacion' | 'imputado' | 'tipoOrganizacion';
  data: any;
  group: number;
  activo?: boolean;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: any;
  target: any;
  type: string;
  activo?: boolean;
}

interface FilterState {
  tipoOrganizacion: string | null;
  showInactive: boolean;
  showFormerMembers: boolean;
}

const OrganizationNetworkGraph = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    tipoOrganizacion: null,
    showInactive: false,
    showFormerMembers: false
  });
  const [organizaciones, setOrganizaciones] = useState<OrganizacionDelictual[]>(
    []
  );
  const [tiposOrganizacion, setTiposOrganizacion] = useState<
    TipoOrganizacion[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/organizacion');
        if (!response.ok) throw new Error('Error al cargar los datos');

        const data: OrganizacionDelictual[] = await response.json();
        setOrganizaciones(data);

        const tipos = Array.from(
          new Set(data.map((org) => org.tipoOrganizacion))
        ).sort((a, b) => a.nombre.localeCompare(b.nombre));
        setTiposOrganizacion(tipos);

        setLoading(false);
      } catch (error) {
        setError('Error al cargar los datos');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (organizaciones.length > 0) {
      createGraph(filterData(organizaciones));
    }
  }, [organizaciones, filters]);

  const filterData = (
    data: OrganizacionDelictual[]
  ): OrganizacionDelictual[] => {
    return data
      .filter((org) => {
        const matchesTipo =
          !filters.tipoOrganizacion ||
          org.tipoOrganizacionId.toString() === filters.tipoOrganizacion;
        const matchesActive = filters.showInactive || org.activa;

        const filteredMiembros = org.miembros.filter(
          (miembro) => filters.showFormerMembers || miembro.activo
        );

        return (
          matchesTipo &&
          matchesActive &&
          (filteredMiembros.length > 0 || filters.showInactive)
        );
      })
      .map((org) => ({
        ...org,
        miembros: filters.showFormerMembers
          ? org.miembros
          : org.miembros.filter((m) => m.activo)
      }));
  };

  const createGraph = (data: OrganizacionDelictual[]) => {
    if (!svgRef.current) return;

    // Preparar los datos
    const nodes: Node[] = [];
    const links: Link[] = [];

    // Crear nodos para tipos de organización únicos
    const tiposOrganizacion = new Map<number, TipoOrganizacion>();
    data.forEach((org) => {
      tiposOrganizacion.set(org.tipoOrganizacion.id, org.tipoOrganizacion);
    });

    tiposOrganizacion.forEach((tipo) => {
      nodes.push({
        id: `tipo-${tipo.id}`,
        name: tipo.nombre,
        type: 'tipoOrganizacion',
        data: tipo,
        group: 1
      });
    });

    // Agregar organizaciones y sus conexiones
    data.forEach((org) => {
      nodes.push({
        id: `org-${org.id}`,
        name: org.nombre,
        type: 'organizacion',
        data: org,
        group: 2,
        activo: org.activa
      });

      links.push({
        source: `tipo-${org.tipoOrganizacionId}`,
        target: `org-${org.id}`,
        type: 'tipoOrganizacion',
        activo: org.activa
      });

      // Agregar miembros y sus conexiones
      org.miembros.forEach((miembro) => {
        nodes.push({
          id: `imputado-${miembro.imputado.id}`,
          name: `${miembro.imputado.nombre} ${miembro.imputado.apellido}`,
          type: 'imputado',
          data: { ...miembro.imputado, miembro },
          group: 3,
          activo: miembro.activo
        });

        links.push({
          source: `org-${org.id}`,
          target: `imputado-${miembro.imputado.id}`,
          type: miembro.rol || 'miembro',
          activo: miembro.activo
        });
      });
    });

    // Eliminar nodos duplicados
    const uniqueNodes = Array.from(
      new Map(nodes.map((node) => [node.id, node])).values()
    );

    // Limpiar SVG existente
    d3.select(svgRef.current).selectAll('*').remove();

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    // Crear SVG
    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g');

    // Agregar zoom
    const zoom = d3
      .zoom()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        svg.attr('transform', event.transform);
      });

    d3.select(svgRef.current).call(zoom as any);

    // Definir marcador de flecha
    svg
      .append('defs')
      .append('marker')
      .attr('id', 'arrow')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 30)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#999');

    // Crear escala de colores
    const colorScale = d3
      .scaleOrdinal<string>()
      .domain(['tipoOrganizacion', 'organizacion', 'imputado'])
      .range(['#4f46e5', '#10b981', '#f59e0b']);

    // Crear simulación
    const simulation = d3
      .forceSimulation(uniqueNodes)
      .force(
        'link',
        d3
          .forceLink(links)
          .id((d: any) => d.id)
          .distance(150)
      )
      .force('charge', d3.forceManyBody().strength(-1000))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(80));

    // Crear enlaces
    const link = svg
      .append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', '#999')
      .attr('stroke-opacity', (d: any) => (d.activo ? 0.6 : 0.2))
      .attr('stroke-width', 1.5)
      .attr('stroke-dasharray', (d: any) => (d.activo ? null : '5,5'))
      .attr('marker-end', 'url(#arrow)');

    // Crear grupos de nodos
    const node = svg
      .append('g')
      .selectAll('g')
      .data(uniqueNodes)
      .join('g')
      .on('click', (event, d: any) => {
        setSelectedNode(d);
        event.stopPropagation();
      })
      .call(
        d3
          .drag<any, any>()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended) as any
      );

    // Agregar círculos a los nodos
    node
      .append('circle')
      .attr('r', (d: any) => (d.type === 'organizacion' ? 30 : 20))
      .attr('fill', (d: any) => colorScale(d.type))
      .attr('opacity', (d: any) => (d.activo !== false ? 1 : 0.5))
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);

    // Agregar etiquetas
    node
      .append('text')
      .text((d: any) => d.name)
      .attr('x', (d: any) => (d.type === 'organizacion' ? 35 : 25))
      .attr('y', 5)
      .attr('text-anchor', 'start')
      .attr('fill', '#374151')
      .attr('font-weight', (d: any) =>
        d.type === 'organizacion' ? 'bold' : 'normal'
      )
      .each(function (this: SVGTextElement, d: any) {
        const bbox = this.getBBox();
        const padding = 2;

        d3.select(this.parentNode)
          .insert('rect', 'text')
          .attr('x', bbox.x - padding)
          .attr('y', bbox.y - padding)
          .attr('width', bbox.width + padding * 2)
          .attr('height', bbox.height + padding * 2)
          .attr('fill', 'white')
          .attr('fill-opacity', 0.8);
      });

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

    // Limpiar selección al hacer clic en el fondo
    d3.select(svgRef.current).on('click', () => {
      setSelectedNode(null);
    });
  };

  const renderDetailsPanel = (node: Node) => {
    switch (node.type) {
      case 'organizacion':
        return (
          <div className="space-y-2">
            <p>
              <strong>Nombre:</strong> {node.data.nombre}
            </p>
            <p>
              <strong>Descripción:</strong> {node.data.descripcion || 'N/A'}
            </p>
            <p>
              <strong>Fecha Identificación:</strong>{' '}
              {format(new Date(node.data.fechaIdentificacion), 'dd/MM/yyyy', {
                locale: es
              })}
            </p>
            <p>
              <strong>Estado:</strong>{' '}
              {node.data.activa ? 'Activa' : 'Inactiva'}
            </p>
            <div className="mt-4">
              <h4 className="mb-2 font-semibold">
                Miembros ({node.data.miembros.length})
              </h4>
              <div className="max-h-48 overflow-y-auto">
                {node.data.miembros.map((miembro: Miembro) => (
                  <div key={miembro.id} className="border-b py-2">
                    <p className="font-medium">
                      {miembro.imputado.nombre} {miembro.imputado.apellido}
                    </p>
                    <p className="text-sm text-gray-600">
                      Rol: {miembro.rol || 'No especificado'}
                    </p>
                    <p className="text-sm text-gray-600">
                      Ingreso:{' '}
                      {format(new Date(miembro.fechaIngreso), 'dd/MM/yyyy', {
                        locale: es
                      })}
                    </p>
                    {miembro.fechaSalida && (
                      <p className="text-sm text-gray-600">
                        Salida:{' '}
                        {format(new Date(miembro.fechaSalida), 'dd/MM/yyyy', {
                          locale: es
                        })}
                      </p>
                    )}
                    <p className="text-sm text-gray-600">
                      Estado: {miembro.activo ? 'Activo' : 'Inactivo'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'imputado':
        return (
          <div className="space-y-2">
            <p>
              <strong>Nombre:</strong> {node.data.nombre} {node.data.apellido}
            </p>
            <p>
              <strong>RUT:</strong> {node.data.rut}
            </p>
            {node.data.miembro && (
              <>
                <p>
                  <strong>Rol:</strong>{' '}
                  {node.data.miembro.rol || 'No especificado'}
                </p>
                <p>
                  <strong>Fecha de Ingreso:</strong>{' '}
                  {format(
                    new Date(node.data.miembro.fechaIngreso),
                    'dd/MM/yyyy',
                    { locale: es }
                  )}
                </p>
                {node.data.miembro.fechaSalida && (
                  <p>
                    <strong>Fecha de Salida:</strong>{' '}
                    {format(
                      new Date(node.data.miembro.fechaSalida),
                      'dd/MM/yyyy',
                      { locale: es }
                    )}
                  </p>
                )}
                <p>
                  <strong>Estado:</strong>{' '}
                  {node.data.miembro.activo ? 'Activo' : 'Inactivo'}
                </p>
              </>
            )}
          </div>
        );
      case 'tipoOrganizacion':
        return (
          <div className="space-y-2">
            <p>
              <strong>Tipo:</strong> {node.data.nombre}
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="space-y-4">
      {/* Panel de Filtros */}
      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="min-w-[200px] flex-1">
            <Label>Tipo de Organización</Label>
            <Select
              value={filters.tipoOrganizacion || 'all'} // Cambiamos '' por 'all'
              onValueChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  tipoOrganizacion: value === 'all' ? null : value
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Todos los tipos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los tipos</SelectItem>{' '}
                {/* Cambiamos '' por 'all' */}
                {tiposOrganizacion.map((tipo) => (
                  <SelectItem key={tipo.id} value={tipo.id.toString()}>
                    {tipo.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              checked={filters.showInactive}
              onCheckedChange={(checked) =>
                setFilters((prev) => ({ ...prev, showInactive: checked }))
              }
            />
            <Label>Mostrar Inactivas</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              checked={filters.showFormerMembers}
              onCheckedChange={(checked) =>
                setFilters((prev) => ({ ...prev, showFormerMembers: checked }))
              }
            />
            <Label>Mostrar Ex-Miembros</Label>
          </div>

          <Button
            variant="outline"
            onClick={() =>
              setFilters({
                tipoOrganizacion: null,
                showInactive: false,
                showFormerMembers: false
              })
            }
          >
            Limpiar Filtros
          </Button>
        </div>
      </Card>

      {/* Gráfico y paneles */}
      <div className="relative h-[800px] w-full">
        <svg
          ref={svgRef}
          className="h-full w-full rounded-lg bg-white shadow"
        />

        {/* Leyenda */}
        <Card className="absolute right-4 top-4 p-4">
          <h3 className="mb-2 font-semibold">Leyenda</h3>
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
            <div className="mt-2 border-t pt-2">
              <div className="flex items-center">
                <div className="mr-2 h-4 w-4 rounded-full bg-gray-400 opacity-50" />
                <span>Inactivo</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Panel de detalles */}
        {selectedNode && (
          <Card className="absolute bottom-4 right-4 max-w-md p-4">
            <div className="mb-2 flex items-start justify-between">
              <h3 className="font-semibold">Detalles</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedNode(null)}
              >
                ✕
              </Button>
            </div>
            {renderDetailsPanel(selectedNode)}
          </Card>
        )}
      </div>
    </div>
  );
};

export default OrganizationNetworkGraph;
