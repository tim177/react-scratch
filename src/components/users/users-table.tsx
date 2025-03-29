"use client";

import React, { useMemo } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { User } from "@/src/types/user";
import { UserActions } from "./user-actions";

interface UsersTableProps {
  users: User[];
  isLoading: boolean;
  onEditUser: (user: User) => void;
  onDeleteUser: (user: User) => void;
}

export function UsersTable({
  users,
  isLoading,
  onEditUser,
  onDeleteUser,
}: UsersTableProps) {
  const columnHelper = createColumnHelper<User>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("avatar", {
        header: "",
        cell: (info) => (
          <div className="flex items-center justify-center">
            <img
              src={info.getValue() || "/placeholder.svg"}
              alt="User avatar"
              className="h-10 w-10 rounded-full object-cover border-2 border-white shadow-sm"
            />
          </div>
        ),
      }),
      columnHelper.accessor("first_name", {
        header: "First Name",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("last_name", {
        header: "Last Name",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("email", {
        header: "Email",
        cell: (info) => (
          <div className="font-medium text-blue-600 dark:text-blue-400">
            {info.getValue()}
          </div>
        ),
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: (info) => (
          <UserActions
            user={info.row.original}
            onEdit={onEditUser}
            onDelete={onDeleteUser}
          />
        ),
      }),
    ],
    [columnHelper, onEditUser, onDeleteUser]
  );

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return (
      <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <div className="bg-gray-50 dark:bg-gray-800">
            <div className="grid grid-cols-5 divide-x divide-gray-200 dark:divide-gray-700">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="px-6 py-3">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
            {[...Array(5)].map((_, rowIndex) => (
              <div
                key={rowIndex}
                className="grid grid-cols-5 divide-x divide-gray-200 dark:divide-gray-700"
              >
                {[...Array(5)].map((_, colIndex) => (
                  <div key={colIndex} className="px-6 py-4">
                    <div className="h-5 bg-gray-100 dark:bg-gray-800 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="divide-x divide-gray-200 dark:divide-gray-700"
            >
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="divide-x divide-gray-200 dark:divide-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {users.length === 0 && !isLoading && (
        <div className="px-6 py-10 text-center text-gray-500 dark:text-gray-400">
          No users found
        </div>
      )}
    </div>
  );
}
