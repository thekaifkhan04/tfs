import { prisma } from "@/lib/db/prisma"
import { Package, Tag, Users, TrendingUp } from "lucide-react"

export default async function AdminDashboard() {
  const [productCount, categoryCount, leadCount] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.lead.count()
  ])

  const stats = [
    { name: "Total Products", value: productCount, icon: Package },
    { name: "Categories", value: categoryCount, icon: Tag },
    { name: "Recent Leads", value: leadCount, icon: Users },
    { name: "Active Offers", value: 1, icon: TrendingUp },
  ]

  return (
    <div>
      <h1 className="text-3xl font-black uppercase tracking-wider text-white mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-tfs-panel border border-white/5 rounded-xl p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center shrink-0">
              <stat.icon className="w-6 h-6 text-tfs-muted" />
            </div>
            <div>
              <p className="text-sm text-tfs-muted font-medium mb-1">{stat.name}</p>
              <h3 className="text-2xl font-black text-white">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-tfs-panel border border-white/5 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Welcome to The Fitness Store Admin</h2>
        <p className="text-tfs-muted leading-relaxed max-w-2xl">
          Use the sidebar to navigate through your store's resources. You can manage products, organize categories, and track customer leads generated from the storefront.
        </p>
      </div>
    </div>
  )
}
