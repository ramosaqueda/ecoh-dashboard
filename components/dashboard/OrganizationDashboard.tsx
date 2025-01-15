'use client';
import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, Users,Network } from 'lucide-react';
import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import MembersForm from '@/components/forms/organizacion/MembersForm';

const ITEMS_PER_PAGE = 10;

// Componente de Formulario de Organización
const OrganizationForm = ({ organization, onClose, onSuccess }) => {
  const [formData, setFormData] = useState(
    organization || {
      nombre: '',
      descripcion: '',
      fechaIdentificacion: new Date().toISOString().split('T')[0],
      tipoOrganizacionId: '',
      activa: true
    }
  );
  const [error, setError] = useState(null);
  const [tipos, setTipos] = useState([]);
  const [loadingTipos, setLoadingTipos] = useState(true);

  useEffect(() => {
    fetchTiposOrganizacion();
  }, []);

  const fetchTiposOrganizacion = async () => {
    try {
      setLoadingTipos(true);
      const response = await fetch('/api/tipo-organizacion');
      if (!response.ok) {
        throw new Error('Error al cargar tipos de organización');
      }
      const data = await response.json();
      setTipos(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoadingTipos(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = organization
        ? `/api/organizacion/${organization.id}`
        : '/api/organizacion';

      const response = await fetch(url, {
        method: organization ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Error al guardar la organización');
      }

      onSuccess?.();
      onClose();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div>
        <label className="block text-sm font-medium mb-1">Nombre</label>
        <Input
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Descripción</label>
        <Input
          value={formData.descripcion || ''}
          onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Fecha de Identificación</label>
        <Input
          type="date"
          value={formData.fechaIdentificacion.split('T')[0]}
          onChange={(e) => setFormData({ ...formData, fechaIdentificacion: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Tipo de Organización</label>
        <Select
          value={formData.tipoOrganizacionId.toString()}
          onValueChange={(value) => setFormData({ ...formData, tipoOrganizacionId: parseInt(value) })}
          disabled={loadingTipos}
        >
          <SelectTrigger>
            <SelectValue placeholder={loadingTipos ? "Cargando tipos..." : "Seleccione un tipo"} />
          </SelectTrigger>
          <SelectContent>
            {tipos.map((tipo) => (
              <SelectItem key={tipo.id} value={tipo.id.toString()}>
                {tipo.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center space-x-2">
        <label className="text-sm font-medium">Activa</label>
        <Input
          type="checkbox"
          checked={formData.activa}
          onChange={(e) => setFormData({ ...formData, activa: e.target.checked })}
          className="w-4 h-4"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit" disabled={loadingTipos}>
          {organization ? 'Actualizar' : 'Crear'}
        </Button>
      </div>
    </form>
  );
};

// Componente de Diálogo de Miembros
const MembersDialog = ({ organization, onClose }) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (organization) {
      fetchMembers();
    }
  }, [organization]);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/organizacion/${organization.id}/miembros`);
      if (!response.ok) {
        throw new Error('Error al cargar los miembros');
      }
      const data = await response.json();
      setMembers(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-4 text-center">Cargando miembros...</div>;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="min-w-[600px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">
          Miembros de {organization?.nombre}
        </h3>
        <Button onClick={() => { }}>
          Añadir Miembro
        </Button>
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Fecha Ingreso</TableHead>
              <TableHead>Fecha Salida</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell>{member.imputado.nombreSujeto}</TableCell>
                <TableCell>{member.rol}</TableCell>
                <TableCell>{new Date(member.fechaIngreso).toLocaleDateString()}</TableCell>
                <TableCell>
                  {member.fechaSalida
                    ? new Date(member.fechaSalida).toLocaleDateString()
                    : '-'}
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${member.activo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                    {member.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

// Componente Principal
const OrganizationDashboard = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [showOrgForm, setShowOrgForm] = useState(false);
  const [showMembersDialog, setShowMembersDialog] = useState(false);

  useEffect(() => {
    fetchOrganizations();
  }, [currentPage, searchTerm]);

  const fetchOrganizations = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: ITEMS_PER_PAGE.toString(),
        search: searchTerm
      });

      const response = await fetch(`/api/organizacion?${params}`);
      if (!response.ok) {
        throw new Error('Error al cargar las organizaciones');
      }

      const data = await response.json();
      setOrganizations(data.data || []);
      setTotalPages(data.pagination?.pages || 1);
    } catch (error) {
      console.error('Error fetching organizations:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="p-8">
        <Card>
          <CardContent className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-4 text-gray-600">Cargando organizaciones...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <Card>
          <CardContent className="flex justify-center items-center h-64">
            <div className="text-center text-red-600">
              <p>{error}</p>
              <Button
                onClick={fetchOrganizations}
                className="mt-4"
              >
                Reintentar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-8">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Gestión de Organizaciones</CardTitle>
            <Button onClick={() => setShowOrgForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Nueva Organización
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar organización..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-8 w-[300px]"
              />
            </div>
          </div>

          {organizations.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No se encontraron organizaciones</p>
            </div>
          ) : (
            <>
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Fecha Identificación</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Miembros</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {organizations.map((org) => (
                      <TableRow key={org.id}>
                        <TableCell className="font-medium">{org.nombre}</TableCell>
                        <TableCell>{org.tipoOrganizacion?.nombre}</TableCell>
                        <TableCell>
                          {new Date(org.fechaIdentificacion).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${org.activa ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                            {org.activa ? 'Activa' : 'Inactiva'}
                          </span>
                        </TableCell>
                        <TableCell>{org.miembros?.length || 0}</TableCell>
                      
<TableCell>
  <div className="flex space-x-2">
    <Button
      variant="outline"
      size="icon"
      onClick={() => {
        setSelectedOrg(org);
        setShowOrgForm(true);
      }}
    >
      <Edit2 className="h-4 w-4" />
    </Button>
    <Button
      variant="outline"
      size="icon"
      onClick={() => {
        setSelectedOrg(org);
        setShowMembersDialog(true);
      }}
    >
      <Users className="h-4 w-4" />
    </Button>
    <Button
      variant="outline"
      size="icon"
      asChild
    >
      <Link href={`/organizaciones/${org.id}/network`}>
        <Network className="h-4 w-4 text-blue-600" />
      </Link>
    </Button>
  </div>
</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-muted-foreground">
                  Página {currentPage} de {totalPages}
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    Anterior
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Siguiente
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Dialog open={showOrgForm} onOpenChange={setShowOrgForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedOrg ? 'Editar Organización' : 'Nueva Organización'}
            </DialogTitle>
          </DialogHeader>
          <OrganizationForm
            organization={selectedOrg}
            onClose={() => {
              setShowOrgForm(false);
              setSelectedOrg(null);
            }}
            onSuccess={() => {
              fetchOrganizations();
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={showMembersDialog}
        onOpenChange={(open) => {
          setShowMembersDialog(open);
          if (!open) setSelectedOrg(null);
        }}
      >
        <DialogContent className="max-w-4xl">
          {selectedOrg && (
            <MembersForm
              organization={selectedOrg}
              onClose={() => {
                setShowMembersDialog(false);
                setSelectedOrg(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrganizationDashboard;