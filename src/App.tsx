
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import HomePage from './pages/HomePage';
import PropertiesPage from './pages/PropertiesPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import LocationsPage from './pages/LocationsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import MapPage from './pages/MapPage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AddProperty from './pages/admin/AddProperty';
import AllProperties from './pages/admin/AllProperties';
import AdminSettings from './pages/admin/AdminSettings';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <div className="min-h-screen bg-warm-white">
              <Navigation />
              <HomePage />
            </div>
          } />
          <Route path="/propiedades" element={
            <div className="min-h-screen bg-warm-white">
              <Navigation />
              <PropertiesPage />
            </div>
          } />
          <Route path="/propiedad/:id" element={
            <div className="min-h-screen bg-warm-white">
              <Navigation />
              <PropertyDetailPage />
            </div>
          } />
          <Route path="/ubicaciones" element={
            <div className="min-h-screen bg-warm-white">
              <Navigation />
              <LocationsPage />
            </div>
          } />
          <Route path="/mapa" element={
            <div className="min-h-screen bg-warm-white">
              <Navigation />
              <MapPage />
            </div>
          } />
          <Route path="/nosotros" element={
            <div className="min-h-screen bg-warm-white">
              <Navigation />
              <AboutPage />
            </div>
          } />
          <Route path="/contacto" element={
            <div className="min-h-screen bg-warm-white">
              <Navigation />
              <ContactPage />
            </div>
          } />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
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