import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ApiCredentialsTable } from "@/features/api-management/components/api-credentials-table";
import Link from "next/link";

export default function ApiCredentialsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="API Credentials"
        description="Manage merchant API credentials and integration access."
        actions={
          <Link href="/api-management/credentials/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create API Credential
            </Button>
          </Link>
        }
      />
      <ApiCredentialsTable />
    </div>
  );
}
