import Pricing from "@/components/Pricing";

export const dynamic = "force-dynamic"; // Prevents stale builds

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-black">
      <Pricing />
    </main>
  );
}