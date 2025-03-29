"use client";

import React, { useState } from "react";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";

interface AuthFormsProps {
  onLoginSuccess: () => void;
}

export default function AuthForms({ onLoginSuccess }: AuthFormsProps) {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
      <div className="p-6 space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Sign in to your account or create a new one
          </p>
        </div>

        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            className={`flex-1 py-3 font-medium text-sm ${
              activeTab === "login"
                ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`flex-1 py-3 font-medium text-sm ${
              activeTab === "register"
                ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("register")}
          >
            Register
          </button>
        </div>

        <div className="pt-4">
          {activeTab === "login" ? (
            <LoginForm onSuccess={onLoginSuccess} />
          ) : (
            <RegisterForm onSuccess={() => setActiveTab("login")} />
          )}
        </div>
      </div>
    </div>
  );
}
