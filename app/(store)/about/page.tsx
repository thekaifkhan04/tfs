import { Hero } from "@/components/home/Hero"
import { ScrollReveal } from "@/components/ScrollReveal"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Reusing Hero with a different text style or just a custom banner */}
      <section className="bg-muted py-12 px-4 md:px-12 border-b border-border rounded-b-[3rem] mb-12">
        <div className="container mx-auto text-center">
          <ScrollReveal>
            <h1 className="text-3xl md:text-3xl font-black uppercase tracking-tighter text-foreground mb-6">
              Our Story
            </h1>
            <p className="text-muted-foreground font-medium text-xl max-w-3xl mx-auto leading-relaxed">
              We are TFS. Born from the belief that world-class athletes deserve world-class gear. We curate and build the highest quality equipment and supplements on the planet.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-12 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <ScrollReveal className="relative h-[600px] rounded-3xl overflow-hidden">
            <Image src="/images/ref_deal_main.jpg" alt="Gym" fill className="object-cover hover:scale-105 transition-transform duration-1000" />
          </ScrollReveal>
          <div>
            <ScrollReveal delay={0.2}>
              <h2 className="text-3xl md:text-3xl font-black uppercase tracking-tighter text-foreground mb-6">
                Relentless<br/>Pursuit of<br/><span className="text-primary">Perfection</span>
              </h2>
              <p className="text-muted-foreground font-medium text-lg leading-relaxed mb-8">
                Since our inception, The Fitness Store has been dedicated to providing uncompromising quality. We partner directly with premium brands and manufacturers to ensure that every single item we stock meets our rigorous standards.
              </p>
              <p className="text-muted-foreground font-medium text-lg leading-relaxed">
                Whether you are stepping into the gym for the first time or competing on the world stage, our mission remains the same: equip you for greatness.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  )
}
