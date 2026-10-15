const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  const products = await prisma.product.findMany({
    include: { category: true }
  })

  // Images we generated
  const images = {
    apparel: '/images/prod_apparel.jpg',
    bag: '/images/prod_bag.jpg',
    dumbbell: '/images/prod_dumbbell.jpg',
    default: '/images/prod_dumbbell.jpg' // fallback if category doesn't match
  }

  for (const p of products) {
    // Delete existing images for this product
    await prisma.productImage.deleteMany({
      where: { productId: p.id }
    })

    let selectedImage = images.default
    if (p.category) {
      if (p.category.slug === 'gym-wear') selectedImage = images.apparel
      else if (p.category.slug === 'gym-bags') selectedImage = images.bag
      else selectedImage = images.dumbbell // for equipment and supplements
    }

    // Add new dummy image
    await prisma.productImage.create({
      data: {
        url: selectedImage,
        alt: p.name,
        order: 0,
        productId: p.id
      }
    })
  }

  console.log(`Updated images for ${products.length} products.`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
