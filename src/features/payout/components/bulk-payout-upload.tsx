"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UploadCloud, CheckCircle2, AlertTriangle, FileSpreadsheet, Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { formatINR } from "@/lib/utils";
import { BulkPayoutUploadResponse } from "../types/payout.types";

export function BulkPayoutUpload() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [step, setStep] = useState<"upload" | "validating" | "preview">("upload");
  const [file, setFile] = useState<File | null>(null);
  const [validationResult, setValidationResult] = useState<BulkPayoutUploadResponse | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return;
    setStep("validating");
    
    // Simulate validation latency
    setTimeout(() => {
      setValidationResult({
        totalRecords: 100,
        validRecords: 94,
        invalidRecords: 4,
        duplicateRecords: 2,
        preview: [
          { row: 1, merchantId: "MER-10248", beneficiaryId: "BEN000124", amount: 25000, method: "IMPS", validationStatus: "Valid" },
          { row: 2, merchantId: "MER-10512", beneficiaryId: "BEN000188", amount: 50000, method: "NEFT", validationStatus: "Valid" },
          { row: 3, merchantId: "MER-10601", beneficiaryId: "BEN000201", amount: 0, method: "UPI", validationStatus: "Invalid", error: "Amount must be greater than 0" },
          { row: 4, merchantId: "MER-10248", beneficiaryId: "BEN000124", amount: 25000, method: "IMPS", validationStatus: "Duplicate", error: "Duplicate payout detected in last 24h" },
        ]
      });
      setStep("preview");
    }, 1500);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate submission latency
    setTimeout(() => {
      toast.success("Bulk payout submitted successfully");
      queryClient.invalidateQueries({ queryKey: ["payouts"] });
      router.push("/payout-management");
    }, 2000);
  };

  const calculateTotalValidAmount = () => {
    // Just a mock calculation based on valid records count for UI demonstration
    return (validationResult?.validRecords || 0) * 25000;
  };

  return (
    <Card className="max-w-4xl mx-auto border-slate-200/60 shadow-sm dark:border-slate-800 bg-white dark:bg-slate-900">
      <CardHeader>
        <CardTitle>Bulk Payout</CardTitle>
        <CardDescription>
          Upload a CSV or XLSX file to process multiple payouts in a single batch.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {step === "upload" && (
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-12 text-center bg-slate-50 dark:bg-slate-900/50">
            <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
              <UploadCloud className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-slate-50">Upload Payout File</h3>
            <p className="text-sm text-slate-500 mb-6 max-w-sm">
              Drag and drop your CSV or Excel file here, or click to browse files from your computer.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative">
                <input 
                  type="file" 
                  accept=".csv,.xlsx" 
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Button variant="outline" type="button" className="w-[200px]">
                  {file ? file.name : "Select File"}
                </Button>
              </div>
              <Button onClick={handleUpload} disabled={!file} className="w-[200px]">
                Validate File
              </Button>
            </div>
            
            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">
              <FileSpreadsheet className="h-4 w-4" />
              Download Template
            </div>
          </div>
        )}

        {step === "validating" && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="h-10 w-10 animate-spin text-blue-600 mb-4" />
            <h3 className="text-lg font-medium text-slate-900 dark:text-slate-50">Validating Records</h3>
            <p className="text-sm text-slate-500 mt-2">Checking formats, balances, and checking for duplicates...</p>
          </div>
        )}

        {step === "preview" && validationResult && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-100 dark:border-slate-800">
                <div className="text-sm text-slate-500 mb-1">Total Records</div>
                <div className="text-2xl font-bold">{validationResult.totalRecords}</div>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-900/10 p-4 rounded-lg border border-emerald-100 dark:border-emerald-900/30">
                <div className="text-sm text-emerald-600 dark:text-emerald-400 mb-1">Valid Records</div>
                <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  {validationResult.validRecords}
                </div>
              </div>
              <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-lg border border-red-100 dark:border-red-900/30">
                <div className="text-sm text-red-600 dark:text-red-400 mb-1">Invalid Records</div>
                <div className="text-2xl font-bold text-red-700 dark:text-red-300 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  {validationResult.invalidRecords}
                </div>
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/10 p-4 rounded-lg border border-amber-100 dark:border-amber-900/30">
                <div className="text-sm text-amber-600 dark:text-amber-400 mb-1">Duplicates</div>
                <div className="text-2xl font-bold text-amber-700 dark:text-amber-300 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  {validationResult.duplicateRecords}
                </div>
              </div>
            </div>

            <div className="border rounded-md overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">Row</th>
                    <th className="px-4 py-3 text-left font-medium">Merchant</th>
                    <th className="px-4 py-3 text-left font-medium">Beneficiary</th>
                    <th className="px-4 py-3 text-right font-medium">Amount</th>
                    <th className="px-4 py-3 text-left font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {validationResult.preview.map((row) => (
                    <tr key={row.row} className="bg-white dark:bg-slate-900">
                      <td className="px-4 py-3 text-slate-500">{row.row}</td>
                      <td className="px-4 py-3">{row.merchantId}</td>
                      <td className="px-4 py-3">{row.beneficiaryId}</td>
                      <td className="px-4 py-3 text-right">{formatINR(row.amount)}</td>
                      <td className="px-4 py-3">
                        {row.validationStatus === "Valid" && (
                          <span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full text-xs font-medium">Valid</span>
                        )}
                        {row.validationStatus === "Invalid" && (
                          <div className="flex flex-col">
                            <span className="text-red-600 bg-red-50 px-2 py-1 rounded-full text-xs font-medium w-fit mb-1">Invalid</span>
                            <span className="text-xs text-red-500">{row.error}</span>
                          </div>
                        )}
                        {row.validationStatus === "Duplicate" && (
                          <div className="flex flex-col">
                            <span className="text-amber-600 bg-amber-50 px-2 py-1 rounded-full text-xs font-medium w-fit mb-1">Duplicate</span>
                            <span className="text-xs text-amber-500">{row.error}</span>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="bg-slate-50 dark:bg-slate-900/50 p-3 text-center text-xs text-slate-500 border-t">
                Showing first 4 rows of {validationResult.totalRecords}
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 p-4 rounded-lg flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-blue-900 dark:text-blue-100">Ready for Submission</h4>
                <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                  {validationResult.validRecords} payouts will be processed for a total of approximately {formatINR(calculateTotalValidAmount())}.
                  Invalid and duplicate records will be skipped.
                </p>
              </div>
              <Button onClick={handleSubmit} disabled={isSubmitting} className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white">
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {isSubmitting ? "Processing..." : "Submit Bulk Payout"}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
