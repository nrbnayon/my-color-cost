// data/allNotificationsData.ts

import { Notification } from "@/types/notification";

export const allNotificationsData: Notification[] = [
  {
    id: "1",
    type: "new_order",
    title: "New Order Received",
    message: "New order #1 for Apple Watch from 6096 Marjolaine Landing.",
    timestamp: "2026-01-30T10:30:00Z",
    status: "unread",
    priority: "high",
    metadata: {
      amount: "$34,295",
      items: 423,
      customer: "Walk-in Customer"
    }
  },
  {
    id: "2",
    type: "payment_received",
    title: "Payment Confirmed",
    message: "Payment received from Moni Roy for Order #302012.",
    timestamp: "2026-01-30T09:15:00Z",
    status: "unread",
    priority: "medium",
    metadata: {
      amount: "$34,295",
      method: "Master Card"
    }
  },
  {
    id: "3",
    type: "stock_alert",
    title: "Low Stock Alert",
    message: "Stock for 'Modern Light Clothes' is running low (Order ID: CO 122).",
    timestamp: "2026-01-29T16:45:00Z",
    status: "unread",
    priority: "high",
    metadata: {
      product: "Modern Light Clothes",
      remaining: 5
    }
  },
  {
    id: "4",
    type: "payment_update",
    title: "Payment Pending",
    message: "Payment for Jane Doe (ID: 302013) is still pending.",
    timestamp: "2026-01-29T14:20:00Z",
    status: "read",
    priority: "medium",
    metadata: {
      amount: "$5,200",
      due_date: "2026-02-01"
    }
  },
  {
    id: "5",
    type: "parcel_delivered",
    title: "Order Delivered",
    message: "Order #5 (Apple Watch) has been successfully delivered.",
    timestamp: "2026-01-29T11:00:00Z",
    status: "read",
    priority: "low",
    metadata: {
      location: "6096 Marjolaine Landing",
      receiver: "Direct Handover"
    }
  },
  {
    id: "6",
    type: "new_order",
    title: "New Order Received",
    message: "New order #2 for Apple Watch from 6096 Marjolaine Landing.",
    timestamp: "2026-01-28T15:30:00Z",
    status: "read",
    priority: "medium",
    metadata: {
      amount: "$34,295",
      items: 423
    }
  },
  {
    id: "7",
    type: "payment_update",
    title: "Payment Unpaid",
    message: "Frank Miller's payment (ID: 302020) marked as Unpaid.",
    timestamp: "2026-01-28T09:00:00Z",
    status: "unread",
    priority: "urgent",
    metadata: {
      amount: "$12,100",
      method: "Paypal"
    }
  },
  {
    id: "8",
    type: "stock_alert",
    title: "Stock Verified",
    message: "Stock level for 'Apple Watch' verified and updated.",
    timestamp: "2026-01-27T10:00:00Z",
    status: "read",
    priority: "low",
    metadata: {
      admin: "Moni Roy"
    }
  },
  {
    id: "9",
    type: "new_order",
    title: "Order Rejected",
    message: "Order #3 (Apple Watch) was rejected.",
    timestamp: "2026-01-26T14:30:00Z",
    status: "read",
    priority: "high",
    metadata: {
      reason: "Out of stock location"
    }
  },
  {
    id: "10",
    type: "payment_received",
    title: "Payment Received",
    message: "Payment received from Grace Wilson ($3,300).",
    timestamp: "2026-01-25T11:15:00Z",
    status: "read",
    priority: "low",
  }
];