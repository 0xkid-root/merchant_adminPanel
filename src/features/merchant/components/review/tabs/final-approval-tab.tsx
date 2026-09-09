import { Merchant } from "../../../merchant.mock";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { CheckCircle2, CircleDashed, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ReviewApprovalDialog } from "../review-approval-dialog";

export function FinalApprovalTab({ merchant }: { merchant: Merchant }) {
  const [dialogConfig, setDialogConfig] = useState<{ isOpen: boolean; type: "APPROVE" | "REJECT" | null }>({
    isOpen: false,
    type: null,
  });

  const isComplete = merchant.completionPercentage === 100;
  const isKycApproved = merchant.kycStatus === "APPROVED";

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Summary Column */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="shadow-none border-slate-200/60 dark:border-slate-800">
          <CardHeader className="pb-4 border-b border-slate-100 dark:border-slate-800">
            <CardTitle className="text-base font-semibold">Review Summary</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-slate-500">Merchant Name</p>
                <p className="mt-1 font-semibold text-slate-900 dark:text-white">{merchant.businessName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Merchant ID</p>
                <p className="mt-1 font-semibold text-slate-900 dark:text-white">{merchant.merchantCode}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Business Type</p>
                <p className="mt-1 font-semibold text-slate-900 dark:text-white">{merchant.businessType}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">KYC Status</p>
                <p className={`mt-1 font-semibold ${isKycApproved ? "text-emerald-600" : "text-amber-500"}`}>
                  {isKycApproved ? "Verified" : merchant.kycStatus}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none border-slate-200/60 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Admin Responsibility Notice</h4>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  By approving this merchant, you confirm that all submitted documents have been reviewed and comply with the platform's KYC and AML guidelines. This action is recorded in the audit log.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Checklist & Actions Column */}
      <div className="space-y-6">
        <Card className="shadow-none border-slate-200/60 dark:border-slate-800">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold">Review Checklist</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Basic Details</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Business Details</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Business Documents</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">KYC Documents</span>
              {isKycApproved ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              ) : (
                <CircleDashed className="h-4 w-4 text-amber-500 animate-pulse" />
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3 pt-6 border-t border-slate-100 dark:border-slate-800">
            <Button 
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={() => setDialogConfig({ isOpen: true, type: "APPROVE" })}
            >
              Approve Merchant
            </Button>
            <Button 
              variant="outline" 
              className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300 dark:border-red-900/50 dark:hover:bg-red-900/20"
              onClick={() => setDialogConfig({ isOpen: true, type: "REJECT" })}
            >
              Reject Merchant
            </Button>
          </CardFooter>
        </Card>
      </div>

      <ReviewApprovalDialog 
        isOpen={dialogConfig.isOpen}
        type={dialogConfig.type}
        merchant={merchant}
        onClose={() => setDialogConfig({ isOpen: false, type: null })}
      />
    </div>
  );
}
