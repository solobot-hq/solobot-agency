import { AVAILABLE_PLANS } from "@/lib/billing/plans";
import { Check } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#05070a] text-white">
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 py-28 text-center">
        <div className="mb-6 inline-flex items-center rounded-full border border-white/[0.08] px-3 py-1 text-xs font-medium text-zinc-400">
          operational autonomy v2.0
        </div>

        <h1 className="text-5xl font-semibold tracking-tight md:text-6xl">
          Hire AI Employees.
          <br />
          <span className="text-zinc-500">Fire the overheads.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base text-zinc-400">
          Deploy autonomous AI agents to handle sales, support, and operations.
          Built with infrastructure discipline, not gimmicks.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <button className="h-11 rounded-md bg-white px-6 text-sm font-medium text-black hover:bg-zinc-200">
            get started
          </button>
          <button className="h-11 rounded-md border border-white/[0.08] px-6 text-sm text-zinc-400 hover:bg-white/[0.04]">
            view pricing
          </button>
        </div>
      </section>

      {/* PRICING */}
      <section className="mx-auto max-w-7xl px-6 pb-28">
        <h2 className="mb-12 text-center text-2xl font-semibold text-white">
          pricing
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {AVAILABLE_PLANS.map((plan) => (
            <div
              key={plan.id}
              className="flex flex-col rounded-xl border border-white/[0.08] bg-[#0c0e12] p-6"
            >
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                  {plan.name}
                </p>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-3xl font-semibold">
                    £{plan.pricing.monthly}
                  </span>
                  <span className="text-sm text-zinc-500">/month</span>
                </div>
              </div>

              <ul className="mb-6 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-zinc-400"
                  >
                    <Check className="mt-0.5 h-4 w-4 text-zinc-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="mt-auto h-11 rounded-md border border-white/[0.08] text-sm text-zinc-300 hover:bg-white/[0.04]">
                start building
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
