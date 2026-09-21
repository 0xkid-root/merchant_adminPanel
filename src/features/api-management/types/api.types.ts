export interface ApiCredential {
  id: string;
  merchantId: string;
  merchantName: string;
  environment: "Sandbox" | "Production";
  apiKey: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  lastUsedAt?: string;
  lastRotatedAt?: string;
}

export interface ApiLog {
  id: string;
  merchantId: string;
  merchantName: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  endpoint: string;
  status: number;
  environment: "Sandbox" | "Production";
  responseTime: number;
  ipAddress: string;
  createdAt: string;
  requestHeaders?: Record<string, string>;
  requestBody?: any;
  responseHeaders?: Record<string, string>;
  responseBody?: any;
}

export interface ApiUsageSummary {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  avgResponseTime: number;
}

export interface ApiUsageChartData {
  date: string;
  requests: number;
  success: number;
  failed: number;
}

export interface MerchantApiUsage {
  merchantId: string;
  merchantName: string;
  totalRequests: number;
  successRate: number;
  failedRequests: number;
  avgResponseTime: number;
  lastRequestAt: string;
}
