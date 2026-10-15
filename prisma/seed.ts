import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Clean up existing
  await prisma.productImage.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.adminUser.deleteMany()
  await prisma.storeSetting.deleteMany()

  // 1. Settings
  const settings = [
    { key: 'STORE_NAME', value: 'The Fitness Store' },
    { key: 'TAGLINE', value: 'Built for stronger lives / Performance retail' },
    { key: 'WHATSAPP_NUMBER', value: '919876543210' },
    { key: 'PHONE', value: '1-800-FITNESS' },
    { key: 'EMAIL', value: 'support@thefitnessstore.com' },
    { key: 'ADDRESS', value: '123 Performance Ave, Fitness City, FC 12345' },
    { key: 'BUSINESS_HOURS', value: 'Mon-Sat: 10AM - 8PM' },
    { key: 'SOCIAL_INSTAGRAM', value: 'https://instagram.com/thefitnessstore' },
    { key: 'SOCIAL_FACEBOOK', value: 'https://facebook.com/thefitnessstore' },
    { key: 'SOCIAL_YOUTUBE', value: 'https://youtube.com/thefitnessstore' },
    { key: 'DEFAULT_OFFER_NAME', value: 'Performance Week' },
    { key: 'DEFAULT_COUPON', value: 'TFS20' },
  ]

  for (const s of settings) {
    await prisma.storeSetting.create({ data: s })
  }

  // 2. Admin User
  const adminPassword = process.env.ADMIN_PASSWORD || 'password'
  const hashedPassword = await bcrypt.hash(adminPassword, 10)
  await prisma.adminUser.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@thefitnessstore.com' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@thefitnessstore.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'ADMIN',
    },
  })

  // 3. Categories
  const categoriesData = [
    { name: 'Supplements', slug: 'supplements', description: 'Premium sports nutrition.' },
    { name: 'Gym Accessories', slug: 'gym-accessories', description: 'Enhance your workout.' },
    { name: 'Sports Equipment', slug: 'sports-equipment', description: 'Gear for peak performance.' },
    { name: 'Gym Wear', slug: 'gym-wear', description: 'Athletic apparel.' },
    { name: 'Fitness Accessories', slug: 'fitness-accessories', description: 'Tools for training.' },
    { name: 'Lifestyle', slug: 'lifestyle', description: 'Live the fitness life.' },
    { name: 'Gym Equipment', slug: 'gym-equipment', description: 'Heavy duty machines and weights.' },
  ]

  const categories: Record<string, string> = {}
  for (const c of categoriesData) {
    const cat = await prisma.category.create({ data: c })
    categories[c.name] = cat.id
  }

  // 4. Products
  const products = [
    {
      sku: 'TFS-001',
      name: 'Elite Whey Protein 2 kg',
      slug: 'elite-whey-protein-2-kg',
      price: 2999,
      mrp: 3699,
      categoryId: categories['Supplements'],
      description: 'Premium whey protein isolate.',
      shortDescription: 'High quality whey protein for muscle growth.',
      bestSeller: true,
      tags: ['whey', 'protein', 'muscle'],
    },
    {
      sku: 'TFS-002',
      name: 'Micronized Creatine Monohydrate',
      slug: 'micronized-creatine-monohydrate',
      price: 899,
      mrp: 1199,
      categoryId: categories['Supplements'],
      description: 'Pure micronized creatine for strength.',
      shortDescription: 'Boosts strength and performance.',
      popularity: 100,
      tags: ['creatine', 'strength'],
    },
    {
      sku: 'TFS-003',
      name: 'Adjustable Dumbbell Pair 20 kg',
      slug: 'adjustable-dumbbell-pair-20-kg',
      price: 6499,
      mrp: 7999,
      categoryId: categories['Gym Equipment'],
      description: 'Space-saving adjustable dumbbells.',
      shortDescription: 'Adjustable weights for home workouts.',
      trending: true,
      tags: ['dumbbells', 'weights', 'home gym'],
    },
    {
      sku: 'TFS-004',
      name: 'Pro Grip Lifting Gloves',
      slug: 'pro-grip-lifting-gloves',
      price: 799,
      mrp: 1099,
      categoryId: categories['Gym Accessories'],
      description: 'Protect your hands with pro grip.',
      shortDescription: 'Durable lifting gloves.',
      tags: ['gloves', 'grip', 'protection'],
    },
    {
      sku: 'TFS-005',
      name: 'Carbon Speed Rope',
      slug: 'carbon-speed-rope',
      price: 599,
      mrp: 899,
      categoryId: categories['Sports Equipment'],
      description: 'High speed jump rope for cardio.',
      shortDescription: 'Lightweight carbon speed rope.',
      tags: ['cardio', 'jump rope', 'speed'],
    },
    {
      sku: 'TFS-006',
      name: 'AeroFit Compression Tee',
      slug: 'aerofit-compression-tee',
      price: 999,
      mrp: 1499,
      categoryId: categories['Gym Wear'],
      description: 'Breathable compression tee.',
      shortDescription: 'Performance compression wear.',
      tags: ['apparel', 'compression', 'tee'],
    },
    {
      sku: 'TFS-007',
      name: 'HydraLock Shaker Bottle',
      slug: 'hydralock-shaker-bottle',
      price: 349,
      mrp: 499,
      categoryId: categories['Fitness Accessories'],
      description: 'Leak-proof shaker bottle.',
      shortDescription: '700ml shaker bottle.',
      tags: ['shaker', 'hydration'],
    },
    {
      sku: 'TFS-008',
      name: 'Nitro Pump Pre Workout',
      slug: 'nitro-pump-pre-workout',
      price: 1499,
      mrp: 1999,
      categoryId: categories['Supplements'],
      description: 'Explosive energy for intense workouts.',
      shortDescription: 'High stim pre-workout.',
      featured: true,
      tags: ['pre-workout', 'energy'],
    },
    {
      sku: 'TFS-009',
      name: 'Resistance Bands Pro Kit',
      slug: 'resistance-bands-pro-kit',
      price: 1299,
      mrp: 1699,
      categoryId: categories['Fitness Accessories'],
      description: 'Full set of resistance bands.',
      shortDescription: 'Bands for full body training.',
      tags: ['bands', 'resistance', 'home gym'],
    },
    {
      sku: 'TFS-010',
      name: 'Matte Steel Kettlebell 16 kg',
      slug: 'matte-steel-kettlebell-16-kg',
      price: 2499,
      mrp: 3299,
      categoryId: categories['Gym Equipment'],
      description: 'Durable matte steel kettlebell.',
      shortDescription: '16kg solid kettlebell.',
      tags: ['kettlebell', 'weights', 'strength'],
    },
    {
      sku: 'TFS-011',
      name: 'Blackout Gym Duffel',
      slug: 'blackout-gym-duffel',
      price: 1899,
      mrp: 2399,
      categoryId: categories['Lifestyle'],
      description: 'Spacious gym bag.',
      shortDescription: 'Premium blackout duffel bag.',
      tags: ['bag', 'duffel', 'lifestyle'],
    },
    {
      sku: 'TFS-012',
      name: 'Lean Stack Starter Combo',
      slug: 'lean-stack-starter-combo',
      price: 3999,
      mrp: 5299,
      categoryId: categories['Supplements'],
      description: 'Whey protein + Fat burner combo.',
      shortDescription: 'Complete lean muscle stack.',
      bestSeller: true,
      tags: ['stack', 'lean', 'bundle'],
    },
  ]

  for (const p of products) {
    const product = await prisma.product.create({
      data: p
    })
    
    // Add placeholder image
    await prisma.productImage.create({
      data: {
        url: 'https://via.placeholder.com/600x800?text=' + encodeURIComponent(p.name),
        alt: p.name,
        productId: product.id,
      }
    })
  }

  // 5. Testimonials & FAQs... (omitted for brevity, can add later)
  
  console.log('Seed completed successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
