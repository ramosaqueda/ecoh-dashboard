import React, { useState, useEffect } from 'react';
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';
import InlineCode from '@/components/ui/inline-code';
import { ScrollArea } from '@radix-ui/react-scroll-area';

const CrimenOrganizadoParams = () => {
  const [isTriggered, setIsTriggered] = React.useState(false);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const [params, setParams] = useState<Option[]>([]);

  useEffect(() => {
    const fetchParams = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/crimenorganizadoparams/`);

            if(!response.ok) {
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
    const [value, setValue] = React.useState<Option[]>([]);
    console.log(params);
    return (
        
      <div className="flex w-full flex-col gap-5 px-10">
        <MultipleSelector
          value={value}
          onChange={setValue}
          options={params}
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
