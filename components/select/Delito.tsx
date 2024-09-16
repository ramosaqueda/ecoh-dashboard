import React, { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface Delito {
  id: number;
  nombre: string;
}

interface DelitoSelectProps {
  selectedId?: number;
  onValueChange?: (value: string) => void;
  className?: string;
}

export default function DelitoSelect({
  selectedId,
  onValueChange,
  className = 'w-[180px]'
}: DelitoSelectProps) {
  const [Delitos, setDelitos] = useState<Delito[]>([]);
  const [selectedDelito, setSelectedDelito] = useState<string>(
    selectedId ? selectedId.toString() : ''
  );

  useEffect(() => {
    const fetchDelitos = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/delito');
        const data = await response.json();
        setDelitos(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error('Error fetching Delitos:', error);
      }
    };

    fetchDelitos();
  }, []);

  useEffect(() => {
    if (selectedId) {
      setSelectedDelito(selectedId.toString());
    }
  }, [selectedId]);

  const handleValueChange = (value: string) => {
    setSelectedDelito(value);
    if (onValueChange) {
      onValueChange(value);
    }
  };

  return (
    <Select onValueChange={handleValueChange} value={selectedDelito}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Selecciona un Delito" />
      </SelectTrigger>
      <SelectContent>
        {Delitos.map((Delito) => (
          <SelectItem key={Delito.id} value={Delito.id.toString()}>
            {Delito.nombre}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
