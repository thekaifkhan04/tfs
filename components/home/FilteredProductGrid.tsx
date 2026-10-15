'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { ScrollReveal } from '@/components/ScrollReveal'

type Category = {
  id: string
  name: string
  slug: string
}

type Product = {
  id: string
  name: string
  slug: string
  price: number
  category: { name: string } | null
  images: { url: string }[]
}

export function FilteredProductGrid({ 
  products, 
  categories 
}: { 
  products: Product[], 
  categories: Category[] 
}) {
  const [activeTab, setActiveTab] = useState<string>('all')

  const filteredProducts = activeTab === 'all' 
    ? products 
    : products.filter(p => p.category?.slug === activeTab)

  const displayedProducts = filteredProducts.slice(0, 4)

  return (
    <>
      <ScrollReveal className="text-center mb-16">
        <h2 className="text-3xl md:text-3xl font-black uppercase tracking-tighter text-foreground mb-8">
          Our Exclusive Fitness<br/>Product
        </h2>
        
        {/* Dynamic Filter Tabs */}
        <div className="inline-flex items-center gap-2 p-1 bg-muted rounded-full overflow-x-auto max-w-full no-scrollbar">
          <button 
            onClick={() => setActiveTab('all')}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-colors shrink-0 ${activeTab === 'all' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            See all
          </button>
          
          {categories.map((cat) => (
            <button 
              key={cat.id}
              onClick={() => setActiveTab(cat.slug)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-colors shrink-0 ${activeTab === cat.slug ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 min-h-[250px]">
        {displayedProducts.length > 0 ? (
          displayedProducts.map((product, idx) => (
            <ScrollReveal key={product.id} delay={idx * 0.1}>
              <div className={`group relative p-4 rounded-3xl flex flex-col h-[250px] transition-colors ${idx === 0 ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'}`}>
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
                </div>
                
                <div className="flex items-end justify-between mt-auto z-10">
                  <div>
                    <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                    <p className={`text-sm ${idx === 0 ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                      {product.category?.name || 'TFS Exclusive'}
                    </p>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <span className="font-bold text-lg mb-2">₹{product.price.toLocaleString('en-IN')}</span>
                    <Link href={`/product/${product.slug}`} className={`w-8 h-8 rounded-full flex items-center justify-center ${idx === 0 ? 'bg-primary-foreground text-primary hover:scale-110' : 'bg-background text-foreground group-hover:bg-foreground group-hover:text-background'} transition-all`}>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))
        ) : (
          <div className="col-span-1 md:col-span-2 lg:col-span-4 h-[250px] flex items-center justify-center text-muted-foreground font-medium bg-muted/50 rounded-3xl">
            No products found for this category yet.
          </div>
        )}
      </div>
    </>
  )
}
