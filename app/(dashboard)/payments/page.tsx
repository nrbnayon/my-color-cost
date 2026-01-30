"use client";

import { useState } from "react";
import PaymentDetailsTable from "@/components/(Dashboard)/Payments/PaymentDetailsTable";
import DashboardHeader from "@/components/Shared/DashboardHeader";
import { payments } from "@/data/paymentData";

export default function PaymentsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPayments = payments.filter((payment) =>
    payment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.paymentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.amount.includes(searchQuery) ||
    payment.method.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <DashboardHeader 
        title="Payment List" 
        onSearch={setSearchQuery} 
      />
      <div className="p-4 md:px-8 flex flex-col gap-5">
        <h2 className="text-xl md:text-4xl font-bold text-foreground">Payment List</h2>
        <PaymentDetailsTable 
          itemsPerPage={8} 
          title="" 
          data={filteredPayments}
        />
      </div>
    </>
  );
}
