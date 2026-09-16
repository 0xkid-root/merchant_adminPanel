"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Filter, Download } from 'lucide-react';
import { formatCurrency, getSettlements } from '../api/mock';
import { useQuery } from '@tanstack/react-query';
import { DataTable } from '@/components/ui/data-table/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { SettlementRecord } from '../types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const columns: ColumnDef<SettlementRecord>[] = [
  {
    accessorKey: 'id',
    header: 'Settlement ID',
  },
  {
    accessorKey: 'merchantName',
    header: 'Merchant',
  },
  {
    accessorKey: 'settlementAmount',
    header: 'Amount',
    cell: ({ row }) => <span className="font-medium">{formatCurrency(row.getValue('settlementAmount'))}</span>,
  },
  {
    accessorKey: 'settlementDate',
    header: 'Date',
    cell: ({ row }) => {
      const date = new Date(row.getValue('settlementDate') as string);
      return <span>{date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>;
    }
  },
  {
    accessorKey: 'provider',
    header: 'Provider',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      return (
        <Badge variant={status === 'Completed' ? 'default' : status === 'Failed' ? 'destructive' : 'secondary'}>
          {status}
        </Badge>
      );
    }
  },
  {
    accessorKey: 'completedAt',
    header: 'Completed At',
    cell: ({ row }) => {
      const dateStr = row.getValue('completedAt') as string;
      if (!dateStr) return <span className="text-slate-400">-</span>;
      const date = new Date(dateStr);
      return <span className="text-sm">{date.toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>;
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <Link href={`/settlement/${row.original.id}`} className="text-sm font-medium text-blue-600 hover:underline">
          View
        </Link>
      );
    }
  }
];

export function SettlementHistoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 15 });
  const [sorting, setSorting] = useState<any[]>([]);

  const { data: queryData, isLoading } = useQuery({
    queryKey: ['settlements-history', pagination.pageIndex, pagination.pageSize],
    queryFn: () => getSettlements({ 
      page: pagination.pageIndex + 1, 
      limit: pagination.pageSize,
      status: 'All'
    })
  });

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto p-4 md:p-6 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Settlement History</h1>
          <p className="text-slate-500 mt-1">Search and generate reports from historical settlements.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export Excel
          </Button>
        </div>
      </div>

      <Card className="shadow-sm border-slate-200 dark:border-slate-800">
        <CardHeader className="pb-4">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-3">
            <div className="relative md:col-span-2 lg:col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Search Settlement ID, Merchant, UTR..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-full bg-slate-50 dark:bg-slate-900/50" 
              />
            </div>
            
            <Select defaultValue="all">
              <SelectTrigger className="bg-slate-50 dark:bg-slate-900/50">
                <div className="flex items-center gap-2">
                  <SelectValue placeholder="Status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger className="bg-slate-50 dark:bg-slate-900/50">
                <div className="flex items-center gap-2">
                  <SelectValue placeholder="Provider" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Providers</SelectItem>
                <SelectItem value="razorpay">Razorpay</SelectItem>
                <SelectItem value="cashfree">Cashfree</SelectItem>
                <SelectItem value="icici">ICICI Bank</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="last30">
              <SelectTrigger className="bg-slate-50 dark:bg-slate-900/50 lg:col-span-2">
                <div className="flex items-center gap-2">
                  <SelectValue placeholder="Date Range" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="last7">Last 7 Days</SelectItem>
                <SelectItem value="last30">Last 30 Days</SelectItem>
                <SelectItem value="custom">Custom Range...</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable 
            columns={columns} 
            data={queryData?.data || []}
            pageCount={Math.ceil((queryData?.total || 0) / pagination.pageSize)}
            pagination={pagination}
            onPaginationChange={setPagination}
            sorting={sorting}
            onSortingChange={setSorting}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
}
