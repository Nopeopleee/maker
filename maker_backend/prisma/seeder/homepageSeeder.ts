import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const seedHomepage = async () => {
  const homepage = await prisma.homepages.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      language_id: 1,
      type: 1,
      status: true,
    },
  });
};
