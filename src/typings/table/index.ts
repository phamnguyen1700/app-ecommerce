export interface TableColumn<T> {
  colName: string;
  render: (record: T) => React.ReactNode;
}

export interface CustomTableProps<T> {
  columns: TableColumn<T>[];
  records: T[];
}
