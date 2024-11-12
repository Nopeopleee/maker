import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const seedMenus = async () => {
  const data = [
    {
      id: 1,
      alias: 'home',
      title: '首頁',
      type: 1,
    },
  ];

  for (const datum of data) {
    await prisma.menus.upsert({
      where: { id: datum.id },
      update: { alias: datum.alias },
      create: datum,
    });
  }
};
