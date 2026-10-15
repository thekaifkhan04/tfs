import { ScrollReveal } from "@/components/ScrollReveal"
import Link from "next/link"
import { Lock } from "lucide-react"

export default function CheckoutPage() {
  return (
    <div className="bg-background min-h-screen pb-24">
      <section className="bg-muted py-24 px-4 md:px-12 rounded-b-2xl mb-12 border-b border-border text-center">
        <ScrollReveal>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Lock className="w-6 h-6 text-primary" />
            <span className="font-bold uppercase tracking-widest text-primary text-sm">Secure Checkout</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-foreground">
            Complete Order
          </h1>
        </ScrollReveal>
      </section>

      <section className="container mx-auto px-4 md:px-12 max-w-4xl">
        <ScrollReveal>
          <div className="bg-muted p-8 md:p-12 rounded-2xl border border-dashed border-border text-center flex flex-col items-center justify-center min-h-[400px]">
             <h2 className="text-3xl font-black uppercase tracking-wider mb-4">Mock Checkout</h2>
             <p className="text-muted-foreground font-medium mb-8 max-w-md">
               This is a template store. In a real environment, this page would integrate with Stripe, Razorpay, or your preferred payment gateway.
             </p>
             <Link href="/shop" className="bg-foreground text-background hover:bg-primary hover:text-primary-foreground font-black uppercase tracking-wider px-8 py-4 rounded-full transition-colors">
               Return to Shop
             </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  )
}
