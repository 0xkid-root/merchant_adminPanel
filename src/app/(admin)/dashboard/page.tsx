import { Wallet, Store, Activity, AlertCircle, ArrowRightLeft, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8 pb-8">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">Dashboard Overview</h1>
          <p className="mt-1 text-sm text-slate-500">
            Real-time insights and operational status for AtMoonPe platform.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-10 rounded-xl bg-white shadow-sm dark:bg-slate-900">
            Export Report
          </Button>
          <Button className="h-10 rounded-xl bg-primary text-white shadow-[0_2px_10px_rgba(99,102,241,0.2)]">
            Fund Wallet
          </Button>
        </div>
      </div>

      {/* Core Metrics Row */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Metric 1: Wallet Balance */}
        <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ring-1 ring-slate-100/50 transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-slate-500">Wallet Balance</span>
              <span className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">₹12.45 Cr</span>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Wallet className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
            <span className="flex items-center text-emerald-600 font-medium">
              +₹2.1 Cr
            </span>
            <span>Available for payouts</span>
          </div>
        </div>

        {/* Metric 2: Today's Payouts */}
        <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ring-1 ring-slate-100/50 transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-slate-500">Today's Payouts</span>
              <span className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">₹8.45 Cr</span>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
              <ArrowRightLeft className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
            <span className="font-medium text-slate-700 dark:text-slate-300">1,284</span>
            <span>processed transactions</span>
          </div>
        </div>

        {/* Metric 3: Total Merchants */}
        <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ring-1 ring-slate-100/50 transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-slate-500">Active Merchants</span>
              <span className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">412</span>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600">
              <Store className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
            <span className="flex items-center text-emerald-600 font-medium">
              +12
            </span>
            <span>onboarded this week</span>
          </div>
        </div>

        {/* Metric 4: Alerts/Approvals */}
        <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ring-1 ring-slate-100/50 transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-slate-500">Pending Approvals</span>
              <span className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">24</span>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
              <Clock className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
            <span className="font-medium text-amber-600">Requires attention</span>
            <span>in queue</span>
          </div>
        </div>
      </div>

      {/* Secondary Row: Charts & Activity */}
      <div className="grid gap-5 lg:grid-cols-3">
        {/* Chart Placeholder */}
        <div className="flex min-h-[400px] flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Payout Volume</h3>
              <p className="text-sm text-slate-500">Last 30 days transaction metrics</p>
            </div>
            <Button variant="ghost" size="sm" className="h-8 text-xs font-medium text-primary">
              View Detailed Report
            </Button>
          </div>
          <div className="mt-8 flex flex-1 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50">
            <div className="flex flex-col items-center gap-2 text-slate-400">
              <Activity className="h-8 w-8" />
              <span className="text-sm font-medium">Chart visualization area</span>
            </div>
          </div>
        </div>

        {/* Operational Activity Feed */}
        <div className="flex min-h-[400px] flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Today's Operations</h3>
              <p className="text-sm text-slate-500">Live platform activity</p>
            </div>
          </div>
          <div className="mt-6 flex flex-1 flex-col gap-6">
            {[
              { title: "High-value payout flagged", desc: "₹5.2L transaction held for review", time: "10 min ago", icon: AlertCircle, color: "text-amber-500", bg: "bg-amber-500/10" },
              { title: "Merchant onboarded", desc: "Acme Corp completed KYC", time: "1 hr ago", icon: Store, color: "text-blue-500", bg: "bg-blue-500/10" },
              { title: "Settlement completed", desc: "Batch #8492 processed successfully", time: "3 hrs ago", icon: Wallet, color: "text-emerald-500", bg: "bg-emerald-500/10" },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${item.bg} ${item.color}`}>
                  <item.icon className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] font-semibold text-slate-900 dark:text-white">{item.title}</span>
                  <span className="text-xs text-slate-500">{item.desc}</span>
                  <span className="mt-1 text-[11px] font-medium text-slate-400">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
