import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/common/status-badge";
import { Search, Filter } from "lucide-react";

const MOCK_BENEFICIARIES = [
  { id: "BEN-00123", merchantId: "M-1001", name: "Ravi Kumar", account: "XXXX-5566", ifsc: "HDFC0001234", status: "VERIFIED", active: true },
  { id: "BEN-00124", merchantId: "M-1001", name: "Priya Singh", account: "XXXX-9988", ifsc: "ICIC0008888", status: "VERIFIED", active: true },
  { id: "BEN-00125", merchantId: "M-1002", name: "Amit Sharma", account: "XXXX-1122", ifsc: "SBIN0004567", status: "PENDING", active: false },
  { id: "BEN-00126", merchantId: "M-1005", name: "Neha Gupta", account: "XXXX-4433", ifsc: "UTIB0005555", status: "REJECTED", active: false },
];

export default function BeneficiariesPage() {
  return (
    <div className="flex flex-col gap-6 pb-8">
      <PageHeader
        title="Beneficiary Monitoring"
        description="Monitor end-user beneficiaries added by merchants."
      />

      <div className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
        <div className="flex flex-col gap-4 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input placeholder="Search beneficiaries..." className="h-10 w-full rounded-xl pl-9 bg-slate-50 border-slate-200 dark:bg-slate-900/50 dark:border-slate-800" />
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="h-10 rounded-xl"><Filter className="mr-2 h-4 w-4" />Verification</Button>
            <Button variant="outline" size="sm" className="h-10 rounded-xl"><Filter className="mr-2 h-4 w-4" />Status</Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/50 hover:bg-slate-50/50 dark:bg-slate-800/20 dark:hover:bg-slate-800/20 border-slate-200 dark:border-slate-800">
              <TableHead>Beneficiary ID</TableHead>
              <TableHead>Merchant</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Account Details</TableHead>
              <TableHead>Verification</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_BENEFICIARIES.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium text-slate-900 dark:text-white">{item.id}</TableCell>
                <TableCell>{item.merchantId}</TableCell>
                <TableCell className="font-medium text-slate-900 dark:text-white">{item.name}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-mono text-sm">{item.account}</span>
                    <span className="text-xs text-slate-500 font-mono">{item.ifsc}</span>
                  </div>
                </TableCell>
                <TableCell><StatusBadge status={item.status} /></TableCell>
                <TableCell>
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${item.active ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'}`}>
                    {item.active ? "ACTIVE" : "INACTIVE"}
                  </span>
                </TableCell>
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
