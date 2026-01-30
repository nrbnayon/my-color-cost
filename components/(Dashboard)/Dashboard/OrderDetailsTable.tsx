"use client";

import { orders } from "@/data/orderData";
import { useState } from "react";
import { TablePagination } from "@/components/Shared/TablePagination";
import Image from "next/image";

const getStatusColor = (status: string) => {
  switch (status) {
    case "Delivered":
      return "bg-green-100 text-green-600";
    case "Pending":
      return "bg-orange-100 text-orange-400";
    case "Rejected":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

export default function OrderDetailsTable({
  title = "Order Details",
  data = orders,
  itemsPerPage = 7,
  enablePagination = true,
}: {
  title?: string;
  data?: typeof orders;
  itemsPerPage?: number;
  enablePagination?: boolean;
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Only show pagination if enabled AND there are more items than the page size
  const showPagination = enablePagination && totalItems > itemsPerPage;

  const currentData = showPagination 
    ? data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : data;

  return (
    <div className="bg-white p-6 rounded-3xl shadow-[6px_6px_54px_0px_#0000000D] w-full">
      {title && <h2 className="text-xl font-bold text-foreground mb-6">{title}</h2>}
      
      {currentData.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="bg-[#F1F4F9] text-left">
                  <th className="py-4 px-6 rounded-l-xl text-foreground font-semibold text-sm">Product Name</th>
                  <th className="py-4 px-6 text-foreground font-semibold text-sm">Location</th>
                  <th className="py-4 px-6 text-foreground font-semibold text-sm">Date - Time</th>
                  <th className="py-4 px-6 text-foreground font-semibold text-sm">Piece</th>
                  <th className="py-4 px-6 text-foreground font-semibold text-sm">Amount</th>
                  <th className="py-4 px-6 text-foreground font-semibold text-sm">Status</th>
                  <th className="py-4 px-6 rounded-r-xl text-foreground font-semibold text-sm text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {currentData.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-gray-600 font-medium">{order.productName}</td>
                    <td className="py-4 px-6 text-gray-600">{order.location}</td>
                    <td className="py-4 px-6 text-gray-600">{order.dateTime}</td>
                    <td className="py-4 px-6 text-gray-600">{order.piece}</td>
                    <td className="py-4 px-6 text-gray-600 font-semibold">{order.amount}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-foreground cursor-pointer">
                        <img src="/icons/eye.svg" alt="eye" width={24} height={24} />
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
          <p>No order found.</p>
        </div>
      )}
    </div>
  );
}
