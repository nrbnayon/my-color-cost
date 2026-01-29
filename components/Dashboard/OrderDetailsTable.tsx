"use client";

import { Eye } from "lucide-react";

// Dummy JSON data as requested (10 items)
const orders = [
  {
    id: 1,
    productName: "Apple Watch",
    location: "6096 Marjolaine Landing",
    dateTime: "12.09.2019 - 12:53 PM",
    date: "12.09.2019",
    piece: 423,
    amount: "$34,295",
    status: "Delivered",
  },
  {
    id: 2,
    productName: "Apple Watch",
    location: "6096 Marjolaine Landing",
    dateTime: "12.09.2019 - 12:53 PM",
    date: "12.09.2019",
    piece: 423,
    amount: "$34,295",
    status: "Pending",
  },
  {
    id: 3,
    productName: "Apple Watch",
    location: "6096 Marjolaine Landing",
    dateTime: "12.09.2019 - 12:53 PM",
    date: "12.09.2019",
    piece: 423,
    amount: "$34,295",
    status: "Rejected",
  },
  {
    id: 4,
    productName: "Apple Watch",
    location: "6096 Marjolaine Landing",
    dateTime: "12.09.2019 - 12:53 PM",
    date: "12.09.2019",
    piece: 423,
    amount: "$34,295",
    status: "Pending",
  },
  {
    id: 5,
    productName: "Apple Watch",
    location: "6096 Marjolaine Landing",
    dateTime: "12.09.2019 - 12:53 PM",
    date: "12.09.2019",
    piece: 423,
    amount: "$34,295",
    status: "Delivered",
  },
  {
    id: 6,
    productName: "Apple Watch",
    location: "6096 Marjolaine Landing",
    dateTime: "12.09.2019 - 12:53 PM",
    date: "12.09.2019",
    piece: 423,
    amount: "$34,295",
    status: "Delivered",
  },
   {
    id: 7,
    productName: "Apple Watch",
    location: "6096 Marjolaine Landing",
    dateTime: "12.09.2019 - 12:53 PM",
    date: "12.09.2019",
    piece: 423,
    amount: "$34,295",
    status: "Delivered",
  },
  {
    id: 8,
    productName: "Apple Watch",
    location: "6096 Marjolaine Landing",
    dateTime: "12.09.2019 - 12:53 PM",
    date: "12.09.2019",
    piece: 423,
    amount: "$34,295",
    status: "Pending",
  },
  {
    id: 9,
    productName: "Apple Watch",
    location: "6096 Marjolaine Landing",
    dateTime: "12.09.2019 - 12:53 PM",
    date: "12.09.2019",
    piece: 423,
    amount: "$34,295",
    status: "Rejected",
  },
  {
    id: 10,
    productName: "Apple Watch",
    location: "6096 Marjolaine Landing",
    dateTime: "12.09.2019 - 12:53 PM",
    date: "12.09.2019",
    piece: 423,
    amount: "$34,295",
    status: "Delivered",
  },
];

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

export default function OrderDetailsTable({title}: {title: string}) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-[6px_6px_54px_0px_#0000000D] w-full">
      <h2 className="text-xl font-bold text-foreground mb-6">{title}</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="bg-[#F1F4F9] text-left">
              <th className="py-4 px-6 rounded-l-xl text-gray-500 font-semibold text-sm">Product Name</th>
              <th className="py-4 px-6 text-gray-500 font-semibold text-sm">Location</th>
              <th className="py-4 px-6 text-gray-500 font-semibold text-sm">Date - Time</th>
              <th className="py-4 px-6 text-gray-500 font-semibold text-sm">Piece</th>
              <th className="py-4 px-6 text-gray-500 font-semibold text-sm">Amount</th>
              <th className="py-4 px-6 text-gray-500 font-semibold text-sm">Status</th>
              <th className="py-4 px-6 rounded-r-xl text-gray-500 font-semibold text-sm text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 text-foreground font-medium">{order.productName}</td>
                <td className="py-4 px-6 text-foreground">{order.location}</td>
                <td className="py-4 px-6 text-foreground">{order.dateTime}</td>
                <td className="py-4 px-6 text-foreground">{order.piece}</td>
                <td className="py-4 px-6 text-foreground font-semibold">{order.amount}</td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-center">
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 cursor-pointer">
                    <img src="/icons/eye.svg" alt="eye" width={24} height={24} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
