import { Merchant } from "../../../merchant.mock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function BusinessDetailsTab({ merchant }: { merchant: Merchant }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="shadow-none border-slate-200/60 dark:border-slate-800">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold">Business Identity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
            <span className="text-sm text-slate-500">Legal Business Name</span>
            <span className="text-sm font-medium">{merchant.businessName}</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
            <span className="text-sm text-slate-500">Constitution Type</span>
            <span className="text-sm font-medium">{merchant.businessType}</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
            <span className="text-sm text-slate-500">Nature of Business</span>
            <span className="text-sm font-medium">Digital Services / Software</span>
          </div>
          <div className="flex justify-between pb-1">
            <span className="text-sm text-slate-500">Website</span>
            <a href={`https://www.${merchant.businessName.toLowerCase().replace(/\s/g, '')}.com`} target="_blank" rel="noreferrer" className="text-sm font-medium text-primary hover:underline">
              www.{merchant.businessName.toLowerCase().replace(/\s/g, '')}.com
            </a>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-none border-slate-200/60 dark:border-slate-800">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold">Tax & Registration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
            <span className="text-sm text-slate-500">PAN Number</span>
            <span className="text-sm font-medium">{merchant.pan}</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
            <span className="text-sm text-slate-500">GST Number</span>
            <span className="text-sm font-medium">{merchant.gst || "Not Registered"}</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
            <span className="text-sm text-slate-500">CIN / Registration No.</span>
            <span className="text-sm font-medium">U72900MH2021PTC{Math.floor(Math.random() * 90000) + 10000}</span>
          </div>
          <div className="flex justify-between pb-1">
            <span className="text-sm text-slate-500">Incorporation Date</span>
            <span className="text-sm font-medium">12 Jan 2021</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
