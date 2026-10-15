import { ScrollReveal } from "@/components/ScrollReveal"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function ClubPage() {
  return (
    <div className="bg-background min-h-screen">
      <section className="bg-foreground text-background py-12 px-4 md:px-12 rounded-b-[3rem] mb-12">
        <div className="container mx-auto text-center">
          <ScrollReveal>
            <span className="text-primary font-bold tracking-widest uppercase mb-4 block">Exclusive Access</span>
            <h1 className="text-3xl md:text-3xl font-black uppercase tracking-tighter mb-6">
              The TFS Club
            </h1>
            <p className="text-background/70 font-medium text-xl max-w-2xl mx-auto leading-relaxed mb-12">
              An exclusive community for dedicated athletes. Get early access to limited drops, specialized training events, and priority support.
            </p>
            <Link href="/membership" className="inline-flex items-center gap-4 bg-primary text-primary-foreground hover:bg-primary/90 font-black uppercase tracking-wider px-10 py-5 rounded-full transition-all hover:scale-105">
              View Memberships <ArrowRight className="w-5 h-5" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-12 py-10 text-center">
         <ScrollReveal>
            <h2 className="text-3xl md:text-3xl font-black uppercase tracking-tighter text-foreground mb-8">
              Coming Soon
            </h2>
            <p className="text-muted-foreground font-medium text-lg">
              We are finalizing the details for our exclusive club events. Stay tuned!
            </p>
         </ScrollReveal>
      </section>
    </div>
  )
}
