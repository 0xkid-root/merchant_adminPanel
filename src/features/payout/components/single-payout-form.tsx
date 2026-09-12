"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { SinglePayoutFormValues, PayoutMethod } from "../types/payout.types";
import { useCreateSinglePayoutMutation } from "../hooks/use-payouts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { formatINR } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

export function SinglePayoutForm() {
  const router = useRouter();
  const [step, setStep] = useState<"form" | "review">("form");
  const createMutation = useCreateSinglePayoutMutation();

  const { register, handleSubmit, watch, setValue, formState: { errors, isValid } } = useForm<SinglePayoutFormValues>({
    defaultValues: {
      amount: 0,
      method: "IMPS",
    },
  });

  const values = watch();
  const fee = 25; // Simulated fee calculation based on amount/method

  const onSubmit = (data: SinglePayoutFormValues) => {
    if (step === "form") {
      setStep("review");
    } else {
      createMutation.mutate(data, {
        onSuccess: (result) => {
          toast.success("Payout created successfully");
          router.push(`/payout-management/${result.id}`);
        },
        onError: (error: any) => {
          toast.error(error.message || "Failed to create payout");
        }
      });
    }
  };

  return (
    <Card className="max-w-2xl mx-auto border-slate-200/60 shadow-sm dark:border-slate-800 bg-white dark:bg-slate-900">
      <CardHeader>
        <CardTitle>{step === "form" ? "Create Single Payout" : "Review Payout"}</CardTitle>
        <CardDescription>
          {step === "form" 
            ? "Process a payout for an existing merchant beneficiary." 
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
                <Label htmlFor="beneficiaryId">Select Beneficiary</Label>
                <Select 
                  onValueChange={(val) => setValue("beneficiaryId", val)} 
                  value={values.beneficiaryId}
                  disabled={!values.merchantId}
                >
                  <SelectTrigger id="beneficiaryId">
                    <SelectValue placeholder={values.merchantId ? "Select a beneficiary" : "Select merchant first"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BEN000124">Rahul Sharma (HDFC - 4567)</SelectItem>
                    <SelectItem value="BEN000188">Amit Kumar (ICICI - 8899)</SelectItem>
                  </SelectContent>
                </Select>
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
                
                <div className="text-slate-500">Beneficiary</div>
                <div className="font-medium text-right">{values.beneficiaryId}</div>
                
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
                  {createMutation.isPending ? "Processing..." : "Confirm Payout"}
                </Button>
              </>
            ) : (
              <Button type="submit" disabled={!isValid || !values.merchantId || !values.beneficiaryId || !values.amount}>
                Review Payout
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
