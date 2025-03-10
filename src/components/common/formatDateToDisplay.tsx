import React from 'react';

interface FormatDateProps {
  dateString: string;
}

export default function FormatDateToDisplay({ dateString }: FormatDateProps) {
  const formattedDate = new Date(dateString).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return <span>{formattedDate}</span>;
}
