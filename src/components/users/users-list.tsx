"use client";

import React, { useState } from "react";
import { UsersTable } from "./users-table";
import { EditUserModal } from "./edit-user-modal";
import { DeleteUserDialog } from "./delete-user-dialog";
import { UsersPagination } from "./users-pagination";
import { User } from "../../types/user";
import { SearchIcon } from "lucide-react";
import { ToastContainer, ToastData } from "../ui/toast";
import { useUsers } from "../../lib/hooks/use-user";

export default function UsersList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const {
    users,
    totalPages,
    isLoading,
    error,
    updateUser,
    deleteUser,
    isUpdating,
    isDeleting,
    refreshUsers,
  } = useUsers(currentPage);

  // Filter users by search query
  const filteredUsers = users.filter((user) => {
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    return (
      user.first_name.toLowerCase().includes(query) ||
      user.last_name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    );
  });

  // Handle edit user
  const handleEditUser = (user: User) => {
    setEditingUser(user);
  };

  // Handle delete user
  const handleDeleteUser = (user: User) => {
    setDeletingUser(user);
  };

  // Handle update user submission
  const handleUpdateUser = async (userId: number, data: any) => {
    try {
      await updateUser(userId, data);
      setEditingUser(null);
      addToast("User updated successfully", "success");
    } catch (error) {
      addToast("Failed to update user", "error");
      throw error;
    }
  };

  // Handle delete user confirmation
  const handleDeleteUserConfirm = async (userId: number) => {
    try {
      await deleteUser(userId);
      setDeletingUser(null);
      addToast("User deleted successfully", "success");
    } catch (error) {
      addToast("Failed to delete user", "error");
      throw error;
    }
  };

  // Add toast
  const addToast = (message: string, type: "success" | "error" | "info") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  // Remove toast
  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            User Management
          </h1>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <SearchIcon className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="pl-10 pr-4 py-2 w-full md:w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-900 dark:text-white"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {error ? (
          <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
            {error}
          </div>
        ) : (
          <>
            <UsersTable
              users={filteredUsers}
              isLoading={isLoading}
              onEditUser={handleEditUser}
              onDeleteUser={handleDeleteUser}
            />

            <div className="mt-6">
              <UsersPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                isDisabled={isLoading}
              />
            </div>
          </>
        )}
      </div>

      {/* Edit User Modal */}
      <EditUserModal
        user={editingUser}
        isOpen={!!editingUser}
        isLoading={isUpdating}
        onClose={() => setEditingUser(null)}
        onSubmit={handleUpdateUser}
      />

      {/* Delete User Dialog */}
      <DeleteUserDialog
        user={deletingUser}
        isOpen={!!deletingUser}
        isLoading={isDeleting}
        onClose={() => setDeletingUser(null)}
        onConfirm={handleDeleteUserConfirm}
      />

      {/* Toast Container */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
