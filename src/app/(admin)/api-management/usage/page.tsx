import { PageHeader } from "@/components/common/page-header";
import { mockApiUsageSummary, mockMerchantApiUsage } from "@/features/api-management/mock/api.mock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";

export default function ApiUsagePage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="API Usage"
        description="Monitor merchant API activity and request volume."
      />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total API Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">
              {mockApiUsageSummary.totalRequests.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Successful Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {mockApiUsageSummary.successfulRequests.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {mockApiUsageSummary.failedRequests.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">
              {mockApiUsageSummary.avgResponseTime} ms
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-4">Merchant API Usage Table</h3>
        <div className="rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50/50 dark:bg-slate-900/50">
              <TableRow>
                <TableHead>Merchant</TableHead>
                <TableHead>Requests</TableHead>
                <TableHead>Success Rate</TableHead>
                <TableHead>Failed Requests</TableHead>
                <TableHead>Avg Response Time</TableHead>
                <TableHead>Last Request</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockMerchantApiUsage.map((usage) => (
                <TableRow key={usage.merchantId}>
                  <TableCell className="font-medium">{usage.merchantName}</TableCell>
                  <TableCell>{usage.totalRequests.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className={`font-semibold ${usage.successRate >= 99 ? 'text-emerald-600' : usage.successRate >= 95 ? 'text-amber-600' : 'text-red-600'}`}>
                      {usage.successRate}%
                    </span>
                  </TableCell>
                  <TableCell>{usage.failedRequests.toLocaleString()}</TableCell>
                  <TableCell>{usage.avgResponseTime} ms</TableCell>
                  <TableCell>{format(new Date(usage.lastRequestAt), "dd MMM yy, HH:mm")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
