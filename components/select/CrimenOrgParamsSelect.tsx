import React, { useState, useEffect } from 'react';
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';
import { useParams } from 'next/navigation';
import { useStoreApi } from 'reactflow';

interface Param {
  parametroId: string;
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

const CrimenOrganizadoParams= ({ id }: {id: string }) => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const [params, setParams] = useState<Option[]>([]);
  const [selectedVal, setSelectedValues] = useState<Param[]>([]);
  const [value, setValue] = useState<Option[]>();

  const fetchParams = async () => {
    console.log('id: ',id);
    try {
      const response = await fetch(`${API_BASE_URL}/api/causas-crimenorganizado/${id}`);
      const response2 = await fetch(`${API_BASE_URL}/api/crimenorganizadoparams/`);

      if(!response.ok || !response2.ok) {
          throw new Error('Error al cargar los párametros');
      }

      const data: ParamAPI[] = await response.json();
      const params: Option[] = await response2.json();

      const paramsOptions: Option[] = params.map((item) => ({
        label: item.label,
        value: item.value,
      }));

      setParams(paramsOptions);

      console.log(paramsOptions);
      
      const selectedValues: Param[] = data.filter((param) => param.estado === true).map((param) => ({
        parametroId: param.parametroId,
        name: param.parametro.label,
        estado: param.estado,
      }));

      setSelectedValues(selectedValues);

      const selectedParams: Option[] = paramsOptions
      .filter((param) => selectedValues.some((selected) => selected.parametroId === param.value))
      .map((param) => ({
      value: param.value,
      label: param.label,
  }));
      setValue(selectedParams);
    } catch (error) {
      console.error('Error fetching Parámetros de Crimen Organizado: ', error);
    } 
  };
  const updateParamsRelation = async (id: string, parametroId: string, nuevoEstado: boolean) => {
    console.log('Datos enviados al server: ', {id, parametroId, nuevoEstado});
    try {
      console.log(typeof(id));
      const checkResponse = await fetch(
        `${API_BASE_URL}/api/causas-crimenorganizado/${id.toString()}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

      if (checkResponse.ok) {
        const checkRelationResponse = await checkResponse.json();
          console.log('respuesta del get: ', checkRelationResponse);
        const relationExists = checkRelationResponse.some((param: Param) => {
          if (param.parametroId) {
            return param.parametroId === parametroId;
          }
          console.error('param.id no encontrado en el objeto', param);
          return false;
        });
        if (relationExists) {
          
          const putResponse = await fetch(
            `${API_BASE_URL}/api/causas-crimenorganizado/${id}`,
            {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({paramId: parametroId, estado: nuevoEstado})
            });
  
            if (!putResponse.ok) {
              throw new Error(`Error al actualizar el estado del parámetro: ${putResponse.statusText}`);
            }
  
            const updatedData = await putResponse.json();
            console.log('datos actualizados: ', updatedData);
            return updatedData;
        } else {
          console.log('no existe la relación asi que hay que crearla');
            const postResponse = await fetch(
              `${API_BASE_URL}/api/causas-crimenorganizado/${id}`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({paramId: parametroId, estado: nuevoEstado})
              });
              console.log(parametroId, nuevoEstado);
    
            if (!postResponse.ok) {
              throw new Error(`Error al agregar el parámetro: ${postResponse.statusText}`);
            }
    
            const createdData = await postResponse.json();
            return createdData;
        }
        

      } else {
        throw new Error(`Error al verificar la exsistencia del parámetro: ${checkResponse.statusText}`);
      }
      
    } catch (error) {
      console.error('Error gestionando parámetro:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchParams();
  }, [API_BASE_URL]);

  
  const handleSelectorChange = (selected: Option[]) => {
    setValue(selected);

    const newlySelected = selected.filter((param) => selectedVal.some((selected) => selected.parametroId !== param.value))
    .map((param) => ({
    value: param.value,
    label: param.label,
    }));

    const deselected = params
      .filter((param) => param.estado)
      .filter((param) => !selected.some((option) => option.value === param.id));

    newlySelected.forEach((option) => updateParamsRelation(id, option.value, true));
    deselected.forEach((param) => updateParamsRelation(id, param.value, false));
  };
    return (
        
      <div className="flex w-full flex-col gap-5 px-10">
        <MultipleSelector
          value={value}
          onChange={handleSelectorChange}
          options={params.map((param) => ({
            value: param.value,
            label: param.label,
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
