import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton"
import { Concierge } from "@/components/whatsapp/Concierge"

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
      <Concierge />
    </div>
  )
}
