"use client";

import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconEye, IconEyeClosed } from "@tabler/icons-react";

// Define the validation schema
const registerSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" }),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSuccess: () => void;
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  async function onSubmit(data: RegisterFormValues) {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In a real app, you would call your registration API here
      console.log("Registration data:", data);

      // Call the success callback
      onSuccess();
    } catch (err) {
      setError("An error occurred during registration. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Full Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="John Doe"
          autoComplete="name"
          disabled={isLoading}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors
            ${
              errors.name
                ? "border-red-300 focus:border-red-400 focus:ring-red-100 dark:border-red-600 dark:focus:ring-red-900"
                : "border-gray-300 focus:border-blue-400 focus:ring-blue-100 dark:border-gray-600 dark:focus:ring-blue-900 dark:bg-gray-700 dark:text-white"
            }`}
          {...register("name")}
        />
        {errors.name && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {errors.name.message}
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
          placeholder="you@example.com"
          autoComplete="email"
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

      <div className="space-y-2">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            autoComplete="new-password"
            disabled={isLoading}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors
              ${
                errors.password
                  ? "border-red-300 focus:border-red-400 focus:ring-red-100 dark:border-red-600 dark:focus:ring-red-900"
                  : "border-gray-300 focus:border-blue-400 focus:ring-blue-100 dark:border-gray-600 dark:focus:ring-blue-900 dark:bg-gray-700 dark:text-white"
              }`}
            {...register("password")}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
          >
            {showPassword ? (
              <IconEyeClosed className="h-5 w-5" />
            ) : (
              <IconEye className="h-5 w-5" />
            )}
            <span className="sr-only">
              {showPassword ? "Hide password" : "Show password"}
            </span>
          </button>
        </div>
        {errors.password && (
          <div className="text-sm text-red-600 dark:text-red-400 space-y-1">
            <p>Password must:</p>
            <ul className="list-disc pl-5 space-y-1">
              {errors.password.message?.includes("8 characters") && (
                <li>Be at least 8 characters long</li>
              )}
              {errors.password.message?.includes("uppercase") && (
                <li>Contain at least one uppercase letter</li>
              )}
              {errors.password.message?.includes("lowercase") && (
                <li>Contain at least one lowercase letter</li>
              )}
              {errors.password.message?.includes("number") && (
                <li>Contain at least one number</li>
              )}
            </ul>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Confirm Password
        </label>
        <div className="relative">
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••••"
            autoComplete="new-password"
            disabled={isLoading}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors
              ${
                errors.confirmPassword
                  ? "border-red-300 focus:border-red-400 focus:ring-red-100 dark:border-red-600 dark:focus:ring-red-900"
                  : "border-gray-300 focus:border-blue-400 focus:ring-blue-100 dark:border-gray-600 dark:focus:ring-blue-900 dark:bg-gray-700 dark:text-white"
              }`}
            {...register("confirmPassword")}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            disabled={isLoading}
          >
            {showConfirmPassword ? (
              <IconEyeClosed className="h-5 w-5" />
            ) : (
              <IconEye className="h-5 w-5" />
            )}
            <span className="sr-only">
              {showConfirmPassword ? "Hide password" : "Show password"}
            </span>
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg dark:border-gray-700">
        <input
          id="terms"
          type="checkbox"
          disabled={isLoading}
          className="h-4 w-4 mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-blue-600"
          {...register("terms")}
        />
        <div className="space-y-1">
          <label
            htmlFor="terms"
            className="text-sm text-gray-700 dark:text-gray-300"
          >
            I agree to the{" "}
            <button
              type="button"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Terms of Service
            </button>{" "}
            and{" "}
            <button
              type="button"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Privacy Policy
            </button>
          </label>
          {errors.terms && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.terms.message}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 disabled:opacity-70"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
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
            Creating account...
          </div>
        ) : (
          "Create account"
        )}
      </button>
    </form>
  );
}
