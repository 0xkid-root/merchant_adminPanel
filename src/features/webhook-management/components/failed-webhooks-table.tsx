"use client";

import { useState, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table/data-table";
import { Button } from "@/components/ui/button";
import { FailedWebhook } from "../types/webhook.types";
import { mockFailedWebhooks } from "../mock/webhook.mock";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { RotateCw, Eye } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

export function FailedWebhooksTable() {
  const [data, setData] = useState<FailedWebhook[]>(mockFailedWebhooks);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [sorting, setSorting] = useState([{ id: "lastAttemptAt", desc: true }]);
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

  const columns: ColumnDef<FailedWebhook>[] = [
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
      cell: ({ row }) => <span className="font-mono text-xs text-slate-500 truncate block max-w-[150px]" title={row.original.webhookUrl}>{row.original.webhookUrl}</span>
    },
    {
      accessorKey: "attempts",
      header: "Attempts",
      cell: ({ row }) => <span>{row.original.attempts}</span>
    },
    {
      accessorKey: "failureReason",
      header: "Failure Reason",
      cell: ({ row }) => <span className="text-red-600 dark:text-red-400 text-sm">{row.original.failureReason}</span>
    },
    {
      accessorKey: "lastAttemptAt",
      header: "Last Attempt",
      cell: ({ row }) => row.original.lastAttemptAt ? format(new Date(row.original.lastAttemptAt), "dd MMM yy, HH:mm") : "-",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-end space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push(`/webhook-management/logs/${row.original.id}`)}
              className="h-8 px-2"
            >
              View
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => router.push(`/webhook-management/logs/${row.original.id}`)}>
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <RotateCw className="mr-2 h-4 w-4" />
                  Retry Webhook
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search failed webhooks..."
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
