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
import AdminUsers from "./pages/Dashboard/admin/AdminUsers";
import AdminAnalytics from "./pages/Dashboard/admin/AdminAnalytics";
import AdminRecommendations from "./pages/Dashboard/admin/AdminRecommendations";
import AdminReports from "./pages/Dashboard/admin/AdminReports";

import ConsultantDashboard from "./pages/Dashboard/ConsultantDashboard";
import ConsultantClients from "./pages/Dashboard/consultant/ConsultantClients";
import ConsultantAssessments from "./pages/Dashboard/consultant/ConsultantAssessments";
import ConsultantRecommendations from "./pages/Dashboard/consultant/ConsultantRecommendations";

import DermatologistDashboard from "./pages/Dashboard/DermatologistDashboard";
import DermatologistPatients from "./pages/Dashboard/dermatologist/DermatologistPatients";
import DermatologistConditionReports from "./pages/Dashboard/dermatologist/DermatologistConditionReports";
import DermatologistTreatmentNotes from "./pages/Dashboard/dermatologist/DermatologistTreatmentNotes";

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
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/create-profile" element={<ProtectedRoute roles={["user"]}><CreateProfile /></ProtectedRoute>} />

          {/* Admin */}
          <Route path="/admin" element={<ProtectedRoute roles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute roles={["admin"]}><AdminUsers /></ProtectedRoute>} />
          <Route path="/admin/analytics" element={<ProtectedRoute roles={["admin"]}><AdminAnalytics /></ProtectedRoute>} />
          <Route path="/admin/recommendations" element={<ProtectedRoute roles={["admin"]}><AdminRecommendations /></ProtectedRoute>} />
          <Route path="/admin/reports" element={<ProtectedRoute roles={["admin"]}><AdminReports /></ProtectedRoute>} />

          {/* Consultant */}
          <Route path="/consultant" element={<ProtectedRoute roles={["consultant"]}><ConsultantDashboard /></ProtectedRoute>} />
          <Route path="/consultant/clients" element={<ProtectedRoute roles={["consultant"]}><ConsultantClients /></ProtectedRoute>} />
          <Route path="/consultant/assessments" element={<ProtectedRoute roles={["consultant"]}><ConsultantAssessments /></ProtectedRoute>} />
          <Route path="/consultant/recommendations" element={<ProtectedRoute roles={["consultant"]}><ConsultantRecommendations /></ProtectedRoute>} />

          {/* Dermatologist */}
          <Route path="/dermatologist" element={<ProtectedRoute roles={["dermatologist"]}><DermatologistDashboard /></ProtectedRoute>} />
          <Route path="/dermatologist/patients" element={<ProtectedRoute roles={["dermatologist"]}><DermatologistPatients /></ProtectedRoute>} />
          <Route path="/dermatologist/reports" element={<ProtectedRoute roles={["dermatologist"]}><DermatologistConditionReports /></ProtectedRoute>} />
          <Route path="/dermatologist/notes" element={<ProtectedRoute roles={["dermatologist"]}><DermatologistTreatmentNotes /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
