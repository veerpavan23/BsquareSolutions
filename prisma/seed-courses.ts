import { PrismaClient, PublishStatus } from '@prisma/client';
import { COURSES } from '../src/data/courses';

const prisma = new PrismaClient();

function generateSlug(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

async function main() {
  console.log('🌱 Migrating static mock courses to the database...');

  // First, let's extract unique academies
  const academiesMap = new Map<string, any>();
  
  for (const course of COURSES) {
    if (!academiesMap.has(course.academy)) {
      academiesMap.set(course.academy, {
        name: course.academy,
        slug: generateSlug(course.academy),
        shortDescription: `Comprehensive training paths under ${course.academy}`,
        publishStatus: PublishStatus.PUBLISHED,
      });
    }
  }

  const academies = Array.from(academiesMap.values());
  console.log(`Found ${academies.length} unique academies.`);

  // Create Academies
  const dbAcademies: Record<string, any> = {};
  for (const academyData of academies) {
    const created = await prisma.academy.upsert({
      where: { slug: academyData.slug },
      update: {},
      create: academyData,
    });
    dbAcademies[created.name] = created;
    console.log(`Created Academy: ${created.name}`);
  }

  // Create Courses
  for (const course of COURSES) {
    const academy = dbAcademies[course.academy];
    if (!academy) continue;

    let defaultCategory = await prisma.courseCategory.findFirst({ where: { slug: course.categoryId, academyId: academy.id } });
    if (!defaultCategory) {
      defaultCategory = await prisma.courseCategory.create({
        data: {
          name: course.categoryId,
          slug: course.categoryId,
          academyId: academy.id
        }
      });
    }
    
    if (!academy) continue;

    console.log(`Migrating Course: ${course.title}`);

    // Create course with basic fields
    const createdCourse = await prisma.course.upsert({
      where: { slug: course.slug },
      update: {},
      create: {
        title: course.title,
        slug: course.slug,
        academyId: academy.id,
        shortDescription: course.shortDescription,
        description: course.fullOverview,
        level: course.level.split(' ')[0].toUpperCase(), 
        durationValue: parseInt(course.duration.split(' ')[0]) || 4,
        durationUnit: course.duration.includes('Week') ? 'WEEKS' : 'HOURS',
        status: 'PUBLISHED',
        thumbnailUrl: 'https://via.placeholder.com/600x400?text=Course+Thumbnail',
        code: course.id.toUpperCase().substring(0, 10),
        categoryId: defaultCategory.id,
      }
    });

    // Create Modules and Topics
    for (const [index, module] of course.curriculum.entries()) {
      const createdModule = await prisma.courseModule.create({
        data: {
          courseId: createdCourse.id,
          title: module.title,
          description: `Duration: ${module.durationHours} hours`,
          position: index,
        }
      });

      for (const [tIndex, topic] of module.topics.entries()) {
        await prisma.courseTopic.create({
          data: {
            moduleId: createdModule.id,
            title: topic,
            position: tIndex,
          }
        });
      }
    }
  }

  console.log('✅ Migration complete!');
}

main()
  .catch((e) => {
    console.error('❌ Error during migration:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
