import React, { useState, useEffect } from 'react';
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';
import { useParams } from 'next/navigation';

interface Param {
  id: string;
  name: string;
  estado: boolean;
}

interface ParamAPI {
  causaId: string;
  estado: boolean;
  parametro: {
    value: string;
    label: string;
    descripcion: string;
  }
  parametroId: string;
}

const CrimenOrganizadoParams= ({ causaId }: {causaId: string }) => {
  const [isTriggered, setIsTriggered] = React.useState(false);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const [params, setParams] = useState<Param[]>([]);
  const [value, setValue] = useState<Option[]>();

  const fetchParams = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/causas-crimenorganizado/${causaId}`);

      if(!response.ok) {
          throw new Error('Error al cargar los párametros');
      }

      const data: ParamAPI[] = await response.json();

      const paramsOptions: Param[] = data.map((item) => ({
        id: item.parametroId,
        name: item.parametro.label,
        estado: item.estado,
      }));

      setParams(paramsOptions);

      console.log(paramsOptions);

      const selectedValues: Option[] = paramsOptions.filter((param) => param.estado).map((param) => ({
        value: param.id,
        label: param.name,
      }))
      setValue(selectedValues);
    } catch (error) {
      console.error('Error fetching Parámetros de Crimen Organizado: ', error);
    } 
  };
  const updateParams = async (causaId: string, paramId: string, nuevoEstado: boolean) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/causas-crimenorganizado/${causaId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({causaId, paramId, nuevoEstado})
          
        }
      );
      console.log(nuevoEstado);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al actualizar el parámetro');
      }

      const updatedParam = await response.json();
      //setParams((prev) => prev.map((param) => (param.id === paramId ? updatedParam : param)));
      console.log(' this is the updated param : ', updatedParam);
      
    } catch (error) {
      console.error('Error actualizando parámetro:', error);
    }
    console.log(params);
  };

  useEffect(() => {
    fetchParams();
  }, [API_BASE_URL]);

  
  const handleSelectorChange = (selected: Option[]) => {
    setValue(selected);

    selected.forEach((option) => {
      const param = params.find((p) => p.id === option.value);
      if (param && !param.estado) {
        updateParams(causaId,option.value as string, true);
        
      } params.forEach((param) => {
        if (!selected.some((option) => option.value === param.id) && param.estado) {
          setTimeout(() => {
            updateParams(causaId, param.id, false);
          }, 100000);
         
        }
      });
    });
   
  }
    return (
        
      <div className="flex w-full flex-col gap-5 px-10">
        <MultipleSelector
          value={value}
          onChange={handleSelectorChange}
          options={params.map((param) => ({
            value: param.id,
            label: param.name,
          }))}
          placeholder="Seleccione un parámetro"
          emptyIndicator={
            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
              no results found.
            </p>
          }
          
        />
      </div>
    );
  };

export default CrimenOrganizadoParams;
