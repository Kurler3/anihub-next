-- CreateTable
CREATE TABLE "AnimeLike" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "animeId" TEXT NOT NULL,

    CONSTRAINT "AnimeLike_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AnimeLike" ADD CONSTRAINT "AnimeLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
