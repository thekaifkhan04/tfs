import { Hero } from "@/components/home/Hero"
import { prisma } from "@/lib/db/prisma"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, ArrowRight } from "lucide-react"
import { ScrollReveal } from "@/components/ScrollReveal"
import { FilteredProductGrid } from "@/components/home/FilteredProductGrid"

export default async function HomePage() {
  const categories = await prisma.category.findMany({
    where: { active: true },
    orderBy: { sortOrder: 'asc' },
    select: { id: true, name: true, slug: true },
    take: 4
  })

  // Fetch more products so we can actually filter them by category
  const allProducts = await prisma.product.findMany({
    include: { images: { orderBy: { order: 'asc' }, take: 1 }, category: true },
    take: 20
  })

  return (
    <div className="bg-background">
      <Hero />
      
      {/* EXCELLENCE MEETS PRECISION (About Section) */}
      <section className="py-10 px-4 md:px-12 container mx-auto overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-8 items-center">
          <div className="lg:w-1/2">
            <ScrollReveal>
              <span className="text-sm font-bold tracking-widest uppercase mb-4 block text-muted-foreground">About Us</span>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-foreground leading-none mb-8">
                Excellence<br/>Meets Precision
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-muted-foreground font-medium max-w-md mb-8 leading-relaxed">
                At TFS we offer world-class fitness equipment and supplements designed to elevate your game. With a focus on top-tier performance and quality, we provide the best gear for athletes of all levels, ensuring every player is equipped for success.
              </p>
              <div className="flex items-center gap-4">
                <Link href="/about" className="px-8 py-3.5 rounded-full border border-border text-foreground font-bold text-sm uppercase tracking-wider hover:bg-muted transition-colors">
                  About Us
                </Link>
                <Link href="/about" className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-105 transition-transform">
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.4} className="lg:w-1/2 relative h-[250px] w-full mt-12 lg:mt-0">
            <div className="absolute right-0 top-0 w-[85%] h-[250px] rounded-3xl overflow-hidden group">
              <Image 
                src="/images/ref_about_main.jpg" 
                alt="Athlete Lifting" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute left-0 bottom-0 w-[45%] aspect-square rounded-3xl overflow-hidden border-8 border-background group">
              <Image 
                src="/images/ref_about_sub.jpg" 
                alt="Weight Plates" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* OUR EXCLUSIVE FITNESS PRODUCT (Product Grid) */}
      <section className="py-10 px-4 md:px-12 bg-muted/30">
        <div className="container mx-auto">
          <FilteredProductGrid 
            products={allProducts.map(p => ({
              id: p.id,
              name: p.name,
              slug: p.slug,
              price: p.price,
              category: p.category ? { name: p.category.name, slug: p.category.slug } : null,
              images: p.images.map(img => ({ url: img.url }))
            }))}
            categories={categories}
          />

          <ScrollReveal delay={0.4} className="mt-12 flex justify-center items-center gap-4">
             <Link href="/shop" className="px-8 py-3.5 rounded-full border border-border text-foreground font-bold text-sm uppercase tracking-wider hover:bg-muted transition-colors">
                View All Products
              </Link>
              <Link href="/shop" className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-105 transition-transform">
                <ArrowRight className="w-5 h-5" />
              </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* BECOME PART OF FITNESS EXCELLENCE (Bento) */}
      <section className="py-10 px-4 md:px-12 container mx-auto">
        <ScrollReveal className="flex flex-col lg:flex-row gap-8 items-center mb-12">
          <div className="lg:w-1/2">
             <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-foreground leading-none">
               Become Part Of<br/>Fitness Excellence
             </h2>
          </div>
          <div className="lg:w-1/2">
             <p className="text-muted-foreground font-medium mb-6">
               Join and experience world-class facilities, exclusive events, and a community of passionate athletes. Whether you're a pro or a beginner, we offer the perfect environment to elevate your game.
             </p>
             <Link href="/about" className="px-8 py-3 rounded-full border border-border text-foreground font-bold text-sm uppercase tracking-wider hover:bg-muted transition-colors inline-block">
               Join TFS Club
             </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-auto md:min-h-[400px]">
          <ScrollReveal delay={0.1} className="md:col-span-1 rounded-3xl overflow-hidden relative min-h-[250px] group">
             <Image src="/images/ref_bento_1.jpg" alt="Accessories" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
          </ScrollReveal>
          
          <div className="md:col-span-2 grid grid-rows-2 gap-4">
             <ScrollReveal delay={0.2} className="rounded-3xl bg-primary flex items-center justify-center p-8 relative overflow-hidden text-primary-foreground min-h-[150px] group cursor-pointer hover:shadow-2xl transition-shadow">
                <div className="relative z-10 w-full flex justify-between items-center">
                  <h3 className="text-3xl font-black uppercase tracking-wider group-hover:translate-x-2 transition-transform">Find your<br/>strength</h3>
                  <div className="w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
                <div className="absolute right-[-10%] bottom-[-20%] w-[50%] h-[150%] opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700">
                  <Image src="/images/category_men.jpg" alt="Strength" fill className="object-cover rounded-full" />
                </div>
             </ScrollReveal>
             
             <div className="grid grid-cols-2 gap-4 h-full">
               <ScrollReveal delay={0.3} className="rounded-3xl bg-muted flex flex-col items-center justify-center p-8 text-center min-h-[150px] group cursor-pointer hover:bg-foreground hover:text-background transition-colors duration-500">
                 <p className="text-sm font-bold text-muted-foreground group-hover:text-background/70 mb-4">@2026</p>
                 <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-6 group-hover:-rotate-45 transition-transform duration-500">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                  <h3 className="text-3xl font-black tracking-tighter">TFS</h3>
               </ScrollReveal>
               <ScrollReveal delay={0.4} className="rounded-3xl overflow-hidden relative min-h-[150px] group">
                  <Image src="/images/ref_about_sub.jpg" alt="Details" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
               </ScrollReveal>
             </div>
          </div>
        </div>
      </section>

      {/* CLAIM EXCLUSIVE DEALS */}
      <section className="py-10 px-4 md:px-12 bg-muted/20">
        <div className="container mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl md:text-3xl font-black uppercase tracking-tighter text-foreground text-center mb-16">
              Claim Exclusive Deals
            </h2>
          </ScrollReveal>
          
          {/* Main Deal Banner */}
          <ScrollReveal delay={0.2}>
            <div className="w-full h-[250px] rounded-3xl overflow-hidden relative mb-6 bg-muted flex items-center group">
              <div className="absolute right-0 top-0 bottom-0 w-[60%] overflow-hidden">
                 <Image src="/images/ref_deal_main.jpg" alt="Deals" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                 <div className="absolute inset-0 bg-gradient-to-r from-muted to-transparent pointer-events-none" />
              </div>
              
              <div className="relative z-10 pl-6 md:pl-12 max-w-md">
                <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">First Order</h3>
                <p className="text-2xl font-medium text-muted-foreground mb-8">Up To 30% Off</p>
                <div className="flex items-center gap-4">
                  <Link href="/shop" className="px-8 py-3.5 rounded-full bg-background text-foreground font-bold text-sm uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-colors">
                    Shop Now
                  </Link>
                  <Link href="/shop" className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-105 transition-transform">
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
      
    </div>
  )
}

