export type WalletTransactionStatus = "PENDING" | "PROCESSING" | "SUCCESS" | "FAILED" | "REVERSED";
export type WalletTransactionType = "CREDIT" | "DEBIT";

export interface WalletTransaction {
  id: string;
  merchantId: string;
  amount: number;
  type: WalletTransactionType;
  status: WalletTransactionStatus;
  description: string;
  createdAt: string;
  referenceId?: string;
  balanceAfter: number;
}

export interface WalletOverview {
  merchantId: string;
  availableBalance: number;
  holdBalance: number;
  totalCredits: number;
  totalDebits: number;
}
