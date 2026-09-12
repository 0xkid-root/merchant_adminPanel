import {
  LayoutDashboard,
  Building2,
  WalletCards,
  CreditCard,
  UsersRound,
  ArrowUpRight,
  Landmark,
  BadgeDollarSign,
  ChartNoAxesCombined,
  Bell,
  Code2,
  Webhook,
  UserCog,
  Settings,
  FileCheck
} from "lucide-react";
import { NavGroup } from "@/types/navigation";

export const NAVIGATION_CONFIG: NavGroup[] = [
  {
    label: "Overview",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: "Operations",
    items: [
      {
        title: "Merchants",
        href: "/merchants",
        icon: Building2,
      },
      {
        title: "Wallet Management",
        icon: WalletCards,
        children: [
          { title: "Wallet Dashboard", href: "/wallet" },
          { title: "All Wallets", href: "/wallet/all" },
          { title: "Wallet Transactions", href: "/wallet/transactions" },
          { title: "Wallet Ledger", href: "/wallet/ledger" },
          { title: "Fund Requests", href: "/wallet/fund-requests" },
          { title: "Withdrawal Requests", href: "/wallet/withdrawals" },
          { title: "Wallet Holds", href: "/wallet/holds" },
          { title: "Manual Adjustments", href: "/wallet/adjustments" },
        ],
      },
      {
        title: "Wallet Whitelist",
        href: "/wallet-whitelist",
        icon: FileCheck,
      },
      {
        title: "VAN Management",
        href: "/van-management",
        icon: CreditCard,
      },
      {
        title: "Beneficiaries",
        href: "/beneficiaries",
        icon: UsersRound,
      },
      {
        title: "Payouts",
        icon: ArrowUpRight,
        children: [
          { title: "All Payouts", href: "/payouts" },
          { title: "Single Payouts", href: "/payouts/single" },
          { title: "Bulk Payouts", href: "/payouts/bulk" },
          { title: "Pending", href: "/payouts/pending" },
          { title: "Failed", href: "/payouts/failed" },
          { title: "Retry Queue", href: "/payouts/retry" },
        ],
      },
    ],
  },
  {
    label: "Finance",
    items: [
      {
        title: "Settlement",
        icon: Landmark,
        children: [
          { title: "Settlement Dashboard", href: "/settlement" },
          { title: "Queue", href: "/settlement/queue" },
          { title: "Completed", href: "/settlement/completed" },
          { title: "Reconciliation", href: "/settlement/reconciliation" },
        ],
      },
      {
        title: "Fees & Pricing",
        href: "/fees",
        icon: BadgeDollarSign,
      },
    ],
  },
  {
    label: "Reporting",
    items: [
      {
        title: "Reports",
        href: "/reports",
        icon: ChartNoAxesCombined,
      },
      {
        title: "Notifications & Alerts",
        href: "/notifications",
        icon: Bell,
      },
    ],
  },
  {
    label: "Platform",
    items: [
      {
        title: "Users & RBAC",
        icon: UserCog,
        children: [
          { title: "Admin Users", href: "/users/admins" },
          { title: "Roles & Permissions", href: "/users/roles" },
        ],
      },
    ],
  },
];
