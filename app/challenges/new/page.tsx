import type { Metadata } from "next";
import { HostBountyForm } from "@/app/components/challenges/host-bounty-form";
export const metadata: Metadata = { title: "Host a bounty · Kynetic" };
export default function NewBountyPage() {
  return <HostBountyForm />;
}
