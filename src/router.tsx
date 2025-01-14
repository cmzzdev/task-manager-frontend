import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import CreateProjectPage from "./pages/projects/CreateProjectPage";
import EditProjectPage from "./pages/projects/EditProjectPage";
import ProjectDetailPage from "./pages/projects/ProjectDetailPage";
import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./pages/auth/LoginPage";
import RegisterView from "./pages/auth/RegisterPage";
import ConfirmAccountPage from "./pages/auth/ConfirmAccountPage";
import RequestNewCodePage from "./pages/auth/RequestNewCodePage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import NewPasswordPage from "./pages/auth/NewPasswordPage";
import ProjectTeamPage from "./pages/projects/ProjectTeamPage";
import ProfilePage from "./pages/profile/ProfilePage";
import ChangePasswordPage from "./pages/profile/ChangePasswordPage";
import ProfileLayout from "./layouts/ProfileLayout";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Private Routes */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardPage />} index />
          <Route path="/projects/create" element={<CreateProjectPage />} />
          <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
          <Route
            path="/projects/:projectId/edit"
            element={<EditProjectPage />}
          />
          <Route
            path="/projects/:projectId/team"
            element={<ProjectTeamPage />}
          />
          <Route element={<ProfileLayout />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route
              path="/profile/change-password"
              element={<ChangePasswordPage />}
            />
          </Route>
        </Route>

        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterView />} />
          <Route
            path="/auth/confirm-account"
            element={<ConfirmAccountPage />}
          />
          <Route path="/auth/request-code" element={<RequestNewCodePage />} />
          <Route
            path="/auth/forgot-password"
            element={<ForgotPasswordPage />}
          />
          <Route path="/auth/new-password" element={<NewPasswordPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
