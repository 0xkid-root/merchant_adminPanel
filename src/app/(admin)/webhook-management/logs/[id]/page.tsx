import { PageHeader } from "@/components/common/page-header";
import { StatusBadge } from "@/components/common/status-badge";
import { mockWebhookLogs } from "@/features/webhook-management/mock/webhook.mock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function WebhookLogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const log = mockWebhookLogs.find(l => l.id === id);

  if (!log) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4 mb-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/webhook-management/logs">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <PageHeader
          title={`Webhook Delivery ${log.id}`}
        />
        <StatusBadge status={log.deliveryStatus} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Delivery Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-slate-500">Merchant</p>
              <p className="text-base font-semibold">{log.merchantName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Event</p>
              <p className="text-base font-medium">{log.eventType}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Webhook URL</p>
              <p className="text-base font-mono break-all">{log.webhookUrl}</p>
            </div>
            <div className="flex gap-8">
              <div>
                <p className="text-sm font-medium text-slate-500">HTTP Status</p>
                <p className="text-base">{log.httpStatus || "-"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Attempts</p>
                <p className="text-base">{log.attempts}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Response Time</p>
                <p className="text-base">{log.responseTime ? `${log.responseTime} ms` : "-"}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Created At</p>
              <p className="text-base">{format(new Date(log.createdAt), "dd MMM yyyy, HH:mm:ss")}</p>
            </div>
            {log.failureReason && (
              <div>
                <p className="text-sm font-medium text-red-500">Failure Reason</p>
                <p className="text-base text-red-600">{log.failureReason}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Event Payload</CardTitle>
          </CardHeader>
          <CardContent>
            {log.payload ? (
              <pre className="bg-slate-950 text-slate-50 p-4 rounded-md overflow-auto text-sm">
                {JSON.stringify(log.payload, null, 2)}
              </pre>
            ) : (
              <p className="text-sm text-slate-500">No payload recorded</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
