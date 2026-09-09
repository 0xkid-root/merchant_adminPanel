import { Merchant } from "../../merchant.mock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function BusinessTab({ merchant }: { merchant: Merchant }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="shadow-none border-slate-200/60 dark:border-slate-800">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold">Business Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
            <span className="text-sm text-slate-500">Legal Business Name</span>
            <span className="text-sm font-medium">{merchant.businessName}</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
            <span className="text-sm text-slate-500">Trade Name</span>
            <span className="text-sm font-medium">{merchant.businessName}</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
            <span className="text-sm text-slate-500">Business Type</span>
            <span className="text-sm font-medium">{merchant.businessType}</span>
          </div>
          <div className="flex justify-between pb-1">
            <span className="text-sm text-slate-500">Industry</span>
            <span className="text-sm font-medium">Technology / Software</span>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-none border-slate-200/60 dark:border-slate-800">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold">Registered Address</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
            <span className="text-sm text-slate-500">Address Line 1</span>
            <span className="text-sm font-medium text-right max-w-[200px]">{merchant.registeredAddress}</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
            <span className="text-sm text-slate-500">City</span>
            <span className="text-sm font-medium">{merchant.city}</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
            <span className="text-sm text-slate-500">State</span>
            <span className="text-sm font-medium">{merchant.state}</span>
          </div>
          <div className="flex justify-between pb-1">
            <span className="text-sm text-slate-500">Pincode</span>
            <span className="text-sm font-medium">{merchant.pincode}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
