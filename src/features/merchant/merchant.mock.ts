import { TableQueryParams, PageResponse } from "@/types/api";

export interface Merchant {
  id: string;
  merchantCode: string;
  businessName: string;
  ownerName: string;
  email: string;
  mobile: string;
  status: "ACTIVE" | "PENDING" | "SUSPENDED" | "BLOCKED";
  kycStatus: "APPROVED" | "PENDING" | "REJECTED";
  createdAt: string;
  walletBalance: number;
}

// Generate 55 dummy merchants for realistic pagination
const MOCK_MERCHANTS: Merchant[] = Array.from({ length: 55 }).map((_, i) => {
  const statuses: Merchant["status"][] = ["ACTIVE", "PENDING", "SUSPENDED", "BLOCKED"];
  const kycStatuses: Merchant["kycStatus"][] = ["APPROVED", "PENDING", "REJECTED"];
  
  return {
    id: `m_${1000 + i}`,
    merchantCode: `MERCH-${20000 + i}`,
    businessName: `Business Enterprise ${i + 1}`,
    ownerName: `Owner Name ${i + 1}`,
    email: `contact${i + 1}@business.com`,
    mobile: `+91 98765${(40000 + i).toString()}`,
    status: statuses[i % 4],
    kycStatus: kycStatuses[i % 3],
    createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
    walletBalance: Math.floor(Math.random() * 50000),
  };
});

/**
 * Simulates a paginated, sortable, filterable Spring Boot backend endpoint.
 * Delay simulates network latency.
 */
export async function getMerchantsMock(params: TableQueryParams): Promise<PageResponse<Merchant>> {
  // Simulate network delay of 400ms
  await new Promise((resolve) => setTimeout(resolve, 400));

  let filtered = [...MOCK_MERCHANTS];

  // 1. Apply Search
  if (params.search) {
    const s = params.search.toLowerCase();
    filtered = filtered.filter(
      (m) =>
        m.businessName.toLowerCase().includes(s) ||
        m.merchantCode.toLowerCase().includes(s) ||
        m.email.toLowerCase().includes(s)
    );
  }

  // 2. Apply Filters (e.g., status)
  if (params.filters) {
    if (params.filters.status && params.filters.status !== "ALL") {
      const statusFilter = params.filters.status;
      filtered = filtered.filter((m) => m.status === statusFilter);
    }
  }

  // 3. Apply Sorting
  if (params.sorting && params.sorting.length > 0) {
    const { id, desc } = params.sorting[0];
    filtered.sort((a, b) => {
      const valA = a[id as keyof Merchant];
      const valB = b[id as keyof Merchant];
      if (valA < valB) return desc ? 1 : -1;
      if (valA > valB) return desc ? -1 : 1;
      return 0;
    });
  } else {
    // Default sort by created at desc
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  // 4. Apply Pagination
  const totalElements = filtered.length;
  const totalPages = Math.ceil(totalElements / params.size);
  const start = params.page * params.size;
  const end = start + params.size;
  const content = filtered.slice(start, end);

  return {
    content,
    page: params.page,
    size: params.size,
    totalElements,
    totalPages,
  };
}
