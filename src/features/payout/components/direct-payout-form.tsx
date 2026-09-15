"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { DirectPayoutFormValues, PayoutMethod } from "../types/payout.types";
import { useCreateDirectPayoutMutation } from "../hooks/use-payouts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { formatINR } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

export function DirectPayoutForm() {
  const router = useRouter();
  const [step, setStep] = useState<"form" | "review">("form");
  const createMutation = useCreateDirectPayoutMutation();

  const { register, handleSubmit, watch, setValue, formState: { errors, isValid } } = useForm<DirectPayoutFormValues>({
    defaultValues: {
      amount: 0,
      method: "IMPS",
    },
  });

  const values = watch();
  const fee = 30; // Simulated slightly higher fee for direct payout

  const onSubmit = (data: DirectPayoutFormValues) => {
    if (step === "form") {
      setStep("review");
    } else {
      createMutation.mutate(data, {
        onSuccess: (result) => {
          toast.success("Direct payout submitted successfully");
          router.push(`/payout-management/${result.id}`);
        },
        onError: (error: any) => {
          toast.error(error.message || "Failed to create direct payout");
        }
      });
    }
  };

  return (
    <Card className="max-w-2xl mx-auto border-slate-200/60 shadow-sm dark:border-slate-800 bg-white dark:bg-slate-900">
      <CardHeader>
        <CardTitle>{step === "form" ? "Create Direct Payout" : "Review Direct Payout"}</CardTitle>
        <CardDescription>
          {step === "form" 
            ? "Send funds directly to a bank account without pre-registering a beneficiary." 
            : "Please review the payout details before confirming."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {step === "form" && (
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="merchantId">Select Merchant</Label>
                <Select onValueChange={(val) => setValue("merchantId", val)} value={values.merchantId}>
                  <SelectTrigger id="merchantId">
                    <SelectValue placeholder="Select a merchant" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MER-10248">ABC Technologies</SelectItem>
                    <SelectItem value="MER-10512">Quantum Logistics</SelectItem>
                    <SelectItem value="MER-10601">Swift Retail</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="accountHolderName">Account Holder Name</Label>
                <Input 
                  id="accountHolderName" 
                  placeholder="Enter full name as per bank"
                  {...register("accountHolderName", { required: true })} 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input 
                    id="accountNumber" 
                    placeholder="Enter account number"
                    {...register("accountNumber", { required: true })} 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="ifsc">IFSC Code</Label>
                  <Input 
                    id="ifsc" 
                    placeholder="Enter IFSC (e.g. HDFC0001234)"
                    {...register("ifsc", { required: true })} 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="amount">Amount (₹)</Label>
                  <Input 
                    id="amount" 
                    type="number" 
                    min="1"
                    placeholder="Enter amount"
                    {...register("amount", { required: true, valueAsNumber: true, min: 1 })} 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="method">Payout Method</Label>
                  <Select onValueChange={(val) => setValue("method", val as PayoutMethod)} value={values.method}>
                    <SelectTrigger id="method">
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IMPS">IMPS</SelectItem>
                      <SelectItem value="NEFT">NEFT</SelectItem>
                      <SelectItem value="RTGS">RTGS</SelectItem>
                      <SelectItem value="UPI">UPI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="reference">Reference ID (Optional)</Label>
                <Input 
                  id="reference" 
                  placeholder="e.g. INV-2026-09"
                  {...register("reference")} 
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="remarks">Remarks (Optional)</Label>
                <Textarea 
                  id="remarks" 
                  placeholder="Add any internal remarks..."
                  {...register("remarks")} 
                />
              </div>
            </div>
          )}

          {step === "review" && (
            <div className="space-y-4 rounded-lg bg-slate-50 dark:bg-slate-900/50 p-6 border border-slate-100 dark:border-slate-800">
              <div className="grid grid-cols-2 gap-y-4 text-sm">
                <div className="text-slate-500">Merchant</div>
                <div className="font-medium text-right">{values.merchantId}</div>
                
                <div className="text-slate-500">Account Holder</div>
                <div className="font-medium text-right">{values.accountHolderName}</div>

                <div className="text-slate-500">Bank Details</div>
                <div className="font-medium text-right flex flex-col items-end">
                  <span>{values.accountNumber}</span>
                  <span className="text-xs text-slate-500">{values.ifsc}</span>
                </div>
                
                <div className="text-slate-500">Payout Method</div>
                <div className="font-medium text-right">{values.method}</div>
                
                <div className="col-span-2 my-2 border-b border-slate-200 dark:border-slate-800" />
                
                <div className="text-slate-500">Amount</div>
                <div className="font-medium text-right">{formatINR(values.amount)}</div>
                
                <div className="text-slate-500">Estimated Fee</div>
                <div className="font-medium text-right text-slate-500">{formatINR(fee)}</div>
                
                <div className="col-span-2 my-2 border-b border-slate-200 dark:border-slate-800" />
                
                <div className="text-slate-900 dark:text-slate-50 font-semibold">Net Deduction</div>
                <div className="font-bold text-right text-emerald-600 dark:text-emerald-400">
                  {formatINR(values.amount + fee)}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            {step === "review" ? (
              <>
                <Button type="button" variant="outline" onClick={() => setStep("form")} disabled={createMutation.isPending}>
                  Back to Edit
                </Button>
                <Button type="submit" disabled={createMutation.isPending}>
                  {createMutation.isPending ? "Processing..." : "Confirm Direct Payout"}
                </Button>
              </>
            ) : (
              <Button type="submit" disabled={!isValid || !values.merchantId || !values.amount}>
                Review Payout
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
