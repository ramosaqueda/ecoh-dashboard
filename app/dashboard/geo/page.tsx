'use client';

import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import dynamic from 'next/dynamic';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { StatsPanel } from '@/components/StatsPanel';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';


interface Causa {
  id: number;
  ruc: string;
  denominacionCausa?: string;
  fechaDelHecho: string;
  delitoId?: number;
  causaEcoh: boolean;  
}

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Mapa Delitos', link: '/dashboard/geo' }
];

// Carga dinámica del mapa para evitar problemas de SSR
const LeafletMap = dynamic(() => import('@/components/LeafletMap'), {
  ssr: false,
  loading: () => <p>Cargando mapa...</p>
});

export default function MapPage() {
  const [selectedDelito, setSelectedDelito] = useState<string>('todos');
  const [selectedYear, setSelectedYear] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [showEcohOnly, setShowEcohOnly] = useState(false);

  // Fetch de causas
  const { data: causas = [], isLoading: isLoadingCausas } = useQuery({
    queryKey: ['causas'],
    queryFn: async () => {
      const { data } = await axios.get('/api/causas');
      return data;
    }
  });

  // Fetch de delitos
  const { data: delitos = [], isLoading: isLoadingDelitos } = useQuery({
    queryKey: ['delitos'],
    queryFn: async () => {
      const { data } = await axios.get('/api/delito');
      return data;
    }
  });

  // Obtener años únicos de las causas
  const yearsAvailable = Array.from(
    new Set(
      causas.map((causa) => {
        const date = new Date(causa.fechaDelHecho);
        return date.getFullYear();
      })
    )
  ).sort((a, b) => b - a);

  // Filtrado de causas
  // Lógica de filtrado actualizada
    const causasFiltradas = causas
    .filter((causa: Causa) =>
      selectedDelito === 'todos'
        ? true
        : causa.delitoId?.toString() === selectedDelito
    )
    .filter((causa: Causa) => {
      if (selectedYear === 'todos') return true;
      const causaYear = new Date(causa.fechaDelHecho).getFullYear().toString();
      return causaYear === selectedYear;
    })
    .filter((causa: Causa) => {
      if (!searchTerm) return true;
      const searchLower = searchTerm.toLowerCase();
      return (
        causa.ruc?.toLowerCase().includes(searchLower) ||
        causa.denominacionCausa?.toLowerCase().includes(searchLower)
      );
    })
    .filter((causa: Causa) => {
      if (!showEcohOnly) return true;
      return causa.causaEcoh === true;  // Usando el nombre correcto de la propiedad
    });

    // Para debugging, puedes agregar temporalmente:
    useEffect(() => {
    if (showEcohOnly) {
      console.log('Causas ECOH encontradas:', causas.filter(c => c.causaEcoh).length);
      console.log('Primera causa ECOH:', causas.find(c => c.causaEcoh));
    }
    }, [showEcohOnly, causas]);

  if (isLoadingCausas || isLoadingDelitos) {
    return (
      <PageContainer>
        <div className="flex h-[50vh] items-center justify-center">
          <div className="text-lg">Cargando datos...</div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer scrollable={true}>
      <div className="flex h-full flex-col">
        <div className="border-b bg-background px-6 py-4">
          <Breadcrumbs items={breadcrumbItems} />
          <h1 className="mt-4 text-2xl font-bold">Mapa de Causas</h1>
        </div>

        <div className="flex-1  px-6 py-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            <div className="lg:col-span-9">
              <StatsPanel
                causas={causasFiltradas}
                selectedDelito={selectedDelito}
              />
            </div>

            <div className="space-y-4 lg:col-span-2">
              {/* Switch de ECOH */}
              <div className="flex items-center justify-between space-x-2 rounded-lg border p-3 shadow-sm">
                <Label htmlFor="ecoh-mode" className="font-medium">
                  Solo causas ECOH
                </Label>
                <Switch
                  id="ecoh-mode"
                  checked={showEcohOnly}
                  onCheckedChange={setShowEcohOnly}
                />
              </div>

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

              {/* Select de Años */}
              <div className="select-wrapper w-full">
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filtrar por año" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Año</SelectLabel>
                      <SelectItem value="todos">Todos los años</SelectItem>
                      {yearsAvailable.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
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
                {showEcohOnly && ' (Solo ECOH)'}
              </div>
            </div>
          </div>

          {/* Mapa */}

          <div 
            key="leaflet-map-container" 
            className="h-[calc(100vh-400px)] min-h-[600px] w-full rounded-lg border"
          >


            <LeafletMap causas={causasFiltradas} />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}