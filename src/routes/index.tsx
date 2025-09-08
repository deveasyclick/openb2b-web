import { BrowserRouter, Route, Routes } from "react-router";
import DashboardLayout from "../layouts/dashboard";
import DashboardHome from "../pages/dashboard/Dashboard";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
