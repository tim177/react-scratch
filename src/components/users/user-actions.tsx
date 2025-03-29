"use client";

import React from "react";

import { User } from "../../types/user";

interface UserActionsProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export function UserActions({ user, onEdit, onDelete }: UserActionsProps) {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onEdit(user)}
        className="px-3 py-1 text-xs font-medium rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 transition-colors"
      >
        Edit
      </button>
      <button
        onClick={() => onDelete(user)}
        className="px-3 py-1 text-xs font-medium rounded-md bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 transition-colors"
      >
        Delete
      </button>
    </div>
  );
}
