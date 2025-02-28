"use client";

import * as React from "react";
import { ILayoutProps } from "@/typings/layout";
import ManagementHeader from "@/components/layout/manageHeader";
import { Providers } from "@/redux/providers";

export default function ManagementLayout({ children }: ILayoutProps) {
  return (
    <Providers>
      <div className="flex h-screen">
        <div className="flex flex-col flex-1">
          <ManagementHeader />
          <main className="p-6 bg-gray-100 flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </Providers>
  );
}
