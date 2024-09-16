'use client';

import React, { useState } from 'react';
import CauseForm from '@/components/forms/CausaForm';

const CauseFormContainer: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/causas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      console.log(response);

      if (!response.ok) {
        throw new Error('Error al enviar el formulario');
      }

      console.log('Formulario enviado con éxito');
      // Aquí puedes agregar lógica adicional, como mostrar un mensaje de éxito o redireccionar
    } catch (error) {
      console.error('Error:', error);
      // Aquí puedes manejar el error, tal vez mostrar un mensaje al usuario
    } finally {
      setIsSubmitting(false);
    }
  };

  return <CauseForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />;
};

export default CauseFormContainer;
