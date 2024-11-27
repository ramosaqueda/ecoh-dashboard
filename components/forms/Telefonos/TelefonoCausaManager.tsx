// components/TelefonoCausaManager.tsx
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { toast } from 'sonner';
import { X } from 'lucide-react';

interface Causa {
  id: number;
  ruc: string;
  denominacionCausa: string;
}

interface TelefonoCausa {
  id: number;
  causa: Causa;
}

interface TelefonoCausaManagerProps {
  telefonoId: number;
  initialCausas?: TelefonoCausa[];
}

export function TelefonoCausaManager({
  telefonoId,
  initialCausas = []
}: TelefonoCausaManagerProps) {
  const [causas, setCausas] = useState<Causa[]>([]);
  const [selectedCausaId, setSelectedCausaId] = useState<string>('');
  const [asociaciones, setAsociaciones] =
    useState<TelefonoCausa[]>(initialCausas);

  useEffect(() => {
    const fetchCausas = async () => {
      try {
        const response = await fetch('/api/causas');
        if (!response.ok) throw new Error('Error al cargar causas');
        const data = await response.json();
        setCausas(data);
      } catch (error) {
        toast.error('Error al cargar las causas');
      }
    };

    fetchCausas();
  }, []);

  const handleAsociar = async () => {
    if (!selectedCausaId) return;

    try {
      const response = await fetch('/api/telefonos-causa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          idTelefono: telefonoId,
          idCausa: parseInt(selectedCausaId)
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Error al asociar causa');
      }

      const nuevaAsociacion = await response.json();
      setAsociaciones((prev) => [...prev, nuevaAsociacion]);
      setSelectedCausaId('');
      toast.success('Causa asociada exitosamente');
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message || 'Error al asociar la causa');
    }
  };

  const handleDesasociar = async (asociacionId: number) => {
    try {
      const response = await fetch(`/api/telefonos-causa/${asociacionId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Error al desasociar causa');
      }

      setAsociaciones((prev) => prev.filter((a) => a.id !== asociacionId));
      toast.success('Causa desasociada exitosamente');
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message || 'Error al desasociar la causa');
    }
  };

  // Filtramos las causas que ya están asociadas
  const causasDisponibles = causas.filter(
    (causa) => !asociaciones.some((asoc) => asoc.causa.id === causa.id)
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Causas Asociadas</h3>

      <div className="flex items-end gap-2">
        <div className="flex-1">
          <Select value={selectedCausaId} onValueChange={setSelectedCausaId}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar causa" />
            </SelectTrigger>
            <SelectContent>
              {causasDisponibles.map((causa) => (
                <SelectItem key={causa.id} value={causa.id.toString()}>
                  {causa.ruc} - {causa.denominacionCausa}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          type="button"
          onClick={handleAsociar}
          disabled={!selectedCausaId || causasDisponibles.length === 0}
        >
          Asociar Causa
        </Button>
      </div>

      {asociaciones.length > 0 ? (
        <div className="space-y-2">
          {asociaciones.map((asociacion) => (
            <div
              key={asociacion.id}
              className="flex items-center justify-between rounded-lg border p-2"
            >
              <span>
                {asociacion.causa.ruc} - {asociacion.causa.denominacionCausa}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDesasociar(asociacion.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <p className="py-4 text-center text-sm text-muted-foreground">
          No hay causas asociadas
        </p>
      )}
    </div>
  );
}
