import { Merchant } from "../../merchant.mock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, CircleDashed } from "lucide-react";

export function KycTab({ merchant }: { merchant: Merchant }) {
  const isApproved = merchant.kycStatus === "APPROVED";

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="shadow-none border-slate-200/60 dark:border-slate-800">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold">Onboarding Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Basic Details</span>
            <span className="flex items-center text-sm font-medium text-emerald-600">
              <CheckCircle2 className="mr-1.5 h-4 w-4" /> Completed
            </span>
          </div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Business Details</span>
            <span className="flex items-center text-sm font-medium text-emerald-600">
              <CheckCircle2 className="mr-1.5 h-4 w-4" /> Completed
            </span>
          </div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Business Documents</span>
            <span className="flex items-center text-sm font-medium text-emerald-600">
              <CheckCircle2 className="mr-1.5 h-4 w-4" /> Completed
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">KYC Details</span>
            {isApproved ? (
              <span className="flex items-center text-sm font-medium text-emerald-600">
                <CheckCircle2 className="mr-1.5 h-4 w-4" /> Completed
              </span>
            ) : (
              <span className="flex items-center text-sm font-medium text-amber-500">
                <CircleDashed className="mr-1.5 h-4 w-4 animate-pulse" /> Pending
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-none border-slate-200/60 dark:border-slate-800">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold">Verified Documents</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
            <span className="text-sm text-slate-500">PAN</span>
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium">{merchant.pan}</span>
              <span className="text-xs text-emerald-600 font-medium">Verified</span>
            </div>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
            <span className="text-sm text-slate-500">GST</span>
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium">{merchant.gst}</span>
              <span className="text-xs text-emerald-600 font-medium">Verified</span>
            </div>
          </div>
          <div className="flex justify-between pb-1">
            <span className="text-sm text-slate-500">Bank Account</span>
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium">•••• 4821</span>
              <span className="text-xs text-emerald-600 font-medium">Verified</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
