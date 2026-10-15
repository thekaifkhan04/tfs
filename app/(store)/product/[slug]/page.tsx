import { prisma } from "@/lib/db/prisma"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Star, MessageCircle, Heart, ShieldCheck, Zap, Truck } from "lucide-react"
import { ScrollReveal } from "@/components/ScrollReveal"

export const dynamic = 'force-dynamic'

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: {
      images: { orderBy: { order: 'asc' } },
      category: true,
    }
  })

  if (!product) {
    notFound()
  }

  // Pre-fill WhatsApp Message
  const whatsappNumber = process.env.WHATSAPP_NUMBER || "919876543210"
  const message = `Hello TFS,\n\I want to order:\n\nProduct Name: ${product.name}\nProduct ID: ${product.sku}\nPrice: ₹${product.price.toLocaleString('en-IN')}`
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 md:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Images Section */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <ScrollReveal>
              <div className="relative aspect-square w-full bg-muted rounded-3xl overflow-hidden">
                {product.images[0] ? (
                  <Image 
                    src={product.images[0].url} 
                    alt={product.images[0].alt || product.name} 
                    fill 
                    className="object-contain p-8 drop-shadow-2xl mix-blend-multiply dark:mix-blend-normal hover:scale-105 transition-transform duration-700"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-bold opacity-20">NO IMAGE</div>
                )}
                {(product.discount ?? 0) > 0  && (
                  <div className="absolute top-8 left-8 bg-foreground text-background text-sm font-bold px-4 py-2 rounded-full uppercase tracking-wider z-10 shadow-lg">
                    Sale
                  </div>
                )}
              </div>
            </ScrollReveal>

            {product.images.length > 1 && (
              <ScrollReveal delay={0.2} className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                {product.images.map((img, idx) => (
                  <div key={img.id} className="relative w-32 h-32 shrink-0 bg-muted rounded-3xl cursor-pointer overflow-hidden opacity-60 hover:opacity-100 transition-opacity">
                    <Image src={img.url} alt={img.alt || product.name} fill className="object-contain p-4 mix-blend-multiply dark:mix-blend-normal" />
                  </div>
                ))}
              </ScrollReveal>
            )}
          </div>

          {/* Details Section */}
          <div className="lg:col-span-5 flex flex-col">
            <ScrollReveal delay={0.1} className="mb-8">
              <span className="inline-block px-4 py-1.5 bg-muted text-xs font-bold text-foreground uppercase tracking-wider rounded-full mb-6">
                SKU: {product.sku}
              </span>
              
              {product.category && (
                <p className="text-primary font-bold text-sm uppercase tracking-wider mb-3">{product.category.name}</p>
              )}
              
              <h1 className="text-3xl md:text-3xl font-black uppercase tracking-tighter text-foreground leading-none mb-6">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-primary text-primary' : 'fill-muted text-muted'}`} />
                  ))}
                </div>
                <span className="text-sm font-bold text-muted-foreground">{product.reviewCount} Reviews</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="flex items-end gap-4 mb-10 pb-10 border-b border-border">
              <span className="text-3xl font-black text-foreground">₹{product.price.toLocaleString('en-IN')}</span>
              {product.mrp > product.price && (
                <span className="text-muted-foreground text-2xl line-through font-medium mb-1">₹{product.mrp.toLocaleString('en-IN')}</span>
              )}
            </ScrollReveal>

            <ScrollReveal delay={0.3} className="mb-12">
              <p className="text-muted-foreground font-medium leading-relaxed text-lg">
                {product.description}
              </p>
            </ScrollReveal>

            {/* Actions */}
            <ScrollReveal delay={0.4} className="flex flex-col sm:flex-row gap-4 mb-16">
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#25D366] hover:bg-[#128C7E] text-white font-black text-lg tracking-wider uppercase px-8 py-5 flex items-center justify-center gap-3 rounded-full transition-all shadow-[0_8px_30px_rgb(37,211,102,0.3)] hover:-translate-y-1"
              >
                Order on WhatsApp <MessageCircle className="w-6 h-6" />
              </a>
              
              <button className="h-[68px] w-full sm:w-[68px] flex items-center justify-center bg-muted text-foreground hover:bg-primary hover:text-primary-foreground transition-all rounded-full group shrink-0">
                <Heart className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </button>
            </ScrollReveal>

            {/* Guarantees */}
            <ScrollReveal delay={0.5} className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-10 border-t border-border">
               <div className="flex flex-col items-center text-center">
                 <ShieldCheck className="w-8 h-8 text-primary mb-3" />
                 <h4 className="font-bold text-sm uppercase tracking-wider mb-1">100% Genuine</h4>
                 <p className="text-xs text-muted-foreground">Authentic gear directly from brands</p>
               </div>
               <div className="flex flex-col items-center text-center">
                 <Zap className="w-8 h-8 text-primary mb-3" />
                 <h4 className="font-bold text-sm uppercase tracking-wider mb-1">Direct Support</h4>
                 <p className="text-xs text-muted-foreground">Instant help via WhatsApp</p>
               </div>
               <div className="flex flex-col items-center text-center">
                 <Truck className="w-8 h-8 text-primary mb-3" />
                 <h4 className="font-bold text-sm uppercase tracking-wider mb-1">Fast Delivery</h4>
                 <p className="text-xs text-muted-foreground">Express shipping to your door</p>
               </div>
            </ScrollReveal>

          </div>
        </div>
      </div>
    </div>
  )
}
