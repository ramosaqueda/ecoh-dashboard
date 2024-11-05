import React, { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

interface Analista {
  id: number;
  nombre: string;
}

interface AnalistaSelectProps {
  selectedId?: number;
  onValueChange?: (value: string) => void;
  className?: string;
  error?: string;
  disabled?: boolean;
}

export default function AnalistaSelect({
  selectedId,
  onValueChange,
  className = 'w-full',
  error,
  disabled = false
}: AnalistaSelectProps) {
  const [analistas, setAnalistas] = useState<Analista[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [selectedAnalista, setSelectedAnalista] = useState<string>(
    selectedId ? selectedId.toString() : ''
  );

  useEffect(() => {
    const fetchAnalistas = async () => {
      setIsLoading(true);
      setFetchError(null);
      try {
        const response = await fetch('http://localhost:3000/api/analista');
        if (!response.ok) {
          throw new Error('Error al cargar los analistas');
        }
        const data = await response.json();
        setAnalistas(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error('Error fetching analistas:', error);
        setFetchError(
          error instanceof Error
            ? error.message
            : 'Error al cargar los analistas'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalistas();
  }, []);

  useEffect(() => {
    if (selectedId) {
      setSelectedAnalista(selectedId.toString());
    }
  }, [selectedId]);

  const handleValueChange = (value: string) => {
    setSelectedAnalista(value);
    if (onValueChange) {
      onValueChange(value);
    }
  };

  return (
    <div className="relative">
      <Select
        onValueChange={handleValueChange}
        value={selectedAnalista}
        disabled={disabled || isLoading}
      >
        <SelectTrigger
          className={`${className} ${error ? 'border-red-500' : ''} ${
            isLoading ? 'opacity-50' : ''
          }`}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Cargando...</span>
            </div>
          ) : (
            <SelectValue placeholder="Selecciona un analista" />
          )}
        </SelectTrigger>
        <SelectContent>
          {isLoading ? (
            <div className="flex items-center justify-center p-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="ml-2">Cargando analistas...</span>
            </div>
          ) : fetchError ? (
            <div className="p-2 text-sm text-red-500">{fetchError}</div>
          ) : analistas.length === 0 ? (
            <div className="p-2 text-sm text-muted-foreground">
              No hay analistas disponibles
            </div>
          ) : (
            analistas.map((analista) => (
              <SelectItem key={analista.id} value={analista.id.toString()}>
                {analista.nombre}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
      {error && (
        <span className="mt-1 block text-sm text-red-500">{error}</span>
      )}
    </div>
  );
}
