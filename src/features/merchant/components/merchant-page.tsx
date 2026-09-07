import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PageHeader } from "@/components/common/page-header";
import { StatusBadge } from "@/components/common/status-badge";
import { MerchantService } from "@/features/merchant/services/merchant.service";
import { Download, Plus, Search, Filter } from "lucide-react";

export default async function MerchantPage() {
  const merchants = await MerchantService.getMerchants();

  return (
    <div className="flex flex-col gap-6 pb-8">
      <PageHeader
        title="Merchants"
        description="Manage your merchants, view details, and monitor their wallet activity."
        actions={
          <>
            <Button variant="outline" className="h-10 rounded-xl bg-white shadow-sm dark:bg-slate-900">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button className="h-10 rounded-xl bg-primary text-white shadow-[0_2px_10px_rgba(99,102,241,0.2)]">
              <Plus className="mr-2 h-4 w-4" />
              Add Merchant
            </Button>
          </>
        }
      />

      <div className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
        {/* Table Toolbar */}
        <div className="flex flex-col gap-4 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search merchants..."
              className="h-10 w-full rounded-xl pl-9 bg-slate-50 border-slate-200 hover:bg-slate-100 dark:bg-slate-900/50 dark:border-slate-800"
            />
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="h-10 rounded-xl">
              <Filter className="mr-2 h-4 w-4" />
              Status
            </Button>
            <Button variant="outline" size="sm" className="h-10 rounded-xl">
              <Filter className="mr-2 h-4 w-4" />
              KYC Status
            </Button>
          </div>
        </div>

        {/* Table Content */}
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/50 hover:bg-slate-50/50 dark:bg-slate-800/20 dark:hover:bg-slate-800/20 border-slate-200 dark:border-slate-800">
              <TableHead className="font-semibold text-slate-600 dark:text-slate-300">Merchant ID</TableHead>
              <TableHead className="font-semibold text-slate-600 dark:text-slate-300">Business Name</TableHead>
              <TableHead className="font-semibold text-slate-600 dark:text-slate-300">Contact</TableHead>
              <TableHead className="font-semibold text-slate-600 dark:text-slate-300 text-right">Wallet Balance</TableHead>
              <TableHead className="font-semibold text-slate-600 dark:text-slate-300">KYC</TableHead>
              <TableHead className="font-semibold text-slate-600 dark:text-slate-300">Status</TableHead>
              <TableHead className="text-right font-semibold text-slate-600 dark:text-slate-300">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {merchants.map((merchant) => (
              <TableRow key={merchant.id} className="border-slate-200 dark:border-slate-800 group cursor-pointer transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <TableCell className="font-medium text-slate-900 dark:text-white">
                  {merchant.id}
                </TableCell>
                <TableCell className="font-medium text-slate-900 dark:text-white">
                  {merchant.businessName}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-sm text-slate-600 dark:text-slate-300">{merchant.email}</span>
                    <span className="text-xs text-slate-400">{merchant.phone}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium text-slate-900 dark:text-white">
                  ₹{(merchant.walletBalance / 100000).toFixed(2)} L
                </TableCell>
                <TableCell>
                  <StatusBadge status={merchant.kycStatus} />
                </TableCell>
                <TableCell>
                  <StatusBadge status={merchant.status} />
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10 transition-colors">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {merchants.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-slate-500">
                  No merchants found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        
        {/* Pagination placeholder */}
        <div className="flex items-center justify-between border-t border-slate-200 p-4 dark:border-slate-800">
          <p className="text-sm text-slate-500">
            Showing <span className="font-medium text-slate-900 dark:text-white">1</span> to <span className="font-medium text-slate-900 dark:text-white">{merchants.length}</span> of <span className="font-medium text-slate-900 dark:text-white">{merchants.length}</span> results
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled className="h-8 rounded-lg">Previous</Button>
            <Button variant="outline" size="sm" disabled className="h-8 rounded-lg">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
