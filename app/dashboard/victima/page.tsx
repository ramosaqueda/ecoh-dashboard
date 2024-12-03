'use client';

import  { useState } from 'react';
import { Button } from '@/components/ui/button';

import {
    Victima,
    columns
  } from '@/components/tables/victimas-tables/columns';
  import { VictimasDataTable } from '@/components/tables/victimas-tables/victimas-tables';
  import ImputadoFormContainer from '@/components/ImputadoFormContainer';
  import { toast } from 'sonner';
  import { Loader2, Plus } from 'lucide-react';
  import { useQuery, useQueryClient } from '@tanstack/react-query';
  import { Breadcrumbs } from '@/components/breadcrumbs';
  import PageContainer from '@/components/layout/page-container';
  
  