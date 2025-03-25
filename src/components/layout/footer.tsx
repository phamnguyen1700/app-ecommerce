"use client";

import type React from "react";


import { Facebook, Instagram, Youtube,  CreditCard } from "lucide-react";
import Link from "next/link";

export default function Footer() {


  return (
    <footer className="bg-gray-50 pt-12 pb-6">
      <div className="container mx-auto px-4 md:px-6">
        {/* Newsletter Section */}
        

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-10">
          <div>
            <h3 className="font-bold mb-4 text-sm tracking-wider">SẢN PHẨM</h3>
            <div className="flex flex-col gap-y-2">
              <FooterLink href="/commercial/products">Sản phẩm mới</FooterLink>
              <FooterLink href="/commercial/products">Bán chạy nhất</FooterLink>
              <FooterLink href="#">Chăm sóc da</FooterLink>
              <FooterLink href="#">Trang điểm</FooterLink>
              <FooterLink href="#">Nước hoa</FooterLink>
              <FooterLink href="#">Phụ kiện</FooterLink>
              <FooterLink href="#">Khuyến mãi</FooterLink>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-sm tracking-wider">DANH MỤC</h3>
            <div className="flex flex-col gap-y-2">
              <FooterLink href="/commercial/products">Cleanser</FooterLink>
              <FooterLink href="/commercial/products">Toner</FooterLink>
              <FooterLink href="/commercial/products">Serum</FooterLink>
              <FooterLink href="/commercial/products">Kem dưỡng</FooterLink>
              <FooterLink href="/commercial/products">Mặt nạ</FooterLink>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-sm tracking-wider">HỖ TRỢ</h3>
            <div className="flex flex-col gap-y-2">
              <FooterLink href="/commercial/qa">Trợ giúp</FooterLink>
              <FooterLink href="/commercial/orders">Vận chuyển</FooterLink>
              <FooterLink href="/commercial/orders">
                Theo dõi đơn hàng
              </FooterLink>
              <FooterLink href="/commercial/qa">Đổi trả</FooterLink>
              <FooterLink href="/commercial/qa">Câu hỏi thường gặp</FooterLink>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-sm tracking-wider">CÔNG TY</h3>
            <div className="flex flex-col gap-y-2">
              <FooterLink href="#">Về chúng tôi</FooterLink>
              <FooterLink href="#">Tuyển dụng</FooterLink>
              <FooterLink href="#">Chính sách bảo mật</FooterLink>
              <FooterLink href="#">Điều khoản sử dụng</FooterLink>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-sm tracking-wider">LIÊN HỆ</h3>
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                Số 123 Đường ABC, Quận XYZ
                <br />
                Thành phố Hồ Chí Minh, Việt Nam
              </p>
              <p className="text-sm text-gray-600">
                Email: info@example.com
                <br />
                Hotline: 1900 1234
              </p>
              <div className="flex space-x-4 mt-4">
                <SocialIcon
                  icon={<Facebook className="h-5 w-5" />}
                  href="#"
                  label="Facebook"
                />
                <SocialIcon
                  icon={<Instagram className="h-5 w-5" />}
                  href="#"
                  label="Instagram"
                />
                <SocialIcon
                  icon={<Youtube className="h-5 w-5" />}
                  href="#"
                  label="Youtube"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-gray-200 pt-6 pb-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Phương thức thanh toán:
              </span>
              <div className="flex space-x-3">
                <CreditCard className="h-6 w-6 text-gray-600" />
              </div>
            </div>
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} Beauty Store. Tất cả quyền được bảo
              lưu.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Helper components for consistent styling
function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-sm text-gray-600 hover:text-black transition-colors duration-200"
    >
      {children}
    </Link>
  );
}

function SocialIcon({
  icon,
  href,
  label,
}: {
  icon: React.ReactNode;
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="bg-gray-100 p-2 rounded-full hover:bg-black hover:text-white transition-colors duration-200"
    >
      {icon}
    </Link>
  );
}
