# 🚀 React Admin Dashboard

A modern, responsive admin dashboard application built with **React** and **TypeScript** using **React Router** for routing, **Context API** for authentication, and a clean UI with **TailwindCSS**.

## 🧑‍💻 Features

- 🔐 **Authentication**: Secure login and protected routes.
- 📄 **User Management**: View and manage user data.
- 🚀 **State Management**: Context API for global state.
- 🛡️ **Protected Routes**: Restrict access to authenticated users.
- 💅 **Responsive Design**: Mobile-friendly UI using TailwindCSS.

## 🛠️ Tech Stack

- **React** with TypeScript
- **React Router** for Navigation
- **Context API** for State Management
- **TailwindCSS** for Styling
- **Vercel** for Deployment

## 📦 Folder Structure

```bash
src
├── components
│   ├── auth
│   │   ├── AuthForm.tsx
│   │   └── LoginForm.tsx
│   ├── users
│   │   └── UsersList.tsx
│   ├── ProtectedRoute.tsx
├── context
│   └── AuthContext.tsx
├── lib
│   ├── api.ts
│   └── hooks
│       └── use-user.ts
├── App.tsx
├── index.tsx
└── index.css
```

## 🚀 Installation & Setup

1. **Clone the Repository**

```bash
git clone https://github.com/tim177/react-scratch.git
cd admin-dashboard
```

2. **Install Dependencies**

```bash
npm install
# or
pnpm install
```

3. **Run the App**

```bash
npm run dev
```

4. **Build the App** (For Production)

```bash
npm run build
```

5. **Deploy on Vercel**

```bash
vercel
```

Make sure to configure Vercel settings to use the correct output directory (`dist`).

## 🧑‍💼 Authentication

- The `AuthContext` manages authentication state.
- Protected routes are implemented using a `ProtectedRoute` component.

## 🛎️ Contributing

Contributions are welcome! Feel free to open issues or create pull requests.

## 📝 License

This project is licensed under the [MIT License](LICENSE).

---

Happy coding! 🚀
