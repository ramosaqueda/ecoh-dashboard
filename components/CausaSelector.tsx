'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface Causa {
  id: number;
  ruc: string;
  denominacionCausa: string;
}

interface CausaSelectorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  isDisabled?: boolean;
}

export default function CausaSelector({
  isDisabled = false,
  value,
  onChange,
  error
}: CausaSelectorProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [causas, setCausas] = useState<Causa[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCausas = async () => {
      try {
        const response = await fetch('/api/causas');
        if (!response.ok) throw new Error('Error al cargar las causas');
        const data = await response.json();
        setCausas(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error:', error);
        toast.error('Error al cargar las causas');
        setCausas([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCausas();
  }, []);

  const filteredCausas = useMemo(() => {
    if (!Array.isArray(causas)) return [];
    if (!searchQuery) return causas;

    const query = searchQuery.toLowerCase();
    return causas.filter(
      (causa) =>
        causa.ruc.toLowerCase().includes(query) ||
        causa.denominacionCausa.toLowerCase().includes(query)
    );
  }, [causas, searchQuery]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('w-full justify-between', error && 'border-red-500')}
          disabled={isLoading || isDisabled}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Cargando...
            </span>
          ) : (
            <span>
              {value
                ? causas?.find((c) => c.id.toString() === value)?.ruc
                : 'Seleccione un RUC'}
            </span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="start" side="bottom">
        <div className="flex flex-col">
          <div className="flex items-center border-b p-2">
            <Input
              placeholder="Buscar por RUC o denominación..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-0 focus:ring-0"
            />
          </div>
          <div className="max-h-[300px] overflow-y-auto">
            {filteredCausas.length === 0 ? (
              <div className="p-2 text-center text-sm text-muted-foreground">
                No se encontraron resultados
              </div>
            ) : (
              filteredCausas.map((causa) => (
                <div
                  key={causa.id}
                  className={cn(
                    'flex cursor-pointer items-start gap-2 p-2 hover:bg-muted',
                    value === causa.id.toString() && 'bg-muted'
                  )}
                  onClick={() => {
                    onChange(causa.id.toString());
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'h-4 w-4 shrink-0',
                      value === causa.id.toString()
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                  <div className="flex flex-col">
                    <span className="font-medium">{causa.ruc}</span>
                    <span className="line-clamp-2 text-sm text-muted-foreground">
                      {causa.denominacionCausa}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
