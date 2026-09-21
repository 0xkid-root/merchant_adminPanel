export interface WebhookEvent {
  id: string;
  type: string;
  description: string;
  module: string;
  createdAt: string;
}

export interface WebhookLog {
  id: string;
  merchantId: string;
  merchantName: string;
  eventType: string;
  webhookUrl: string;
  httpStatus: number | null;
  attempts: number;
  responseTime: number | null;
  deliveryStatus: "DELIVERED" | "PENDING" | "FAILED" | "RETRYING";
  createdAt: string;
  lastAttemptAt?: string;
  failureReason?: string;
  payload?: any;
}

export interface FailedWebhook extends WebhookLog {
  failureReason: string;
}
