"use client";

export default function Paywall() {
  const handleUpgrade = async () => {
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: "pro" })
      });

      const data = await res.json();

      if (data?.url) {
        window.location.href = data.url;
      } else {
        alert("Upgrade failed. No checkout URL returned.");
      }
    } catch (error) {
      console.error("Upgrade error:", error);
      alert("Something went wrong. Check console.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h2 className="text-2xl font-semibold mb-4">Free Limit Reached</h2>
      <p className="text-muted-foreground mb-6">
        You’ve used all your free requests for this tool.
      </p>

      <button
        onClick={handleUpgrade}
        className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl text-lg font-semibold transition"
      >
        Upgrade to Unlock Unlimited Access
      </button>
    </div>
  );
}
