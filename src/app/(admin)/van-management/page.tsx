import { VanManagementPage } from "@/features/van-management/components/van-management-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "VAN Management | AtMoonPe Admin",
  description: "Manage virtual accounts assigned to merchants.",
};

export default function Page() {
  return <VanManagementPage />;
}
