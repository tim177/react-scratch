"use client";

import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@/src/types/user";

// Define the validation schema
const userSchema = z.object({
  first_name: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" }),
  last_name: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type UserFormValues = z.infer<typeof userSchema>;

interface EditUserModalProps {
  user: User | null;
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onSubmit: (userId: number, data: UserFormValues) => Promise<void>;
}

export function EditUserModal({
  user,
  isOpen,
  isLoading,
  onClose,
  onSubmit,
}: EditUserModalProps) {
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: user
      ? {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
        }
      : {
          first_name: "",
          last_name: "",
          email: "",
        },
  });

  // Reset form when user changes
  useState(() => {
    if (user) {
      reset({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      });
    }
  });

  async function handleFormSubmit(data: UserFormValues) {
    if (!user) return;

    setError(null);
    try {
      await onSubmit(user.id, data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An error occurred while updating the user");
      }
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Edit User
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span className="sr-only">Close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="p-6 space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label
                htmlFor="first_name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                First Name
              </label>
              <input
                id="first_name"
                type="text"
                disabled={isLoading}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors
                  ${
                    errors.first_name
                      ? "border-red-300 focus:border-red-400 focus:ring-red-100 dark:border-red-600 dark:focus:ring-red-900"
                      : "border-gray-300 focus:border-blue-400 focus:ring-blue-100 dark:border-gray-600 dark:focus:ring-blue-900 dark:bg-gray-700 dark:text-white"
                  }`}
                {...register("first_name")}
              />
              {errors.first_name && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errors.first_name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="last_name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Last Name
              </label>
              <input
                id="last_name"
                type="text"
                disabled={isLoading}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors
                  ${
                    errors.last_name
                      ? "border-red-300 focus:border-red-400 focus:ring-red-100 dark:border-red-600 dark:focus:ring-red-900"
                      : "border-gray-300 focus:border-blue-400 focus:ring-blue-100 dark:border-gray-600 dark:focus:ring-blue-900 dark:bg-gray-700 dark:text-white"
                  }`}
                {...register("last_name")}
              />
              {errors.last_name && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errors.last_name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                disabled={isLoading}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors
                  ${
                    errors.email
                      ? "border-red-300 focus:border-red-400 focus:ring-red-100 dark:border-red-600 dark:focus:ring-red-900"
                      : "border-gray-300 focus:border-blue-400 focus:ring-blue-100 dark:border-gray-600 dark:focus:ring-blue-900 dark:bg-gray-700 dark:text-white"
                  }`}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end p-6 border-t border-gray-200 dark:border-gray-700 space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </div>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
