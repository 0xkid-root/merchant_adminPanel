import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/common/status-badge";
import { Search, Plus } from "lucide-react";

const MOCK_FEES = [
  { id: "FEE-001", planName: "Standard Tier 1", applicableTo: "M-1001, M-1002", type: "PAYOUT_IMPS", amount: "₹5.00", percentage: "0%", status: "ACTIVE" },
  { id: "FEE-002", planName: "Standard Tier 2", applicableTo: "M-1004", type: "PAYOUT_IMPS", amount: "₹3.50", percentage: "0.1%", status: "ACTIVE" },
  { id: "FEE-003", planName: "Default Payout", applicableTo: "Global", type: "PAYOUT_NEFT", amount: "₹2.00", percentage: "0%", status: "ACTIVE" },
  { id: "FEE-004", planName: "Custom High Vol", applicableTo: "M-1005", type: "SETTLEMENT", amount: "₹0.00", percentage: "1.5%", status: "PENDING" },
];

export default function FeesPage() {
  return (
    <div className="flex flex-col gap-6 pb-8">
      <PageHeader
        title="Fees & Pricing Rules"
        description="Manage global and merchant-specific pricing plans."
        actions={
          <Button className="h-10 rounded-xl bg-primary text-white shadow-[0_2px_10px_rgba(99,102,241,0.2)]">
            <Plus className="mr-2 h-4 w-4" />
            Create Rule
          </Button>
        }
      />

      <div className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
        <div className="flex flex-col gap-4 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input placeholder="Search rules..." className="h-10 w-full rounded-xl pl-9 bg-slate-50 border-slate-200 dark:bg-slate-900/50 dark:border-slate-800" />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/50 hover:bg-slate-50/50 dark:bg-slate-800/20 dark:hover:bg-slate-800/20 border-slate-200 dark:border-slate-800">
              <TableHead>Rule ID</TableHead>
              <TableHead>Plan Name</TableHead>
              <TableHead>Applicable Merchants</TableHead>
              <TableHead>Transaction Type</TableHead>
              <TableHead className="text-right">Fixed Fee</TableHead>
              <TableHead className="text-right">Variable (%)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_FEES.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium text-slate-900 dark:text-white">{item.id}</TableCell>
                <TableCell className="font-medium">{item.planName}</TableCell>
                <TableCell className="text-slate-500">{item.applicableTo}</TableCell>
                <TableCell>
                   <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                     {item.type}
                   </span>
                </TableCell>
                <TableCell className="text-right font-medium">{item.amount}</TableCell>
                <TableCell className="text-right font-medium">{item.percentage}</TableCell>
                <TableCell><StatusBadge status={item.status} /></TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
