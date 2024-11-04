import { PrismaClient } from '@prisma/client';
import { seedAdmin } from './seeder/adminSeeder';
import { seedLanguage } from './seeder/languageSeeder';
import { seedHomepage } from './seeder/homepageSeeder';
import { seedSetting } from './seeder/settingSeeder';
import { seedMenuTypes } from './seeder/menuTypesSeeder';

const prisma = new PrismaClient();

async function main() {
  const args = process.argv.slice(2);

  if (args.length > 1) {
    console.error('Too many arguments provided!');
    process.exit(1);
  }

  if (args[0]) {
    console.log(`Seeding ${args[0]}...`);
  } else {
    console.log('Seeding...');
  }

  switch (args[0]) {
    case 'admin':
      await seedAdmin();
      break;
    case 'language':
      await seedLanguage();
      break;
    case 'homepage':
      await seedHomepage();
      break;
    case 'setting':
      await seedSetting();
      break;
    case 'menuTypes':
      await seedMenuTypes();
    default:
      await seedLanguage();
      await seedAdmin();
      await seedHomepage();
      await seedSetting();
      await seedMenuTypes();
      break;
  }

  if (args[0]) {
    console.log(`Seeding ${args[0]} completed!`);
  } else {
    console.log('Seeding completed!');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
