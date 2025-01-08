'use client'
import React, { useState, useEffect } from 'react';
import { format, parseISO, eachMonthOfInterval, startOfYear, endOfYear } from 'date-fns';
import { es } from 'date-fns/locale';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, ChevronDown, ChevronUp,ExternalLink } from "lucide-react"; 
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import DelitoSelect from '@/components/select/DelitoSelect';
import { Button } from '@/components/ui/button';

const CauseTimeline = () => {
  const [causes, setCauses] = useState([]);
  const [filteredCauses, setFilteredCauses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCause, setSelectedCause] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCauseDetails, setSelectedCauseDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [expandedMonth, setExpandedMonth] = useState(null);
  const [showOnlyEcoh, setShowOnlyEcoh] = useState(false);
  const [selectedDelito, setSelectedDelito] = useState('');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());

  // Generar array de años desde 2024 hasta el año actual
  const years = Array.from(
    { length: new Date().getFullYear() - 2023 },
    (_, i) => (2024 + i).toString()
  );

  useEffect(() => {
    const fetchCauses = async () => {
      try {
        const response = await fetch('/api/causas');
        if (!response.ok) throw new Error('Failed to fetch causes');
        const data = await response.json();
        const causesWithDate = data.filter(cause => cause.fechaDelHecho);
        setCauses(causesWithDate);
      } catch (error) {
        console.error('Error fetching causes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCauses();
  }, []);

  useEffect(() => {
    let filtered = [...causes];
    
    // Filtrar por año seleccionado
    filtered = filtered.filter(cause => {
      const causeDate = parseISO(cause.fechaDelHecho);
      return causeDate.getFullYear() === parseInt(selectedYear);
    });
    
    if (showOnlyEcoh) {
      filtered = filtered.filter(cause => cause.causaEcoh);
    }
    
    if (selectedDelito) {
      filtered = filtered.filter(cause => cause.delito?.id.toString() === selectedDelito);
    }
    
    setFilteredCauses(filtered);
  }, [causes, showOnlyEcoh, selectedDelito, selectedYear]);

  const fetchCauseDetails = async (id) => {
    setLoadingDetails(true);
    try {
      const response = await fetch(`/api/causas/${id}`);
      if (!response.ok) throw new Error('Failed to fetch cause details');
      const data = await response.json();
      setSelectedCauseDetails(data);
    } catch (error) {
      console.error('Error fetching cause details:', error);
    } finally {
      setLoadingDetails(false);
    }
  };

  const months = eachMonthOfInterval({
    start: startOfYear(new Date(parseInt(selectedYear), 0)),
    end: endOfYear(new Date(parseInt(selectedYear), 0))
  });

  const getCausesForMonth = (month) => {
    return filteredCauses.filter(cause => {
      const causeDate = parseISO(cause.fechaDelHecho);
      return causeDate.getMonth() === month.getMonth();
    });
  };

  const getTotals = () => {
    const total = filteredCauses.length;
    const ecohTotal = filteredCauses.filter(cause => cause.causaEcoh).length;
    const delitoTotal = selectedDelito 
      ? filteredCauses.filter(cause => cause.delito?.id.toString() === selectedDelito).length 
      : 0;

    return {
      total,
      ecohTotal,
      delitoTotal
    };
  };

  const handleCauseClick = async (cause, event) => {
    event.stopPropagation();
    setSelectedCause(cause);
    setIsDialogOpen(true);
    await fetchCauseDetails(cause.id);
  };

  const handleMonthClick = (monthIndex) => {
    setExpandedMonth(expandedMonth === monthIndex ? null : monthIndex);
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const totals = getTotals();

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              Línea de Tiempo de Causas
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-[100px] ml-2">
                  <SelectValue placeholder="Año" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardTitle>
            <div className="flex items-center gap-6">
              <div className="flex items-center space-x-2">
                <Switch
                  id="ecoh-mode"
                  checked={showOnlyEcoh}
                  onCheckedChange={setShowOnlyEcoh}
                />
                <Label htmlFor="ecoh-mode">Solo Causas ECOH</Label>
              </div>
              
              <div className="w-64">
                <DelitoSelect
                  value={selectedDelito}
                  onValueChange={setSelectedDelito}
                />
              </div>
            </div>
          </div>

          {/* Totalizador */}
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-lg bg-muted p-3">
              <p className="text-sm text-muted-foreground">Total Causas</p>
              <p className="text-2xl font-bold">{totals.total}</p>
            </div>
            {showOnlyEcoh && (
              <div className="rounded-lg bg-muted p-3">
                <p className="text-sm text-muted-foreground">Causas ECOH</p>
                <p className="text-2xl font-bold">{totals.ecohTotal}</p>
              </div>
            )}
            {selectedDelito && (
              <div className="rounded-lg bg-muted p-3">
                <p className="text-sm text-muted-foreground">Causas por Delito</p>
                <p className="text-2xl font-bold">{totals.delitoTotal}</p>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative mt-8">
          {/* Timeline line */}
          <div className="absolute left-0 right-0 h-1 bg-muted top-4" />
          
          {/* Months and points */}
          <div className="relative flex justify-between">
            {months.map((month, index) => {
              const monthCauses = getCausesForMonth(month);
              const isExpanded = expandedMonth === index;
              
              return (
                <div key={index} className="relative">
                  <div 
                    className={`flex flex-col items-center ${monthCauses.length > 0 ? 'cursor-pointer' : ''}`}
                    onClick={() => monthCauses.length > 0 && handleMonthClick(index)}
                  >
                    {/* Month label */}
                    <span className="text-sm text-muted-foreground mb-2">
                      {format(month, 'MMM', { locale: es })}
                    </span>
                    
                    {/* Month indicator */}
                    <div className="relative h-8 w-8">
                      {monthCauses.length > 0 && (
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2">
                          <div className="relative">
                            <div className="h-6 w-6 rounded-full bg-primary hover:bg-primary/80 transition-colors flex items-center justify-center">
                              {monthCauses.length > 1 && !isExpanded && (
                                <span className="text-xs text-primary-foreground">
                                  {monthCauses.length}
                                </span>
                              )}
                              {monthCauses.length > 0 && (
                                <div className="absolute -bottom-6">
                                  {isExpanded ? (
                                    <ChevronUp className="h-4 w-4" />
                                  ) : (
                                    <ChevronDown className="h-4 w-4" />
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Expanded month view */}
                    {isExpanded && monthCauses.length > 0 && (
                      <div className="absolute top-20 left-1/2 -translate-x-1/2 z-10">
                        <Card className="w-64">
                          <CardHeader>
                            <CardTitle className="text-sm">
                              {format(month, 'MMMM yyyy', { locale: es })}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="max-h-64 overflow-y-auto">
                            <div className="space-y-2">
                              {monthCauses.map((cause) => (
                                <div
                                  key={cause.id}
                                  className="rounded-lg bg-muted p-2 cursor-pointer hover:bg-muted/80"
                                  onClick={(e) => handleCauseClick(cause, e)}
                                >
                                  <p className="text-sm font-medium">{cause.denominacionCausa}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {format(parseISO(cause.fechaDelHecho), 'dd/MM/yyyy', { locale: es })}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dialog for cause details */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                Detalles de la Causa
                {selectedCause && <span className="ml-2 text-muted-foreground">RUC: {selectedCause.ruc}</span>}
                  {selectedCause?.ruc && (
                  <a 
                    href={`${process.env.NEXT_PUBLIC_FICHACASORUC}?ruc=${selectedCause.ruc}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <ExternalLink className="h-4 w-4 text-blue-600" />
                    </Button>
                  </a>
                )}
              </DialogTitle>
            </DialogHeader>
            
            {loadingDetails ? (
              <div className="flex h-64 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : selectedCauseDetails && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium">Denominación</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedCauseDetails.denominacionCausa}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">RIT</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedCauseDetails.rit || '-'}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">Fiscal</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedCauseDetails.fiscal?.nombre || '-'}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">Delito</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedCauseDetails.delito?.nombre || '-'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default CauseTimeline;