import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import CreateProjectPage from "./pages/projects/CreateProjectPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardPage />} index />
          <Route
            path="/projects/create"
            element={<CreateProjectPage />}
            index
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
