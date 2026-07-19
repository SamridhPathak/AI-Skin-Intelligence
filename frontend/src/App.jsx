import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Landing from "./pages/Landing/Landing";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import CreateProfile from "./pages/CreateProfile/CreateProfile";
import Unauthorized from "./pages/Unauthorized";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
// ConsultantDashboard / DermatologistDashboard land here once built —
// same pattern as AdminDashboard below.

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Authenticated — any role */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-profile"
            element={
              <ProtectedRoute roles={["user"]}>
                <CreateProfile />
              </ProtectedRoute>
            }
          />

          {/* Role-gated dashboards */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          {/*
          <Route path="/consultant" element={
            <ProtectedRoute roles={["consultant"]}><ConsultantDashboard /></ProtectedRoute>
          } />
          <Route path="/dermatologist" element={
            <ProtectedRoute roles={["dermatologist"]}><DermatologistDashboard /></ProtectedRoute>
          } />
          */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
