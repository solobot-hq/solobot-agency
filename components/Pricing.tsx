export default function Pricing(){
  const plans = [
    { name: "Free", price: "£0", cta: "Get Started", features: ["Basic tools", "Community support", "Limited credits"] },
    { name: "Pro", price: "£29/mo", cta: "Upgrade to Pro", features: ["All 6 bots", "Priority support", "Extended credits"] },
    { name: "Enterprise", price: "Custom", cta: "Contact Sales", features: ["SSO & SLA", "Custom limits", "Dedicated success"] },
  ];
  return (
    <section id="pricing" className="container-xl my-24">
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-8">Pricing</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((p)=> (
          <div key={p.name} className="bg-white rounded-2xl shadow p-6 border">
            <h3 className="text-xl font-semibold">{p.name}</h3>
            <p className="text-4xl font-bold my-4">{p.price}</p>
            <ul className="space-y-2 mb-6 text-gray-600">
              {p.features.map((f)=> <li key={f}>• {f}</li>)}
            </ul>
            <button className="w-full py-3 rounded-xl bg-solobot text-white">{p.cta}</button>
          </div>
        ))}
      </div>
    </section>
  )
}
