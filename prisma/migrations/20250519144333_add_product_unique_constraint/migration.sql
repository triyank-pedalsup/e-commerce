/*
  Warnings:

  - A unique constraint covering the columns `[name,price,description]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Product_name_price_description_key" ON "Product"("name", "price", "description");
