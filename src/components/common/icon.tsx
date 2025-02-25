import {
  LucideProps,
  Search,
  User,
  ShoppingBag,
  Facebook,
  Instagram,
  Youtube,
  Star,
  Eye,
  Menu,
  Bell
} from "lucide-react";

const icons = {
  search: Search,
  user: User,
  shoppingBag: ShoppingBag,
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  star: Star,
  eye: Eye,
  menu: Menu,
  bell: Bell
};

interface IconProps extends LucideProps {
  name: keyof typeof icons;
}

export default function Icon({
  name,
  size = 24,
  className,
  ...props
}: IconProps) {
  const IconComponent = icons[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" không tồn tại.`);
    return null;
  }

  return (
    <div className="flex items-center justify-center">
      <IconComponent size={size} className={className} {...props} />
    </div>
  );
}
