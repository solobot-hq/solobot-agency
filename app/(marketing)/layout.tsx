import MarketingHeader from "@/components/MarketingHeader";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[#0c0e12]">
      {/* The header contains the "GET STARTED" button logic */}
      <MarketingHeader />
      <main className="flex-1 pt-[130px]">
        {children}
      </main>
    </div>
  );
}