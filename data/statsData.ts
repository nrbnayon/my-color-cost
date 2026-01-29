import { IoMdCloseCircle } from "react-icons/io";
import { LineChart, History } from "lucide-react";
export const statsData = [
  {
    title: "Total Order",
    value: "10293",
    percentage: "1.3%",
    subtitle: "Up from past week",
    imageIcon: "/icons/box.svg",
    iconColor: "#7438FF",
    iconBgColor: "#e1d5ff",
    isUp: true,
  },
  {
    title: "Total Sales",
    value: "$89,000",
    percentage: "4.3%",
    subtitle: "Down from yesterday",
    icon: LineChart, 
    iconColor: "#4AD991",
    iconBgColor: "#d9f7e7", 
    isUp: false,
  },
  {
    title: "Total Pending",
    value: "2040",
    percentage: "1.8%",
    subtitle: "Up from yesterday",
    icon: History,
    iconColor: "#FEC12C", 
    iconBgColor: "#FDF1E2",
    isUp: true,
  },
  {
    title: "Order cancel",
    value: "40,689",
    percentage: "8.5%",
    subtitle: "Up from yesterday",
    icon: IoMdCloseCircle,
    iconColor: "#E21B1B", 
    iconBgColor: "#f8cfcf",
    isUp: true,
  },
];