import { AVAILABLE_PLANS } from "@/lib/billing/plans";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check } from "lucide-react";

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-[#05070a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {AVAILABLE_PLANS.map((plan) => (
            <div 
              key={plan.id}
              className="flex flex-col rounded-md border border-zinc-800 bg-[#05070a] p-8"
            >
              <div className="mb-8">
                <h3 className="text-sm font-bold uppercase tracking-tight text-white">
                  {plan.name}
                </h3>
                <div className="mt-2 flex items-baseline">
                  <span className="text-3xl font-bold text-white">£{plan.pricing.monthly}</span>
                  <span className="ml-1 text-zinc-500 text-xs">/mo</span>
                </div>
              </div>

              <ul className="mb-8 space-y-3 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center text-xs text-zinc-400">
                    <Check className="mr-2 h-3 w-3 text-zinc-500" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link href="/sign-up" className="w-full">
                <Button className="w-full bg-white text-black hover:bg-zinc-200 h-10 text-xs font-semibold rounded-sm">
                  Start Building Now
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}