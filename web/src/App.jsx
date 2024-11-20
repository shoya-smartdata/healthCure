import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Protected from "./middleware/route/Protected";
import Public from "./middleware/route/Public";
import Admin from "./middleware/route/Admin";
import React, { lazy, Suspense } from "react";
import Layout from "./components/Layout"; // Import Layout
import Loading from "./components/Loading";
import { AuthProvider } from "./middleware/AuthContext";

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
    
    
    {/* Layout-Based Routes */}
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/doctors" element={<Doctors />} />
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
      <Route
        path="/dashboard/users"
        element={
          <Admin>
            <Dashboard type={"users"} />
          </Admin>
        }
      />
      <Route
        path="/dashboard/doctors"
        element={
          <Admin>
            <Dashboard type={"doctors"} />
          </Admin>
        }
      />
      <Route
        path="/dashboard/appointments"
        element={
          <Protected>
            <Dashboard type={"appointments"} />
          </Protected>
        }
      />
      <Route
        path="/dashboard/applications"
        element={
          <Protected>
            <Dashboard type={"applications"} />
          </Protected>
        }
      />

{/* login and register  */}
<Route path="/login" element={<Public><Login /></Public>} />
    <Route path="/register" element={<Public><Register /></Public>} />
  {/* Fallback Route */}
  <Route path="*" element={<Error />} />
    </Route>

  
  </Routes>
</Suspense>

    </Router>
    </AuthProvider>
  );
}

export default App;
