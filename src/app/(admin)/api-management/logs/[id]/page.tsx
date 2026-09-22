import { PageHeader } from "@/components/common/page-header";
import { mockApiLogs } from "@/features/api-management/mock/api.mock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function ApiLogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const log = mockApiLogs.find(l => l.id === id);

  if (!log) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4 mb-2">
        <Link href="/api-management/logs" className={buttonVariants({ variant: "outline", size: "icon" })}>
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <PageHeader
          title={`Request ${log.id}`}
        />
        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${log.status >= 200 && log.status < 300 ? "text-emerald-700 bg-emerald-100" : log.status >= 400 && log.status < 500 ? "text-amber-700 bg-amber-100" : "text-red-700 bg-red-100"}`}>
          {log.status}
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Request Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-slate-500">Merchant</p>
              <p className="text-base font-semibold">{log.merchantName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Endpoint</p>
              <p className="text-base font-mono">{log.method} {log.endpoint}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Environment</p>
              <p className="text-base">{log.environment}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">IP Address</p>
              <p className="text-base font-mono">{log.ipAddress}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Response Time</p>
              <p className="text-base">{log.responseTime} ms</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Timestamp</p>
              <p className="text-base">{format(new Date(log.createdAt), "dd MMM yyyy, HH:mm:ss")}</p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Request Body</CardTitle>
            </CardHeader>
            <CardContent>
              {log.requestBody ? (
                <pre className="bg-slate-950 text-slate-50 p-4 rounded-md overflow-auto text-sm">
                  {JSON.stringify(log.requestBody, null, 2)}
                </pre>
              ) : (
                <p className="text-sm text-slate-500">No request body</p>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Response Body</CardTitle>
            </CardHeader>
            <CardContent>
              {log.responseBody ? (
                <pre className="bg-slate-950 text-slate-50 p-4 rounded-md overflow-auto text-sm">
                  {JSON.stringify(log.responseBody, null, 2)}
                </pre>
              ) : (
                <p className="text-sm text-slate-500">No response body</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
