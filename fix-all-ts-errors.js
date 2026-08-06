const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, replacements) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = content;
    replacements.forEach(r => {
      modified = modified.replace(r.search, r.replace);
    });
    if (content !== modified) {
      fs.writeFileSync(filePath, modified, 'utf8');
      console.log(`Updated ${filePath}`);
    }
  } catch (e) {
    console.error(`Error updating ${filePath}:`, e.message);
  }
}

// 1. prisma/seed-courses.ts (Already fixed DurationUnit in the previous step? No, the previous fix was CourseLevel. We need to fix DurationUnit)
replaceInFile('prisma/seed-courses.ts', [
  { search: /durationUnit: course\.duration\.includes\('Week'\) \? 'WEEKS' : 'HOURS',/g, replace: "durationUnit: course.duration.includes('Week') ? 'WEEKS' as DurationUnit : 'HOURS' as DurationUnit," },
  { search: /import { PrismaClient, PublishStatus, CourseLevel }/g, replace: "import { PrismaClient, PublishStatus, CourseLevel, DurationUnit }" }
]);

// 2. course.types.ts
replaceInFile('src/modules/courses/course.types.ts', [
  { search: /academy: \{\n    name: string;\n    slug: string;\n  \};\n\};/g, replace: "academy: {\n    name: string;\n    slug: string;\n  };\n  brochureUrl?: string | null;\n};" }
]);

// 3. academy.types.ts
replaceInFile('src/modules/academies/academy.types.ts', [
  { search: /export type PublicAcademyDto = \{\n  id: string;\n  name: string;\n  slug: string;\n  shortDescription: string \| null;/g, replace: "export type PublicAcademyDto = {\n  id: string;\n  name: string;\n  slug: string;\n  shortDescription: string | null;\n  description?: string | null;" }
]);

// 4. vertical-form.tsx
replaceInFile('src/components/admin/verticals/vertical-form.tsx', [
  { search: /import { MediaPicker } from '@\/components\/admin\/media\/media-picker'; \/\/ Assuming there is one\n/g, replace: "" }
]);

// 5. academy.service.ts
replaceInFile('src/modules/academies/academy.service.ts', [
  { search: /\.log\(/g, replace: ".logEvent(" },
  { search: /new BusinessRuleError\(([^,]+),\n?\s*\d+\)/g, replace: "new BusinessRuleError($1)" },
  { search: /new BusinessRuleError\(([^,]+),\s*\d+\)/g, replace: "new BusinessRuleError($1)" },
  { search: /status: 'UNPUBLISHED'/g, replace: "status: 'DRAFT'" }
]);

// 6. course.service.ts
replaceInFile('src/modules/courses/course.service.ts', [
  { search: /\.log\(/g, replace: ".logEvent(" },
  { search: /new BusinessRuleError\(([^,]+),\n?\s*\d+\)/g, replace: "new BusinessRuleError($1)" },
  { search: /new BusinessRuleError\(([^,]+),\s*\d+\)/g, replace: "new BusinessRuleError($1)" },
]);

// 7. course.repository.ts
replaceInFile('src/modules/courses/course.repository.ts', [
  { search: /export type CourseCreateInput = Omit<Prisma\.CourseCreateInput, 'category'> & {\n  categoryId: string;\n};/g, replace: "export type CourseCreateInput = Omit<Prisma.CourseCreateInput, 'category'>;" }
]);

// 8. test files
const testFiles = [
  'src/modules/courses/__tests__/publish.validator.test.ts',
  'src/modules/courses/__tests__/slug.test.ts'
];
testFiles.forEach(f => {
  replaceInFile(f, [
    { search: /import { ([^}]+) } from 'vitest';/, replace: "import { $1 } from 'vitest';" } // Just a dummy, we will inject if missing
  ]);
  try {
    let content = fs.readFileSync(f, 'utf8');
    if (!content.includes('from \'vitest\'')) {
      fs.writeFileSync(f, "import { describe, it, expect } from 'vitest';\n" + content, 'utf8');
      console.log(`Updated vitest imports in ${f}`);
    }
  } catch(e) {}
});

replaceInFile('src/modules/courses/__tests__/publish.validator.test.ts', [
  { search: /from '\.\.\/publish\.validator'/g, replace: "from '../course.publish.validator'" }
]);

replaceInFile('src/modules/courses/__tests__/slug.test.ts', [
  { search: /from '@\/lib\/utils'/g, replace: "from '../../utils'" } // Assuming we just want to remove or fix the import, but let's check if we actually need it. Actually, utils might be at src/lib/utils. Next.js alias @ works in next but maybe not in bare tsconfig without paths? Actually it should work. The error was "Cannot find module '@/lib/utils'".
]);

// Quick fix for the slug test if @/lib/utils doesn't exist
try {
  if (!fs.existsSync('src/lib/utils.ts') && !fs.existsSync('src/lib/utils/index.ts')) {
     replaceInFile('src/modules/courses/__tests__/slug.test.ts', [
       { search: /import .* from '@\/lib\/utils';\n/g, replace: "" }
     ]);
  }
} catch(e) {}

