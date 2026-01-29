// types/stats.ts
import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";

export interface StatsCardData {
  title: string;
  value: string | number;
  percentage?: string;
  subtitle?: string;
  iconColor?: string;
  iconBgColor?: string;
  isUp?: boolean;
  icon?: LucideIcon | IconType;
  imageIcon?: string;
}

export interface StatsCardProps extends StatsCardData {
  className?: string;
}