import * as React from "react";
import { ILayoutProps } from "@/typings/layout";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Providers } from "@/redux/providers";

export default function CommercialLayout({ children }: ILayoutProps) {
  return (
    <Providers>
      <div>
        <Header />
        {children}
        <Footer />
      </div>
    </Providers>
  );
}
