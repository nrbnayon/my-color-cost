"use client";

import { payments } from "@/data/paymentData";
import { useState } from "react";
import { TablePagination } from "@/components/Shared/TablePagination";
import Image from "next/image";
import { Download } from "lucide-react";

const getStatusColor = (status: string) => {
  switch (status) {
    case "Paid":
    case "Delivered":
      return "bg-green-100 text-green-600";
    case "Pending":
      return "bg-orange-100 text-orange-400";
    case "Unpaid":
    case "Rejected":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

import { TableSkeleton } from "@/components/Skeleton/TableSkeleton";

export default function PaymentDetailsTable({
  title = "Payment List",
  data = payments,
  itemsPerPage = 8,
  enablePagination = true,
  isLoading = false,
}: {
  title?: string;
  data?: typeof payments;
  itemsPerPage?: number;
  enablePagination?: boolean;
  isLoading?: boolean;
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  const showPagination = enablePagination && totalItems > itemsPerPage;

  const currentData = showPagination 
    ? data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : data;

  return (
    <div className="bg-white p-6 rounded-3xl shadow-[6px_6px_54px_0px_#0000000D] w-full">
      {title && <h2 className="text-xl font-bold text-foreground mb-6">{title}</h2>}
      
      {isLoading ? (
        <TableSkeleton rowCount={itemsPerPage} />
      ) : currentData.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="bg-[#F1F4F9] text-left">
                  <th className="py-4 px-6 rounded-l-xl text-foreground font-semibold text-sm">Name</th>
                  <th className="py-4 px-6 text-foreground font-semibold text-sm">Payment ID</th>
                  <th className="py-4 px-6 text-foreground font-semibold text-sm">Date</th>
                  <th className="py-4 px-6 text-foreground font-semibold text-sm">Amount</th>
                  <th className="py-4 px-6 text-foreground font-semibold text-sm">Status</th>
                  <th className="py-4 px-6 text-foreground font-semibold text-sm">Method</th>
                  <th className="py-4 px-6 rounded-r-xl text-foreground font-semibold text-sm text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {currentData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-gray-600 font-medium">{item.name}</td>
                    <td className="py-4 px-6 text-gray-600">{item.paymentId}</td>
                    <td className="py-4 px-6 text-gray-600">{item.date}</td>
                    <td className="py-4 px-6 text-gray-600 font-semibold">{item.amount}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-600">{item.method}</td>
                    <td className="py-4 px-6 text-center">
                      <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-foreground cursor-pointer">
                        <Download className="w-6 h-6 text-gray-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {showPagination && (
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      ) : (
        <div className="text-center py-20 text-foreground flex flex-col items-center gap-4">
          <Image src="/images/empty-state.webp" alt="Empty State" width={200} height={200} />
          <p>No payment found.</p>
        </div>
      )}
    </div>
  );
}
