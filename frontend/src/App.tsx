// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPasswordPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/ProfilePage";
import Dashboard from "./pages/DashoardPage";
import MyNotes from "./pages/NotesPage";
import AboutProject from "./pages/AboutPage";
import CreateNotePage from "./pages/CreateNotePage";
import NoteDetailsPage from "./pages/NoteDetailPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-notes"
            element={
              <ProtectedRoute>
                <MyNotes />
              </ProtectedRoute>
            }
          />

          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <AboutProject />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
  path="/create-note"
  element={
    <ProtectedRoute>
      <CreateNotePage />
    </ProtectedRoute>
  }
/>
  <Route path="/note/:id" element={<NoteDetailsPage />} />

        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
