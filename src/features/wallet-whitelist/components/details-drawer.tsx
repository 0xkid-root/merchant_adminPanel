"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { WhitelistRequest } from "../types/wallet-whitelist.types";
import { ExternalLink, Check, X } from "lucide-react";
import { useState } from "react";
import { ApproveDialog } from "./approve-dialog";
import { RejectDialog } from "./reject-dialog";

interface DetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  request: WhitelistRequest;
}

export function DetailsDrawer({ isOpen, onClose, request }: DetailsDrawerProps) {
  const [isApproveOpen, setIsApproveOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);

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
              Whitelist Request Details
            </DialogTitle>
          </DialogHeader>

          <div className="p-6 overflow-y-auto max-h-[70vh] flex flex-col gap-8">

            {/* Status Banner */}
            {request.status === 'Rejected' && (
              <div className="p-4 rounded-lg bg-red-50 border border-red-200/60 dark:bg-red-500/10 dark:border-red-500/20">
                <h4 className="text-[13px] font-bold text-red-700 dark:text-red-400 mb-1">Request Rejected</h4>
                <p className="text-[13px] text-red-600 dark:text-red-300/80">Reason: {request.rejectionReason}</p>
              </div>
            )}

            {/* Merchant Information */}
            <div className="space-y-4">
              <h3 className="text-[13px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 dark:border-slate-800 pb-2">
                Merchant Information
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <InfoRow label="Merchant Name" value={request.merchantName} />
                <InfoRow label="Merchant ID" value={request.merchantId} monospace />
                <InfoRow label="Business Name" value={request.businessName} />
              </div>
            </div>

            {/* Bank Account Information */}
            <div className="space-y-4">
              <h3 className="text-[13px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 dark:border-slate-800 pb-2">
                Bank Account Information
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <InfoRow label="Account Holder" value={request.accountHolderName} />
                <InfoRow label="Bank Name" value={request.bankName} />
                <InfoRow label="Account Number" value={maskAccountNumber(request.accountNumber)} monospace />
                <InfoRow label="IFSC Code" value={request.ifsc} monospace />
                <InfoRow label="Account Type" value={request.accountType} />
              </div>
            </div>

            {/* Request Information */}
            <div className="space-y-4">
              <h3 className="text-[13px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 dark:border-slate-800 pb-2">
                Request Information
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <InfoRow label="Request ID" value={request.id} monospace />
                <InfoRow
                  label="Requested Date"
                  value={new Date(request.requestedAt).toLocaleString('en-GB')}
                />
                <InfoRow label="Submitted By" value={request.submittedBy} />
                <InfoRow label="Current Status" value={
                  <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-bold ${request.status === 'Approved' ? 'border-emerald-200/50 bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10' :
                      request.status === 'Rejected' ? 'border-red-200/50 bg-red-50 text-red-600 dark:bg-red-500/10' :
                        'border-amber-200/50 bg-amber-50 text-amber-600 dark:bg-amber-500/10'
                    }`}>
                    {request.status}
                  </span>
                } />
              </div>
            </div>

            {/* Supporting Document */}
            <div className="space-y-4">
              <h3 className="text-[13px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 dark:border-slate-800 pb-2">
                Supporting Document
              </h3>
              <div className="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-[13px] font-bold text-slate-900 dark:text-white mb-0.5">{request.documentType}</p>
                  <p className="text-xs text-slate-500">Document provided for verification</p>
                </div>
                <Button variant="outline" size="sm" className="h-8">
                  <ExternalLink className="mr-2 h-3.5 w-3.5" />
                  View Document
                </Button>
              </div>
            </div>

          </div>

          {/* Actions Footer */}
          {request.status === 'Pending' && (
            <div className="p-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
              <Button
                variant="outline"
                className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800 dark:border-red-900/50 dark:hover:bg-red-900/20 dark:text-red-500"
                onClick={() => setIsRejectOpen(true)}
              >
                <X className="mr-2 h-4 w-4" />
                Reject
              </Button>
              <Button
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                onClick={() => setIsApproveOpen(true)}
              >
                <Check className="mr-2 h-4 w-4" />
                Approve
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <ApproveDialog
        isOpen={isApproveOpen}
        onClose={() => setIsApproveOpen(false)}
        request={request}
        onSuccess={onClose}
      />

      <RejectDialog
        isOpen={isRejectOpen}
        onClose={() => setIsRejectOpen(false)}
        request={request}
        onSuccess={onClose}
      />
    </>
  );
}
