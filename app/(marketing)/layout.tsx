import MarketingHeader from "@/components/MarketingHeader";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[#0c0e12]">
      {/* Logic is moved into this separate Client Component */}
      <MarketingHeader />
      
      {/* Main content offset by the 130px header height */}
      <main className="flex-1 pt-[130px]">
        {children}
      </main>
    </div>
  );
}