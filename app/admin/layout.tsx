export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <main className="relative flex-1 overflow-auto">{children}</main>
    </div>
  );
}
