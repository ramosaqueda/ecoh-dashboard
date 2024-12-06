import { z } from 'zod';
import { organizacionSchema } from '@/schemas/organizacion.schema';

export type OrganizacionFormValues = z.infer<typeof organizacionSchema>;

export interface Miembro {
  id?: number;
  organizacionId?: number;
  imputadoId: string;
  rol: string;
  orden: number;
  fechaIngreso: Date;
  fechaSalida: Date | null;
  activo?: boolean;
  imputado?: {
    id: number;
    nombreSujeto: string;
    docId: string;
    nacionalidadId?: number;
  };
}

export interface Imputado {
  id: string;
  nombreSujeto: string;
  docId?: string;
}

export interface TipoOrganizacion {
  id: string;
  nombre: string;
}

export interface OrganizacionFormProps {
  initialData?: Partial<OrganizacionFormValues>;
  onSubmit: (data: OrganizacionFormValues) => Promise<void>;
}
