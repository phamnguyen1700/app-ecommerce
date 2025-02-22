import React from "react";
import { Icon } from "@iconify/react";

export default function GoogleButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-10 h-10 p-2 flex items-center justify-center border border-black rounded-none hover:bg-gray-100"
    >
      <Icon icon="flat-color-icons:google" className="w-6 h-6" />
    </button>
  );
}
