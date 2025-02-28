import { Button } from "@/components/ui/button";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="grid grid-cols-5 gap-20 place-items-center">
      <Button className="font-light hover:border-b-8 hover:border-b-black no-underline hover:no-underline" variant="link">
        <Link className="text-center no-underline hover:no-underline" href="/commercial/home" passHref>
          Trang chủ
        </Link>
      </Button>

      <Button className="font-light hover:border-b-8 hover:border-b-black no-underline hover:no-underline" variant="link">
        <Link className="text-center no-underline hover:no-underline" href="/commercial/products" passHref>
          Sản phẩm
        </Link>
      </Button>

      <Button className="font-light hover:border-b-8 hover:border-b-black no-underline hover:no-underline" variant="link">
        <Link className="text-center no-underline hover:no-underline" href="/commercial/blogs" passHref>
          Blogs
        </Link>
      </Button>

      <Button className="font-light hover:border-b-8 hover:border-b-black no-underline hover:no-underline" variant="link">
        <Link className="text-center no-underline hover:no-underline" href="/commercial/news" passHref>
          Tin tức
        </Link>
      </Button>
      <Button className="font-light hover:border-b-8 hover:border-b-black no-underline hover:no-underline" variant="link">
        <Link className="text-center no-underline hover:no-underline" href="/commercial/qa" passHref>
          Q/A
        </Link>
      </Button>
    </div>
  );
};

export default Navbar;
