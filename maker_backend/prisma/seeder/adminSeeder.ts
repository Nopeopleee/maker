import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const seedAdmin = async () =>
  await prisma.admins.upsert({
    where: { id: 1 },
    update: {
      name: process.env.ADMIN_NAME || 'admin',
      email: process.env.ADMIN_EMAIL || 't896057895@gmail.com',
      password: await bcrypt.hash(process.env.ADMIN_PASSWORD || '', 10),
    },
    create: {
      id: 1,
      name: process.env.ADMIN_NAME || 'admin',
      email: process.env.ADMIN_EMAIL || 't896057895@gmail.com',
      password: await bcrypt.hash(process.env.ADMIN_PASSWORD || '', 10),
    },
  });
