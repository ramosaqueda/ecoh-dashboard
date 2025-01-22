import React, { useState, useEffect } from 'react';
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';
import CrimenOrgGauge from '@/components/CrimenorgGauge';

const CrimenOrganizadoParams: React.FC = () => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const [params, setParams] = useState<Option[]>([]);
  const [selectedParams, setSelectedParams] = useState<Option[]>([]);

  useEffect(() => {
    const fetchParams = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/crimenorganizadoparams/`);
        if (!response.ok) {
          throw new Error('Error al cargar los párametros');
        }
        const data = await response.json();
        setParams(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching Parámetros de Crimen Organizado: ', error);
      }
    };
    fetchParams();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2">
        <MultipleSelector
          value={selectedParams}
          onChange={setSelectedParams}
          options={params}
          placeholder="Seleccione un parámetro"
          emptyIndicator={
            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
              No se encontraron resultados.
            </p>
          }
        />
      </div>
      
      <div>
      <CrimenOrgGauge
          selectedParams={selectedParams}
          totalParams={params}
        />
      </div>
    </div>
  );
};

export default CrimenOrganizadoParams;