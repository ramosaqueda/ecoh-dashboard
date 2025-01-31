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

  esCrimenOrganizado: boolean | null;

}
