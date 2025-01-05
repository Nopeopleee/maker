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

  await prisma.home_details.upsert({
    where: { id: 1 },
    update: {
      homepage_id: homepage.id,
      type: 1,
      title: '首頁圖',
      image_1: 'https://via.placeholder.com/1920x540',
      image_2: 'https://via.placeholder.com/1920x540',
    },
    create: {
      id: 1,
      homepage_id: homepage.id,
      type: 1,
      title: '首頁大圖',
      image_1: 'https://via.placeholder.com/1920x540',
      image_2: 'https://via.placeholder.com/1920x540',
    },
  });
};
