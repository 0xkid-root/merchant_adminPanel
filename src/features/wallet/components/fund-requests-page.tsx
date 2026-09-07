import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/common/status-badge";
import { Search, Filter, CheckCircle2, XCircle } from "lucide-react";

const MOCK_FUND_REQUESTS = [
  { id: "FR-10023", merchantId: "M-1004", amount: 500000, bankRef: "HDFC98239120", status: "PENDING", date: "2024-03-10T14:30:00Z" },
  { id: "FR-10022", merchantId: "M-1001", amount: 1500000, bankRef: "ICICI1234567", status: "SUCCESS", date: "2024-03-09T10:15:00Z" },
  { id: "FR-10021", merchantId: "M-1002", amount: 200000, bankRef: "AXIS5432198", status: "REJECTED", date: "2024-03-08T16:45:00Z" },
];

export default function FundRequestsPage() {
  return (
    <div className="flex flex-col gap-6 pb-8">
      <PageHeader
        title="Fund Requests"
        description="Review and approve merchant fund deposit requests."
      />

      <div className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
        <div className="flex flex-col gap-4 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input placeholder="Search requests..." className="h-10 w-full rounded-xl pl-9 bg-slate-50 border-slate-200 dark:bg-slate-900/50 dark:border-slate-800" />
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="h-10 rounded-xl"><Filter className="mr-2 h-4 w-4" />Status</Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/50 hover:bg-slate-50/50 dark:bg-slate-800/20 dark:hover:bg-slate-800/20 border-slate-200 dark:border-slate-800">
              <TableHead>Request ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Merchant</TableHead>
              <TableHead>Bank Ref</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_FUND_REQUESTS.map((req) => (
              <TableRow key={req.id}>
                <TableCell className="font-medium text-slate-900 dark:text-white">{req.id}</TableCell>
                <TableCell className="text-slate-500">{new Date(req.date).toLocaleString()}</TableCell>
                <TableCell>{req.merchantId}</TableCell>
                <TableCell className="font-mono text-xs">{req.bankRef}</TableCell>
                <TableCell className="text-right font-medium">₹{(req.amount).toLocaleString()}</TableCell>
                <TableCell><StatusBadge status={req.status} /></TableCell>
                <TableCell className="text-right">
                  {req.status === "PENDING" ? (
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" className="text-emerald-600 hover:bg-emerald-50"><CheckCircle2 className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="text-red-600 hover:bg-red-50"><XCircle className="h-4 w-4" /></Button>
                    </div>
                  ) : (
                    <Button variant="ghost" size="sm">View</Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
