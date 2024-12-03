/*
  Warnings:

  - A unique constraint covering the columns `[title,authorId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Post_title_authorId_key" ON "Post"("title", "authorId");
