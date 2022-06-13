-- DropForeignKey
ALTER TABLE "bills" DROP CONSTRAINT "bills_userId_fkey";

-- AddForeignKey
ALTER TABLE "bills" ADD CONSTRAINT "bills_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
