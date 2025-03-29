import React, { useState } from "react";
import AuthForms from "./components/auth/auth-form";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {!isLoggedIn ? (
        <div className="w-full max-w-md">
          <AuthForms onLoginSuccess={() => setIsLoggedIn(true)} />
        </div>
      ) : (
        <div className="w-full max-w-6xl">User list</div>
      )}
    </main>
  );
};

export default App;
