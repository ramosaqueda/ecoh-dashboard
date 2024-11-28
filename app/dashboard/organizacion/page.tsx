'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { OrganizacionTable } from '@/components/tables/organizacion/OrganizacionTable';
import OrganizacionForm from '@/components/forms/organizacion/OrganizacionForm';
import { Organization } from '@/components/tables/organizacion/columns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';

export default function OrganizacionesPage() {
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: organizations = [], isLoading } = useQuery({
    queryKey: ['organizations'],
    queryFn: async () => {
      const res = await fetch('/api/organizacion');
      return res.json();
    }
  });

  const handleCreate = () => {
    setSelectedOrg(null);
    setIsFormOpen(true);
  };

  const handleEdit = (organization: Organization) => {
    setSelectedOrg(organization);
    setIsFormOpen(true);
  };

  const handleDelete = async (organization: Organization) => {
    try {
      await fetch(`/api/organizacion/${organization.id}`, {
        method: 'DELETE'
      });
      queryClient.invalidateQueries(['organizations']);
    } catch (error) {
      console.error('Error deleting organization:', error);
    }
    setIsDeleteDialogOpen(false);
  };

  const handleSubmit = async (data: any) => {
    const method = selectedOrg ? 'PUT' : 'POST';
    const url = selectedOrg
      ? `/api/organizacion/${selectedOrg.id}`
      : '/api/organizacion';

    try {
      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      queryClient.invalidateQueries(['organizations']);
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error saving organization:', error);
    }
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Organizaciones</h1>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Organización
        </Button>
      </div>

      <OrganizacionTable
        data={organizations}
        onEdit={handleEdit}
        onDelete={(org) => {
          setSelectedOrg(org);
          setIsDeleteDialogOpen(true);
        }}
      />

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {selectedOrg ? 'Editar' : 'Nueva'} Organización
            </DialogTitle>
          </DialogHeader>
          <OrganizacionForm initialData={selectedOrg} onSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente la
              organización {selectedOrg?.nombre}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => selectedOrg && handleDelete(selectedOrg)}
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
