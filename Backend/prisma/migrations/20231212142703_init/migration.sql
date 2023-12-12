-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SharePhotos" (
    "id" SERIAL NOT NULL,
    "Image" TEXT NOT NULL,
    "users_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SharePhotos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SharePhotos" ADD CONSTRAINT "SharePhotos_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
