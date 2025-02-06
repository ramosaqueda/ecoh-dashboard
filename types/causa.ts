import { Imputado } from '@/types/imputado';

export interface CausaFormData {
  causaId: string;
  causaEcoh: boolean;
  causaLegada: boolean;
  constituyeSs: boolean;
  homicidioConsumado?: boolean;
  fechaHoraTomaConocimiento: string;
  fechaDelHecho: string;
  fechaIta?: string | null;
  fechaPpp?: string | null;
  ruc: string;
  folioBw: string;

  coordenadasSs: string;
  delito: number;
  foco: number;
  rit: string;
  tribunal: number;
  denominacionCausa: string;
  fiscalACargo: number;
  abogado: number;
  analista: number;
  atvt: number;
  numeroIta: string;

  numeroPpp: string;
  victima: string;
  rut: string;
  nacionalidadVictima: number;
  observacion: string;

  esCrimenOrganizado: number;

}

export interface Causa {
  id: string;
  denominacionCausa: string;
  ruc: string;
  rit: string;
  fiscal: {
    id: string;
    nombre: string;
  } | null;
  delito: {
    id: string;
    nombre: string;
  } | null;
  fechaDelHecho: string | null;
  fechaHoraTomaConocimiento: string | null;
  esCrimenOrganizado: number;
  causaEcoh: boolean;
  foliobw: string | null;
  observacion: string | null;
  causasImputados: Array<{
    id: string;
    imputado: Imputado;
  }>;
  victimas: Array<{
    id: string;
    nombre: string;
    rut: string;
  }>;
}