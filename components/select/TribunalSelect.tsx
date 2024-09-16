import React, { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface Tribunal {
  id: number;
  nombre: string;
}

interface TribunalSelectProps {
  selectedId?: number;
  onValueChange?: (value: string) => void;
  className?: string;
}

export default function TribunalSelect({
  selectedId,
  onValueChange,
  className = 'w-[180px]'
}: TribunalSelectProps) {
  const [Tribunals, setTribunals] = useState<Tribunal[]>([]);
  const [selectedTribunal, setSelectedTribunal] = useState<string>(
    selectedId ? selectedId.toString() : ''
  );

  useEffect(() => {
    const fetchTribunals = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/tribunal');
        const data = await response.json();
        setTribunals(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error('Error fetching Tribunals:', error);
      }
    };

    fetchTribunals();
  }, []);

  useEffect(() => {
    if (selectedId) {
      setSelectedTribunal(selectedId.toString());
    }
  }, [selectedId]);

  const handleValueChange = (value: string) => {
    setSelectedTribunal(value);
    if (onValueChange) {
      onValueChange(value);
    }
  };

  return (
    <Select onValueChange={handleValueChange} value={selectedTribunal}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Selecciona un Tribunal" />
      </SelectTrigger>
      <SelectContent>
        {Tribunals.map((Tribunal) => (
          <SelectItem key={Tribunal.id} value={Tribunal.id.toString()}>
            {Tribunal.nombre}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
