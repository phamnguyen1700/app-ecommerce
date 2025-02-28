"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Pagination({ className, children }: { className?: string; children: React.ReactNode }) {
  return <nav className={cn("flex justify-center", className)}>{children}</nav>;
}

export function PaginationContent({ children }: { children: React.ReactNode }) {
  return <ul className="flex items-center space-x-2">{children}</ul>;
}

export function PaginationItem({ children }: { children: React.ReactNode }) {
  return <li>{children}</li>;
}

export function PaginationPrevious({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return (
    <Button
      variant="link"
      className={cn("px-2 py-1 text-xs", disabled && "opacity-50 cursor-not-allowed")}
      onClick={onClick}
      disabled={disabled}
    >
      ← Trước
    </Button>
  );
}

export function PaginationNext({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return (
    <Button
      variant="link"
      className={cn("px-2 py-1 text-xs", disabled && "opacity-50 cursor-not-allowed")}
      onClick={onClick}
      disabled={disabled}
    >
      Sau →
    </Button>
  );
}

export function PaginationLink({ isActive, children, onClick }: { isActive?: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <Button
      variant="link"
      className={cn("px-2 py-1 text-xs", isActive ? "underline" : "font-light")}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
