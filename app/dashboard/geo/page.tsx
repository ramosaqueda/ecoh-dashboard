'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { StatsPanel } from '@/components/StatsPanel';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const LeafletMap = dynamic(() => import('@/components/LeafletMap'), {
  ssr: false,
  loading: () => <p>Cargando mapa...</p>
});

export default function MapPage() {
  const [selectedDelito, setSelectedDelito] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState('');

  const { data: causas = [], isLoading: isLoadingCausas } = useQuery({
    queryKey: ['causas'],
    queryFn: async () => {
      const { data } = await axios.get('/api/causas');
      return data;
    }
  });

  const { data: delitos = [], isLoading: isLoadingDelitos } = useQuery({
    queryKey: ['delitos'],
    queryFn: async () => {
      const { data } = await axios.get('/api/delitos');
      return data;
    }
  });

  const causasFiltradas = causas
    .filter((causa) =>
      selectedDelito === 'todos'
        ? true
        : causa.delitoId?.toString() === selectedDelito
    )
    .filter((causa) => {
      if (!searchTerm) return true;
      const searchLower = searchTerm.toLowerCase();
      return (
        causa.ruc?.toLowerCase().includes(searchLower) ||
        causa.denominacionCausa?.toLowerCase().includes(searchLower)
      );
    });

  if (isLoadingCausas || isLoadingDelitos) return <div>Cargando datos...</div>;

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold">Mapa de Causas</h1>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Panel de Estadísticas - ocupa 9 columnas */}
        <div className="lg:col-span-9">
          <StatsPanel
            causas={causasFiltradas}
            selectedDelito={selectedDelito}
          />
        </div>

        {/* Controles de filtro y búsqueda - ocupa 3 columnas */}
        <div className="space-y-4 lg:col-span-3">
          {/* Select de Delitos */}
          <div className="select-wrapper w-full">
            <Select value={selectedDelito} onValueChange={setSelectedDelito}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filtrar por delito" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Delitos</SelectLabel>
                  <SelectItem value="todos">Todos los delitos</SelectItem>
                  {delitos.map((delito) => (
                    <SelectItem key={delito.id} value={delito.id.toString()}>
                      {delito.nombre}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Campo de Búsqueda */}
          <div className="relative w-full">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por RUC o dirección..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8"
            />
          </div>

          {/* Contador de resultados */}
          <div className="text-sm text-muted-foreground">
            Mostrando {causasFiltradas.length} de {causas.length} causas
          </div>
        </div>
      </div>

      {/* Mapa - ahora tiene más espacio vertical */}
      <div className="h-[calc(100vh-300px)] min-h-[500px]">
        <LeafletMap causas={causasFiltradas} />
      </div>
    </div>
  );
}
