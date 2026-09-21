import { PageHeader } from "@/components/common/page-header";
import { StatusBadge } from "@/components/common/status-badge";
import { mockApiCredentials } from "@/features/api-management/mock/api.mock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function ApiCredentialDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const credential = mockApiCredentials.find(c => c.id === id);

  if (!credential) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4 mb-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/api-management/credentials">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <PageHeader
          title={`API Credential ${credential.id}`}
        />
        <StatusBadge status={credential.status} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Credential Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-900 dark:text-white">Configuration</h3>
              <div>
                <p className="text-sm font-medium text-slate-500">Merchant</p>
                <p className="text-base font-semibold">{credential.merchantName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Environment</p>
                <p className="text-base">{credential.environment}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">API Key</p>
                <p className="text-base font-mono">{credential.apiKey}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-slate-900 dark:text-white">Activity</h3>
              <div>
                <p className="text-sm font-medium text-slate-500">Created</p>
                <p className="text-base">{format(new Date(credential.createdAt), "dd MMM yyyy, HH:mm")}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Last Rotated</p>
                <p className="text-base">{credential.lastRotatedAt ? format(new Date(credential.lastRotatedAt), "dd MMM yyyy, HH:mm") : "-"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Last Used</p>
                <p className="text-base">{credential.lastUsedAt ? format(new Date(credential.lastUsedAt), "dd MMM yyyy, HH:mm") : "-"}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
