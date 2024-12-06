import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Imputado } from '@/types/organizacion.types';

interface ImputadoComboboxProps {
  value: string;
  onChange: (value: string) => void;
  imputados: Imputado[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ImputadoCombobox({
  value,
  onChange,
  imputados = [],
  open,
  onOpenChange
}: ImputadoComboboxProps) {
  const [search, setSearch] = useState('');

  // Encontrar el imputado seleccionado
  const selectedImputado = imputados?.find(
    (imp) => imp.id.toString() === value
  );

  // Filtrar imputados basado en la búsqueda
  const filteredImputados =
    imputados?.filter((imp) => {
      if (!search) return true;

      const searchLower = search.toLowerCase();
      return (
        imp.nombreSujeto.toLowerCase().includes(searchLower) ||
        imp.docId?.toLowerCase().includes(searchLower)
      );
    }) || [];

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedImputado ? (
            <div className="flex flex-col items-start gap-1 truncate">
              <span className="truncate">{selectedImputado.nombreSujeto}</span>
              {selectedImputado.docId && (
                <span className="text-xs text-muted-foreground">
                  {selectedImputado.docId}
                </span>
              )}
            </div>
          ) : (
            'Seleccione un imputado...'
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Buscar por nombre o documento..."
            value={search}
            onValueChange={setSearch}
          />
          {!filteredImputados.length ? (
            <CommandEmpty>
              {search
                ? 'No se encontraron resultados'
                : 'Comience a escribir para buscar...'}
            </CommandEmpty>
          ) : (
            <CommandGroup>
              {filteredImputados.map((imp) => (
                <CommandItem
                  key={imp.id}
                  onSelect={() => {
                    onChange(imp.id.toString());
                    onOpenChange(false);
                  }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Check
                      className={cn(
                        'h-4 w-4',
                        value === imp.id.toString()
                          ? 'opacity-100'
                          : 'opacity-0'
                      )}
                    />
                    <div className="flex flex-col">
                      <span>{imp.nombreSujeto}</span>
                      {imp.docId && (
                        <span className="text-xs text-muted-foreground">
                          {imp.docId}
                        </span>
                      )}
                    </div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
