import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, Package, Tag, Users, Settings, LogOut } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/admin/login")
  }

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Categories', href: '/admin/categories', icon: Tag },
    { name: 'Leads', href: '/admin/leads', icon: Users },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ]

  return (
    <div className="flex h-screen bg-[#0B0B0E] text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-tfs-panel border-r border-white/5 flex flex-col hidden md:flex">
        <div className="h-20 flex items-center px-6 border-b border-white/5">
          <Link href="/admin" className="flex items-center gap-2">
             <div className="w-8 h-8 bg-tfs-red rounded flex items-center justify-center font-black tracking-tighter text-white">TFS</div>
             <span className="font-bold tracking-tight">Admin</span>
          </Link>
        </div>
        <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-tfs-muted hover:text-white hover:bg-white/5 transition-colors"
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.name}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/5">
          <Link 
            href="/api/auth/signout"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-tfs-red hover:bg-tfs-red/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 bg-tfs-panel border-b border-white/5 flex items-center px-8 shrink-0">
          <div className="flex items-center gap-4 ml-auto">
            <span className="text-sm text-tfs-muted font-medium">{session.user?.email}</span>
            <div className="w-8 h-8 bg-tfs-panelLight rounded-full flex items-center justify-center border border-white/10">
              <span className="text-xs font-bold text-white uppercase">{session.user?.name?.charAt(0) || 'A'}</span>
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
