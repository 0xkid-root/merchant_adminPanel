import { MerchantDetailsPage } from "@/features/merchant/components/merchant-details-page";

interface PageProps {
  params: {
    merchantId: string;
  };
}

export default function Page({ params }: PageProps) {
  return <MerchantDetailsPage merchantId={params.merchantId} />;
}
