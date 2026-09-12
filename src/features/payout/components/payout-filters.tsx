import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PayoutStatus, PayoutMethod } from "../types/payout.types";
import { useEffect, useState } from "react";

interface PayoutFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: PayoutStatus | "All";
  onStatusChange: (status: string) => void;
  methodFilter: PayoutMethod | "All";
  onMethodChange: (method: string) => void;
}

export function PayoutFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  methodFilter,
  onMethodChange,
}: PayoutFiltersProps) {
  const [localSearch, setLocalSearch] = useState(searchQuery);

  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (localSearch !== searchQuery) {
        onSearchChange(localSearch);
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [localSearch, onSearchChange, searchQuery]);

  const hasActiveFilters = statusFilter !== "All" || methodFilter !== "All" || searchQuery !== "";

  const handleClearFilters = () => {
    setLocalSearch("");
    onSearchChange("");
    onStatusChange("All");
    onMethodChange("All");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Search payout, merchant, beneficiary..."
          className="pl-9 pr-4"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Select value={statusFilter} onValueChange={onStatusChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Statuses</SelectItem>
            <SelectItem value="Requested">Requested</SelectItem>
            <SelectItem value="Approved">Approved</SelectItem>
            <SelectItem value="Processing">Processing</SelectItem>
            <SelectItem value="Success">Success</SelectItem>
            <SelectItem value="Failed">Failed</SelectItem>
            <SelectItem value="Retry Queued">Retry Queued</SelectItem>
            <SelectItem value="Cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>

        <Select value={methodFilter} onValueChange={onMethodChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Methods</SelectItem>
            <SelectItem value="IMPS">IMPS</SelectItem>
            <SelectItem value="NEFT">NEFT</SelectItem>
            <SelectItem value="RTGS">RTGS</SelectItem>
            <SelectItem value="UPI">UPI</SelectItem>
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={handleClearFilters}
            className="text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
          >
            <X className="mr-2 h-4 w-4" />
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
}
