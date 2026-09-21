import { ApiCredential, ApiLog, ApiUsageSummary, ApiUsageChartData, MerchantApiUsage } from "../types/api.types";

export const mockApiCredentials: ApiCredential[] = [
  {
    id: "API-00021",
    merchantId: "M-001",
    merchantName: "ABC Technologies",
    environment: "Production",
    apiKey: "pk_live_••••••••9A31",
    status: "ACTIVE",
    createdAt: "2026-09-18T10:00:00Z",
    lastUsedAt: "2026-09-21T12:42:00Z",
    lastRotatedAt: "2026-09-10T08:00:00Z",
  },
  {
    id: "API-00022",
    merchantId: "M-002",
    merchantName: "Nova Retail Pvt Ltd",
    environment: "Sandbox",
    apiKey: "pk_test_••••••••B482",
    status: "ACTIVE",
    createdAt: "2026-09-15T11:30:00Z",
    lastUsedAt: "2026-09-21T09:15:00Z",
  },
  {
    id: "API-00023",
    merchantId: "M-003",
    merchantName: "FinEdge Solutions",
    environment: "Production",
    apiKey: "pk_live_••••••••C793",
    status: "INACTIVE",
    createdAt: "2026-08-20T14:45:00Z",
    lastUsedAt: "2026-09-01T16:20:00Z",
    lastRotatedAt: "2026-08-20T14:45:00Z",
  }
];

export const mockApiLogs: ApiLog[] = [
  {
    id: "REQ-982341",
    merchantId: "M-001",
    merchantName: "ABC Technologies",
    method: "POST",
    endpoint: "/api/v1/payout",
    status: 200,
    environment: "Production",
    responseTime: 184,
    ipAddress: "103.24.12.98",
    createdAt: "2026-09-21T12:42:00Z",
    requestHeaders: {
      "Content-Type": "application/json",
      "Authorization": "Bearer pk_live_••••••••9A31"
    },
    requestBody: {
      amount: 15000,
      currency: "INR",
      beneficiaryId: "BEN-83492"
    },
    responseHeaders: {
      "Content-Type": "application/json"
    },
    responseBody: {
      status: "SUCCESS",
      payoutId: "PO-102938",
      referenceId: "REF-902348"
    }
  },
  {
    id: "REQ-982342",
    merchantId: "M-002",
    merchantName: "Nova Retail Pvt Ltd",
    method: "GET",
    endpoint: "/api/v1/wallet",
    status: 401,
    environment: "Sandbox",
    responseTime: 45,
    ipAddress: "45.112.56.23",
    createdAt: "2026-09-21T12:45:00Z",
    requestHeaders: {
      "Authorization": "Bearer invalid_token"
    },
    responseBody: {
      error: "Unauthorized",
      message: "Invalid API Key"
    }
  },
  {
    id: "REQ-982343",
    merchantId: "M-003",
    merchantName: "FinEdge Solutions",
    method: "GET",
    endpoint: "/api/v1/beneficiaries",
    status: 200,
    environment: "Production",
    responseTime: 112,
    ipAddress: "123.45.67.89",
    createdAt: "2026-09-21T12:50:00Z"
  }
];

export const mockApiUsageSummary: ApiUsageSummary = {
  totalRequests: 145230,
  successfulRequests: 142100,
  failedRequests: 3130,
  avgResponseTime: 124
};

export const mockApiUsageChartData: ApiUsageChartData[] = [
  { date: "15 Sep", requests: 12000, success: 11800, failed: 200 },
  { date: "16 Sep", requests: 15000, success: 14600, failed: 400 },
  { date: "17 Sep", requests: 18000, success: 17500, failed: 500 },
  { date: "18 Sep", requests: 22000, success: 21600, failed: 400 },
  { date: "19 Sep", requests: 19000, success: 18800, failed: 200 },
  { date: "20 Sep", requests: 25000, success: 24300, failed: 700 },
  { date: "21 Sep", requests: 34230, success: 33500, failed: 730 },
];

export const mockMerchantApiUsage: MerchantApiUsage[] = [
  {
    merchantId: "M-001",
    merchantName: "ABC Technologies",
    totalRequests: 85000,
    successRate: 99.1,
    failedRequests: 765,
    avgResponseTime: 110,
    lastRequestAt: "2026-09-21T13:40:00Z"
  },
  {
    merchantId: "M-002",
    merchantName: "Nova Retail Pvt Ltd",
    totalRequests: 42000,
    successRate: 98.5,
    failedRequests: 630,
    avgResponseTime: 135,
    lastRequestAt: "2026-09-21T13:35:00Z"
  },
  {
    merchantId: "M-003",
    merchantName: "FinEdge Solutions",
    totalRequests: 18230,
    successRate: 96.2,
    failedRequests: 692,
    avgResponseTime: 145,
    lastRequestAt: "2026-09-21T13:20:00Z"
  }
];
