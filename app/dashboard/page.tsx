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
      <div className="space-y-4 p-4 md:p-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">
            Hola, {user?.firstName} de vuelta por aqui? 👋
          </h2>
          <div className="hidden items-center space-x-2 md:flex">
            <CalendarDateRangePicker />
            <Button>Descargar informe</Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Estadísticas</TabsTrigger>
            <TabsTrigger value="analytics" disabled>
              Analítica
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            {/* Indicadores principales */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <CausasCard />
              <CausasEcohCard />
              <CausasLegadaCard />
              <EsclarecimientoCard />
            </div>

            {/* Línea de tiempo destacada */}
            <div className="w-full">
              <CauseTimeline />
            </div>

            {/* Gráficos principales - Primera fila */}
            <div className="grid gap-4 md:grid-cols-2">
              <CaseTimelineChart />
              <DelitosDistribution />
            </div>

            {/* Gráficos secundarios - Segunda fila */}
            <div className="grid gap-4 md:grid-cols-3">
              <ImputadosFlow />
              <AbogadoAnalistaChart />
              <NationalityDistribution />
              
            </div>

            {/* Mapa de calor - Ancho completo */}
            <div className="w-full">
              <CasesHeatmap />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}