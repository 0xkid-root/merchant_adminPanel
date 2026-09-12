import { useMemo } from "react";
import { DataTable } from "@/components/ui/data-table/data-table";
import { PayoutRecord } from "../types/payout.types";
import { PayoutStatusBadge } from "./payout-status-badge";
import { format } from "date-fns";
import { formatINR } from "@/lib/utils";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, RefreshCw } from "lucide-react";
import { useRetryPayoutMutation } from "../hooks/use-payouts";
import { toast } from "sonner";

interface PayoutTableProps {
  data: PayoutRecord[];
  isLoading: boolean;
  pageCount: number;
  pagination: PaginationState;
  onPaginationChange: (pagination: PaginationState | ((old: PaginationState) => PaginationState)) => void;
  sorting: any;
  onSortingChange: any;
}

export function PayoutTable({
  data,
  isLoading,
  pageCount,
  pagination,
  onPaginationChange,
  sorting,
  onSortingChange,
}: PayoutTableProps) {
  const router = useRouter();
  const retryMutation = useRetryPayoutMutation();

  const handleRetry = (id: string) => {
    retryMutation.mutate(id, {
      onSuccess: () => {
        toast.success(`Payout ${id} queued for retry`);
      },
      onError: (err: any) => {
        toast.error(err.message || "Failed to retry payout");
      }
    });
  };

  const columns = useMemo<ColumnDef<PayoutRecord>[]>(() => [
    {
      accessorKey: "id",
      header: "Payout ID",
      cell: ({ row }) => <span className="font-medium">{row.original.id}</span>,
    },
    {
      accessorKey: "merchantName",
      header: "Merchant",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium">{row.original.merchantName}</span>
          <span className="text-xs text-slate-500">{row.original.merchantId}</span>
        </div>
      ),
    },
    {
      accessorKey: "beneficiaryName",
      header: "Beneficiary",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium">{row.original.beneficiaryName}</span>
          <span className="text-xs text-slate-500">{row.original.beneficiaryId || "Direct"}</span>
        </div>
      ),
    },
    {
      accessorKey: "amount",
      header: () => <div className="text-right">Amount</div>,
      cell: ({ row }) => (
        <div className="text-right font-medium">
          {formatINR(row.original.amount)}
        </div>
      ),
    },
    {
      accessorKey: "fee",
      header: () => <div className="text-right">Fee</div>,
      cell: ({ row }) => (
        <div className="text-right text-slate-500">
          {formatINR(row.original.fee)}
        </div>
      ),
    },
    {
      accessorKey: "netAmount",
      header: () => <div className="text-right">Net Amount</div>,
      cell: ({ row }) => (
        <div className="text-right font-semibold text-emerald-600 dark:text-emerald-400">
          {formatINR(row.original.netAmount)}
        </div>
      ),
    },
    {
      accessorKey: "method",
      header: "Method",
      cell: ({ row }) => <span className="text-sm">{row.original.method}</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <PayoutStatusBadge status={row.original.status} />,
    },
    {
      accessorKey: "requestedAt",
      header: "Requested On",
      cell: ({ row }) => (
        <span className="text-sm text-slate-500">
          {format(new Date(row.original.requestedAt), "dd MMM yyyy")}
        </span>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const payout = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => router.push(`/payout-management/${payout.id}`)}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              {(payout.status === "Failed" || payout.status === "Retry Queued") && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleRetry(payout.id)}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Retry Now
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ], [router, retryMutation]);

  return (
    <div className="w-full h-full">
      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        pagination={pagination}
        pageCount={pageCount}
        onPaginationChange={onPaginationChange}
        sorting={sorting}
        onSortingChange={onSortingChange}
      />
    </div>
  );
}
