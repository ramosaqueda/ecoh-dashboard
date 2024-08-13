'use client';

import { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import ComparisonResult from '@/components/ComparisonResult';
import { ComparisonResultType } from '@/types/compare';

export default function Home() {
  const [comparisonResult, setComparisonResult] =
    useState<ComparisonResultType | null>(null);

  const handleComparison = async (file1: File, file2: File) => {
    const formData = new FormData();
    formData.append('file1', file1);
    formData.append('file2', file2);

    try {
      const response = await fetch('/api/compare', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      setComparisonResult(result);
    } catch (error) {
      console.error('Error al comparar imágenes:', error);
    }
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Comparación de Fotos</h1>
      <FileUpload onCompare={handleComparison} />
      {comparisonResult && <ComparisonResult result={comparisonResult} />}
    </main>
  );
}
