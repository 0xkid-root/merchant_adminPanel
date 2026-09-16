"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Server, Building, Landmark, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { formatCurrency, getReconciliationById } from '../api/mock';

export function ReconciliationDetailsPage({ id = 'REC-1002' }: { id?: string }) {
  const { data: record, isLoading } = useQuery({
    queryKey: ['reconciliation', id],
    queryFn: () => getReconciliationById(id)
  });

  if (isLoading || !record) {
    return <div className="p-8 text-center text-slate-500">Loading reconciliation details...</div>;
  }

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto p-4 md:p-6 pb-20">
      <div className="flex items-center gap-4">
        <Link href="/settlement/reconciliation">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Reconciliation #{record.id}</h1>
            {record.status === 'Matched' ? (
              <Badge variant="default" className="bg-emerald-500 hover:bg-emerald-600">MATCHED</Badge>
            ) : record.status === 'Mismatch' ? (
              <Badge variant="destructive">MISMATCH</Badge>
            ) : (
              <Badge variant="secondary">{record.status.toUpperCase()}</Badge>
            )}
          </div>
          <p className="text-slate-500 mt-1">Transaction ID: {record.transactionId} • Merchant: {record.merchantName}</p>
        </div>
        {record.status === 'Mismatch' && (
          <div className="ml-auto flex gap-3">
            <Button variant="outline">Mark as Investigating</Button>
            <Button>Resolve Mismatch</Button>
          </div>
        )}
      </div>

      <div className="mt-8 relative">
        {/* Connection Lines (Desktop only) */}
        <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[2px] bg-slate-200 dark:bg-slate-800 -z-10"></div>
        <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 w-[2px] h-[150px] bg-slate-200 dark:bg-slate-800 -z-10"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Internal System */}
          <div className={`flex w-full flex-col rounded-xl border-2 bg-white p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.01)] relative ${record.status === 'Mismatch' ? 'border-amber-200 dark:border-amber-900/50 dark:bg-slate-900' : 'border-emerald-200 dark:border-emerald-900/50 dark:bg-slate-900'}`}>
            <div className={`absolute -top-4 left-1/2 -translate-x-1/2 p-2 rounded-full ${record.status === 'Mismatch' ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-600' : 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600'}`}>
              <Server className="w-6 h-6" />
            </div>
            <div className="text-center pt-8 pb-4">
              <h3 className="text-[16px] font-semibold text-slate-900 dark:text-white">Internal System</h3>
            </div>
            <div className="space-y-4 text-center">
              <div>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{formatCurrency(record.internalAmount)}</p>
                <p className="text-[12px] font-medium text-slate-500 mt-1">Internal Record Amount</p>
              </div>
              <div className="text-sm space-y-2 bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3 text-left">
                <div className="flex justify-between">
                  <span className="text-slate-500">Transaction ID</span>
                  <span className="font-mono text-xs">{record.transactionId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Payout ID</span>
                  <span className="font-mono text-xs">{record.payoutId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Timestamp</span>
                  <span>{new Date(record.internalTimestamp).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bank Record */}
          <div className={`flex w-full flex-col rounded-xl border-2 bg-white p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.01)] relative mt-12 lg:mt-0 ${record.status === 'Mismatch' ? 'border-red-200 dark:border-red-900/50 dark:bg-slate-900' : 'border-emerald-200 dark:border-emerald-900/50 dark:bg-slate-900'}`}>
            <div className={`absolute -top-4 left-1/2 -translate-x-1/2 p-2 rounded-full ${record.status === 'Mismatch' ? 'bg-red-100 dark:bg-red-900/50 text-red-600' : 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600'}`}>
              <Landmark className="w-6 h-6" />
            </div>
            <div className="text-center pt-8 pb-4">
              <h3 className="text-[16px] font-semibold text-slate-900 dark:text-white">Bank Record</h3>
            </div>
            <div className="space-y-4 text-center">
              <div>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{formatCurrency(record.bankAmount)}</p>
                <p className="text-[12px] font-medium text-slate-500 mt-1">Bank Statement Amount</p>
              </div>
              <div className="text-sm space-y-2 bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3 text-left">
                <div className="flex justify-between">
                  <span className="text-slate-500">Bank Ref</span>
                  <span className="font-mono text-xs">{record.bankReference || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">UTR</span>
                  <span className="font-mono text-xs text-blue-600">{record.bankUtr || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Timestamp</span>
                  <span>{record.bankTimestamp ? new Date(record.bankTimestamp).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '-'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Partner */}
          <div className={`flex w-full flex-col rounded-xl border-2 bg-white p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.01)] relative mt-12 lg:mt-0 ${record.status === 'Mismatch' ? 'border-red-200 dark:border-red-900/50 dark:bg-slate-900' : 'border-emerald-200 dark:border-emerald-900/50 dark:bg-slate-900'}`}>
            <div className={`absolute -top-4 left-1/2 -translate-x-1/2 p-2 rounded-full ${record.status === 'Mismatch' ? 'bg-red-100 dark:bg-red-900/50 text-red-600' : 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600'}`}>
              <Building className="w-6 h-6" />
            </div>
            <div className="text-center pt-8 pb-4">
              <h3 className="text-[16px] font-semibold text-slate-900 dark:text-white">Payment Partner</h3>
            </div>
            <div className="space-y-4 text-center">
              <div>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{formatCurrency(record.partnerAmount)}</p>
                <p className="text-[12px] font-medium text-slate-500 mt-1">Provider Report Amount</p>
              </div>
              <div className="text-sm space-y-2 bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3 text-left">
                <div className="flex justify-between">
                  <span className="text-slate-500">Partner Ref</span>
                  <span className="font-mono text-xs">{record.partnerReference || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Status</span>
                  <span className="text-emerald-600 font-medium">Success</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Timestamp</span>
                  <span>{record.partnerTimestamp ? new Date(record.partnerTimestamp).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '-'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto pt-10">
        <div className={`flex w-full flex-col rounded-xl border-2 shadow-[0_1px_2px_0_rgba(0,0,0,0.01)] ${record.difference === 0 ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/10' : 'border-red-500 bg-red-50 dark:bg-red-900/10'}`}>
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {record.difference === 0 ? (
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 rounded-full">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
              ) : (
                <div className="p-3 bg-red-100 dark:bg-red-900/50 text-red-600 rounded-full">
                  <AlertCircle className="w-8 h-8" />
                </div>
              )}
              <div>
                <h3 className={`text-xl font-bold ${record.difference === 0 ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-700 dark:text-red-400'}`}>
                  {record.difference === 0 ? 'Fully Matched' : 'Amount Mismatch'}
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  {record.difference === 0 
                    ? 'Internal, Bank, and Partner amounts align perfectly.' 
                    : 'There is a discrepancy between the internal system and external reports.'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-slate-500 mb-1">Difference</p>
              <p className={`text-3xl font-bold ${record.difference === 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {formatCurrency(record.difference)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
