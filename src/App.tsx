import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navigation from "./components/Navigation";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminLayout from "./components/admin/AdminLayout";
import HomePage from "./pages/HomePage";
import PropertiesPage from "./pages/PropertiesPage";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import LocationsPage from "./pages/LocationsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import MapPage from "./pages/MapPage";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddProperty from "./pages/admin/AddProperty";
import AllProperties from "./pages/admin/AllProperties";
import AdminSettings from "./pages/admin/AdminSettings";
import FloatingWhatsApp from "./components/ui/FloatingWhatsApp";

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <FloatingWhatsApp />
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <div className="min-h-screen bg-warm-white overflow-x-hidden">
                <Navigation />
                <HomePage />
              </div>
            }
          />
          <Route
            path="/propiedades"
            element={
              <div className="min-h-screen bg-warm-white overflow-x-hidden">
                <Navigation />
                <PropertiesPage />
              </div>
            }
          />
          <Route
            path="/propiedad/:id"
            element={
              <div className="min-h-screen bg-warm-white overflow-x-hidden">
                <Navigation />
                <PropertyDetailPage />
              </div>
            }
          />
          <Route
            path="/ubicaciones"
            element={
              <div className="min-h-screen bg-warm-white overflow-x-hidden">
                <Navigation />
                <LocationsPage />
              </div>
            }
          />
          <Route
            path="/mapa"
            element={
              <div className="min-h-screen bg-warm-white overflow-x-hidden">
                <Navigation />
                <MapPage />
              </div>
            }
          />
          <Route
            path="/nosotros"
            element={
              <div className="min-h-screen bg-warm-white overflow-x-hidden">
                <Navigation />
                <AboutPage />
              </div>
            }
          />
          <Route
            path="/contacto"
            element={
              <div className="min-h-screen bg-warm-white overflow-x-hidden">
                <Navigation />
                <ContactPage />
              </div>
            }
          />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="add-property" element={<AddProperty />} />
            <Route path="properties" element={<AllProperties />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
