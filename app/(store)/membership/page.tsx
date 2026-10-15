import { ScrollReveal } from "@/components/ScrollReveal"
import { Check } from "lucide-react"

export default function MembershipPage() {
  const tiers = [
    {
      name: "Pro",
      price: "₹999",
      period: "/month",
      features: ["Free Express Shipping", "10% off all Supplements", "Access to Club Events"],
      primary: false
    },
    {
      name: "Elite",
      price: "₹2,499",
      period: "/month",
      features: ["Free Express Shipping", "20% off all Storewide", "VIP Event Access", "Personalized Nutrition Plan", "Early access to drops"],
      primary: true
    }
  ]

  return (
    <div className="bg-background min-h-screen pb-24">
      <section className="bg-muted py-12 px-4 md:px-12 rounded-b-[3rem] mb-24 text-center">
        <ScrollReveal>
          <h1 className="text-3xl md:text-3xl font-black uppercase tracking-tighter text-foreground mb-6">
            Memberships
          </h1>
          <p className="text-muted-foreground font-medium text-xl max-w-2xl mx-auto leading-relaxed">
            Elevate your journey with a TFS membership. Unlock unparalleled discounts and exclusive access.
          </p>
        </ScrollReveal>
      </section>

      <section className="container mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {tiers.map((tier, idx) => (
            <ScrollReveal key={tier.name} delay={idx * 0.2}>
              <div className={`p-10 rounded-3xl border flex flex-col h-full transition-transform hover:-translate-y-2 ${tier.primary ? 'bg-primary text-primary-foreground border-primary' : 'bg-background text-foreground border-border'}`}>
                <h3 className="text-3xl font-black uppercase tracking-wider mb-2">{tier.name}</h3>
                <div className="flex items-end gap-1 mb-8">
                  <span className="text-3xl font-black tracking-tighter">{tier.price}</span>
                  <span className={tier.primary ? 'text-primary-foreground/70 mb-1' : 'text-muted-foreground mb-1'}>{tier.period}</span>
                </div>
                
                <ul className="space-y-4 mb-12 flex-1">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-center gap-3 font-medium">
                      <Check className={`w-5 h-5 ${tier.primary ? 'text-white' : 'text-primary'}`} /> {f}
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-4 rounded-full font-black uppercase tracking-wider transition-colors ${tier.primary ? 'bg-white text-primary hover:bg-background' : 'bg-muted text-foreground hover:bg-foreground hover:text-background'}`}>
                  Select Plan
                </button>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  )
}
