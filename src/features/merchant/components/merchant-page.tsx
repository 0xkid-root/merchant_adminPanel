"use client";

import { useTableState } from "@/hooks/use-table-state";
import { useMerchantsQuery } from "../hooks/use-merchants-query";
import { merchantColumns } from "./merchant-columns";
import { DataTable } from "@/components/ui/data-table/data-table";
import { DataTableSearch } from "@/components/ui/data-table/data-table-search";
import { DataTableSkeleton } from "@/components/ui/data-table/data-table-skeleton";
import { DataTableEmpty } from "@/components/ui/data-table/data-table-empty";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function MerchantPage() {
  const {
    pagination,
    setPagination,
    sorting,
    setSorting,
    globalFilter,
    setGlobalFilter,
    columnFilters,
    setColumnFilters,
    queryParams,
  } = useTableState();

  const { data, isLoading, isError, isPlaceholderData } = useMerchantsQuery(queryParams);

  // Derive status filter value
  const currentStatusFilter =
    (columnFilters.find((f) => f.id === "status")?.value as string) || "ALL";

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Merchants
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manage your registered merchants, KYC status, and activity.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Merchant
          </Button>
        </div>
      </div>

      {/* Toolbar / Filters */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
        <DataTableSearch
          placeholder="Search business name, email, or code..."
          value={globalFilter}
          onChange={setGlobalFilter}
        />
        
        <Select
          value={currentStatusFilter}
          onValueChange={(val) => {
            setColumnFilters([{ id: "status", value: val }]);
          }}
        >
          <SelectTrigger className="w-full sm:w-[180px] bg-white dark:bg-slate-900">
            <SelectValue placeholder="Status Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Statuses</SelectItem>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="SUSPENDED">Suspended</SelectItem>
            <SelectItem value="BLOCKED">Blocked</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table Area */}
      {isLoading ? (
        <DataTableSkeleton columnCount={6} rowCount={pagination.pageSize} />
      ) : isError ? (
        <div className="rounded-md border border-red-200 bg-red-50 p-6 text-center text-red-600 dark:border-red-900/50 dark:bg-red-900/10 dark:text-red-400">
          <p className="font-medium">Failed to load merchants.</p>
          <p className="text-sm mt-1 opacity-80">Please try refreshing the page.</p>
        </div>
      ) : data?.content.length === 0 ? (
        <DataTableEmpty
          isSearchState={Boolean(globalFilter || currentStatusFilter !== "ALL")}
          onClearFilters={() => {
            setGlobalFilter("");
            setColumnFilters([]);
          }}
        />
      ) : (
        <div className={`transition-opacity duration-200 ${isPlaceholderData ? "opacity-50" : "opacity-100"}`}>
          <DataTable
            columns={merchantColumns}
            data={data?.content ?? []}
            pageCount={data?.totalPages ?? 0}
            pagination={pagination}
            onPaginationChange={setPagination}
            sorting={sorting}
            onSortingChange={setSorting}
          />
        </div>
      )}
    </div>
  );
}
