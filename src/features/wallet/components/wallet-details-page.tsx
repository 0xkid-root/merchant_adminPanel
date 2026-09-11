"use client";

import { useWalletQuery, useTransactionsQuery, useFreezeWallet } from "../queries";
import { ArrowLeft, Wallet as WalletIcon, Snowflake, AlertCircle, RefreshCw, ChevronRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/common/status-badge";
import Link from "next/link";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { WalletStatus } from "../types/wallet.types";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};

export function WalletDetailsPage({ walletId }: { walletId: string }) {
  const { data: wallet, isLoading: isWalletLoading } = useWalletQuery(walletId);
  const { data: transactions, isLoading: isTxLoading } = useTransactionsQuery(walletId);
  const freezeMutation = useFreezeWallet();

  const [isFreezeDialogOpen, setIsFreezeDialogOpen] = useState(false);
  const [optimisticStatus, setOptimisticStatus] = useState<WalletStatus | null>(null);

  const displayStatus = optimisticStatus || wallet?.status;

  const handleFreeze = () => {
    freezeMutation.mutate(walletId, {
      onSuccess: () => {
        setOptimisticStatus("Frozen");
        setIsFreezeDialogOpen(false);
      }
    });
  };

  if (isWalletLoading) {
    return (
      <div className="flex flex-col gap-6 pb-8">
        <div className="h-6 w-32 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
        <div className="h-24 w-full bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-32 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" />
          <div className="h-32 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" />
          <div className="h-32 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" />
        </div>
      </div>
    );
  }

  if (!wallet) {
    return (
      <div className="flex flex-col gap-6 pb-8 items-center justify-center min-h-[400px]">
        <AlertCircle className="h-12 w-12 text-slate-300 dark:text-slate-600 mb-4" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Wallet Not Found</h2>
        <p className="text-slate-500">The wallet you are looking for does not exist.</p>
        <Link href="/wallet/all">
          <Button variant="outline" className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Wallets
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Back Navigation */}
      <div>
        <Link href="/wallet/all" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All Wallets
        </Link>
      </div>

      {/* Wallet Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-1">
            Wallet Details
          </h1>
          <p className="text-lg font-medium text-slate-700 dark:text-slate-300">
            {wallet.merchantName}
          </p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-2 text-sm text-slate-500">
            <span>Merchant ID: <span className="font-mono text-slate-700 dark:text-slate-300">{wallet.merchantId}</span></span>
            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
            <span>Wallet ID: <span className="font-mono text-slate-700 dark:text-slate-300">{wallet.id}</span></span>
            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
            <StatusBadge status={displayStatus || "Active"} />
          </div>
        </div>
        
        {displayStatus !== "Frozen" && displayStatus !== "Closed" && (
          <Button 
            variant="outline" 
            className="border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 hover:text-amber-800 dark:border-amber-900/30 dark:bg-amber-900/20 dark:text-amber-500 dark:hover:bg-amber-900/40"
            onClick={() => setIsFreezeDialogOpen(true)}
          >
            <Snowflake className="mr-2 h-4 w-4" />
            Freeze Wallet
          </Button>
        )}
      </div>

      {/* Balance Summary */}
      <div className="grid sm:grid-cols-3 gap-5">
        <div className="rounded-xl border border-slate-200/60 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm font-semibold text-slate-500">Total Balance</p>
          <div className="mt-2 flex items-baseline gap-2">
            <p className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{formatCurrency(wallet.totalBalance)}</p>
          </div>
        </div>
        <div className="rounded-xl border border-emerald-200/50 bg-emerald-50/30 p-6 shadow-sm dark:border-emerald-900/30 dark:bg-emerald-900/10">
          <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-500">Available Balance</p>
          <div className="mt-2 flex items-baseline gap-2">
            <p className="text-2xl lg:text-3xl font-bold text-emerald-700 dark:text-emerald-400 tracking-tight">{formatCurrency(wallet.availableBalance)}</p>
          </div>
        </div>
        <div className="rounded-xl border border-amber-200/50 bg-amber-50/30 p-6 shadow-sm dark:border-amber-900/30 dark:bg-amber-900/10">
          <p className="text-sm font-semibold text-amber-700 dark:text-amber-500">Hold Balance</p>
          <div className="mt-2 flex items-baseline gap-2">
            <p className="text-2xl lg:text-3xl font-bold text-amber-700 dark:text-amber-400 tracking-tight">{formatCurrency(wallet.holdBalance)}</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Wallet Information */}
        <div className="flex flex-col gap-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 pb-2 border-b border-slate-200 dark:border-slate-800">
            Wallet Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8">
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">Wallet ID</p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white font-mono">{wallet.id}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">Merchant ID</p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white font-mono">{wallet.merchantId}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-xs font-medium text-slate-500 mb-1">Merchant</p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{wallet.merchantName}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">Wallet Type</p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{wallet.walletType}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">Currency</p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{wallet.currency}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">Status</p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{displayStatus}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">Created</p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {new Date(wallet.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">Last Activity</p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {new Date(wallet.lastActivityAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })},{' '}
                {new Date(wallet.lastActivityAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">KYC Status</p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{wallet.kycStatus}</p>
            </div>
          </div>
        </div>

        {/* Operational Status */}
        <div className="flex flex-col gap-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 pb-2 border-b border-slate-200 dark:border-slate-800">
            Wallet Operational Status
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8">
            <div className="sm:col-span-2">
              <p className="text-xs font-medium text-slate-500 mb-1">Transaction Status</p>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${displayStatus === 'Frozen' ? 'bg-red-500' : wallet.transactionEnabled ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {displayStatus === 'Frozen' ? 'Disabled (Frozen)' : wallet.transactionEnabled ? 'Enabled' : 'Disabled'}
                </p>
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">Credit Status</p>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${displayStatus === 'Frozen' ? 'bg-red-500' : wallet.creditEnabled ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {displayStatus === 'Frozen' ? 'Disabled' : wallet.creditEnabled ? 'Enabled' : 'Disabled'}
                </p>
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">Withdrawal Status</p>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${displayStatus === 'Frozen' ? 'bg-red-500' : wallet.withdrawalEnabled ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {displayStatus === 'Frozen' ? 'Disabled' : wallet.withdrawalEnabled ? 'Enabled' : 'Disabled'}
                </p>
              </div>
            </div>
            <div className="sm:col-span-2 pt-2">
              <p className="text-xs font-medium text-slate-500 mb-1">Hold Amount</p>
              <p className="text-lg font-bold text-amber-600 dark:text-amber-500">{formatCurrency(wallet.holdBalance)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
            Recent Wallet Activity
          </h2>
          <Link href="/wallet/transactions">
            <Button variant="link" className="text-primary h-auto p-0 text-sm font-medium">
              View All Transactions <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="rounded-xl border border-slate-200/60 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50/50 dark:bg-slate-900/50">
                <TableRow className="hover:bg-transparent border-slate-100 dark:border-slate-800">
                  <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-slate-500">Transaction ID</TableHead>
                  <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-slate-500">Type</TableHead>
                  <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right">Amount</TableHead>
                  <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right">Balance</TableHead>
                  <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</TableHead>
                  <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-slate-500">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isTxLoading ? (
                  Array(3).fill(0).map((_, i) => (
                    <TableRow key={i} className="border-slate-100 dark:border-slate-800/50">
                      <TableCell colSpan={6} className="p-4">
                        <div className="h-5 w-full bg-slate-100 dark:bg-slate-800 rounded animate-pulse"></div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : transactions?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center text-slate-500">
                      No recent activity.
                    </TableCell>
                  </TableRow>
                ) : transactions?.slice(0, 5).map((tx) => (
                  <TableRow key={tx.id} className="border-slate-100 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <TableCell className="px-5 font-semibold text-slate-900 dark:text-white text-[13px]">{tx.id}</TableCell>
                    <TableCell className="px-5">
                      <span className={`inline-flex items-center rounded border px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider ${
                        tx.type === 'Credit' ? 'border-emerald-200/50 bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10' :
                        tx.type === 'Debit' || tx.type === 'Withdrawal' || tx.type === 'Payout' ? 'border-red-200/50 bg-red-50 text-red-600 dark:bg-red-500/10' :
                        'border-indigo-200/50 bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10'
                      }`}>
                        {tx.type}
                      </span>
                    </TableCell>
                    <TableCell className={`px-5 text-right text-[13px] font-bold tabular-nums ${
                      tx.type === 'Credit' ? 'text-emerald-600 dark:text-emerald-500' : 
                      tx.type === 'Debit' || tx.type === 'Withdrawal' || tx.type === 'Payout' ? 'text-red-600 dark:text-red-500' : 'text-slate-900 dark:text-white'
                    }`}>
                      {tx.type === 'Credit' ? '+' : tx.type === 'Debit' || tx.type === 'Withdrawal' || tx.type === 'Payout' ? '-' : ''}
                      {formatCurrency(tx.amount)}
                    </TableCell>
                    <TableCell className="px-5 text-right text-[13px] font-semibold text-slate-600 dark:text-slate-400 tabular-nums">
                      {formatCurrency(tx.balanceAfter)}
                    </TableCell>
                    <TableCell className="px-5">
                      <StatusBadge status={tx.status} />
                    </TableCell>
                    <TableCell className="px-5 text-[13px] text-slate-500 font-medium">
                      {new Date(tx.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Freeze Confirmation Dialog */}
      <Dialog open={isFreezeDialogOpen} onOpenChange={setIsFreezeDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-500">
              <AlertCircle className="h-5 w-5" />
              Freeze Wallet?
            </DialogTitle>
            <DialogDescription className="pt-3 text-slate-600 dark:text-slate-300">
              Are you sure you want to freeze this wallet? New wallet transactions will be restricted until the wallet is activated again.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg my-2 border border-slate-100 dark:border-slate-800">
            <p className="text-sm text-slate-500 mb-1">Merchant: <span className="font-semibold text-slate-900 dark:text-white">{wallet?.merchantName}</span></p>
            <p className="text-sm text-slate-500">Wallet ID: <span className="font-mono font-medium text-slate-900 dark:text-white">{wallet?.id}</span></p>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsFreezeDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="default" 
              className="bg-amber-600 hover:bg-amber-700 text-white"
              onClick={handleFreeze}
              disabled={freezeMutation.isPending}
            >
              {freezeMutation.isPending ? "Freezing..." : "Freeze Wallet"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
