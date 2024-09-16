import React, { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface Foco {
  id: number;
  nombre: string;
}

interface FocoSelectProps {
  selectedId?: number;
  onValueChange?: (value: string) => void;
  className?: string;
}

export default function FocoSelect({
  selectedId,
  onValueChange,
  className = 'w-[180px]'
}: FocoSelectProps) {
  const [Focos, setFocos] = useState<Foco[]>([]);
  const [selectedFoco, setSelectedFoco] = useState<string>(
    selectedId ? selectedId.toString() : ''
  );

  useEffect(() => {
    const fetchFocos = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/foco');
        const data = await response.json();
        setFocos(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error('Error fetching Focos:', error);
      }
    };

    fetchFocos();
  }, []);

  useEffect(() => {
    if (selectedId) {
      setSelectedFoco(selectedId.toString());
    }
  }, [selectedId]);

  const handleValueChange = (value: string) => {
    setSelectedFoco(value);
    if (onValueChange) {
      onValueChange(value);
    }
  };

  return (
    <Select onValueChange={handleValueChange} value={selectedFoco}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Selecciona un Foco" />
      </SelectTrigger>
      <SelectContent>
        {Focos.map((Foco) => (
          <SelectItem key={Foco.id} value={Foco.id.toString()}>
            {Foco.nombre}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
