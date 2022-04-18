-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DefenseProfile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "postedById" INTEGER,
    CONSTRAINT "DefenseProfile_postedById_fkey" FOREIGN KEY ("postedById") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_DefenseProfile" ("id", "level", "name", "postedById") SELECT "id", "level", "name", "postedById" FROM "DefenseProfile";
DROP TABLE "DefenseProfile";
ALTER TABLE "new_DefenseProfile" RENAME TO "DefenseProfile";
CREATE TABLE "new_Risk" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "postedById" INTEGER,
    CONSTRAINT "Risk_postedById_fkey" FOREIGN KEY ("postedById") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Risk" ("id", "name", "postedById", "value") SELECT "id", "name", "postedById", "value" FROM "Risk";
DROP TABLE "Risk";
ALTER TABLE "new_Risk" RENAME TO "Risk";
CREATE TABLE "new_Link" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "postedById" INTEGER,
    CONSTRAINT "Link_postedById_fkey" FOREIGN KEY ("postedById") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Link" ("createdAt", "description", "id", "postedById", "url") SELECT "createdAt", "description", "id", "postedById", "url" FROM "Link";
DROP TABLE "Link";
ALTER TABLE "new_Link" RENAME TO "Link";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
