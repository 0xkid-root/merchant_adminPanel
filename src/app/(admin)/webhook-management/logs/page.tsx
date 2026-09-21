import { PageHeader } from "@/components/common/page-header";
import { WebhookLogsTable } from "@/features/webhook-management/components/webhook-logs-table";

export default function WebhookLogsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Webhook Logs"
        description="Monitor webhook delivery attempts to merchant endpoints."
      />
      <WebhookLogsTable />
    </div>
  );
}
