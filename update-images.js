const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  await prisma.category.updateMany({
    where: { slug: 'gym-wear' },
    data: { image: '/images/category_men.jpg' }
  })
  
  await prisma.category.updateMany({
    where: { slug: 'gym-equipment' },
    data: { image: '/images/category_equipment.jpg' }
  })

  await prisma.category.updateMany({
    where: { slug: 'supplements' },
    data: { image: '/images/category_women.jpg' } // Using it for supplements or another category just for display
  })

  console.log("Categories updated with images.")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
