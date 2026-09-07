import { Wallet, Store, Activity, AlertCircle, ArrowRightLeft, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/common/stat-card";
import { DashboardCharts } from "@/features/dashboard/components/dashboard-charts";

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
        <StatCard
          title="Wallet Balance"
          value="₹12.45 Cr"
          icon={Wallet}
          iconBgClass="bg-primary/10"
          iconColorClass="text-primary"
          trendValue="₹2.1 Cr"
          trendLabel="Available for payouts"
          trendUp={true}
        />
        <StatCard
          title="Today's Payouts"
          value="₹8.45 Cr"
          icon={ArrowRightLeft}
          iconBgClass="bg-emerald-500/10"
          iconColorClass="text-emerald-600"
          trendValue="1,284"
          trendLabel="processed transactions"
        />
        <StatCard
          title="Active Merchants"
          value="412"
          icon={Store}
          iconBgClass="bg-blue-500/10"
          iconColorClass="text-blue-600"
          trendValue="12"
          trendLabel="onboarded this week"
          trendUp={true}
        />
        <StatCard
          title="Pending Approvals"
          value="24"
          icon={Clock}
          iconBgClass="bg-amber-500/10"
          iconColorClass="text-amber-600"
          alertText="Requires attention"
          trendLabel="in queue"
        />
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
          <div className="mt-8 h-[300px] w-full">
            <DashboardCharts />
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
