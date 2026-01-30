"use client";

import { useState } from "react";
import OrderDetailsTable from "@/components/(Dashboard)/Dashboard/OrderDetailsTable";
import DashboardHeader from "@/components/Shared/DashboardHeader";
import { orders } from "@/data/orderData";

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = orders.filter((order) =>
    order.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.amount.includes(searchQuery)
  );

  return (
    <>
      <DashboardHeader 
        title="Retailer Dashboard" 
        onSearch={setSearchQuery} 
      />
      <div className="p-4 md:px-8 flex flex-col gap-5">
        <h2 className="text-xl md:text-4xl font-bold text-foreground">Order Lists</h2>
        <OrderDetailsTable 
          itemsPerPage={7} 
          title="" 
          data={filteredOrders}
        />
      </div>
    </>
  );
}