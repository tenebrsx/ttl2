import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Lock, User, Eye, EyeOff, AlertCircle, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getSecurityReport } from '../../lib/auth';

const AdminLogin = () => {
  const { user, signIn } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSecurityReport, setShowSecurityReport] = useState(false);

  // Redirect if already logged in
  if (user) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signIn(username, password);

    if (!result.success) {
      setError(result.error || 'Credenciales inválidas. Por favor, verifica tu usuario y contraseña.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream to-warm-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-deep-copper rounded-full flex items-center justify-center">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <h2 className="mt-6 font-playfair text-3xl font-bold text-soft-charcoal">
            Panel de Administración
          </h2>
          <p className="mt-2 text-dusty-clay">
            Sistema de autenticación seguro
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-center">
                <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                <span className="text-red-700 text-sm">{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-soft-charcoal mb-2">
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
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-dusty-clay rounded-md focus:outline-none focus:ring-2 focus:ring-deep-copper focus:border-deep-copper transition-colors duration-300"
                  placeholder="admin"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-soft-charcoal mb-2">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-dusty-clay" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 border border-dusty-clay rounded-md focus:outline-none focus:ring-2 focus:ring-deep-copper focus:border-deep-copper transition-colors duration-300"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-dusty-clay hover:text-deep-copper transition-colors duration-300" />
                  ) : (
                    <Eye className="h-5 w-5 text-dusty-clay hover:text-deep-copper transition-colors duration-300" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-deep-copper hover:bg-accent-clay focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-deep-copper transition-colors duration-300 ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Iniciando sesión...
                  </>
                ) : (
                  'Iniciar sesión'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-dusty-clay mb-4">
              Sistema seguro con autenticación local
            </p>
            
            <button
              onClick={() => setShowSecurityReport(!showSecurityReport)}
              className="text-xs text-deep-copper hover:underline flex items-center justify-center mx-auto"
            >
              <Shield size={12} className="mr-1" />
              {showSecurityReport ? 'Ocultar' : 'Ver'} reporte de seguridad
            </button>
            
            {showSecurityReport && (
              <div className="mt-4 p-4 bg-cream rounded-lg text-left">
                <h4 className="font-bold text-soft-charcoal text-sm mb-2">Reporte de Seguridad</h4>
                {(() => {
                  const report = getSecurityReport();
                  return (
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className={`flex items-center ${report.passwordComplexity ? 'text-green-600' : 'text-red-600'}`}>
                          <div className={`w-2 h-2 rounded-full mr-2 ${report.passwordComplexity ? 'bg-green-500' : 'bg-red-500'}`}></div>
                          Complejidad de contraseña
                        </div>
                        <div className={`flex items-center ${report.loginAttemptLimits ? 'text-green-600' : 'text-red-600'}`}>
                          <div className={`w-2 h-2 rounded-full mr-2 ${report.loginAttemptLimits ? 'bg-green-500' : 'bg-red-500'}`}></div>
                          Límites de intentos
                        </div>
                        <div className={`flex items-center ${report.sessionTimeout ? 'text-green-600' : 'text-red-600'}`}>
                          <div className={`w-2 h-2 rounded-full mr-2 ${report.sessionTimeout ? 'bg-green-500' : 'bg-red-500'}`}></div>
                          Timeout de sesión
                        </div>
                        <div className={`flex items-center ${report.httpsRequired ? 'text-green-600' : 'text-orange-600'}`}>
                          <div className={`w-2 h-2 rounded-full mr-2 ${report.httpsRequired ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                          HTTPS/SSL
                        </div>
                      </div>
                      {report.recommendations.length > 0 && (
                        <div className="mt-3 pt-2 border-t border-dusty-clay/20">
                          <p className="text-xs font-medium text-soft-charcoal mb-1">Recomendaciones:</p>
                          <ul className="text-xs text-dusty-clay space-y-1">
                            {report.recommendations.slice(0, 3).map((rec, index) => (
                              <li key={index} className="flex items-start">
                                <span className="mr-1">•</span>
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4">
            <h3 className="font-bold text-soft-charcoal text-sm mb-2">Credenciales de Desarrollo</h3>
            <div className="text-xs text-dusty-clay space-y-1">
              <p><strong>Usuario:</strong> admin</p>
              <p><strong>Contraseña:</strong> admin123</p>
              <p className="text-orange-600 mt-2">⚠️ Solo para desarrollo/testing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;