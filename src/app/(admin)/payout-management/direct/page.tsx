import { DirectPayoutForm } from "@/features/payout/components/direct-payout-form";

export default function DirectPayoutPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] p-6 gap-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col gap-1 text-center mb-4">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Direct Payout
        </h1>
        <p className="text-sm text-slate-500">
          Send a payout directly using supported bank account details.
        </p>
      </div>
      
      <DirectPayoutForm />
    </div>
  );
}
