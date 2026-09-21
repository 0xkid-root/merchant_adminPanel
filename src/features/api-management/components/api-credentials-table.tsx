"use client";

import { useState, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table/data-table";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/common/status-badge";
import { ApiCredential } from "../types/api.types";
import { mockApiCredentials } from "../mock/api.mock";
import { Eye, KeyRound, MoreHorizontal, Power, PowerOff, RotateCcw } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

export function ApiCredentialsTable() {
  const [data, setData] = useState<ApiCredential[]>(mockApiCredentials);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [sorting, setSorting] = useState([{ id: "createdAt", desc: true }]);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.merchantName.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  const pageCount = Math.ceil(filteredData.length / pagination.pageSize);
  const paginatedData = filteredData.slice(
    pagination.pageIndex * pagination.pageSize,
    (pagination.pageIndex + 1) * pagination.pageSize
  );

  const columns: ColumnDef<ApiCredential>[] = [
    {
      accessorKey: "id",
      header: "Credential ID",
      cell: ({ row }) => <span className="font-medium">{row.original.id}</span>,
    },
    {
      accessorKey: "merchantName",
      header: "Merchant",
    },
    {
      accessorKey: "environment",
      header: "Environment",
      cell: ({ row }) => {
        const env = row.original.environment;
        return (
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${env === 'Production' ? 'bg-purple-500/15 text-purple-700 dark:text-purple-400' : 'bg-slate-500/15 text-slate-700 dark:text-slate-400'}`}>
            {env}
          </span>
        );
      }
    },
    {
      accessorKey: "apiKey",
      header: "API Key",
      cell: ({ row }) => (
        <div className="flex items-center space-x-2 font-mono text-sm text-slate-500">
          <KeyRound className="h-3 w-3" />
          <span>{row.original.apiKey}</span>
        </div>
      )
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      accessorKey: "createdAt",
      header: "Created Date",
      cell: ({ row }) => format(new Date(row.original.createdAt), "dd MMM yyyy"),
    },
    {
      accessorKey: "lastUsedAt",
      header: "Last Used",
      cell: ({ row }) => row.original.lastUsedAt ? format(new Date(row.original.lastUsedAt), "dd MMM yyyy") : "-",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const cred = row.original;
        const isActive = cred.status === "ACTIVE";

        return (
          <div className="flex items-center justify-end space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push(`/api-management/credentials/${cred.id}`)}
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
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => router.push(`/api-management/credentials/${cred.id}`)}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Rotate Key
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {isActive ? (
                    <DropdownMenuItem className="text-red-600 dark:text-red-400">
                      <PowerOff className="mr-2 h-4 w-4" />
                      Deactivate
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem className="text-emerald-600 dark:text-emerald-400">
                      <Power className="mr-2 h-4 w-4" />
                      Activate
                    </DropdownMenuItem>
                  )}
                </DropdownMenuGroup>
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
          placeholder="Search credentials..."
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
