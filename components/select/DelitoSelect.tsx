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

interface Delito {
  id: number;
  nombre: string;
}

interface DelitoSelectProps {
  value?: string | number;
  onValueChange?: (value: string) => void;
  className?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}

export default function DelitoSelect({
  value,
  onValueChange,
  className = 'w-full',
  error,
  disabled = false,
  required = false
}: DelitoSelectProps) {
  const {
    data: delitos,
    isLoading,
    error: fetchError,
    refetch
  } = useSelectData<Delito>({
    endpoint: 'delito',
    errorMessage: 'Error al cargar delitos'
  });

  // Convertir el valor a string si existe
  const selectedValue = value ? String(value) : undefined;

  const handleValueChange = (newValue: string) => {
    onValueChange?.(newValue);
  };

  return (
    <div className="relative">
      <Select
        value={selectedValue}
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
              placeholder={`${required ? '* ' : ''}Selecciona un delito`}
            />
          )}
        </SelectTrigger>
        <SelectContent>
          {isLoading ? (
            <div className="flex items-center justify-center p-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="ml-2">Cargando delitos...</span>
            </div>
          ) : fetchError ? (
            <div className="flex flex-col items-center p-2">
              <span className="mb-2 text-sm text-red-500">{fetchError}</span>
              <button
                onClick={refetch}
                className="rounded-md bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
              >
                Reintentar
              </button>
            </div>
          ) : delitos.length === 0 ? (
            <div className="p-2 text-sm text-muted-foreground">
              No hay delitos disponibles
            </div>
          ) : (
            delitos.map((delito) => (
              <SelectItem
                key={delito.id}
                value={delito.id.toString()}
                className="cursor-pointer hover:bg-gray-100"
              >
                {delito.nombre}
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
