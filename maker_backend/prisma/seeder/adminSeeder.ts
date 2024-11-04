import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { config } from 'dotenv';
config();

const prisma = new PrismaClient();

export const seedAdmin = async () =>
  await prisma.admins.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: process.env.ADMIN_NAME || 'admin',
      email: process.env.ADMIN_EMAIL || 'hiiibackend@gmail.com',
      password: await bcrypt.hash(process.env.ADMIN_PASSWORD || '', 10),
    },
  });
