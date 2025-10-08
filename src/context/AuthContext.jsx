import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '', dob: '' });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('auth:user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (_) {
        localStorage.removeItem('auth:user');
      }
    }
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem('auth:user', JSON.stringify(user));
  }, [user]);

  const openAuthModal = (mode = 'login') => {
    setAuthMode(mode);
    setFormData({ name: '', email: '', password: '', confirmPassword: '', dob: '' });
    setShowPassword(false);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => setAuthModalOpen(false);

  const login = ({ email, password }) => {
    if (!email || !password) return;
    const existing = user && user.email === email ? user : { name: email.split('@')[0], email };
    setUser(existing);
    setAuthModalOpen(false);
  };

  const signup = ({ name, email, password, confirmPassword }) => {
    if (!name || !email || !password || password !== confirmPassword) return;
    setUser({ name, email });
    setAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth:user');
  };

  const updateProfile = (updates) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : prev));
  };

  const value = useMemo(
    () => ({ user, login, signup, logout, updateProfile, openAuthModal, closeAuthModal, authMode, setAuthMode, setShowPassword, showPassword, formData, setFormData, authModalOpen, setAuthModalOpen }),
    [user, authMode, showPassword, formData, authModalOpen]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
      {authModalOpen && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-backdrop-custom" onClick={closeAuthModal}></div>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content auth-modal">
              <div className="modal-header border-0">
                <div>
                  <h2 className="modal-title fs-3 fw-light">{authMode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
                  <p className="text-muted small mb-0">{authMode === 'login' ? 'Sign in to continue' : 'Join us to discover the finest saffron'}</p>
                </div>
                <button type="button" className="btn-close" onClick={closeAuthModal}></button>
              </div>

              <div className="modal-body">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  if (authMode === 'login') login({ email: formData.email, password: formData.password });
                  else signup({ name: formData.name, email: formData.email, password: formData.password, confirmPassword: formData.confirmPassword });
                }}>
                  {authMode === 'signup' && (
                    <div className="mb-3">
                      <label className="form-label">Full Name</label>
                      <input type="text" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="form-control" placeholder="John Doe" required={authMode === 'signup'} />
                    </div>
                  )}
                  <div className="mb-3">
                    <label className="form-label">Email Address</label>
                    <div className="input-group">
                      <span className="input-group-text bg-white">@</span>
                      <input type="email" name="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="form-control" placeholder="you@example.com" required />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <div className="input-group">
                      <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="form-control" placeholder="••••••••" required />
                      <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  </div>
                  {authMode === 'signup' && (
                    <div className="mb-3">
                      <label className="form-label">Confirm Password</label>
                      <input type={showPassword ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} className="form-control" placeholder="••••••••" required={authMode === 'signup'} />
                    </div>
                  )}
                  <button type="submit" className="btn btn-primary w-100 py-2 mb-3">{authMode === 'login' ? 'Sign In' : 'Create Account'}</button>
                </form>
                <div className="text-center mb-3">
                  <p className="small text-muted mb-0">
                    {authMode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                    <button onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')} className="btn btn-link p-0 text-decoration-none">{authMode === 'login' ? 'Sign Up' : 'Sign In'}</button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}


