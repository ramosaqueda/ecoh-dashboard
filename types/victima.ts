export interface Nacionalidad {
    id: number;
    nombre: string;
}

export interface Delito {
    id: number;
    nombre: string;
}
  
  export interface Tribunal {
    id: number;
    nombre: string;
}

export interface Causa {
    id: number;
    ruc: string | null;
    denominacionCausa: string;
    delito?: Delito | null;
    tribunal?: Tribunal | null;
}

export interface CausaVictima {
    causaId: string;
    victimaId: string;
}

export interface VictimaDetail {
    id: number;
    nombreVictima: string;
    docId?: string;
    nacionalidadId?: number; 
    nacionalidad?: Nacionalidad | null;
    causas?: CausaVictima[];
}