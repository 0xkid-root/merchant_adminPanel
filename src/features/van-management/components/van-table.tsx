"use client";

import { useState } from "react";
import { useVansQuery } from "../hooks/use-vans";
import { VanAccount, VanStatus } from "../types/van.types";
import { getVanColumns } from "./van-columns";
import { DataTable } from "@/components/ui/data-table/data-table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface VanTableProps {
  onViewDetails: (van: VanAccount) => void;
}

export function VanTable({ onViewDetails }: VanTableProps) {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [status, setStatus] = useState<VanStatus | "All">("All");
  const [provider, setProvider] = useState<string | "All">("All");

  const { data, isLoading } = useVansQuery({
    page,
    size,
    search: debouncedSearch,
    status,
    provider,
  });

  const columns = getVanColumns(onViewDetails);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setDebouncedSearch(e.target.value); // Simple debounce for mock
    setPage(0);
  };

  const handleStatusChange = (val: string) => {
    setStatus(val as VanStatus | "All");
    setPage(0);
  };

  const handleProviderChange = (val: string) => {
    setProvider(val);
    setPage(0);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center gap-4 justify-between bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/60 dark:border-slate-800 shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search VAN, merchant, merchant ID..." 
            className="pl-9 bg-slate-50/50 dark:bg-slate-950/50"
            value={search}
            onChange={handleSearch}
          />
        </div>
        <div className="flex w-full sm:w-auto items-center gap-3">
          <Select value={status} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[140px] bg-slate-50/50 dark:bg-slate-950/50">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
              <SelectItem value="Suspended">Suspended</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
            </SelectContent>
          </Select>

          <Select value={provider} onValueChange={handleProviderChange}>
            <SelectTrigger className="w-[160px] bg-slate-50/50 dark:bg-slate-950/50">
              <SelectValue placeholder="Provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Providers</SelectItem>
              <SelectItem value="AtMoon Bank">AtMoon Bank</SelectItem>
              <SelectItem value="Global Bank">Global Bank</SelectItem>
              <SelectItem value="SecureTrust Bank">SecureTrust Bank</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-800 shadow-sm overflow-hidden">
        <DataTable
          columns={columns}
          data={data?.data || []}
          isLoading={isLoading}
          pagination={{
            pageIndex: page,
            pageSize: size,
            pageCount: data?.pagination.totalPages || 0,
            total: data?.pagination.totalElements || 0,
          }}
          onPageChange={setPage}
          onPageSizeChange={setSize}
        />
      </div>
    </div>
  );
}
