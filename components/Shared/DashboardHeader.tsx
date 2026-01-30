import Image from "next/image";
import Link from "next/link";
import { Bell } from "lucide-react";
import SearchBar from "./SearchBar";

export default function DashboardHeader({
  title,
  description,
  onSearch,
}: {
  title: string;
  description?: string;
  onSearch?: (value: string) => void;
}) {
  return (
    <div className="bg-white flex flex-col md:flex-row justify-between items-center py-4 px-4 md:px-8 border-b border-border gap-4">
      <div className="flex flex-col items-start justify-center">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground font-zilla">
          {title}
        </h1>
        {description && (
          <p className="text-secondary mt-1">
            {description}
          </p>
        )}
      </div>

      <div className="flex-1 flex justify-center w-full max-w-2xl px-4 md:px-12">
        <SearchBar 
          placeholder="Search" 
          onSearch={onSearch} 
          className="w-full bg-[#F5F6FA]"
        />
      </div>

      <div className="flex items-center gap-6">
        {/* Notification Icon */}
        <Link 
          href="/notifications"
          className="relative p-2.5 bg-[#F5F6FA] hover:bg-gray-100 rounded-full transition-colors border border-transparent"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5 text-blue-500" />
          {/* Notification indicator dot */}
          <span className="absolute top-2.5 right-3 w-2 h-2 bg-red-500 rounded-full border border-white translate-x-1/2 -translate-y-1/2"></span>
        </Link>

        {/* User Profile */}
        <Link
          href="/profile"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden shrink-0 border border-border">
            <Image
              src="/images/avatar.png"
              alt="Moni Roy"
              width={40}
              height={40}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="hidden md:flex flex-col">
            <p className="text-sm font-bold text-foreground font-nunito">
              Moni Roy
            </p>
            <p className="text-xs text-gray-500 font-bold">
              Admin
            </p>
          </div>
        </Link>
      </div>
    </div>
  )
}
