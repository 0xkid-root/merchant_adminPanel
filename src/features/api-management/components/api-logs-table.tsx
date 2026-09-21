"use client";

import { useState, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table/data-table";
import { Button } from "@/components/ui/button";
import { ApiLog } from "../../types/api.types";
import { mockApiLogs } from "../../mock/api.mock";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

export function ApiLogsTable() {
  const [data, setData] = useState<ApiLog[]>(mockApiLogs);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [sorting, setSorting] = useState([{ id: "createdAt", desc: true }]);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.merchantName.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.endpoint.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  const pageCount = Math.ceil(filteredData.length / pagination.pageSize);
  const paginatedData = filteredData.slice(
    pagination.pageIndex * pagination.pageSize,
    (pagination.pageIndex + 1) * pagination.pageSize
  );

  const columns: ColumnDef<ApiLog>[] = [
    {
      accessorKey: "id",
      header: "Request ID",
      cell: ({ row }) => <span className="font-medium">{row.original.id}</span>,
    },
    {
      accessorKey: "merchantName",
      header: "Merchant",
    },
    {
      accessorKey: "method",
      header: "Method",
      cell: ({ row }) => {
        const method = row.original.method;
        const colorClass = method === "GET" ? "text-blue-600 bg-blue-100 dark:bg-blue-900/30" : 
                           method === "POST" ? "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30" : 
                           "text-slate-600 bg-slate-100 dark:bg-slate-800";
        return <span className={`px-2 py-1 rounded text-xs font-semibold ${colorClass}`}>{method}</span>
      }
    },
    {
      accessorKey: "endpoint",
      header: "Endpoint",
      cell: ({ row }) => <span className="font-mono text-sm text-slate-500">{row.original.endpoint}</span>
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        const colorClass = status >= 200 && status < 300 ? "text-emerald-700 bg-emerald-100 dark:bg-emerald-900/30" : 
                           status >= 400 && status < 500 ? "text-amber-700 bg-amber-100 dark:bg-amber-900/30" : 
                           "text-red-700 bg-red-100 dark:bg-red-900/30";
        return <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${colorClass}`}>{status}</span>
      }
    },
    {
      accessorKey: "responseTime",
      header: "Response Time",
      cell: ({ row }) => <span>{row.original.responseTime} ms</span>
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
            onClick={() => router.push(`/api-management/logs/${row.original.id}`)}
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
          placeholder="Search logs..."
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
