import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Lock, User } from "lucide-react";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Simple local authentication
      if (username === "admin" && password === "admin123") {
        // Set authentication in localStorage
        localStorage.setItem("adminAuthenticated", "true");
        localStorage.setItem("adminLoginTime", Date.now().toString());

        // Navigate to admin dashboard
        navigate("/admin/dashboard");
      } else {
        setError("Usuario o contraseña incorrectos");
      }
    } catch {
      setError("Error al iniciar sesión. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-warm-white to-dusty-clay/10 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-deep-copper rounded-full flex items-center justify-center">
            <Lock className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold font-playfair text-soft-charcoal">
            Panel de Administración
          </h2>
          <p className="mt-2 text-sm text-dusty-clay">
            Inicia sesión para acceder al panel
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            {error && (
              <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-md">
                <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                <span className="text-sm text-red-700">{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="username" className="sr-only">
                Usuario
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-dusty-clay" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3 py-3 pl-10 border border-dusty-clay/20 placeholder-dusty-clay text-soft-charcoal focus:outline-none focus:ring-2 focus:ring-deep-copper focus:border-deep-copper focus:z-10 sm:text-sm"
                  placeholder="Usuario"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-dusty-clay" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3 py-3 pl-10 border border-dusty-clay/20 placeholder-dusty-clay text-soft-charcoal focus:outline-none focus:ring-2 focus:ring-deep-copper focus:border-deep-copper focus:z-10 sm:text-sm"
                  placeholder="Contraseña"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-deep-copper hover:bg-deep-copper/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-deep-copper transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Iniciando sesión...
                </div>
              ) : (
                "Iniciar Sesión"
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-xs text-dusty-clay">
              Usuario: admin | Contraseña: admin123
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
