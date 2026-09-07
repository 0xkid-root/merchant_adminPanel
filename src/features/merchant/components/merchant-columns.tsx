"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Merchant } from "../merchant.mock";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const merchantColumns: ColumnDef<Merchant>[] = [
  {
    accessorKey: "merchantCode",
    header: "Merchant ID",
    cell: ({ row }) => <span className="font-medium text-slate-900 dark:text-white">{row.getValue("merchantCode")}</span>,
  },
  {
    accessorKey: "businessName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4 h-8 data-[state=open]:bg-accent"
        >
          Business Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.getValue("businessName")}</span>
        <span className="text-xs text-slate-500">{row.original.ownerName}</span>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "walletBalance",
    header: () => <div className="text-right">Balance</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("walletBalance"));
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(amount);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant={
            status === "ACTIVE"
              ? "default"
              : status === "PENDING"
              ? "outline"
              : "destructive"
          }
          className={
            status === "ACTIVE"
              ? "bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/25 border-emerald-200"
              : status === "PENDING"
              ? "bg-amber-500/15 text-amber-600 hover:bg-amber-500/25 border-amber-200"
              : ""
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const merchant = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" className="h-8 w-8 p-0" />}>
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(merchant.id)}
            >
              Copy Merchant ID
            </DropdownMenuItem>
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>View Transactions</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
