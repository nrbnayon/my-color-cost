"use client";

import { useState } from "react";
import ProductStockTable from "@/components/(Dashboard)/Stock/ProductStockTable";
import DashboardHeader from "@/components/Shared/DashboardHeader";
import { productStocks } from "@/data/productStockData";

export default function StockPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStocks = productStocks.filter((stock) =>
    stock.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stock.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stock.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stock.paymentDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stock.amount.includes(searchQuery)
  );

  return (
    <>
      <DashboardHeader 
        title="Product Stock List" 
        onSearch={setSearchQuery} 
      />
      <div className="p-4 md:px-8 flex flex-col gap-5">
        <ProductStockTable 
          itemsPerPage={8} 
          title="" 
          data={filteredStocks}
        />
      </div>
    </>
  );
}
