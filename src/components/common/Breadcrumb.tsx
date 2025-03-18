import Link from "next/link";

interface BreadcrumbProps {
  items: { label: string; href: string }[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="text-sm text-gray-500 mb-4">
      <ul className="flex space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <Link href={item.href} className="hover:text-black transition">
              {item.label}
            </Link>
            {index < items.length - 1 && <span className="mx-1">/</span>}
          </li>
        ))}
      </ul>
    </nav>
  );
}
