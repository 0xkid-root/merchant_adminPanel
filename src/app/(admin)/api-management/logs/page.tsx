import { PageHeader } from "@/components/common/page-header";
import { ApiLogsTable } from "@/features/api-management/components/api-logs-table";

export default function ApiLogsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="API Logs"
        description="Monitor API requests received from merchants."
      />
      <ApiLogsTable />
    </div>
  );
}
