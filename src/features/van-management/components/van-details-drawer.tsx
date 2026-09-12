"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { VanAccount } from "../types/van.types";
import { CheckCircle2, XCircle, PauseCircle, Activity } from "lucide-react";
import { useState } from "react";
import { VanStatusDialog } from "./van-status-dialog";

interface VanDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  van: VanAccount;
}

export function VanDetailsDrawer({ isOpen, onClose, van }: VanDetailsDrawerProps) {
  const [statusAction, setStatusAction] = useState<"Activate" | "Deactivate" | "Suspend" | null>(null);

  const maskAccountNumber = (acc: string) => {
    if (acc.length < 8) return acc;
    return `XXXX XXXX ${acc.slice(-4)}`;
  };

  const InfoRow = ({ label, value, monospace }: { label: string, value: string | React.ReactNode, monospace?: boolean }) => (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium text-slate-500">{label}</span>
      <span className={`text-[13px] text-slate-900 dark:text-white ${monospace ? 'font-mono font-medium' : 'font-semibold'}`}>
        {value || "-"}
      </span>
    </div>
  );

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-slate-50 dark:bg-slate-950">
          <DialogHeader className="p-6 pb-4 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
            <DialogTitle className="text-lg font-bold text-slate-900 dark:text-white">
              Virtual Account Details
            </DialogTitle>
          </DialogHeader>

          <div className="p-6 overflow-y-auto max-h-[70vh] flex flex-col gap-8">

            {/* VAN Information */}
            <div className="space-y-4">
              <h3 className="text-[13px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 dark:border-slate-800 pb-2">
                VAN Information
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <InfoRow label="VAN Number" value={van.vanNumber} monospace />
                <InfoRow label="Account Type" value={van.accountType} />
                <InfoRow 
                  label="Assigned Date" 
                  value={new Date(van.assignedAt).toLocaleString('en-GB')} 
                />
                <InfoRow label="Current Status" value={
                  <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${
                    van.status === 'Active' ? 'border-emerald-200/50 bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10' :
                    van.status === 'Inactive' ? 'border-slate-200/50 bg-slate-50 text-slate-600 dark:bg-slate-500/10' :
                    van.status === 'Suspended' ? 'border-red-200/50 bg-red-50 text-red-600 dark:bg-red-500/10' :
                    'border-amber-200/50 bg-amber-50 text-amber-600 dark:bg-amber-500/10'
                  }`}>
                    {van.status}
                  </span>
                } />
              </div>
            </div>

            {/* Merchant Information */}
            <div className="space-y-4">
              <h3 className="text-[13px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 dark:border-slate-800 pb-2">
                Merchant Information
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <InfoRow label="Merchant Name" value={van.merchantName} />
                <InfoRow label="Merchant ID" value={van.merchantId} monospace />
                <InfoRow label="Business Name" value={van.businessName} />
              </div>
            </div>

            {/* Banking Information */}
            <div className="space-y-4">
              <h3 className="text-[13px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 dark:border-slate-800 pb-2">
                Banking Information
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <InfoRow label="Bank / Provider" value={van.provider} />
                <InfoRow label="IFSC Code" value={van.ifsc} monospace />
                <InfoRow label="Currency" value={van.currency} />
              </div>
            </div>

            {/* Activity */}
            <div className="space-y-4">
              <h3 className="text-[13px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 dark:border-slate-800 pb-2">
                Recent Activity
              </h3>
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Activity className="h-4 w-4 text-slate-400" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-slate-900 dark:text-white">Last Status Update</p>
                  <p className="text-[12px] text-slate-500">{new Date(van.lastActivityAt).toLocaleString('en-GB')}</p>
                </div>
              </div>
            </div>

          </div>

          {/* Actions Footer */}
          <div className="p-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
            {van.status === 'Active' ? (
              <>
                <Button 
                  variant="outline" 
                  className="border-amber-200 text-amber-700 hover:bg-amber-50 hover:text-amber-800 dark:border-amber-900/50 dark:hover:bg-amber-900/20 dark:text-amber-500"
                  onClick={() => setStatusAction("Suspend")}
                >
                  <PauseCircle className="mr-2 h-4 w-4" />
                  Suspend
                </Button>
                <Button 
                  variant="outline"
                  className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800 dark:border-red-900/50 dark:hover:bg-red-900/20 dark:text-red-500"
                  onClick={() => setStatusAction("Deactivate")}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Deactivate
                </Button>
              </>
            ) : (
              <Button 
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                onClick={() => setStatusAction("Activate")}
              >
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Activate Account
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {statusAction && (
        <VanStatusDialog 
          isOpen={!!statusAction}
          onClose={() => setStatusAction(null)}
          van={van}
          action={statusAction}
        />
      )}
    </>
  );
}
