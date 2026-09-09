import { Merchant } from "../../merchant.mock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function WalletTab({ merchant }: { merchant: Merchant }) {
  const formattedBalance = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(merchant.walletBalance);

  const availableBalance = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(merchant.walletBalance * 0.85);

  const blockedBalance = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(merchant.walletBalance * 0.15);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="shadow-none border-slate-200/60 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-slate-500">Wallet Balance</p>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{formattedBalance}</p>
          </CardContent>
        </Card>
        <Card className="shadow-none border-slate-200/60 dark:border-slate-800">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-slate-500">Available Balance</p>
            <p className="mt-2 text-3xl font-bold tracking-tight text-emerald-600">{availableBalance}</p>
          </CardContent>
        </Card>
        <Card className="shadow-none border-slate-200/60 dark:border-slate-800">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-slate-500">Blocked Amount</p>
            <p className="mt-2 text-3xl font-bold tracking-tight text-amber-600">{blockedBalance}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-none border-slate-200/60 dark:border-slate-800">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-base font-semibold">Recent Wallet Transactions</CardTitle>
          <Link href="#" className="text-sm font-medium text-primary hover:underline inline-flex items-center">
            View all <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-0 last:pb-0 dark:border-slate-800">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-slate-900 dark:text-white">
                    {i % 2 === 0 ? "Debit (Payout)" : "Credit (Settlement)"}
                  </span>
                  <span className="text-xs text-slate-500">Today, 10:24 AM</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className={`text-sm font-semibold tabular-nums ${i % 2 === 0 ? "text-slate-900 dark:text-white" : "text-emerald-600"}`}>
                    {i % 2 === 0 ? "-" : "+"}₹{Math.floor(Math.random() * 50000).toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-emerald-600 font-medium">Successful</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
