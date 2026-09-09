import { Merchant } from "../../merchant.mock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export function BeneficiariesTab({ merchant }: { merchant: Merchant }) {
  const dummyBeneficiaries = [
    { name: "Rahul Sharma", account: "•••• 4521", status: "ACTIVE" },
    { name: "Amit Kumar", account: "•••• 8214", status: "ACTIVE" },
    { name: "Priya Singh", account: "•••• 9012", status: "INACTIVE" },
    { name: "Neha Gupta", account: "•••• 3341", status: "ACTIVE" },
    { name: "Vikram Malhotra", account: "•••• 7762", status: "DELETED" },
  ];

  return (
    <div className="space-y-6">
      <Card className="shadow-none border-slate-200/60 dark:border-slate-800">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div className="flex items-center gap-3">
            <CardTitle className="text-base font-semibold">Saved Beneficiaries</CardTitle>
            <Badge variant="secondary" className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              {merchant.totalBeneficiaries} Total
            </Badge>
          </div>
          <Link href="/beneficiaries" className="text-sm font-medium text-primary hover:underline inline-flex items-center">
            View all beneficiaries <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </CardHeader>
        <CardContent>
          {merchant.totalBeneficiaries === 0 ? (
            <div className="text-center py-8 text-sm text-slate-500">
              No beneficiaries found.
            </div>
          ) : (
            <div className="rounded-md border border-slate-200 dark:border-slate-800">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 dark:bg-slate-900/50">
                  <tr className="border-b border-slate-200 dark:border-slate-800">
                    <th className="h-10 px-4 text-left font-medium text-slate-500">Beneficiary</th>
                    <th className="h-10 px-4 text-left font-medium text-slate-500">Account</th>
                    <th className="h-10 px-4 text-left font-medium text-slate-500">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyBeneficiaries.map((b, i) => (
                    <tr key={i} className="border-b border-slate-100 last:border-0 dark:border-slate-800/50">
                      <td className="p-4 font-medium text-slate-900 dark:text-white">{b.name}</td>
                      <td className="p-4 text-slate-600 dark:text-slate-400 font-medium tabular-nums">{b.account}</td>
                      <td className="p-4">
                        {b.status === "ACTIVE" ? (
                          <span className="inline-flex items-center rounded-full border border-emerald-200/50 bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-600">Active</span>
                        ) : b.status === "INACTIVE" ? (
                          <span className="inline-flex items-center rounded-full border border-amber-200/50 bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-600">Inactive</span>
                        ) : (
                          <span className="inline-flex items-center rounded-full border border-red-200/50 bg-red-50 px-2 py-0.5 text-[11px] font-semibold text-red-600">Deleted</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
