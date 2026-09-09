import { Merchant } from "../../merchant.mock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ActivityTab({ merchant }: { merchant: Merchant }) {
  const activities = [
    { title: "Beneficiary added", desc: "Rahul Sharma", time: "10 minutes ago" },
    { title: "Payout processed", desc: "₹25,000", time: "32 minutes ago" },
    { title: "Wallet credited", desc: "₹50,000", time: "Yesterday" },
    { title: "KYC approved", desc: "Admin", time: "3 days ago" },
    { title: "Merchant registered", desc: merchant.ownerName, time: new Date(merchant.createdAt).toLocaleDateString() },
  ];

  return (
    <Card className="shadow-none border-slate-200/60 dark:border-slate-800">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {activities.map((activity, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="h-2.5 w-2.5 rounded-full bg-primary mt-1.5" />
                {i !== activities.length - 1 && (
                  <div className="h-full w-px bg-slate-200 my-1 dark:bg-slate-800" />
                )}
              </div>
              <div className="flex flex-col pb-6">
                <span className="text-sm font-semibold text-slate-900 dark:text-white">{activity.title}</span>
                <span className="text-sm text-slate-600 mt-0.5 dark:text-slate-400">{activity.desc}</span>
                <span className="text-xs text-slate-400 mt-1 font-medium">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
