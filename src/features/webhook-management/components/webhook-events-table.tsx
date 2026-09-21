"use client";

import { useState, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table/data-table";
import { WebhookEvent } from "../types/webhook.types";
import { mockWebhookEvents } from "../mock/webhook.mock";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";

export function WebhookEventsTable() {
  const [data, setData] = useState<WebhookEvent[]>(mockWebhookEvents);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [sorting, setSorting] = useState([{ id: "module", desc: false }]);
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.type.toLowerCase().includes(search.toLowerCase()) ||
      item.module.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  const pageCount = Math.ceil(filteredData.length / pagination.pageSize);
  const paginatedData = filteredData.slice(
    pagination.pageIndex * pagination.pageSize,
    (pagination.pageIndex + 1) * pagination.pageSize
  );

  const columns: ColumnDef<WebhookEvent>[] = [
    {
      accessorKey: "type",
      header: "Event Type",
      cell: ({ row }) => <span className="font-semibold text-slate-700 dark:text-slate-300">{row.original.type}</span>,
    },
    {
      accessorKey: "module",
      header: "Module",
      cell: ({ row }) => (
        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
          {row.original.module}
        </span>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => <span className="text-slate-500">{row.original.description}</span>,
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => format(new Date(row.original.createdAt), "dd MMM yyyy"),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search event types..."
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
