"use client";

import { ReconciliationRecord } from '../types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Download, AlertCircle, CheckCircle2, FileText, Clock } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { StatCard } from '@/components/common/stat-card';

const trendData = [
  { date: '10 Sep', matched: 98.2, mismatch: 1.5, review: 0.3 },
  { date: '11 Sep', matched: 98.5, mismatch: 1.2, review: 0.3 },
  { date: '12 Sep', matched: 99.1, mismatch: 0.8, review: 0.1 },
  { date: '13 Sep', matched: 98.8, mismatch: 1.0, review: 0.2 },
  { date: '14 Sep', matched: 97.5, mismatch: 2.0, review: 0.5 },
  { date: '15 Sep', matched: 98.4, mismatch: 1.4, review: 0.2 },
  { date: '16 Sep', matched: 98.6, mismatch: 1.1, review: 0.3 },
];

const columns: ColumnDef<ReconciliationRecord>[] = [
  {
    accessorKey: 'id',
    header: 'Reconciliation ID',
  },
  {
    accessorKey: 'transactionId',
    header: 'Transaction ID',
  },
  {
    accessorKey: 'merchantName',
    header: 'Merchant',
  },
  {
    accessorKey: 'internalAmount',
    header: 'Internal',
    cell: ({ row }) => <span className="font-medium text-slate-900 dark:text-white">{formatCurrency(row.getValue('internalAmount'))}</span>,
  },
  {
    accessorKey: 'bankAmount',
    header: 'Bank',
    cell: ({ row }) => <span className="text-slate-600 dark:text-slate-400">{formatCurrency(row.getValue('bankAmount'))}</span>,
  },
  {
    accessorKey: 'partnerAmount',
    header: 'Partner',
    cell: ({ row }) => <span className="text-slate-600 dark:text-slate-400">{formatCurrency(row.getValue('partnerAmount'))}</span>,
  },
  {
    accessorKey: 'difference',
    header: 'Difference',
    cell: ({ row }) => {
      const diff = row.getValue('difference') as number;
      if (diff === 0) return <span className="text-emerald-600 font-medium">{formatCurrency(diff)}</span>;
      return <span className="text-red-500 font-bold">{formatCurrency(diff)}</span>;
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      if (status === 'Matched') {
        return <Badge variant="default" className="bg-emerald-500 hover:bg-emerald-600">MATCHED</Badge>;
      }
      if (status === 'Mismatch') {
        return <Badge variant="destructive">MISMATCH</Badge>;
      }
      return <Badge variant="secondary">{status.toUpperCase()}</Badge>;
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <Link href={`/settlement/reconciliation/${row.original.id}`} className="text-sm font-medium text-blue-600 hover:underline">
          View
        </Link>
      );
    }
  }
];

export function ReconciliationDashboardPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [timeRange, setTimeRange] = useState('7D');
  
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [sorting, setSorting] = useState<any[]>([]);

  const { data: queryData, isLoading } = useQuery({
    queryKey: ['reconciliations', activeTab, pagination.pageIndex, pagination.pageSize],
    queryFn: () => getReconciliations({ 
      page: pagination.pageIndex + 1, 
      limit: pagination.pageSize,
      status: activeTab 
    })
  });

  const tabs = ['All', 'Matched', 'Mismatch', 'Pending Review', 'Resolved'];

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto p-4 md:p-6 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Reconciliation</h1>
          <p className="text-slate-500 mt-1">Compare AtMoonPe internal transaction records with bank and payment-partner records.</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Records"
          value="45,231"
          icon={FileText}
          iconColorClass="text-blue-600"
          trendValue="Last 30 Days"
          trendUp={true}
        />
        <StatCard
          title="Matched"
          value="44,601"
          icon={CheckCircle2}
          iconColorClass="text-emerald-500"
          trendValue="98.6% match rate"
          trendUp={true}
        />
        <StatCard
          title="Mismatch"
          value="497"
          icon={AlertCircle}
          iconColorClass="text-red-500"
          trendValue="1.1% of total"
          trendUp={false}
        />
        <StatCard
          title="Pending Review"
          value="133"
          icon={Clock}
          iconColorClass="text-amber-500"
          trendValue="Requires action"
          trendUp={false}
        />
      </div>

      <div className="flex h-full min-h-[350px] w-full flex-col rounded-xl border border-slate-200/60 bg-white p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.01)] dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-row items-center justify-between mb-2">
          <div>
            <h3 className="text-[16px] font-semibold text-slate-900 dark:text-white">Reconciliation Trend</h3>
            <p className="text-[12px] font-medium text-slate-500 mt-1">Match vs Mismatch rates over time</p>
          </div>
          <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-white p-0.5 dark:border-slate-800 dark:bg-slate-900">
            {['7D', '30D', '90D'].map(t => (
              <button 
                key={t}
                onClick={() => setTimeRange(t)}
                className={`flex items-center gap-1 rounded px-2.5 py-1 text-[13px] font-semibold transition-colors ${timeRange === t ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white' : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 mt-4 relative">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorMatched" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorReview" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `${value}%`}
                />
                <RechartsTooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-lg shadow-lg">
                          <p className="font-medium text-slate-900 dark:text-white mb-2">{label}</p>
                          <div className="space-y-1">
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              Matched: <span className="font-semibold text-emerald-600">{payload[0].value}%</span>
                            </p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              Mismatch: <span className="font-semibold text-red-500">{payload[1]?.value || 0}%</span>
                            </p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              Review: <span className="font-semibold text-amber-500">{payload[2]?.value || 0}%</span>
                            </p>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area type="monotone" dataKey="matched" stroke="#10b981" fillOpacity={1} fill="url(#colorMatched)" />
                <Area type="monotone" dataKey="mismatch" stroke="#ef4444" fillOpacity={0} />
                <Area type="monotone" dataKey="review" stroke="#f59e0b" fillOpacity={1} fill="url(#colorReview)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex w-full flex-col rounded-xl border border-slate-200/60 bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.01)] dark:border-slate-800 dark:bg-slate-900">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex bg-slate-100 dark:bg-slate-800/50 p-1 rounded-lg w-fit overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setPagination(prev => ({ ...prev, pageIndex: 0 }));
                }}
                className={`px-4 py-1.5 text-sm font-medium rounded-md whitespace-nowrap transition-all ${
                  activeTab === tab 
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="p-0">
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
        </div>
      </div>
    </div>
  );
}
