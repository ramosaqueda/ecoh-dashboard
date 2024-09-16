import React, { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface Abogado {
  id: number;
  nombre: string;
}

interface AbogadoSelectProps {
  selectedId?: number;
  onValueChange?: (value: string) => void;
  className?: string;
}

export default function AbogadoSelect({
  selectedId,
  onValueChange,
  className = 'w-[180px]'
}: AbogadoSelectProps) {
  const [Abogados, setAbogados] = useState<Abogado[]>([]);
  const [selectedAbogado, setSelectedAbogado] = useState<string>(
    selectedId ? selectedId.toString() : ''
  );

  useEffect(() => {
    const fetchAbogados = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/abogado');
        const data = await response.json();
        setAbogados(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error('Error fetching Abogados:', error);
      }
    };

    fetchAbogados();
  }, []);

  useEffect(() => {
    if (selectedId) {
      setSelectedAbogado(selectedId.toString());
    }
  }, [selectedId]);

  const handleValueChange = (value: string) => {
    setSelectedAbogado(value);
    if (onValueChange) {
      onValueChange(value);
    }
  };

  return (
    <Select onValueChange={handleValueChange} value={selectedAbogado}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Selecciona un Abogado" />
      </SelectTrigger>
      <SelectContent>
        {Abogados.map((Abogado) => (
          <SelectItem key={Abogado.id} value={Abogado.id.toString()}>
            {Abogado.nombre}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
