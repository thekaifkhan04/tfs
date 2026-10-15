import { prisma } from "@/lib/db/prisma"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Filter } from "lucide-react"
import { ScrollReveal } from "@/components/ScrollReveal"

export const dynamic = 'force-dynamic'

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const categoryFilter = searchParams.category as string | undefined

  let products: any[] = []
  let categories: any[] = []

  try {
    products = await prisma.product.findMany({
      where: {
        ...(categoryFilter ? { category: { slug: categoryFilter } } : {})
      },
      include: {
        images: { orderBy: { order: 'asc' }, take: 1 },
        category: true,
      }
    })

    categories = await prisma.category.findMany({
      where: { active: true },
      orderBy: { sortOrder: 'asc' }
    })
  } catch (err) {
    console.error("Failed to fetch shop products/categories:", err)
  }

  return (
    <div className="bg-background min-h-screen pb-24">
      
      {/* Shop Header */}
      <section className="bg-muted py-10 px-4 md:px-12 border-b border-border rounded-b-[3rem] mb-12">
        <div className="container mx-auto">
          <ScrollReveal>
            <h1 className="text-3xl md:text-3xl font-black uppercase tracking-tighter text-foreground mb-6">
              {categoryFilter ? categories.find(c => c.slug === categoryFilter)?.name : 'Shop All Gear'}
            </h1>
            <p className="text-muted-foreground font-medium text-xl max-w-2xl leading-relaxed">
              Equip yourself with the highest quality fitness equipment and apparel engineered for elite performance. Designed for those who refuse to settle.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-12 flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 shrink-0">
          <ScrollReveal>
            <div className="flex items-center gap-2 mb-8">
              <Filter className="w-5 h-5 text-foreground" />
              <h2 className="text-xl font-black uppercase tracking-wider text-foreground">Filters</h2>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">Categories</h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="/shop" 
                    className={`text-sm hover:text-foreground transition-colors flex items-center ${!categoryFilter ? 'text-primary font-bold' : 'text-muted-foreground'}`}
                  >
                    {!categoryFilter && <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />}
                    All Products
                  </Link>
                </li>
                {categories.map((cat: any) => (
                  <li key={cat.id}>
                    <Link 
                      href={`/shop?category=${cat.slug}`} 
                      className={`text-sm hover:text-foreground transition-colors flex items-center ${categoryFilter === cat.slug ? 'text-primary font-bold' : 'text-muted-foreground'}`}
                    >
                      {categoryFilter === cat.slug && <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />}
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <ScrollReveal className="mb-8 flex items-center justify-between">
            <span className="text-muted-foreground font-medium text-sm px-4 py-2 bg-muted rounded-full">
              Showing {products.length} Products
            </span>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {products.map((product: any, idx: number) => (
              <ScrollReveal key={product.id} delay={idx * 0.05}>
                <div className={`group relative p-4 rounded-3xl flex flex-col h-[250px] transition-colors ${idx === 0 && !categoryFilter ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'}`}>
                  <div className="flex-1 relative w-full mb-6">
                    {product.images[0] ? (
                       <Image 
                         src={product.images[0].url} 
                         alt={product.name} 
                         fill 
                         className="object-contain drop-shadow-2xl group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-500 mix-blend-multiply dark:mix-blend-normal"
                       />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-bold opacity-20">NO IMAGE</div>
                    )}
                    {(product.discount ?? 0) > 0 && (
                      <div className="absolute top-0 left-0 bg-foreground text-background text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider z-10 shadow-lg">
                        Sale
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-end justify-between mt-auto z-10">
                    <div>
                      <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                      <p className={`text-sm ${idx === 0 && !categoryFilter ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                        {product.category?.name || 'TFS Exclusive'}
                      </p>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <span className="font-bold text-lg mb-2">₹{product.price.toLocaleString('en-IN')}</span>
                      <Link href={`/product/${product.slug}`} className={`w-10 h-10 rounded-full flex items-center justify-center ${idx === 0 && !categoryFilter ? 'bg-primary-foreground text-primary hover:scale-110' : 'bg-background text-foreground group-hover:bg-foreground group-hover:text-background'} transition-all`}>
                        <ArrowUpRight className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          
          {products.length === 0 && (
            <ScrollReveal className="py-12 text-center rounded-3xl bg-muted flex flex-col items-center justify-center border border-dashed border-border">
              <h3 className="text-3xl font-black uppercase tracking-tighter text-foreground mb-4">No products found</h3>
              <p className="text-muted-foreground font-medium mb-8">We couldn't find anything matching your filters.</p>
              <Link href="/shop" className="px-8 py-3 rounded-full border border-border text-foreground font-bold text-sm uppercase tracking-wider hover:bg-background transition-colors inline-block">
                Clear Filters
              </Link>
            </ScrollReveal>
          )}
        </div>
      </div>
    </div>
  )
}
