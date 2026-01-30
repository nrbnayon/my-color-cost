"use client";

import { productStocks } from "@/data/productStockData";
import { useState } from "react";
import { TablePagination } from "@/components/Shared/TablePagination";
import Image from "next/image";
import { Download } from "lucide-react";

import { TableSkeleton } from "@/components/Skeleton/TableSkeleton";

export default function ProductStockTable({
  title = "Product Stock List",
  data = productStocks,
  itemsPerPage = 8,
  enablePagination = true,
  isLoading = false,
}: {
  title?: string;
  data?: typeof productStocks;
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
      {/* Remove title from here if it's handled by the page header, but the image shows a title. 
          However, usually DashboardHeader has the title. 
          The image shows "Product Stock List" as a page title, and the table seems to supply just the content.
          But checking Payments/Orders, the table component had a title prop.
          Wait, looking at the image: "Product Stock List" is at the top (DashboardHeader likely).
          The table itself has headers "Order Id", "Customer Email" etc.
          Let's keep the title prop but default to empty string if not needed, or use it if we want a card title.
          In PaymentsPage, we passed title="" to the table. We will do the same here.
      */}
      {title && <h2 className="text-xl font-bold text-foreground mb-6">{title}</h2>}
      
      {isLoading ? (
        <TableSkeleton rowCount={itemsPerPage} />
      ) : currentData.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="bg-[#F1F4F9] text-left">
                  <th className="py-4 px-6 rounded-l-xl text-foreground font-semibold text-sm">Order Id</th>
                  <th className="py-4 px-6 text-foreground font-semibold text-sm">Customer Email</th>
                  <th className="py-4 px-6 text-foreground font-semibold text-sm">Product Name</th>
                  <th className="py-4 px-6 text-foreground font-semibold text-sm">Payment Date</th>
                  <th className="py-4 px-6 text-foreground font-semibold text-sm">Amount</th>
                  <th className="py-4 px-6 rounded-r-xl text-foreground font-semibold text-sm text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {currentData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-gray-600 font-medium">{item.orderId}</td>
                    <td className="py-4 px-6 text-gray-600">{item.email}</td>
                    <td className="py-4 px-6 text-gray-600">{item.productName}</td>
                    <td className="py-4 px-6 text-gray-600">{item.paymentDate}</td>
                    <td className="py-4 px-6 text-gray-600 font-semibold">{item.amount}</td>
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
          <p>No stock found.</p>
        </div>
      )}
    </div>
  );
}
