import { PageHeader } from "@/components/common/page-header";
import { StatCard } from "@/components/common/stat-card";
import { WalletService } from "@/features/wallet/services/wallet.service";
import { Wallet, ArrowDownCircle, ArrowUpCircle, Download, ArrowRightLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/common/status-badge";

export default async function WalletDashboardPage() {
  const overview = await WalletService.getOverview();
  const transactions = await WalletService.getTransactions();

  return (
    <div className="flex flex-col gap-8 pb-8">
      <PageHeader
        title="Wallet Dashboard"
        description="Monitor system-wide wallet balances and recent ledger activity."
        actions={
          <>
            <Button variant="outline" className="h-10 rounded-xl bg-white shadow-sm dark:bg-slate-900">
              <Download className="mr-2 h-4 w-4" />
              Statement
            </Button>
            <Button className="h-10 rounded-xl bg-primary text-white shadow-[0_2px_10px_rgba(99,102,241,0.2)]">
              Manual Adjustment
            </Button>
          </>
        }
      />

      {/* Overview Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Available Balance"
          value={`₹${(overview.availableBalance / 100000).toFixed(2)} L`}
          icon={Wallet}
          iconBgClass="bg-primary/10"
          iconColorClass="text-primary"
        />
        <StatCard
          title="Total Hold Balance"
          value={`₹${(overview.holdBalance / 100000).toFixed(2)} L`}
          icon={Wallet}
          iconBgClass="bg-amber-500/10"
          iconColorClass="text-amber-600"
          alertText="Held for processing"
        />
        <StatCard
          title="Total Credits (MTD)"
          value={`₹${(overview.totalCredits / 100000).toFixed(2)} L`}
          icon={ArrowDownCircle}
          iconBgClass="bg-emerald-500/10"
          iconColorClass="text-emerald-600"
        />
        <StatCard
          title="Total Debits (MTD)"
          value={`₹${(overview.totalDebits / 100000).toFixed(2)} L`}
          icon={ArrowUpCircle}
          iconBgClass="bg-red-500/10"
          iconColorClass="text-red-600"
        />
      </div>

      {/* Transactions Table */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Recent Transactions</h2>
          <Button variant="link" className="text-primary px-0">View All <ArrowRightLeft className="ml-1 h-4 w-4" /></Button>
        </div>
        
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/50 hover:bg-slate-50/50 dark:bg-slate-800/20 dark:hover:bg-slate-800/20 border-slate-200 dark:border-slate-800">
                <TableHead className="font-semibold text-slate-600 dark:text-slate-300">Transaction ID</TableHead>
                <TableHead className="font-semibold text-slate-600 dark:text-slate-300">Date & Time</TableHead>
                <TableHead className="font-semibold text-slate-600 dark:text-slate-300">Merchant ID</TableHead>
                <TableHead className="font-semibold text-slate-600 dark:text-slate-300">Type</TableHead>
                <TableHead className="font-semibold text-slate-600 dark:text-slate-300">Description</TableHead>
                <TableHead className="text-right font-semibold text-slate-600 dark:text-slate-300">Amount</TableHead>
                <TableHead className="font-semibold text-slate-600 dark:text-slate-300">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id} className="border-slate-200 dark:border-slate-800">
                  <TableCell className="font-medium text-slate-900 dark:text-white">{tx.id}</TableCell>
                  <TableCell className="text-slate-500">{new Date(tx.createdAt).toLocaleString()}</TableCell>
                  <TableCell>{tx.merchantId}</TableCell>
                  <TableCell>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-md ${
                      tx.type === 'CREDIT' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' 
                      : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'
                    }`}>
                      {tx.type}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate text-slate-600 dark:text-slate-400" title={tx.description}>
                    {tx.description}
                  </TableCell>
                  <TableCell className={`text-right font-medium ${
                    tx.type === 'CREDIT' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'
                  }`}>
                    {tx.type === 'CREDIT' ? '+' : '-'}₹{(tx.amount).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={tx.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
