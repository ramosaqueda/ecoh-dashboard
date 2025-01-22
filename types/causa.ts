import { CausasCrimenOrganizado, CrimenOrganizadoParams } from "@prisma/client";

export interface CausaFormData {
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

  numeroIta: string;

  numeroPpp: string;
  victima: string;
  rut: string;
  nacionalidadVictima: number;
  observacion: string;

  esCrimenOrganizado: boolean | null;
  crimenOrgParams: CausasCrimenOrganizado[];
}
