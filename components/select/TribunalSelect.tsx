import React, { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { useSelectData } from '@/hooks/useSelectData';

interface Tribunal {
  id: number;
  nombre: string;
}

interface TribunalSelectProps {
  selectedId?: number;
  onValueChange?: (value: string) => void;
  className?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}

export default function TribunalSelect({
  selectedId,
  onValueChange,
  className = 'w-full',
  error,
  disabled = false,
  required = false
}: TribunalSelectProps) {
  // Usando el hook personalizado
  const {
    data: tribunales,
    isLoading,
    error: fetchError,
    refetch
  } = useSelectData<Tribunal>({
    endpoint: 'tribunal',
    errorMessage: 'Error al cargar tribunales'
  });

  const [selected, setSelected] = useState<string>(
    selectedId ? selectedId.toString() : ''
  );

  useEffect(() => {
    if (selectedId) {
      setSelected(selectedId.toString());
    }
  }, [selectedId]);

  const handleValueChange = (value: string) => {
    setSelected(value);
    onValueChange?.(value);
  };

  // Si hay un error, mostrar un botón para reintentar
  const handleRetry = () => {
    refetch();
  };

  return (
    <div className="relative">
      <Select
        value={selected}
        onValueChange={handleValueChange}
        disabled={disabled || isLoading}
      >
        <SelectTrigger
          className={`
            ${className} 
            ${error || fetchError ? 'border-red-500' : ''} 
            ${isLoading ? 'opacity-50' : ''}
          `}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Cargando...</span>
            </div>
          ) : (
            <SelectValue
              placeholder={`${required ? '* ' : ''}Selecciona un tribunal`}
            />
          )}
        </SelectTrigger>
        <SelectContent>
          {isLoading ? (
            <div className="flex items-center justify-center p-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="ml-2">Cargando tribunales...</span>
            </div>
          ) : fetchError ? (
            <div className="flex flex-col items-center p-2">
              <span className="mb-2 text-sm text-red-500">{fetchError}</span>
              <button
                onClick={handleRetry}
                className="rounded-md bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
              >
                Reintentar
              </button>
            </div>
          ) : tribunales.length === 0 ? (
            <div className="p-2 text-sm text-muted-foreground">
              No hay tribunales disponibles
            </div>
          ) : (
            tribunales.map((tribunal) => (
              <SelectItem
                key={tribunal.id}
                value={tribunal.id.toString()}
                className="cursor-pointer hover:bg-gray-100"
              >
                {tribunal.nombre}
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
