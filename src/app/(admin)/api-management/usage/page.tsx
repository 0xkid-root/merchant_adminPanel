import { PageHeader } from "@/components/common/page-header";
import { ApiUsageDashboard } from "@/features/api-management/components/api-usage-dashboard";

export default function ApiUsagePage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="API Usage"
        description="Monitor merchant API activity and request volume."
      />
      <ApiUsageDashboard />
    </div>
  );
}
