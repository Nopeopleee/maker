import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const seedMenuTypes = async () => {
  const data = [
    {
      id: 1,
      language_id: 1,
      name: '中文選單',
    },
    {
      id: 2,
      language_id: 2,
      name: 'English Menu',
    },
  ];

  for (const datum of data) {
    await prisma.menu_types.upsert({
      where: { id: datum.id },
      update: { name: datum.name },
      create: datum,
    });
  }
};
