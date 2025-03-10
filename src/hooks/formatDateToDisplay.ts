// hooks/useFormatDateToDisplay.ts
import { useMemo } from "react";

export function useFormatDateToDisplay(dateString: string) {
  const formattedDate = useMemo(() => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }, [dateString]);

  return formattedDate;
}
