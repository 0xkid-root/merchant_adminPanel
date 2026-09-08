import { PageHeader } from "@/components/common/page-header";
import { StatCard } from "@/components/common/stat-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/common/status-badge";
import { Search, Filter, Landmark, Download, CheckCircle2 } from "lucide-react";

const MOCK_SETTLEMENTS = [
  { id: "STL-2001", merchantId: "M-1004", date: "2024-03-09", amount: 1450000, fees: 29000, net: 1421000, status: "SUCCESS" },
  { id: "STL-2002", merchantId: "M-1001", date: "2024-03-09", amount: 5500000, fees: 110000, net: 5390000, status: "SUCCESS" },
  { id: "STL-2003", merchantId: "M-1002", date: "2024-03-10", amount: 250000, fees: 5000, net: 245000, status: "PENDING" },
  { id: "STL-2004", merchantId: "M-1005", date: "2024-03-10", amount: 800000, fees: 16000, net: 784000, status: "PENDING" },
];

export default function SettlementPage() {
  return (
    <div className="flex flex-col gap-8 pb-8">
      <PageHeader
        title="Settlement Dashboard"
        description="Monitor daily settlement cycles and reconciliation status."
        actions={
          <Button variant="outline" className="h-10 rounded-xl bg-white shadow-sm dark:bg-slate-900">
            <Download className="mr-2 h-4 w-4" />
            Export T+1 Report
          </Button>
        }
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Pending Settlements (Today)" value="₹10.50 L" icon={Landmark} iconColorClass="text-amber-600" />
        <StatCard title="Processed (Yesterday)" value="₹69.50 L" icon={CheckCircle2} iconColorClass="text-emerald-600" />
        <StatCard title="Discrepancies" value="0" icon={Landmark} iconColorClass="text-primary" />
      </div>

      <div className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
        <div className="flex flex-col gap-4 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input placeholder="Search settlements..." className="h-10 w-full rounded-xl pl-9 bg-slate-50 border-slate-200 dark:bg-slate-900/50 dark:border-slate-800" />
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="h-10 rounded-xl"><Filter className="mr-2 h-4 w-4" />Date</Button>
            <Button variant="outline" size="sm" className="h-10 rounded-xl"><Filter className="mr-2 h-4 w-4" />Status</Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/50 hover:bg-slate-50/50 dark:bg-slate-800/20 dark:hover:bg-slate-800/20 border-slate-200 dark:border-slate-800">
              <TableHead>Batch ID</TableHead>
              <TableHead>Settlement Date</TableHead>
              <TableHead>Merchant</TableHead>
              <TableHead className="text-right">Gross Amount</TableHead>
              <TableHead className="text-right">Fees (Tax inc.)</TableHead>
              <TableHead className="text-right text-primary">Net Settlement</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_SETTLEMENTS.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium text-slate-900 dark:text-white">{item.id}</TableCell>
                <TableCell className="text-slate-500">{item.date}</TableCell>
                <TableCell>{item.merchantId}</TableCell>
                <TableCell className="text-right text-slate-500 font-medium">₹{(item.amount).toLocaleString()}</TableCell>
                <TableCell className="text-right text-red-500 font-medium">-₹{(item.fees).toLocaleString()}</TableCell>
                <TableCell className="text-right font-bold text-slate-900 dark:text-white">₹{(item.net).toLocaleString()}</TableCell>
                <TableCell><StatusBadge status={item.status} /></TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
