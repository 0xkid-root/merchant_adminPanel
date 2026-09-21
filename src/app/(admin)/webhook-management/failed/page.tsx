import { PageHeader } from "@/components/common/page-header";
import { FailedWebhooksTable } from "@/features/webhook-management/components/failed-webhooks-table";

export default function FailedWebhooksPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Failed Webhooks"
        description="Review webhook deliveries that could not be delivered successfully."
      />
      <FailedWebhooksTable />
    </div>
  );
}
