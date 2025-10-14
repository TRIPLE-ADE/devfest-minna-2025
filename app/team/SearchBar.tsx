"use client";
import { Search } from "lucide-react";
import { Input } from "@/shared/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search...",
}: SearchBarProps) => {
  return (
    <div className="relative max-w-md mx-auto mb-8">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
        aria-hidden="true"
      />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10"
        aria-label={placeholder}
      />
    </div>
  );
};

export default SearchBar;
