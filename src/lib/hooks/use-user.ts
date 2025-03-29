"use client";

import React, { useState, useEffect, useCallback } from "react";
import { api } from "../api";
import { User } from "@/src/types/user";

export function useUsers(page = 1) {
  const [users, setUsers] = useState<User[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch users
  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.getUsers(page);
      setUsers(response.data);
      setTotalPages(response.total_pages);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load users. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  // Update user
  const updateUser = async (userId: number, userData: Partial<User>) => {
    setIsUpdating(true);

    try {
      const updatedUser = await api.updateUser(userId, userData);

      // Update the user in the local state
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, ...updatedUser } : user
        )
      );

      return updatedUser;
    } finally {
      setIsUpdating(false);
    }
  };

  // Delete user
  const deleteUser = async (userId: number) => {
    setIsDeleting(true);

    try {
      await api.deleteUser(userId);

      // Remove the user from the local state
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));

      return true;
    } finally {
      setIsDeleting(false);
    }
  };

  // Refresh users
  const refreshUsers = () => {
    fetchUsers();
  };

  // Fetch users on mount and when page changes
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    totalPages,
    isLoading,
    error,
    updateUser,
    deleteUser,
    isUpdating,
    isDeleting,
    refreshUsers,
  };
}
