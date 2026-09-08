import { Wallet, Store, Activity, AlertCircle, ArrowRightLeft, Clock, MoreVertical, FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/common/stat-card";
import { DashboardCharts } from "@/features/dashboard/components/dashboard-charts";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8 pb-8">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-[28px] font-bold tracking-tight text-slate-900 dark:text-white sm:text-[32px]">Dashboard Overview</h1>
          <p className="mt-1.5 text-[14px] text-slate-500">
            Real-time insights and operational status for AtMoonPe.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-9 rounded-md bg-white shadow-sm hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 text-[13px] font-medium">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button className="h-9 rounded-md bg-primary text-white hover:bg-primary/90 text-[13px] font-medium shadow-sm">
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
          iconColorClass="text-primary"
          trendValue="4.8% this month"
          trendLabel=""
          trendUp={true}
          actionLabel="Available: ₹10.82 Cr"
        />
        <StatCard
          title="Today's Payouts"
          value="₹8.45 Cr"
          icon={ArrowRightLeft}
          iconColorClass="text-emerald-500"
          trendValue="12.4% vs yesterday"
          trendLabel=""
          trendUp={true}
          actionLabel="1,284 transactions"
        />
        <StatCard
          title="Active Merchants"
          value="412"
          icon={Store}
          iconColorClass="text-blue-500"
          trendValue="12 this week"
          trendLabel=""
          trendUp={true}
          actionLabel="96.4% active rate"
        />
        <StatCard
          title="Pending Approvals"
          value="24"
          icon={AlertCircle}
          iconColorClass="text-amber-500"
          alertText="8 high priority"
          actionLabel="View approvals"
        />
      </div>

      {/* Secondary Row: Charts & Activity */}
      <div className="grid gap-5 lg:grid-cols-3">
        {/* Analytics Section */}
        <div className="flex min-h-[400px] flex-col rounded-xl border border-slate-200/60 bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.01)] dark:border-slate-800 dark:bg-slate-900 lg:col-span-2 overflow-hidden">
          <div className="border-b border-slate-100/50 p-6 sm:px-8 dark:border-slate-800/50">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-[18px] font-bold text-slate-900 dark:text-white">Payout Performance</h3>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-[28px] font-bold tabular-nums tracking-tight text-slate-900 dark:text-white">₹24.8 Cr</span>
                  <span className="text-[13px] font-medium text-emerald-600">↑ 8.4% from previous period</span>
                </div>
              </div>
              <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1 dark:bg-slate-800">
                {["7D", "30D", "90D", "1Y"].map((range) => (
                  <button
                    key={range}
                    className={`rounded-md px-3 py-1 text-[13px] font-medium transition-colors ${
                      range === "30D"
                        ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white"
                        : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex flex-1 flex-col sm:flex-row">
            {/* Chart Area */}
            <div className="flex-1 p-6 sm:px-8 pt-8 h-[300px] sm:h-auto">
              <DashboardCharts />
            </div>
            
            {/* Summary Panel */}
            <div className="w-full sm:w-56 p-6 sm:px-8 sm:py-8 flex flex-col justify-center gap-8 bg-slate-50/30 dark:bg-slate-900/50">
              <div>
                <div className="text-[13px] font-medium text-slate-500">Successful</div>
                <div className="mt-1.5 text-[22px] font-bold tabular-nums tracking-tight text-slate-900 dark:text-white">₹21.4 Cr</div>
              </div>
              <div>
                <div className="text-[13px] font-medium text-slate-500">Pending</div>
                <div className="mt-1.5 text-[22px] font-bold tabular-nums tracking-tight text-slate-900 dark:text-white">₹1.8 Cr</div>
              </div>
              <div>
                <div className="text-[13px] font-medium text-slate-500">Failed</div>
                <div className="mt-1.5 text-[22px] font-bold tabular-nums tracking-tight text-slate-900 dark:text-white">₹1.6 Cr</div>
              </div>
            </div>
          </div>
        </div>

        {/* Operational Activity Feed */}
        <div className="flex min-h-[400px] flex-col rounded-xl border border-slate-200/60 bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.01)] dark:border-slate-800 dark:bg-slate-900">
          <div className="border-b border-slate-100/50 p-6 dark:border-slate-800/50">
            <h3 className="text-[18px] font-bold text-slate-900 dark:text-white">Needs Attention</h3>
            <p className="mt-1.5 text-[13px] font-medium text-slate-500">Items requiring review or action.</p>
          </div>
          <div className="flex flex-1 flex-col divide-y divide-slate-100 dark:divide-slate-800/50">
            {[
              { title: "High-value payout", desc: "₹5.2L transaction requires review", time: "10 min ago", icon: AlertCircle, color: "text-amber-500", action: "Review" },
              { title: "Merchant KYC", desc: "Acme Corp submitted documents", time: "1 hr ago", icon: FileText, color: "text-blue-500", action: "Review" },
              { title: "Settlement", desc: "Batch #8492 completed successfully", time: "3 hrs ago", icon: Wallet, color: "text-emerald-500", action: "View" },
              { title: "API Quota", desc: "TestMerchant nearing rate limit", time: "5 hrs ago", icon: Activity, color: "text-slate-400", action: "View" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-5 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                <div className={`mt-1.5 flex h-[6px] w-[6px] shrink-0 items-center justify-center rounded-full bg-current ${item.color}`} />
                <div className="flex flex-1 flex-col gap-0.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] font-semibold text-slate-900 dark:text-white">{item.title}</span>
                    <span className="text-[12px] font-medium text-slate-400">{item.time}</span>
                  </div>
                  <span className="text-[13px] text-slate-500 mt-0.5">{item.desc}</span>
                  <button className="mt-2 w-fit text-[13px] font-semibold text-primary hover:text-primary/80 transition-colors">
                    {item.action} &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 mt-auto text-center">
             <button className="text-[13px] font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
               View all operations
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
