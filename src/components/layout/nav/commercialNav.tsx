import { Button } from "@/components/ui/button";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="grid grid-cols-5 gap-4 place-items-center">
      <Button className="font-bold" variant="link">
        <Link href="/commercial/home" passHref>
          Trang chủ
        </Link>
      </Button>

      <Button className="font-bold" variant="link">
        <Link href="/commercial/products" passHref>
          Sản phẩm
        </Link>
      </Button>

      <Button className="font-bold" variant="link">
        <Link href="/commercial/blogs" passHref>
          Blogs
        </Link>
      </Button>

      <Button className="font-bold" variant="link">
        <Link href="/commercial/news" passHref>
          Tin tức
        </Link>
      </Button>
      <Button className="font-bold" variant="link">
        <Link href="/commercial/qa" passHref>
          Q/A
        </Link>
      </Button>
    </div>
  );
};

export default Navbar;
