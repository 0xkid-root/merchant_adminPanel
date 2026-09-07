import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Bell, ShieldAlert, CreditCard, Landmark, CheckCircle2 } from "lucide-react";

export default function NotificationsPage() {
  const alerts = [
    { icon: ShieldAlert, title: "High-value payout held for review", desc: "Payout PO-10045 (₹10,50,000) for M-1002 requires manual approval.", time: "10 mins ago", color: "text-amber-600", bg: "bg-amber-100 dark:bg-amber-900/30" },
    { icon: CreditCard, title: "Wallet balance critically low", desc: "Merchant M-1005 available balance is below ₹5,000.", time: "1 hour ago", color: "text-red-600", bg: "bg-red-100 dark:bg-red-900/30" },
    { icon: Landmark, title: "Settlement cycle completed", desc: "Batch STL-2001 has been processed successfully.", time: "3 hours ago", color: "text-emerald-600", bg: "bg-emerald-100 dark:bg-emerald-900/30" },
    { icon: Bell, title: "New API Key generated", desc: "Admin User (admin@atmoonpe.com) generated a new production key.", time: "Yesterday", color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-900/30" },
  ];

  return (
    <div className="flex flex-col gap-6 pb-8 max-w-4xl mx-auto w-full">
      <PageHeader
        title="Notifications & Alerts"
        description="System-wide operational alerts and notifications."
        actions={
          <Button variant="outline" className="h-10 rounded-xl bg-white shadow-sm dark:bg-slate-900">
            <CheckCircle2 className="mr-2 h-4 w-4 text-slate-400" />
            Mark all as read
          </Button>
        }
      />

      <div className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800">
          <h3 className="font-semibold text-slate-900 dark:text-white">Recent Alerts</h3>
        </div>
        <div className="flex flex-col">
          {alerts.map((alert, i) => (
            <div key={i} className={`flex items-start gap-4 p-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 ${i !== alerts.length - 1 ? 'border-b border-slate-100 dark:border-slate-800' : ''}`}>
              <div className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${alert.bg} ${alert.color}`}>
                <alert.icon className="h-5 w-5" />
              </div>
              <div className="flex flex-1 flex-col">
                <div className="flex justify-between items-start">
                  <span className="font-medium text-slate-900 dark:text-white">{alert.title}</span>
                  <span className="text-xs text-slate-500 whitespace-nowrap ml-4">{alert.time}</span>
                </div>
                <p className="mt-1 text-sm text-slate-500">{alert.desc}</p>
                <div className="mt-3 flex gap-2">
                  <Button variant="outline" size="sm" className="h-8">View Details</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
