import OrganizationNetworkReactFlow from '@/components/graph/organizationNetworkReactFlow';

interface NetworkPageProps {
  params: {
    id: string;
  };
}

export default function NetworkPage({ params }: NetworkPageProps) {
  return (
    <div className="container mx-auto p-4">
      <OrganizationNetworkReactFlow organizationId={params.id} />
    </div>
  );
}