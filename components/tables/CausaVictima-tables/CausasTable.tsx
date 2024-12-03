'use client';

import {
    Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { CausaImputado } from '@/types/causavictima';
import {
  CalendarDays,
  GavelIcon,
  FileText,
  AlertCircle,
  Scale
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CausasTableProps {
    causas: CausaVictima[];
  }
  