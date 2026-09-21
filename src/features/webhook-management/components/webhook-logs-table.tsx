"use client";

import { useState, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table/data-table";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/common/status-badge";
import { WebhookLog } from "../../types/webhook.types";
import { mockWebhookLogs } from "../../mock/webhook.mock";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

export function WebhookLogsTable() {
  const [data, setData] = useState<WebhookLog[]>(mockWebhookLogs);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [sorting, setSorting] = useState([{ id: "createdAt", desc: true }]);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.merchantName.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.eventType.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  const pageCount = Math.ceil(filteredData.length / pagination.pageSize);
  const paginatedData = filteredData.slice(
    pagination.pageIndex * pagination.pageSize,
    (pagination.pageIndex + 1) * pagination.pageSize
  );

  const columns: ColumnDef<WebhookLog>[] = [
    {
      accessorKey: "id",
      header: "Event ID",
      cell: ({ row }) => <span className="font-medium">{row.original.id}</span>,
    },
    {
      accessorKey: "merchantName",
      header: "Merchant",
    },
    {
      accessorKey: "eventType",
      header: "Event Type",
      cell: ({ row }) => <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{row.original.eventType}</span>
    },
    {
      accessorKey: "webhookUrl",
      header: "Webhook URL",
      cell: ({ row }) => <span className="font-mono text-xs text-slate-500 truncate block max-w-[200px]" title={row.original.webhookUrl}>{row.original.webhookUrl}</span>
    },
    {
      accessorKey: "httpStatus",
      header: "HTTP Status",
      cell: ({ row }) => {
        const status = row.original.httpStatus;
        if (!status) return <span className="text-slate-400">-</span>;
        const colorClass = status >= 200 && status < 300 ? "text-emerald-700" : "text-red-700";
        return <span className={`font-medium ${colorClass}`}>{status}</span>
      }
    },
    {
      accessorKey: "attempts",
      header: "Attempts",
      cell: ({ row }) => <span>{row.original.attempts}</span>
    },
    {
      accessorKey: "deliveryStatus",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.original.deliveryStatus} />
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => format(new Date(row.original.createdAt), "dd MMM yy, HH:mm"),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push(`/webhook-management/logs/${row.original.id}`)}
          >
            View
          </Button>
        );
      },
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search webhook deliveries..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm bg-white dark:bg-slate-900"
        />
      </div>
      <DataTable
        columns={columns}
        data={paginatedData}
        pageCount={pageCount}
        pagination={pagination}
        onPaginationChange={setPagination as any}
        sorting={sorting}
        onSortingChange={setSorting as any}
      />
    </div>
  );
}
