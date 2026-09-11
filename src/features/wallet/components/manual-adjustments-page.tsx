"use client";

import { PageHeader } from "@/components/common/page-header";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useManualAdjustmentsQuery, useCreateManualAdjustment, useWalletsQuery } from "../queries";
import { AlertCircle, FileText, CheckCircle2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/common/status-badge";
import { Textarea } from "@/components/ui/textarea";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};

export function ManualAdjustmentsPage() {
  const { data: adjustments, isLoading: isAdjustmentsLoading } = useManualAdjustmentsQuery();
  const { data: wallets, isLoading: isWalletsLoading } = useWalletsQuery();
  const createMutation = useCreateManualAdjustment();

  // Form State
  const [selectedWalletId, setSelectedWalletId] = useState("");
  const [type, setType] = useState<"Credit" | "Debit">("Credit");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [remarks, setRemarks] = useState("");

  const selectedWallet = wallets?.find(w => w.id === selectedWalletId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWalletId || !amount || !reason) return;

    createMutation.mutate(
      {
        walletId: selectedWalletId,
        merchantName: selectedWallet?.merchantName || "",
        type,
        amount: parseFloat(amount),
        reason,
        remarks,
      },
      {
        onSuccess: () => {
          setSelectedWalletId("");
          setType("Credit");
          setAmount("");
          setReason("");
          setRemarks("");
        }
      }
    );
  };

  return (
    <div className="flex flex-col gap-8 pb-8">
      <PageHeader
        title="Manual Wallet Adjustment"
        description="Submit manual wallet adjustments for maker-checker review."
      />

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="rounded-xl border border-slate-200/60 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 p-6">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
              <AlertCircle className="h-5 w-5" />
              <h2 className="font-semibold">Adjustment Details</h2>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Merchant Wallet <span className="text-red-500">*</span></label>
                <Select value={selectedWalletId} onValueChange={setSelectedWalletId}>
                  <SelectTrigger className="w-full bg-slate-50 dark:bg-slate-900/50">
                    <SelectValue placeholder="Select a merchant wallet" />
                  </SelectTrigger>
                  <SelectContent>
                    {wallets?.map(w => (
                      <SelectItem key={w.id} value={w.id}>{w.merchantName} ({w.id})</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedWallet && (
                <div className="bg-slate-50 dark:bg-slate-800/30 rounded-lg p-3 flex justify-between items-center text-sm">
                  <span className="text-slate-500">Available Balance:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{formatCurrency(selectedWallet.availableBalance)}</span>
                </div>
              )}

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Adjustment Type <span className="text-red-500">*</span></label>
                <div className="grid grid-cols-2 gap-3">
                  <div 
                    className={`border rounded-lg p-3 cursor-pointer flex flex-col gap-1 items-center justify-center transition-colors ${type === "Credit" ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400" : "border-slate-200 text-slate-500 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50"}`}
                    onClick={() => setType("Credit")}
                  >
                    <span className="font-semibold">Credit</span>
                    <span className="text-xs opacity-80 text-center">Add funds</span>
                  </div>
                  <div 
                    className={`border rounded-lg p-3 cursor-pointer flex flex-col gap-1 items-center justify-center transition-colors ${type === "Debit" ? "border-red-500 bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400" : "border-slate-200 text-slate-500 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50"}`}
                    onClick={() => setType("Debit")}
                  >
                    <span className="font-semibold">Debit</span>
                    <span className="text-xs opacity-80 text-center">Deduct funds</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Amount (₹) <span className="text-red-500">*</span></label>
                <Input 
                  type="number" 
                  placeholder="0.00" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-900/50 text-lg font-semibold h-12"
                  min="1"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Reason for Adjustment <span className="text-red-500">*</span></label>
                <Select value={reason} onValueChange={setReason}>
                  <SelectTrigger className="w-full bg-slate-50 dark:bg-slate-900/50">
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Refund for failed payout fee">Refund for failed payout fee</SelectItem>
                    <SelectItem value="Setup fee deduction">Setup fee deduction</SelectItem>
                    <SelectItem value="Promotional credit">Promotional credit</SelectItem>
                    <SelectItem value="Correction of previous entry">Correction of previous entry</SelectItem>
                    <SelectItem value="Chargeback deduction">Chargeback deduction</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Remarks / Reference Ticket</label>
                <Textarea 
                  placeholder="Provide any additional context or ticket references..."
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-900/50 resize-none"
                  rows={3}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full mt-4 h-12 bg-primary hover:bg-primary/90 text-white"
                disabled={!selectedWalletId || !amount || !reason || createMutation.isPending}
              >
                {createMutation.isPending ? "Submitting..." : "Submit for Approval"}
              </Button>

              <div className="mt-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200/50 dark:border-amber-900/30 rounded-lg p-3 text-xs text-amber-700 dark:text-amber-500 text-center">
                Submitting this form will create a pending request that must be approved by another administrator before the wallet is modified.
              </div>
            </form>
          </div>

          <div className="rounded-xl border border-slate-200/60 bg-slate-50 shadow-sm dark:border-slate-800 dark:bg-slate-900/50 p-6 flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Maker-Checker Workflow
            </h3>
            <div className="flex flex-col gap-4 relative before:absolute before:inset-y-2 before:left-[11px] before:w-0.5 before:bg-slate-200 dark:before:bg-slate-700">
              <div className="flex gap-4 relative z-10">
                <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0 border-2 border-white dark:border-slate-900 dark:bg-indigo-900/50 dark:text-indigo-400">
                  <span className="text-[10px] font-bold">1</span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-900 dark:text-white">Adjustment Created</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Maker submits the details.</p>
                </div>
              </div>
              <div className="flex gap-4 relative z-10">
                <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center flex-shrink-0 border-2 border-white dark:border-slate-900 dark:bg-slate-800 dark:text-slate-400">
                  <span className="text-[10px] font-bold">2</span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-900 dark:text-white">Pending Approval</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Checker reviews the request.</p>
                </div>
              </div>
              <div className="flex gap-4 relative z-10">
                <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center flex-shrink-0 border-2 border-white dark:border-slate-900 dark:bg-slate-800 dark:text-slate-400">
                  <span className="text-[10px] font-bold">3</span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-900 dark:text-white">Approved</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Ledger entry is created.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* History Table */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="h-5 w-5 text-slate-400" />
              Adjustment History
            </h2>
          </div>

          <div className="rounded-xl border border-slate-200/60 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 overflow-hidden flex-1">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50/50 dark:bg-slate-900/50">
                  <TableRow className="hover:bg-transparent border-slate-100 dark:border-slate-800">
                    <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-slate-500">ID / Date</TableHead>
                    <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-slate-500">Merchant</TableHead>
                    <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-slate-500">Details</TableHead>
                    <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right">Amount</TableHead>
                    <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isAdjustmentsLoading ? (
                    Array(4).fill(0).map((_, i) => (
                      <TableRow key={i} className="border-slate-100 dark:border-slate-800/50">
                        <TableCell colSpan={5} className="p-5">
                          <div className="h-5 w-full bg-slate-100 dark:bg-slate-800 rounded animate-pulse"></div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : adjustments?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-32 text-center text-slate-500">
                        No adjustment history found.
                      </TableCell>
                    </TableRow>
                  ) : adjustments?.map((adj) => (
                    <TableRow key={adj.id} className="border-slate-100 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <TableCell className="p-4 px-5">
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-900 dark:text-white text-[13px]">{adj.id}</span>
                          <span className="text-[12px] text-slate-500">{new Date(adj.createdDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</span>
                        </div>
                      </TableCell>
                      <TableCell className="p-4 px-5">
                        <div className="flex flex-col">
                          <span className="font-medium text-slate-700 dark:text-slate-300 text-[13px]">{adj.merchantName}</span>
                          <span className="text-[12px] text-slate-500 font-mono">{adj.walletId}</span>
                        </div>
                      </TableCell>
                      <TableCell className="p-4 px-5">
                        <div className="flex flex-col max-w-[200px]">
                          <span className="text-[13px] text-slate-700 dark:text-slate-300 truncate" title={adj.reason}>{adj.reason}</span>
                          <span className="text-[12px] text-slate-500 truncate">{adj.createdBy}</span>
                        </div>
                      </TableCell>
                      <TableCell className="p-4 px-5 text-right">
                        <div className="flex flex-col items-end gap-1">
                          <span className={`font-semibold tabular-nums text-[13px] ${
                            adj.type === "Credit" ? "text-emerald-600" : "text-red-600"
                          }`}>
                            {adj.type === "Credit" ? "+" : "-"}{formatCurrency(adj.amount)}
                          </span>
                          <span className={`inline-flex items-center rounded border px-1.5 py-0 text-[10px] font-semibold ${
                            adj.type === "Credit" ? "border-emerald-200/50 bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10" : "border-red-200/50 bg-red-50 text-red-600 dark:bg-red-500/10"
                          }`}>
                            {adj.type}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="p-4 px-5">
                        <StatusBadge status={adj.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
