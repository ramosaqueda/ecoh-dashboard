'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Loader2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from 'sonner';
import CausaSelector from '@/components/select/CausaSelector';

// Componente para añadir una nueva causa asociada
const AddCausaForm = ({ organization, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    causaId: '',
    fechaAsociacion: new Date().toISOString().split('T')[0],
    observacion: '',
    selectedCausa: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleCausaChange = (causaId) => {
    setFormData({
      ...formData,
      causaId
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.causaId) {
      setError('Debe seleccionar una causa');
      return;
    }
    
    try {
      setIsSubmitting(true);
      const payload = {
        organizacionId: organization.id,
        causaId: parseInt(formData.causaId),
        fechaAsociacion: formData.fechaAsociacion,
        observacion: formData.observacion || null
      };
      
      const response = await fetch('/api/organizacion/causas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al añadir causa asociada');
      }
      
      toast.success('Causa asociada exitosamente');
      onSuccess?.();
      onClose();
    } catch (error) {
      toast.error(error.message);
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-medium">Seleccionar Causa</h3>
          <CausaSelector 
            value={formData.causaId} 
            onChange={handleCausaChange}
            error={error && !formData.causaId ? "Debe seleccionar una causa" : undefined}
          />
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="font-medium">Detalles de la Asociación</h3>
          
          <div>
            <label className="block text-sm font-medium mb-1">Fecha de Asociación</label>
            <Input
              type="date"
              value={formData.fechaAsociacion}
              onChange={(e) => setFormData({...formData, fechaAsociacion: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Observación</label>
            <Textarea
              value={formData.observacion}
              onChange={(e) => setFormData({...formData, observacion: e.target.value})}
              placeholder="Detalles sobre la relación entre la causa y la organización"
              rows={3}
              className="min-h-[100px]"
            />
          </div>
        </div>

        <Separator />

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting || !formData.causaId} className="min-w-[150px]">
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Procesando...
              </span>
            ) : (
              'Asociar Causa'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

// Componente principal para gestionar causas asociadas
const CausasForm = ({ organization, onClose }) => {
  const [causas, setCausas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddCausa, setShowAddCausa] = useState(false);
  const [causaToDelete, setCausaToDelete] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  useEffect(() => {
    if (organization) {
      fetchCausas();
    }
  }, [organization]);

  const fetchCausas = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/organizacion/${organization.id}/causas`);
      if (!response.ok) throw new Error('Error al cargar las causas asociadas');
      const data = await response.json();
      setCausas(data);
    } catch (error) {
      setError(error.message);
      toast.error('Error al cargar las causas asociadas');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCausa = async (causaId) => {
    try {
      const response = await fetch(
        `/api/organizacion/causas/${causaId}`, 
        { method: 'DELETE' }
      );

      if (!response.ok) {
        throw new Error('Error al desvincular la causa');
      }

      await fetchCausas();
      setCausaToDelete(null);
      setDeleteError(null);
      toast.success('Causa desvinculada correctamente');
    } catch (error) {
      setDeleteError(error.message);
      toast.error('Error al desvincular la causa');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Cargando causas asociadas...</span>
      </div>
    );
  }

  if (error && !showAddCausa) {
    return (
      <Alert variant="destructive" className="my-4">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (showAddCausa) {
    return (
      <div className="min-w-[600px]">
        <DialogHeader className="mb-6">
          <DialogTitle>Añadir Nueva Causa Asociada</DialogTitle>
        </DialogHeader>
        <AddCausaForm 
          organization={organization}
          onClose={() => setShowAddCausa(false)}
          onSuccess={() => {
            setShowAddCausa(false);
            fetchCausas();
          }}
        />
      </div>
    );
  }

  return (
    <>
      <div className="min-w-[600px]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">
            Causas Asociadas a {organization?.nombre}
          </h3>
          <Button onClick={() => setShowAddCausa(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Añadir Causa
          </Button>
        </div>

        {causas.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-8 text-muted-foreground">
              <div className="text-center mb-4">
                No hay causas asociadas a esta organización.
              </div>
              <Button variant="outline" onClick={() => setShowAddCausa(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Asociar Primera Causa
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>RUC</TableHead>
                    <TableHead>Denominación</TableHead>
                    <TableHead>Delito</TableHead>
                    <TableHead>Fecha Asociación</TableHead>
                    <TableHead>Observación</TableHead>
                    <TableHead className="w-[80px]">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {causas.map((causa) => (
                    <TableRow key={causa.id}>
                      <TableCell>{causa.causa.ruc || '-'}</TableCell>
                      <TableCell>{causa.causa.denominacionCausa}</TableCell>
                      <TableCell>
                        {causa.causa.delito ? (
                          <span className="px-2 py-0.5 rounded-full bg-secondary text-xs">
                            {causa.causa.delito.nombre}
                          </span>
                        ) : '-'}
                      </TableCell>
                      <TableCell>{new Date(causa.fechaAsociacion).toLocaleDateString()}</TableCell>
                      <TableCell className="max-w-xs truncate">
                        {causa.observacion || '-'}
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => setCausaToDelete(causa)}
                          className="hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>

      <AlertDialog 
        open={causaToDelete !== null} 
        onOpenChange={(open) => !open && setCausaToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Está seguro de desvincular esta causa?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará la asociación entre la causa y la organización criminal, pero no eliminará la causa del sistema. Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {deleteError && (
            <Alert variant="destructive" className="mt-2">
              <AlertDescription>{deleteError}</AlertDescription>
            </Alert>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => causaToDelete && handleDeleteCausa(causaToDelete.id)}
              className="bg-destructive hover:bg-destructive/90"
            >
              Desvincular
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CausasForm;