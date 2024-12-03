// types/causavictima.ts

/**
 * Representa una causa en el sistema judicial
 */
    export type Causa = {
    id: number;
    denominacionCausa: string;
    ruc: string | null;
    rit: string | null;
    tribunal?: {
      id: number;
      nombre: string;
    };
    delito?: {
      id: number;
      nombre: string;
    };
  };
  
  /**
   * Representa una medida cautelar que puede ser asignada a un imputado
   */
  export type Cautelar = {
    id: number;
    nombre: string;
  };
  
  /**
   * Representa la relación entre una causa y una victima
   */
  export interface CausaVictima {
    causaId: number;
    victimaId: number;
    causa?: {
      ruc: string;
      denominacionCausa?: string;

    };
  }
  /**
   * Representa los valores del formulario para crear/editar una relación causa-victima
   */
  export interface CausaVictimaFormValues {
    causaId: string;
    victimaId: string;
    causa?: {
        ruc: string;
        denominacionCausa?: string;
      };
  }
  
  /**
   * Representa una victima en el sistema
   */
  export type Victima = {
    id: number;
    nombreVictima: string;
    docId: string;
    nacionalidadId: number | null;
    nacionalidad?: {
      id: number;
      nombre: string;
    };
    causas: CausaVictima[];
    };
  