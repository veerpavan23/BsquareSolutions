-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "city" TEXT,
    "company" TEXT,
    "currentRole" TEXT,
    "interestedVertical" TEXT,
    "interestedCourse" TEXT,
    "demoSession" TEXT,
    "preferredMode" TEXT,
    "message" TEXT,
    "leadType" TEXT NOT NULL DEFAULT 'CONTACT',
    "source" TEXT NOT NULL DEFAULT 'WEBSITE',
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "priority" TEXT NOT NULL DEFAULT 'NORMAL',
    "academyId" TEXT,
    "courseId" TEXT,
    "batchId" TEXT,
    "assignedToId" TEXT,
    "nextFollowUpDate" DATETIME,
    "internalNotes" TEXT,
    "consent" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    CONSTRAINT "Lead_academyId_fkey" FOREIGN KEY ("academyId") REFERENCES "Academy" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Lead_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Lead_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Lead_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "AdminUser" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "NavigationMenu" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "NavigationItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "menuId" TEXT NOT NULL,
    "parentId" TEXT,
    "label" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "openInNewTab" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "NavigationItem_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "NavigationMenu" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "NavigationItem_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "NavigationItem" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Academy" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "shortDescription" TEXT,
    "fullDescription" TEXT,
    "icon" TEXT,
    "thumbnail" TEXT,
    "banner" TEXT,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "publishStatus" TEXT NOT NULL DEFAULT 'DRAFT',
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "openGraphImage" TEXT,
    "recordVersion" INTEGER NOT NULL DEFAULT 1,
    "deletedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Academy" ("id", "name", "slug") SELECT "id", "name", "slug" FROM "Academy";
DROP TABLE "Academy";
ALTER TABLE "new_Academy" RENAME TO "Academy";
CREATE UNIQUE INDEX "Academy_name_key" ON "Academy"("name");
CREATE UNIQUE INDEX "Academy_slug_key" ON "Academy"("slug");
CREATE TABLE "new_Batch" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "branchId" TEXT,
    "classroomId" TEXT,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME,
    "registrationCloseAt" DATETIME,
    "timezone" TEXT NOT NULL DEFAULT 'Asia/Kolkata',
    "mode" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL DEFAULT 30,
    "seatsFilled" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'PLANNED',
    "sessionType" TEXT NOT NULL DEFAULT 'WEEKDAY_BATCH',
    "publicVisibility" BOOLEAN NOT NULL DEFAULT true,
    "description" TEXT,
    "recordVersion" INTEGER NOT NULL DEFAULT 1,
    "createdById" TEXT,
    "updatedById" TEXT,
    "deletedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Batch_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Batch_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Batch_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "Classroom" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Batch_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "AdminUser" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Batch_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "AdminUser" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Batch" ("branchId", "capacity", "classroomId", "code", "courseId", "createdAt", "createdById", "deletedAt", "endDate", "id", "mode", "recordVersion", "registrationCloseAt", "seatsFilled", "startDate", "status", "timezone", "updatedAt", "updatedById") SELECT "branchId", "capacity", "classroomId", "code", "courseId", "createdAt", "createdById", "deletedAt", "endDate", "id", "mode", "recordVersion", "registrationCloseAt", "seatsFilled", "startDate", "status", "timezone", "updatedAt", "updatedById" FROM "Batch";
DROP TABLE "Batch";
ALTER TABLE "new_Batch" RENAME TO "Batch";
CREATE UNIQUE INDEX "Batch_code_key" ON "Batch"("code");
CREATE INDEX "Batch_courseId_idx" ON "Batch"("courseId");
CREATE INDEX "Batch_status_idx" ON "Batch"("status");
CREATE INDEX "Batch_startDate_idx" ON "Batch"("startDate");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "NavigationMenu_code_key" ON "NavigationMenu"("code");

-- CreateIndex
CREATE INDEX "NavigationItem_menuId_idx" ON "NavigationItem"("menuId");

-- CreateIndex
CREATE INDEX "NavigationItem_parentId_idx" ON "NavigationItem"("parentId");
