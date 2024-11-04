import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const seedLanguage = async () => {
  const data = [
    {
      id: 1,
      name: '中文',
      code: 'zh-TW',
    },
    {
      id: 2,
      name: 'English',
      code: 'en',
    },
  ];

  for (const datum of data) {
    await prisma.languages.upsert({
      where: { id: datum.id },
      update: { name: datum.name, code: datum.code },
      create: datum,
    });
  }
};
