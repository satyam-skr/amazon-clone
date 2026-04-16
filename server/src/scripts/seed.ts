import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categoryNames = [
  "Electronics",
  "Home & Kitchen",
  "Fashion",
  "Books",
  "Toys & Games",
  "Beauty",
  "Sports & Fitness",
  "Office Supplies",
];

const products = [
  {
    title: "boAt Airdopes 141 Bluetooth TWS Earbuds",
    description: "42H playtime, ENx tech and low latency mode.",
    price: 1499,
    stock: 120,
    category: "Electronics",
  },
  {
    title: "Noise Pulse 2 Max Smart Watch",
    description: "1.85 inch display with Bluetooth calling and 10-day battery.",
    price: 2199,
    stock: 80,
    category: "Electronics",
  },
  {
    title: "Samsung 25W Type-C Fast Charger",
    description: "Original adapter for Galaxy devices with super fast charging.",
    price: 1199,
    stock: 140,
    category: "Electronics",
  },
  {
    title: "Portronics Power Pro 20000mAh Power Bank",
    description: "22.5W fast charging and dual output ports.",
    price: 1899,
    stock: 75,
    category: "Electronics",
  },
  {
    title: "Prestige Electric Kettle 1.5L",
    description: "Stainless steel body with auto cut-off safety.",
    price: 999,
    stock: 95,
    category: "Home & Kitchen",
  },
  {
    title: "Pigeon Non-Stick Cookware Gift Set",
    description: "3-piece induction base cookware set for daily cooking.",
    price: 1599,
    stock: 60,
    category: "Home & Kitchen",
  },
  {
    title: "Milton Thermosteel Bottle 1L",
    description: "Vacuum insulated stainless steel water bottle.",
    price: 699,
    stock: 160,
    category: "Home & Kitchen",
  },
  {
    title: "Amazon Basics Microfiber Bedsheet Set",
    description: "Soft double bed sheet with two pillow covers.",
    price: 899,
    stock: 110,
    category: "Home & Kitchen",
  },
  {
    title: "Levi's Men's 512 Slim Tapered Jeans",
    description: "Stretchable denim for all-day comfort.",
    price: 2399,
    stock: 70,
    category: "Fashion",
  },
  {
    title: "Allen Solly Women's Casual Top",
    description: "Lightweight daily-wear top with regular fit.",
    price: 1199,
    stock: 90,
    category: "Fashion",
  },
  {
    title: "Puma Unisex Running Shoes",
    description: "Breathable mesh upper with cushioned sole.",
    price: 2799,
    stock: 85,
    category: "Fashion",
  },
  {
    title: "WildHorn RFID Blocking Leather Wallet",
    description: "Genuine leather wallet with multiple card slots.",
    price: 749,
    stock: 150,
    category: "Fashion",
  },
  {
    title: "Atomic Habits by James Clear",
    description: "A proven framework to build good habits.",
    price: 499,
    stock: 200,
    category: "Books",
  },
  {
    title: "Ikigai by Hector Garcia and Francesc Miralles",
    description: "Japanese secrets for a long and happy life.",
    price: 399,
    stock: 170,
    category: "Books",
  },
  {
    title: "Do Epic Shit by Ankur Warikoo",
    description: "Practical life advice for career and personal growth.",
    price: 349,
    stock: 180,
    category: "Books",
  },
  {
    title: "The Psychology of Money by Morgan Housel",
    description: "Timeless lessons on wealth, greed and happiness.",
    price: 449,
    stock: 190,
    category: "Books",
  },
  {
    title: "Lego Classic Creative Brick Box",
    description: "Large set with colorful bricks for kids creativity.",
    price: 2499,
    stock: 55,
    category: "Toys & Games",
  },
  {
    title: "Hasbro Monopoly Classic Board Game",
    description: "Family strategy board game for ages 8+.",
    price: 899,
    stock: 65,
    category: "Toys & Games",
  },
  {
    title: "Nerf Elite 2.0 Commander Blaster",
    description: "Includes 12 darts with tactical rail support.",
    price: 1399,
    stock: 50,
    category: "Toys & Games",
  },
  {
    title: "Mamaearth Ubtan Face Wash 100ml",
    description: "Tan removal face wash with turmeric and saffron.",
    price: 299,
    stock: 210,
    category: "Beauty",
  },
  {
    title: "Lakme 9to5 Primer + Matte Lipstick",
    description: "Long-lasting matte finish in everyday shades.",
    price: 499,
    stock: 130,
    category: "Beauty",
  },
  {
    title: "Nivea Men Deep Impact Body Lotion",
    description: "48H moisturization with non-greasy formula.",
    price: 325,
    stock: 160,
    category: "Beauty",
  },
  {
    title: "Boldfit Yoga Mat 6mm",
    description: "Non-slip anti-tear mat for yoga and workouts.",
    price: 799,
    stock: 100,
    category: "Sports & Fitness",
  },
  {
    title: "Strauss Adjustable Dumbbells 10kg",
    description: "Home workout dumbbell set with durable plates.",
    price: 1899,
    stock: 45,
    category: "Sports & Fitness",
  },
  {
    title: "Cello Finegrip Ball Pen Pack of 25",
    description: "Smooth writing pens for school and office use.",
    price: 249,
    stock: 320,
    category: "Office Supplies",
  },
  {
    title: "Classmate Spiral Notebook Pack of 6",
    description: "Premium ruled notebooks for notes and planning.",
    price: 599,
    stock: 140,
    category: "Office Supplies",
  },
];

async function main() {
  const categories = await Promise.all(
    categoryNames.map((name) =>
      prisma.category.upsert({
        where: { name },
        create: { name },
        update: {},
      })
    )
  );

  const categoryMap = new Map(categories.map((category) => [category.name, category.id]));

  await Promise.all(
    products.map(async (product) => {
      const existing = await prisma.product.findFirst({
        where: { title: product.title },
        select: { id: true },
      });

      const payload = {
        title: product.title,
        description: product.description,
        price: product.price,
        stock: product.stock,
        categoryId: categoryMap.get(product.category) as string,
      };

      if (existing) {
        return prisma.product.update({
          where: { id: existing.id },
          data: payload,
        });
      }

      return prisma.product.create({
        data: payload,
      });
    })
  );

  console.log(`Seeded ${products.length} products`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
