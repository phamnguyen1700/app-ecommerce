import { Input } from "@/components/ui/input";
import Icons from "@/components/common/icon";

export function SearchInput() {
  return (
    <div className="relative w-50">
      <Input
        type="text"
        placeholder="Search..."
        className="pl-3 pr-10 h-6 bg-gray-200 border rounded-none focus:outline-none"
      />
      <Icons
        name="search"
        className="absolute right-1 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black-500"
      />
    </div>
  );
}
