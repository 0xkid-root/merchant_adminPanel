import { Merchant } from "../../../merchant.mock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Eye, CheckCircle2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function KycDocumentsTab({ merchant }: { merchant: Merchant }) {
  const isKycApproved = merchant.kycStatus === "APPROVED";

  const documents = [
    {
      id: "kyc_1",
      name: "Company PAN Card",
      type: "Identity Proof",
      number: merchant.pan ? `${merchant.pan.substring(0, 5)}XXXX${merchant.pan.substring(9)}` : "Not provided",
      verifiedName: merchant.businessName,
      status: "VERIFIED",
    },
    {
      id: "kyc_2",
      name: "Director Aadhaar",
      type: "Address & ID Proof",
      number: "XXXX XXXX 4821",
      verifiedName: merchant.ownerName,
      status: isKycApproved ? "VERIFIED" : "PENDING",
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="shadow-none border-slate-200/60 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-500">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">KYC Verification Status</h3>
              <p className="text-sm text-slate-500 mt-0.5">
                {isKycApproved 
                  ? "Identity and business verifications have been successfully completed." 
                  : "Some KYC documents are still pending manual verification."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {documents.map((doc) => (
          <Card key={doc.id} className="shadow-none border-slate-200/60 dark:border-slate-800">
            <CardHeader className="pb-4 flex flex-row items-center justify-between border-b border-slate-100 dark:border-slate-800">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <FileText className="h-4 w-4 text-slate-400" />
                {doc.name}
              </CardTitle>
              {doc.status === "VERIFIED" ? (
                <Badge className="bg-emerald-50 text-emerald-600 border-emerald-200/50">Verified</Badge>
              ) : (
                <Badge className="bg-amber-50 text-amber-600 border-amber-200/50">Pending</Badge>
              )}
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Document Type</p>
                    <p className="mt-1 text-sm font-medium text-slate-900 dark:text-white">{doc.type}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Document Number</p>
                    <p className="mt-1 text-sm font-medium text-slate-900 dark:text-white tracking-widest">{doc.number}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Verified Name</p>
                    <p className="mt-1 text-sm font-medium text-slate-900 dark:text-white">{doc.verifiedName}</p>
                  </div>
                </div>
                
                <div className="flex flex-col justify-center items-center rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-900/50 h-[180px]">
                  <FileText className="h-8 w-8 text-slate-400 mb-3" />
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400 text-center mb-4">Secure Document Preview</p>
                  <Button variant="outline" size="sm" className="h-8">
                    <Eye className="mr-2 h-3.5 w-3.5" /> View Securely
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
