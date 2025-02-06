import React, { useState, useEffect } from 'react';
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';
import CrimenOrgGauge from '@/components/CrimengorgGauge';

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
      
      const selectedValues: Param[] = data.filter((param) => param.estado === true).map((param) => ({
        parametroId: param.parametroId,
        name: param.parametro ? param.parametro.label : "Sin etiqueta",
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
  const updateParamsRelation = async (id: string , parametroId:string , nuevoEstado: boolean) => {
    
    try {
      // Obtener el estado actual de los parámetros
      const checkResponse = await fetch(`${API_BASE_URL}/api/causas-crimenorganizado/${id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
      });

      if (!checkResponse.ok) {
          throw new Error(`Error al verificar la existencia del parámetro: ${checkResponse.statusText}`);
      }

      const checkRelationResponse = await checkResponse.json();
      
      // Buscar el estado actual del parámetro en la API
      const parametroExistente = checkRelationResponse.find((param: { parametroId: any; }) => String(param.parametroId) === String(parametroId));

      if (parametroExistente) {
          // Comparar estados, si son iguales, no hacer nada
          if (parametroExistente.estado === nuevoEstado) {
              return;
          }
          // Si el estado ha cambiado, enviar actualización
          const putResponse = await fetch(`${API_BASE_URL}/api/causas-crimenorganizado/${id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ parametroId, estado: nuevoEstado })
          });

          if (!putResponse.ok) {
              throw new Error(`Error al actualizar el estado del parámetro: ${putResponse.statusText}`);
          }

          const updatedData = await putResponse.json();
          return updatedData;
      } else {
          // Si la relación no existe, la creamos con un POST
          const postResponse = await fetch(`${API_BASE_URL}/api/causas-crimenorganizado/${id}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ parametroId, estado: nuevoEstado })
          });

          if (!postResponse.ok) {
              throw new Error(`Error al agregar el parámetro: ${postResponse.statusText}`);
          }

          const createdData = await postResponse.json();
          return createdData;
      }
  } catch (error) {
      console.error('Error gestionando el parámetro:', error);
      throw error;
  }
};


  useEffect(() => {
    fetchParams();
  }, [API_BASE_URL]);

  
  const handleSelectorChange = (selected: Option[]) => {
    setValue(selected);

    const newlySelected = selected
        .filter((param) => !selectedVal.some((prev) => prev.parametroId === param.value))
        .map((param) => ({
            value: param.value,
            label: param.label,
        }));

    const deselected = selectedVal
        .filter((prev) => !selected.some((option) => option.value === prev.parametroId));

    newlySelected.forEach((option) => updateParamsRelation(id, option.value, true));
    deselected.forEach((param) => updateParamsRelation(id, param.parametroId, false));
};

    return (
      <div className="space-y-2 flex flex-col items-center w-full">
      <div className="grid grid-cols-2  gap-4 md:grid-cols-1 lg:grid-cols-2 w-full mx-auto place-items-center ">
        
        <MultipleSelector
        className='w-full'
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
    
        <div >
          <CrimenOrgGauge selectedParams={value} totalParams={params} />
        </div>
    
      </div>
    </div>
    
        
    );
  };

export default CrimenOrganizadoParams;
