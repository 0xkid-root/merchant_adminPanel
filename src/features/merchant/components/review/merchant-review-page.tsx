"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useMerchantDetailsQuery } from "../../hooks/use-merchant-details-query";

// Import Tabs
import { BasicDetailsTab } from "./tabs/basic-details-tab";
import { BusinessDetailsTab } from "./tabs/business-details-tab";
import { BusinessDocumentsTab } from "./tabs/business-documents-tab";
import { KycDocumentsTab } from "./tabs/kyc-documents-tab";
import { FinalApprovalTab } from "./tabs/final-approval-tab";

const tabs = [
  { id: "basic", label: "Basic Details" },
  { id: "business", label: "Business Details" },
  { id: "documents", label: "Business Documents" },
  { id: "kyc", label: "KYC Documents" },
  { id: "approval", label: "Final Approval" },
];

export function MerchantReviewPage({ merchantId }: { merchantId: string }) {
  const { data: merchant, isLoading, isError } = useMerchantDetailsQuery(merchantId);
  const [activeTab, setActiveTab] = useState("basic");

  if (isLoading) {
    return <div className="p-8 text-center text-slate-500">Loading merchant details for review...</div>;
  }

  if (isError || !merchant) {
    return (
      <div className="p-8 text-center text-red-500">
        <p>Failed to load merchant details.</p>
        <Link href="/merchants" className="text-primary hover:underline mt-2 inline-block">Back to Merchants</Link>
      </div>
    );
  }

  const KycBadge = ({ status }: { status: string }) => {
    if (status === "APPROVED") return <Badge className="bg-emerald-50 text-emerald-600 border-emerald-200/50"><CheckCircle2 className="mr-1 h-3 w-3" /> Verified</Badge>;
    if (status === "PENDING") return <Badge className="bg-amber-50 text-amber-600 border-amber-200/50">Pending</Badge>;
    return <Badge className="bg-red-50 text-red-600 border-red-200/50">Rejected</Badge>;
  };

  const StatusBadge = ({ status }: { status: string }) => {
    if (status === "ACTIVE") return <Badge className="bg-emerald-50 text-emerald-600 border-emerald-200/50">Active</Badge>;
    if (status === "INACTIVE") return <Badge className="bg-amber-50 text-amber-600 border-amber-200/50">Inactive</Badge>;
    return <Badge className="bg-red-50 text-red-600 border-red-200/50">Suspended</Badge>;
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col items-start gap-4">
          <Link href="/merchants">
            <Button variant="ghost" size="sm" className="h-8 text-slate-500 hover:text-slate-900 -ml-2">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Merchants
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Merchant Review
              </h1>
              <KycBadge status={merchant.kycStatus} />
              <StatusBadge status={merchant.status} />
            </div>
            <p className="mt-1 text-sm text-slate-500 max-w-2xl">
              Review merchant information and documents before making an approval decision.
            </p>
          </div>
        </div>
      </div>

      {/* Merchant Summary Card */}
      <div className="rounded-xl border border-slate-200/60 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-[13px] font-medium text-slate-500">Business Name</p>
            <p className="mt-1 font-semibold text-slate-900 dark:text-white">{merchant.businessName}</p>
          </div>
          <div>
            <p className="text-[13px] font-medium text-slate-500">Merchant ID / MID</p>
            <p className="mt-1 font-medium text-slate-900 dark:text-white">{merchant.merchantCode}</p>
          </div>
          <div>
            <p className="text-[13px] font-medium text-slate-500">Completion</p>
            <div className="mt-1 flex items-center gap-2">
              <div className="h-2 w-24 rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className={`h-full rounded-full ${merchant.completionPercentage === 100 ? 'bg-emerald-500' : 'bg-primary'}`}
                  style={{ width: `${merchant.completionPercentage}%` }}
                />
              </div>
              <span className="text-sm font-medium">{merchant.completionPercentage}%</span>
            </div>
          </div>
          <div>
            <p className="text-[13px] font-medium text-slate-500">Created Date</p>
            <p className="mt-1 font-medium text-slate-900 dark:text-white">
              {new Date(merchant.createdAt).toLocaleDateString("en-GB")}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex space-x-1 border-b border-slate-200 dark:border-slate-800 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors border-b-2 ${activeTab === tab.id
              ? "border-primary text-primary"
              : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-300"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="pt-2">
        {activeTab === "basic" && <BasicDetailsTab merchant={merchant} />}
        {activeTab === "business" && <BusinessDetailsTab merchant={merchant} />}
        {activeTab === "documents" && <BusinessDocumentsTab merchant={merchant} />}
        {activeTab === "kyc" && <KycDocumentsTab merchant={merchant} />}
        {activeTab === "approval" && <FinalApprovalTab merchant={merchant} />}
      </div>
    </div>
  );
}
