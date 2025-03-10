import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const navItems = [
  { title: "Trang chủ", path: "/commercial/home" },
  { title: "Sản phẩm", path: "/commercial/products" },
  { title: "Blogs", path: "/commercial/blogs" },
  { title: "Tin tức", path: "/commercial/news" },
  { title: "Q/A", path: "/commercial/qa" },
];

const Navbar = () => {
  const router = useRouter();
  return (
    <nav className="flex justify-center gap-10 py-4 border-b border-gray-300">
      {navItems.map((item) => (
        <Button
          key={item.title}
          onClick={() => router.push(item.path)}
          variant="link"
          className="relative font-light no-underline text-gray-800 hover:text-black"
        >
          {item.title}
          <span className="absolute bottom-0 left-0 w-full h-[3px] bg-black scale-x-0 hover:scale-x-100 transition-transform duration-200"></span>
        </Button>
      ))}
    </nav>
  );
};

export default Navbar;
