/*
  Warnings:

  - You are about to drop the column `isOnlineBranch` on the `Branch` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Branch" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "branchCode" TEXT NOT NULL,
    "branchName" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "branchType" TEXT NOT NULL,
    "addressLine1" TEXT NOT NULL,
    "addressLine2" TEXT,
    "city" TEXT NOT NULL,
    "district" TEXT,
    "state" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'India',
    "phone" TEXT NOT NULL,
    "alternatePhone" TEXT,
    "email" TEXT NOT NULL,
    "timezone" TEXT NOT NULL DEFAULT 'Asia/Kolkata',
    "latitude" REAL,
    "longitude" REAL,
    "googleMapsUrl" TEXT,
    "isHeadOffice" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "recordVersion" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME
);
INSERT INTO "new_Branch" ("addressLine1", "addressLine2", "alternatePhone", "branchCode", "branchName", "branchType", "city", "country", "createdAt", "deletedAt", "displayOrder", "district", "email", "googleMapsUrl", "id", "isActive", "isHeadOffice", "latitude", "longitude", "phone", "postalCode", "slug", "state", "timezone", "updatedAt") SELECT "addressLine1", "addressLine2", "alternatePhone", "branchCode", "branchName", "branchType", "city", "country", "createdAt", "deletedAt", "displayOrder", "district", "email", "googleMapsUrl", "id", "isActive", "isHeadOffice", "latitude", "longitude", "phone", "postalCode", "slug", "state", "timezone", "updatedAt" FROM "Branch";
DROP TABLE "Branch";
ALTER TABLE "new_Branch" RENAME TO "Branch";
CREATE UNIQUE INDEX "Branch_branchCode_key" ON "Branch"("branchCode");
CREATE UNIQUE INDEX "Branch_slug_key" ON "Branch"("slug");
CREATE TABLE "new_Classroom" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "branchId" TEXT NOT NULL,
    "classroomCode" TEXT NOT NULL,
    "classroomName" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "floor" INTEGER,
    "facilities" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "recordVersion" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    CONSTRAINT "Classroom_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Classroom" ("branchId", "capacity", "classroomCode", "classroomName", "createdAt", "deletedAt", "facilities", "floor", "id", "isActive", "updatedAt") SELECT "branchId", "capacity", "classroomCode", "classroomName", "createdAt", "deletedAt", "facilities", "floor", "id", "isActive", "updatedAt" FROM "Classroom";
DROP TABLE "Classroom";
ALTER TABLE "new_Classroom" RENAME TO "Classroom";
CREATE UNIQUE INDEX "Classroom_branchId_classroomCode_key" ON "Classroom"("branchId", "classroomCode");
CREATE TABLE "new_Permission" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Permission" ("code", "description", "id") SELECT "code", "description", "id" FROM "Permission";
DROP TABLE "Permission";
ALTER TABLE "new_Permission" RENAME TO "Permission";
CREATE UNIQUE INDEX "Permission_code_key" ON "Permission"("code");
CREATE TABLE "new_Role" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isSystemRole" BOOLEAN NOT NULL DEFAULT false,
    "isProtected" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "deletedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Role" ("description", "id", "name") SELECT "description", "id", "name" FROM "Role";
DROP TABLE "Role";
ALTER TABLE "new_Role" RENAME TO "Role";
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
