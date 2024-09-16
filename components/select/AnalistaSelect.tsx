import React, { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface Analista {
  id: number;
  nombre: string;
}

interface AnalistaSelectProps {
  selectedId?: number;
  onValueChange?: (value: string) => void;
  className?: string;
}

export default function AnalistaSelect({
  selectedId,
  onValueChange,
  className = 'w-[180px]'
}: AnalistaSelectProps) {
  const [analistas, setAnalistas] = useState<Analista[]>([]);
  const [selectedAnalista, setSelectedAnalista] = useState<string>(
    selectedId ? selectedId.toString() : ''
  );

  useEffect(() => {
    const fetchAnalistas = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/analista');
        const data = await response.json();
        setAnalistas(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error('Error fetching analistas:', error);
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
    <Select onValueChange={handleValueChange} value={selectedAnalista}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Selecciona un analista" />
      </SelectTrigger>
      <SelectContent>
        {analistas.map((analista) => (
          <SelectItem key={analista.id} value={analista.id.toString()}>
            {analista.nombre}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
