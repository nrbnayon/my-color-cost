// components/Dashboard/Shared/StatsCard.tsx
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";
import Image from "next/image";
import { StatsCardProps } from "@/types/stats";

export function StatsCard({
  title,
  value,
  icon: Icon,
  imageIcon,
  iconColor,
  iconBgColor,
  isUp = true,
  subtitle,
  percentage,
  className,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        "bg-white px-6 py-6 rounded-xl flex items-start justify-between h-full border border-none cursor-pointer transition-all hover:bg-blue-50 shadow-[6px_6px_54px_0px_#0000000D]",
        className
      )}
    >
      <div className="flex flex-col justify-between h-full gap-4">
        <div>
          <h3 className="text-gray-500 text-base font-medium font-nunito mb-2">{title}</h3>
          <div className="text-3xl font-bold text-foreground font-nunito">{value}</div>
        </div>

        {(percentage || subtitle) && (
          <div className="flex items-center gap-2 text-sm mt-auto">
            <div
              className={cn(
                "flex items-center gap-1 font-semibold font-nunito",
                isUp ? "text-[#00B69B]" : "text-[#F93C65]"
              )}
            >
              {isUp ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>{percentage}</span>
            </div>
            <span className="text-gray-500 text-sm whitespace-nowrap font-nunito">
              {subtitle}
            </span>
          </div>
        )}
      </div>

      {/* Dynamic Icon Rendering */}
      <div
        className="flex items-center justify-center rounded-[24px] p-4"
        style={{ backgroundColor: iconBgColor }}
      >
        {imageIcon ? (
          // Render image icon
          <Image
            src={imageIcon}
            alt={title}
            width={32}
            height={32}
            className="object-contain"
          />
        ) : Icon ? (
          // Render Lucide or React Icon
          <Icon size={32} style={{ color: iconColor }} strokeWidth={2} />
        ) : null}
      </div>
    </div>
  );
}