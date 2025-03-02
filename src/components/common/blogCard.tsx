import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  image: string;
  title: string;
  description: string;
  link: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ image, title, description, link }) => {
  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden shadow-md hover:border-black hover:border-2">
      {/* Hình ảnh blog */}
      <div className="relative w-full h-64">
        <Image 
          src={image} 
          alt={title} 
          layout="fill" 
          objectFit="cover" 
          className="rounded-t-lg"
        />
      </div>

      {/* Nội dung */}
      <div className="p-4">
        <h3 className="text-lg font-bold uppercase">{title}</h3>
        <p className="text-sm text-gray-600 mt-2 line-clamp-1">{description}</p>

        {/* Nút chuyển hướng */}
        <Link href={link} passHref>
          <span className="inline-block mt-4 text-black font-bold uppercase border-b-2 border-black pb-1 cursor-pointer hover:bg-gray-200">
            Tìm hiểu thêm →
          </span>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
