import CaseTimelineChart from '@/components/charts/CaseTimelineChart';
import { CalendarDateRangePicker } from '@/components/date-range-picker';
import PageContainer from '@/components/layout/page-container';
import AbogadoAnalistaChart from '@/components/charts/AbogadoAnalistaChart';
import { CasesHeatmap } from '@/components/charts/CasesHeatmap';
import { DelitosDistribution } from '@/components/charts/DelitosDistribution';
import { ImputadosFlow } from '@/components/charts/ImputadosFlow';
import { Button } from '@/components/ui/button';
import { currentUser } from '@clerk/nextjs/server';
import  CauseTimeline  from '@/components/CauseTimeline';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import CausasEcohCard from '@/components/cards/CausasEcohCard';
import CausasCard from '@/components/cards/CausasCard';
import CausasLegadaCard from '@/components/cards/CausasLegadaCard';
import { EsclarecimientoCard } from '@/components/cards/EsclarecimientoCard';
import NationalityDistribution from '@/components/charts/NationalityDistribution';

export default async function page() {
  const user = await currentUser();

  return (
    <PageContainer scrollable={true}>
      <div className="space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Hola,{user?.firstName} de vuelta por aqui? 👋
          </h2>
          <div className="hidden items-center space-x-2 md:flex">
            <CalendarDateRangePicker />
            <Button>Descargar informe</Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Estadisticas</TabsTrigger>
            <TabsTrigger value="analytics" disabled>
              Analitica
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-4">
              <CausasCard />
              <CausasEcohCard />
              <CausasLegadaCard />
              <EsclarecimientoCard />
            </div>
            <div className="col-span-6">
                <CauseTimeline />
              </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
              <div className="col-span-4 md:col-span-3">
                <CaseTimelineChart />
              </div>
              <div className="col-span-4 md:col-span-3">
                <DelitosDistribution />
              </div>
              <div className="col-span-4 md:col-span-3">
                <AbogadoAnalistaChart />
              </div>
              <div className="col-span-4 md:col-span-3">
                <NationalityDistribution />
              </div>

              <div className="col-span-4 md:col-span-3">
                <ImputadosFlow />
              </div>

              <div className="col-span-6">
                <CasesHeatmap />
              </div>
              
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
