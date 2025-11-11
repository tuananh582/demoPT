"use client";

import type { ReactNode } from "react";

interface Column<T> {
  key: keyof T;
  header: string;
}

interface DataTableProps<T extends Record<string, unknown>> {
  columns: Array<Column<T>>;
  data: T[];
  renderCell?: (key: keyof T, value: unknown, row: T) => ReactNode;
}

export function DataTable<T extends Record<string, unknown>>({ columns, data, renderCell }: DataTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
      <div className="max-h-[360px] overflow-auto">
        <table className="min-w-full divide-y divide-zinc-200 text-left text-sm dark:divide-zinc-800">
          <thead className="bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500 dark:bg-zinc-800/60 dark:text-zinc-400">
            <tr>
              {columns.map((column) => (
                <th key={String(column.key)} scope="col" className="px-4 py-3 font-semibold">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 bg-white dark:divide-zinc-800 dark:bg-zinc-900">
            {data.map((row, index) => (
              <tr key={index} className="transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/80">
                {columns.map((column) => (
                  <td key={String(column.key)} className="px-4 py-3 text-zinc-700 dark:text-zinc-200">
                    {renderCell ? renderCell(column.key, row[column.key], row) : (row[column.key] as ReactNode)}
                  </td>
                ))}
              </tr>
            ))}
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-6 text-center text-zinc-500 dark:text-zinc-400">
                  Không có dữ liệu
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
