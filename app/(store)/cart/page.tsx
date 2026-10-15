import { ScrollReveal } from "@/components/ScrollReveal"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Trash2 } from "lucide-react"

export default function CartPage() {
  // Static mock data for UI visualization
  const cartItems = [
    {
      id: 1,
      name: "APEX Pro Dumbbell 15kg",
      price: 4999,
      quantity: 2,
      image: "/images/prod_dumbbell.jpg"
    },
    {
      id: 2,
      name: "N-Fit Compression Shirt",
      price: 2499,
      quantity: 1,
      image: "/images/prod_apparel.jpg"
    }
  ]

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)

  return (
    <div className="bg-background min-h-screen pb-24">
      <section className="bg-muted py-24 px-4 md:px-12 rounded-b-2xl mb-12 border-b border-border">
        <div className="container mx-auto">
          <ScrollReveal>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-foreground mb-4">
              Your Cart
            </h1>
            <p className="text-muted-foreground font-medium text-lg">
              Review your items and proceed to checkout.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Cart Items List */}
          <div className="flex-1 flex flex-col gap-6">
            {cartItems.map((item, idx) => (
              <ScrollReveal key={item.id} delay={idx * 0.1}>
                <div className="flex items-center gap-6 p-4 md:p-6 bg-muted rounded-2xl border border-border">
                  <div className="relative w-24 h-24 md:w-32 md:h-32 bg-background rounded-xl overflow-hidden shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold uppercase tracking-wider mb-2">{item.name}</h3>
                    <p className="text-muted-foreground font-medium mb-4">₹{item.price.toLocaleString('en-IN')}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-4 bg-background border border-border rounded-full px-4 py-1">
                        <button className="text-muted-foreground hover:text-foreground font-bold">-</button>
                        <span className="font-bold">{item.quantity}</span>
                        <button className="text-muted-foreground hover:text-foreground font-bold">+</button>
                      </div>
                      <button className="text-muted-foreground hover:text-primary transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="hidden md:block text-right">
                    <span className="font-black text-xl">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-96 shrink-0">
            <ScrollReveal delay={0.3}>
              <div className="bg-muted p-8 rounded-2xl border border-border sticky top-24">
                <h2 className="text-2xl font-black uppercase tracking-wider mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between font-medium">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="pt-4 border-t border-border flex justify-between font-black text-xl">
                    <span>Total</span>
                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <Link href="/checkout" className="w-full bg-foreground text-background hover:bg-primary hover:text-primary-foreground font-black uppercase tracking-wider py-4 rounded-full flex items-center justify-center gap-3 transition-colors group">
                  Checkout <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <p className="text-center text-xs font-bold text-muted-foreground mt-4 uppercase tracking-widest">
                  Secure Checkout
                </p>
              </div>
            </ScrollReveal>
          </div>
          
        </div>
      </section>
    </div>
  )
}
