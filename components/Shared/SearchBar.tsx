import { Search } from "lucide-react";
import { Input } from "@/components/ui/input"; // Assuming you have shadcn or similar, if not I'll use standard input
import { cn } from "@/lib/utils"; // Assuming utility exists, checking imports...

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void;
  className?: string;
}

export default function SearchBar({ onSearch, className, ...props }: SearchBarProps) {
  return (
    <div className={cn("relative flex items-center w-full max-w-md", className)}>
      <Search className="absolute left-4 w-5 h-5 text-gray-400" />
      <input
        type="text"
        className="w-full pl-12 pr-4 py-3 bg-[#F5F6FA] border-none rounded-3xl text-sm focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-gray-400"
        placeholder="Search"
        onChange={(e) => onSearch?.(e.target.value)}
        {...props}
      />
    </div>
  );
}
