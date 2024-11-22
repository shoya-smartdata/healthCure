import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Protected from "./middleware/route/Protected";
import Admin from "./middleware/route/Admin"; // Protect Admin routes
import Doctor from "./middleware/route/Doctor"; // Protect Doctor routes
import React, { lazy, Suspense } from "react";
import Layout from "./components/Layout";
import Loading from "./components/Loading";
import { AuthProvider } from "./middleware/AuthContext";
import Doctordashboard from "./pages/Doctordashboard";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Appointments = lazy(() => import("./pages/Appointments"));
const Doctors = lazy(() => import("./pages/Doctors"));
const Profile = lazy(() => import("./pages/Profile"));
const Notifications = lazy(() => import("./pages/Notifications"));
const ApplyDoctor = lazy(() => import("./pages/ApplyDoctor"));
const Error = lazy(() => import("./pages/Error"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster />
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Layout-Based Routes */}
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/doctors" element={<Doctors />} />
              
              {/* Protected Routes */}
              <Route
                path="/appointments"
                element={
                  <Protected>
                    <Appointments />
                  </Protected>
                }
              />
              <Route
                path="/notifications"
                element={
                  <Protected>
                    <Notifications />
                  </Protected>
                }
              />
              <Route
                path="/applyfordoctor"
                element={
                  <Protected>
                    <ApplyDoctor />
                  </Protected>
                }
              />
              <Route
                path="/profile"
                element={
                  <Protected>
                    <Profile />
                  </Protected>
                }
              />
              {/* Admin Routes */}
              <Route
                path="/dashboard/admin"
                element={
                  <Admin>
                    <Dashboard />
                  </Admin>
                }
              />
              {/* Doctor Routes */}
              <Route
                path="/dashboard/doctor"
                element={
                  <Doctor>
                    <Doctordashboard />
                  </Doctor>
                }
              />
            </Route>

            {/* Fallback Route */}
            <Route path="*" element={<Error />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
