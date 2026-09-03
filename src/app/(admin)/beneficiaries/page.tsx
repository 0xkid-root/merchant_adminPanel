export default function BeneficiariesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Beneficiaries</h1>
        <p className="text-muted-foreground">
          Manage beneficiaries and their configurations.
        </p>
      </div>
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-8 flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Beneficiaries module content will go here.</p>
      </div>
    </div>
  );
}
