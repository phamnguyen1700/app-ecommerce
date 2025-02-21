import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function SearchInput() {
  return (
    <div className="relative w-full">
      <Input
        type="text"
        placeholder="Search..."
        className="pl-3 pr-10 h-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
      </Input>
    </div>
  );
}
