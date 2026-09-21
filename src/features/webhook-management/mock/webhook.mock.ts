import { WebhookEvent, WebhookLog, FailedWebhook } from "../types/webhook.types";

export const mockWebhookEvents: WebhookEvent[] = [
  { id: "EVT-TYPE-1", type: "payout.created", description: "Triggered when a new payout is created.", module: "Payout Management", createdAt: "2026-01-10T00:00:00Z" },
  { id: "EVT-TYPE-2", type: "payout.processing", description: "Triggered when a payout status changes to processing.", module: "Payout Management", createdAt: "2026-01-10T00:00:00Z" },
  { id: "EVT-TYPE-3", type: "payout.success", description: "Triggered when a payout is completed successfully.", module: "Payout Management", createdAt: "2026-01-10T00:00:00Z" },
  { id: "EVT-TYPE-4", type: "payout.failed", description: "Triggered when a payout fails.", module: "Payout Management", createdAt: "2026-01-10T00:00:00Z" },
  { id: "EVT-TYPE-5", type: "payout.reversed", description: "Triggered when a payout is reversed.", module: "Payout Management", createdAt: "2026-01-10T00:00:00Z" },
  { id: "EVT-TYPE-6", type: "wallet.credit", description: "Triggered when funds are credited to a wallet.", module: "Wallet Management", createdAt: "2026-01-15T00:00:00Z" },
  { id: "EVT-TYPE-7", type: "wallet.debit", description: "Triggered when funds are debited from a wallet.", module: "Wallet Management", createdAt: "2026-01-15T00:00:00Z" },
  { id: "EVT-TYPE-8", type: "beneficiary.created", description: "Triggered when a new beneficiary is registered.", module: "Beneficiary Management", createdAt: "2026-02-20T00:00:00Z" },
  { id: "EVT-TYPE-9", type: "settlement.completed", description: "Triggered when a settlement is completed.", module: "Settlement", createdAt: "2026-03-05T00:00:00Z" }
];

export const mockWebhookLogs: WebhookLog[] = [
  {
    id: "EVT-98231",
    merchantId: "M-001",
    merchantName: "ABC Technologies",
    eventType: "payout.success",
    webhookUrl: "https://merchant.example/webhooks",
    httpStatus: 200,
    attempts: 1,
    responseTime: 142,
    deliveryStatus: "DELIVERED",
    createdAt: "2026-09-21T12:45:00Z",
    payload: {
      event: "payout.success",
      payoutId: "PO-102938",
      status: "SUCCESS",
      amount: 15000,
      currency: "INR"
    }
  },
  {
    id: "EVT-98321",
    merchantId: "M-002",
    merchantName: "Nova Retail Pvt Ltd",
    eventType: "payout.failed",
    webhookUrl: "https://api.novaretail.com/webhook",
    httpStatus: 500,
    attempts: 3,
    responseTime: 1050,
    deliveryStatus: "FAILED",
    createdAt: "2026-09-21T12:30:00Z",
    lastAttemptAt: "2026-09-21T12:52:00Z",
    failureReason: "Internal Server Error",
    payload: {
      event: "payout.failed",
      payoutId: "PO-102945",
      status: "FAILED",
      reason: "Insufficient funds in bank account"
    }
  },
  {
    id: "EVT-98322",
    merchantId: "M-003",
    merchantName: "FinEdge Solutions",
    eventType: "wallet.credit",
    webhookUrl: "https://webhooks.finedge.io/atmoonpe",
    httpStatus: null,
    attempts: 1,
    responseTime: null,
    deliveryStatus: "PENDING",
    createdAt: "2026-09-21T13:42:00Z",
    payload: {
      event: "wallet.credit",
      transactionId: "TX-48930",
      amount: 50000,
      balance: 150000
    }
  },
  {
    id: "EVT-98323",
    merchantId: "M-001",
    merchantName: "ABC Technologies",
    eventType: "beneficiary.created",
    webhookUrl: "https://merchant.example/webhooks",
    httpStatus: 404,
    attempts: 2,
    responseTime: 85,
    deliveryStatus: "RETRYING",
    createdAt: "2026-09-21T13:30:00Z",
    lastAttemptAt: "2026-09-21T13:45:00Z",
    failureReason: "Not Found",
    payload: {
      event: "beneficiary.created",
      beneficiaryId: "BEN-83492",
      status: "ACTIVE"
    }
  }
];

export const mockFailedWebhooks: FailedWebhook[] = mockWebhookLogs
  .filter(log => log.deliveryStatus === "FAILED" || log.deliveryStatus === "RETRYING")
  .map(log => ({ ...log, failureReason: log.failureReason || "Unknown Error" }));
