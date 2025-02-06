import { CausaFormData, Causa } from '@/types/causa';

interface ErrorResponse {
  error: string;
  message?: string;
  statusCode?: number;
}

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const causaService = {
  /**
   * Obtiene todas las causas
   */
  async getAll(): Promise<Causa[]> {
    try {
      const response = await fetch('/api/causas', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        cache: 'no-store'
      });

      if (!response.ok) {
        const errorData: ErrorResponse = await response.json();
        throw new ApiError(
          response.status,
          errorData.message || 'Error al obtener las causas'
        );
      }

      return response.json();
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, 'Error al conectar con el servidor');
    }
  },

  /**
   * Obtiene una causa por su ID
   */
  async getById(id: number): Promise<Causa> {
    try {
      const response = await fetch(`/api/causas/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        cache: 'no-store'
      });

      if (!response.ok) {
        const errorData: ErrorResponse = await response.json();
        throw new ApiError(
          response.status,
          errorData.message || 'Error al obtener la causa'
        );
      }

      return response.json();
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, 'Error al conectar con el servidor');
    }
  },

  /**
   * Crea una nueva causa
   */
  async create(data: CausaFormData): Promise<Causa> {
    try {
      const transformedData = this.transformFormData(data);
      const response = await fetch('/api/causas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(transformedData)
      });

      if (!response.ok) {
        const errorData: ErrorResponse = await response.json();
        throw new ApiError(
          response.status,
          errorData.message || 'Error al crear la causa'
        );
      }

      return response.json();
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, 'Error al conectar con el servidor');
    }
  },

  /**
   * Actualiza una causa existente
   */
  async update(id: number, data: CausaFormData): Promise<Causa> {
    try {
      const transformedData = this.transformFormData(data);
      const response = await fetch(`/api/causas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(transformedData)
      });

      if (!response.ok) {
        const errorData: ErrorResponse = await response.json();
        throw new ApiError(
          response.status,
          errorData.message || 'Error al actualizar la causa'
        );
      }

      return response.json();
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, 'Error al conectar con el servidor');
    }
  },

  /**
   * Elimina una causa
   */
  async delete(id: string): Promise<void> {
    try {
      const response = await fetch(`/api/causas/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData: ErrorResponse = await response.json();
        throw new ApiError(
          response.status,
          errorData.message || 'Error al eliminar la causa'
        );
      }
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, 'Error al conectar con el servidor');
    }
  },

  /**
   * Transforma los datos del formulario para enviar al servidor
   */
  transformFormData(data: CausaFormData) {
    const transformedData = {
      // Campos booleanos
      causaEcoh: data.causaEcoh,
      causaLegada: data.causaLegada,
      constituyeSs: data.constituyeSs,
      homicidioConsumado: data.homicidioConsumado,

      // Campos de texto
      denominacionCausa: data.denominacionCausa,
      ruc: data.ruc,
      foliobw: data.folioBw,
      coordenadasSs: data.coordenadasSs,
      rit: data.rit,
      numeroIta: data.numeroIta,
      numeroPpp: data.numeroPpp,
      observacion: data.observacion,

      //Campo numérico
      esCrimenOrganizado: data.esCrimenOrganizado ? parseInt(data.esCrimenOrganizado.toString()) : 2,

      // Fechas - con validación y manejo de nulos
      fechaHoraTomaConocimiento: data.fechaHoraTomaConocimiento
        ? new Date(data.fechaHoraTomaConocimiento).toISOString()
        : null,
      fechaDelHecho: data.fechaDelHecho
        ? new Date(`${data.fechaDelHecho}T00:00:00.000Z`).toISOString()
        : null,
      fechaIta: data.fechaIta
        ? new Date(`${data.fechaIta}T00:00:00.000Z`).toISOString()
        : null,
      fechaPpp: data.fechaPpp
        ? new Date(`${data.fechaPpp}T00:00:00.000Z`).toISOString()
        : null,

      // Relaciones - con validación
      delitoId: data.delito ? parseInt(data.delito.toString()) : null,
      focoId: data.foco ? parseInt(data.foco.toString()) : null,
      tribunalId: data.tribunal ? parseInt(data.tribunal.toString()) : null,
      fiscalId: data.fiscalACargo
        ? parseInt(data.fiscalACargo.toString())
        : null,
      abogadoId: data.abogado ? parseInt(data.abogado.toString()) : null,
      analistaId: data.analista ? parseInt(data.analista.toString()) : null,
      atvtId: data.atvt ? parseInt(data.atvt.toString()) : null
    };

    // Eliminar campos nulos o undefined
    Object.keys(transformedData).forEach((key) => {
      if (transformedData[key] === null || transformedData[key] === undefined) {
        delete transformedData[key];
      }
    });

    return transformedData;
  },

  /**
   * Transforma los datos iniciales para el formulario
   */
  transformInitialData(data: any) {
    if (!data) return {};
    return {
      causaId: data.id,
      causaEcoh: data.causaEcoh || false,
      causaLegada: data.causaLegada || false,
      constituyeSs: data.constituyeSs || false,
      denominacionCausa: data.denominacionCausa || '',
      homicidioConsumado: data.homicidioConsumado || false,
      ruc: data.ruc || '',
      foliobw: data.foliobw || '',
      coordenadasSs: data.coordenadasSs || '',
      rit: data.rit || '',
      numeroIta: data.numeroIta || '',
      numeroPpp: data.numeroPpp || '',
      esCrimenOrganizado: data.esCrimenOrganizado ?? 2,
      observacion: data.observacion || '',

      // Formateo de fechas para los inputs
      fechaHoraTomaConocimiento: data.fechaHoraTomaConocimiento
        ? new Date(data.fechaHoraTomaConocimiento).toISOString().slice(0, 16)
        : '',
      fechaDelHecho: data.fechaDelHecho
        ? new Date(data.fechaDelHecho).toISOString().slice(0, 10)
        : '',
      fechaIta: data.fechaIta
        ? new Date(data.fechaIta).toISOString().slice(0, 10)
        : '',
      fechaPpp: data.fechaPpp
        ? new Date(data.fechaPpp).toISOString().slice(0, 10)
        : '',

      // Relaciones
      delito: data.delitoId || null,
      foco: data.focoId || null,
      tribunal: data.tribunalId || null,
      fiscalACargo: data.fiscalId || null,
      abogado: data.abogadoId || null,
      analista: data.analistaId || null,
      atvt: data.atvtId || null,
      causasCrimenOrg: data.causasCrimenOrg || [],
    };
  
  },

  /**
   * Valida si una fecha es válida
   */
  isValidDate(date: string): boolean {
    const d = new Date(date);
    return d instanceof Date && !isNaN(d.getTime());
  }
};
