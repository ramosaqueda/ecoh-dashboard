import React, { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface Nacionalidad {
  id: number;
  nombre: string;
}

interface NacionalidadSelectProps {
  selectedId?: number;
  onValueChange?: (value: string) => void;
  className?: string;
}

export default function NacionalidadSelect({
  selectedId,
  onValueChange,
  className = 'w-[180px]'
}: NacionalidadSelectProps) {
  const [Nacionalidads, setNacionalidads] = useState<Nacionalidad[]>([]);
  const [selectedNacionalidad, setSelectedNacionalidad] = useState<string>(
    selectedId ? selectedId.toString() : ''
  );

  useEffect(() => {
    const fetchNacionalidads = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/nacionalidad');
        const data = await response.json();
        setNacionalidads(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error('Error fetching Nacionalidades:', error);
      }
    };

    fetchNacionalidads();
  }, []);

  useEffect(() => {
    if (selectedId) {
      setSelectedNacionalidad(selectedId.toString());
    }
  }, [selectedId]);

  const handleValueChange = (value: string) => {
    setSelectedNacionalidad(value);
    if (onValueChange) {
      onValueChange(value);
    }
  };

  return (
    <Select onValueChange={handleValueChange} value={selectedNacionalidad}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Selecciona un Nacionalidad" />
      </SelectTrigger>
      <SelectContent>
        {Nacionalidads.map((Nacionalidad) => (
          <SelectItem key={Nacionalidad.id} value={Nacionalidad.id.toString()}>
            {Nacionalidad.nombre}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
