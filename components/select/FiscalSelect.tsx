import React, { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface Fiscal {
  id: number;
  nombre: string;
}

interface FiscalSelectProps {
  selectedId?: number;
  onValueChange?: (value: string) => void;
  className?: string;
}

export default function FiscalSelect({
  selectedId,
  onValueChange,
  className = 'w-[180px]'
}: FiscalSelectProps) {
  const [Fiscals, setFiscals] = useState<Fiscal[]>([]);
  const [selectedFiscal, setSelectedFiscal] = useState<string>(
    selectedId ? selectedId.toString() : ''
  );

  useEffect(() => {
    const fetchFiscals = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/fiscal');
        const data = await response.json();
        setFiscals(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error('Error fetching Fiscales:', error);
      }
    };

    fetchFiscals();
  }, []);

  useEffect(() => {
    if (selectedId) {
      setSelectedFiscal(selectedId.toString());
    }
  }, [selectedId]);

  const handleValueChange = (value: string) => {
    setSelectedFiscal(value);
    if (onValueChange) {
      onValueChange(value);
    }
  };

  return (
    <Select onValueChange={handleValueChange} value={selectedFiscal}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Selecciona un Fiscal" />
      </SelectTrigger>
      <SelectContent>
        {Fiscals.map((Fiscal) => (
          <SelectItem key={Fiscal.id} value={Fiscal.id.toString()}>
            {Fiscal.nombre}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
