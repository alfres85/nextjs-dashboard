// prisma/seed.ts
import { PrismaClient } from '@/app/generated/prisma';
import bcrypt from 'bcrypt';
import { users, customers, invoices, revenue } from '@/app/lib/placeholder-data';

const prisma = new PrismaClient();

async function seedUsers() {
  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: hashedPassword,
      },
    });
  }
}

async function seedCustomers() {
  for (const customer of customers) {
    await prisma.customer.upsert({
      where: { id: customer.id },
      update: {},
      create: {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        image_url: customer.image_url,
      },
    });
  }
}

async function seedInvoices() {
  for (const invoice of invoices) {
    await prisma.invoice.create({
      data: {
        customerId: invoice.customer_id,
        amount: invoice.amount,
        status: invoice.status,
        date: new Date(invoice.date),
      },
    });
  }
}

async function seedRevenue() {
  for (const rev of revenue) {
    await prisma.revenue.upsert({
      where: { month: rev.month },
      update: {},
      create: {
        month: rev.month,
        revenue: rev.revenue,
      },
    });
  }
}

async function main() {
  console.log('🌱 Seeding...');
  await seedUsers();
  await seedCustomers();
  await seedInvoices();
  await seedRevenue();
  console.log('✅ Done seeding.');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
