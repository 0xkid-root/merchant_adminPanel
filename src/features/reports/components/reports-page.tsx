import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar, Filter } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-8 pb-8">
      <PageHeader
        title="Reports"
        description="Generate and download customized operational and financial reports."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Report Card 1 */}
        <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600">
              <FileText className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Transaction Report</h3>
              <p className="mt-1 text-sm text-slate-500">Detailed list of all payouts and inward transfers.</p>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-3">
             <Button variant="outline" className="w-full justify-start rounded-xl border-slate-200 dark:border-slate-800">
                <Calendar className="mr-2 h-4 w-4 text-slate-400" />
                Select Date Range
             </Button>
             <Button className="w-full rounded-xl bg-primary text-white shadow-sm">
                <Download className="mr-2 h-4 w-4" />
                Generate & Download
             </Button>
          </div>
        </div>

        {/* Report Card 2 */}
        <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
              <FileText className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Wallet Ledger</h3>
              <p className="mt-1 text-sm text-slate-500">Full wallet debit and credit history for merchants.</p>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-3">
             <Button variant="outline" className="w-full justify-start rounded-xl border-slate-200 dark:border-slate-800">
                <Filter className="mr-2 h-4 w-4 text-slate-400" />
                Select Merchant
             </Button>
             <Button className="w-full rounded-xl bg-primary text-white shadow-sm">
                <Download className="mr-2 h-4 w-4" />
                Generate & Download
             </Button>
          </div>
        </div>

        {/* Report Card 3 */}
        <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
              <FileText className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Settlement Report</h3>
              <p className="mt-1 text-sm text-slate-500">Daily settlement batches, fees deducted, and net transfers.</p>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-3">
             <Button variant="outline" className="w-full justify-start rounded-xl border-slate-200 dark:border-slate-800">
                <Calendar className="mr-2 h-4 w-4 text-slate-400" />
                Select Date Range
             </Button>
             <Button className="w-full rounded-xl bg-primary text-white shadow-sm">
                <Download className="mr-2 h-4 w-4" />
                Generate & Download
             </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
