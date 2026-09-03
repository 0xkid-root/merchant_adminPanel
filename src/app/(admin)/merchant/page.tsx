export default function MerchantPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Merchant</h1>
        <p className="text-muted-foreground">
          Manage your merchants and view their details.
        </p>
      </div>
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-8 flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Merchant module content will go here.</p>
      </div>
    </div>
  );
}
