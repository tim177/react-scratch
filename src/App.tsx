import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthForms from "./components/auth/auth-form";
import UsersList from "./components/users/users-list";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Routes>
        {/* If authenticated, redirect to Dashboard, otherwise show AuthForms */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <AuthForms />
            )
          }
        />

        {/* Dashboard Route (Protected) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UsersList />
            </ProtectedRoute>
          }
        />

        {/* Catch-all Route - Redirect to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  );
};

export default App;
