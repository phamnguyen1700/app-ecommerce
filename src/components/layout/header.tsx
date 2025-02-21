import { SearchInput } from "../common/searchInput";
import Icons from "@/components/common/icon";
import { Button } from "@/components/ui/button";
export default function Header() {
  return (
    <header className="w-full">
      <div className="w-full h-7 py-1 font-semibold bg-black text-white text-center text-xs">
        KHUYẾN MÃI THÊM Ở ĐÂY
      </div>
      <div className="h-3">
        <div className="flex justify-end -space-x-0.5 ">
            <Button className="text-xs font-thin" variant="link">Contact</Button>
            <Button className="text-xs font-thin" variant="link">Tel</Button>
            <Button className="text-xs font-thin" variant="link">Address</Button>
        </div>
      </div>
      <div className="grid grid-cols-3 items-center pt-3 px-8 border-b">
        <div className="flex justify-start">LOGO</div>
        <div className="flex justify-center">
            <Button className="font-bold" variant="link">Home</Button>
            <Button className="font-bold" variant="link">Products</Button>
            <Button className="font-bold" variant="link">Catalog</Button>
        </div>
        <div className="flex justify-end gap-5">
          <SearchInput />
          <Icons name="user"></Icons>
          <Icons name="shoppingBag"></Icons>
        </div>
      </div>
    </header>
  );
}


