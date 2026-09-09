import { Merchant } from "../../../merchant.mock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function BasicDetailsTab({ merchant }: { merchant: Merchant }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="shadow-none border-slate-200/60 dark:border-slate-800">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold">Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
            <span className="text-sm text-slate-500">Contact Person</span>
            <span className="text-sm font-medium">{merchant.ownerName}</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
            <span className="text-sm text-slate-500">Email Address</span>
            <span className="text-sm font-medium">{merchant.email}</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
            <span className="text-sm text-slate-500">Mobile Number</span>
            <span className="text-sm font-medium">{merchant.mobile}</span>
          </div>
          <div className="flex justify-between pb-1">
            <span className="text-sm text-slate-500">Account Created</span>
            <span className="text-sm font-medium">{new Date(merchant.createdAt).toLocaleDateString("en-GB")}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-none border-slate-200/60 dark:border-slate-800">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold">Registered Address</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
            <span className="text-sm text-slate-500">Address</span>
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
          <div className="flex justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
            <span className="text-sm text-slate-500">Pincode</span>
            <span className="text-sm font-medium">{merchant.pincode}</span>
          </div>
          <div className="flex justify-between pb-1">
            <span className="text-sm text-slate-500">Country</span>
            <span className="text-sm font-medium">India</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
