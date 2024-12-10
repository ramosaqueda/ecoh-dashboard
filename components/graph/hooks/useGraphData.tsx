// components/graph/hooks/useGraphData.tsx
import { useState, useEffect } from 'react';
import { GraphData, GraphFilters, Organization } from '../types/graph.types';

export const useGraphData = (filters: GraphFilters) => {
  const [rawData, setRawData] = useState<{ organizations: Organization[], tipos: any[] }>({
    organizations: [],
    tipos: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });

  // Cargar datos iniciales
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [orgResponse, tiposResponse] = await Promise.all([
          fetch('/api/organizacion'),
          fetch('/api/tipo-organizacion')
        ]);

        if (!orgResponse.ok || !tiposResponse.ok) {
          throw new Error('Error al cargar datos');
        }

        const orgData = await orgResponse.json();
        const tiposData = await tiposResponse.json();

        setRawData({
          organizations: orgData.data,
          tipos: tiposData
        });
      } catch (error) {
        console.error('Error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Procesar datos según filtros
  useEffect(() => {
    const processGraphData = () => {
      const nodes = [];
      const links = [];
      
      rawData.organizations
        .filter(org => {
          const matchesSearch = filters.searchTerm === '' || 
            org.nombre.toLowerCase().includes(filters.searchTerm.toLowerCase());
          const matchesTipo = filters.tipoOrganizacion === 'all' || 
            org.tipoOrganizacionId.toString() === filters.tipoOrganizacion;
          const matchesActive = !filters.showActiveOnly || org.activa;
          
          return matchesSearch && matchesTipo && matchesActive;
        })
        .forEach(org => {
          // Añadir nodo de organización
          nodes.push({
            id: `org-${org.id}`,
            name: org.nombre,
            val: 20,
            type: 'organization',
            color: org.activa ? '#4CAF50' : '#f44336',
            org
          });

          // Procesar miembros
          org.miembros?.forEach(member => {
            const imputadoNodeId = `imp-${member.imputadoId}`;
            
            if (!nodes.find(n => n.id === imputadoNodeId)) {
              nodes.push({
                id: imputadoNodeId,
                name: member.imputado.nombreSujeto,
                val: 10,
                type: 'imputado',
                color: member.activo ? '#2196F3' : '#9E9E9E',
                imputado: member.imputado
              });
            }

            links.push({
              source: `org-${org.id}`,
              target: imputadoNodeId,
              value: 1,
              rol: member.rol
            });
          });
        });

      setGraphData({ nodes, links });
    };

    processGraphData();
  }, [rawData, filters]);

  return { graphData, loading, error, tipos: rawData.tipos };
};