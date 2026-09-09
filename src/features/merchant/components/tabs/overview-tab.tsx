import { Merchant } from "../../merchant.mock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function OverviewTab({ merchant, onTabChange }: { merchant: Merchant; onTabChange: (tab: string) => void }) {
  const date = new Date(merchant.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit", month: "short", year: "numeric"
  });

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="shadow-none border-slate-200/60 dark:border-slate-800">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold">Merchant Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
            <span className="text-sm text-slate-500">Merchant Name</span>
            <span className="text-sm font-medium">{merchant.ownerName}</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
            <span className="text-sm text-slate-500">Merchant ID / MID</span>
            <span className="text-sm font-medium">{merchant.merchantCode}</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
            <span className="text-sm text-slate-500">Email</span>
            <span className="text-sm font-medium">{merchant.email}</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
            <span className="text-sm text-slate-500">Mobile</span>
            <span className="text-sm font-medium">{merchant.mobile}</span>
          </div>
          <div className="flex justify-between pb-1">
            <span className="text-sm text-slate-500">Created Date</span>
            <span className="text-sm font-medium">{date}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-none border-slate-200/60 dark:border-slate-800">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">Account Status</CardTitle>
            <button onClick={() => onTabChange("kyc")} className="text-xs font-medium text-primary hover:underline">
              View KYC details
            </button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
            <span className="text-sm text-slate-500">Merchant Status</span>
            <span className="text-sm font-medium">{merchant.status}</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
            <span className="text-sm text-slate-500">KYC Status</span>
            <span className="text-sm font-medium">{merchant.kycStatus === "APPROVED" ? "Verified" : merchant.kycStatus}</span>
          </div>
          <div className="flex justify-between pb-1">
            <span className="text-sm text-slate-500">Onboarding</span>
            <span className="text-sm font-medium text-emerald-600">Completed</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
