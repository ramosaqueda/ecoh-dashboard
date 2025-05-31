'use client'
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// ✅ Interfaces TypeScript
interface TipoOrganizacion {
  id: number;
  nombre: string;
}

interface Organization {
  id: number;
  nombre: string;
  descripcion?: string;
  fechaIdentificacion: string;
  tipoOrganizacionId: number;
  activa: boolean;
}

interface FormData {
  nombre: string;
  descripcion: string;
  fechaIdentificacion: string;
  tipoOrganizacionId: string | number;
  activa: boolean;
}

interface OrganizationFormProps {
  organization?: Organization | null;
  onClose: () => void;
  onSuccess?: () => void;
}

const OrganizationForm: React.FC<OrganizationFormProps> = ({ 
  organization, 
  onClose, 
  onSuccess 
}) => {
  // ✅ Función helper para convertir Organization a FormData
  const getInitialFormData = (org?: Organization | null): FormData => {
    if (org) {
      return {
        nombre: org.nombre,
        descripcion: org.descripcion || '', // ✅ Manejar undefined
        fechaIdentificacion: org.fechaIdentificacion,
        tipoOrganizacionId: org.tipoOrganizacionId,
        activa: org.activa
      };
    }
    
    return {
      nombre: '',
      descripcion: '',
      fechaIdentificacion: new Date().toISOString().split('T')[0],
      tipoOrganizacionId: '',
      activa: true
    };
  };

  const [formData, setFormData] = useState<FormData>(getInitialFormData(organization));
  const [error, setError] = useState<string | null>(null);
  const [tipos, setTipos] = useState<TipoOrganizacion[]>([]);
  const [loadingTipos, setLoadingTipos] = useState<boolean>(true);

  useEffect(() => {
    fetchTiposOrganizacion();
  }, []);

  const fetchTiposOrganizacion = async (): Promise<void> => {
    try {
      setLoadingTipos(true);
      const response = await fetch('/api/tipo-organizacion');
      if (!response.ok) {
        throw new Error('Error al cargar tipos de organización');
      }
      const data: TipoOrganizacion[] = await response.json();
      setTipos(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      setError(errorMessage);
    } finally {
      setLoadingTipos(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const url = organization
        ? `/api/organizacion/${organization.id}`
        : '/api/organizacion';

      const response = await fetch(url, {
        method: organization ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Error al guardar la organización');
      }

      onSuccess?.();
      onClose();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      setError(errorMessage);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div>
        <label className="block text-sm font-medium mb-1">Nombre</label>
        <Input
          value={formData.nombre}
          onChange={(e) => handleInputChange('nombre', e.target.value)}
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Descripción</label>
        <Input
          value={formData.descripcion}
          onChange={(e) => handleInputChange('descripcion', e.target.value)}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Fecha de Identificación</label>
        <Input
          type="date"
          value={formData.fechaIdentificacion.split('T')[0]}
          onChange={(e) => handleInputChange('fechaIdentificacion', e.target.value)}
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Tipo de Organización</label>
        <Select
          value={formData.tipoOrganizacionId.toString()}
          onValueChange={(value) => handleInputChange('tipoOrganizacionId', parseInt(value))}
          disabled={loadingTipos}
        >
          <SelectTrigger>
            <SelectValue placeholder={loadingTipos ? "Cargando tipos..." : "Seleccione un tipo"} />
          </SelectTrigger>
          <SelectContent>
            {tipos.map((tipo) => (
              <SelectItem key={tipo.id} value={tipo.id.toString()}>
                {tipo.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center space-x-2">
        <label className="text-sm font-medium">Activa</label>
        <Input
          type="checkbox"
          checked={formData.activa}
          onChange={(e) => handleInputChange('activa', e.target.checked)}
          className="w-4 h-4"
        />
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit" disabled={loadingTipos}>
          {organization ? 'Actualizar' : 'Crear'}
        </Button>
      </div>
    </form>
  );
};

export default OrganizationForm;