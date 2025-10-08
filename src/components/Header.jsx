import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, User, ShoppingBag, ShoppingCart, X } from 'lucide-react';
import '../App.css';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Header() {
  const navigate = useNavigate();
  const { count } = useCart();
  const { user, openAuthModal, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const userInitial = useMemo(() => (user?.name ? user.name.charAt(0).toUpperCase() : user?.email?.charAt(0)?.toUpperCase()), [user]);

  return (
    <>
      <nav className="navbar saffron-navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid px-4">
          <button className="btn text-white d-flex align-items-center menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            <Menu size={24} />
            <span className="ms-2 small text-uppercase">Menu</span>
          </button>

          <div className="navbar-brand position-absolute start-50 translate-middle-x">
            <Link to="/" className="text-white small text-uppercase letter-spacing text-decoration-none">Z PRINCESS SAFFRON</Link>
          </div>

          <div className="d-flex align-items-center gap-3">
            <Link to="/products" className="btn text-white p-0">
              <ShoppingBag size={20} />
            </Link>
            <Link to="/cart" className="btn text-white p-0 position-relative">
              <ShoppingCart size={20} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{count}</span>
            </Link>
            {!user ? (
              <button className="btn text-white p-0" onClick={() => openAuthModal('login')}>
                <User size={20} />
              </button>
            ) : (
              <div className="position-relative">
                <button className="btn btn-light rounded-circle fw-bold" onClick={() => setProfileOpen((v) => !v)} style={{ width: 32, height: 32, padding: 0 }}>
                  {userInitial}
                </button>
                {profileOpen && (
                  <ul className="dropdown-menu show" style={{ position: 'absolute', right: 0 }}>
                    <li><button className="dropdown-item" onClick={() => { setProfileOpen(false); navigate('/account'); }}>Account</button></li>
                    <li><button className="dropdown-item" onClick={() => { setProfileOpen(false); navigate('/track-order'); }}>Track Order</button></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><button className="dropdown-item text-danger" onClick={() => { setProfileOpen(false); logout(); }}>Logout</button></li>
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className={`side-menu ${menuOpen ? 'open' : ''}`}>
        <div className="p-4">
          <button className="btn btn-link text-dark mb-4" onClick={() => setMenuOpen(false)}>
            <X size={24} /> Close
          </button>
          <ul className="list-unstyled">
            <li className="mb-3"><Link to="/" className="text-decoration-none text-dark fs-5">Home</Link></li>
            <li className="mb-3"><Link to="/products" className="text-decoration-none text-dark fs-5">Products</Link></li>
            <li className="mb-3"><Link to="/contactus" className="text-decoration-none text-dark fs-5">Contact</Link></li>
          </ul>
        </div>
      </div>
      {menuOpen && <div className="menu-overlay" onClick={() => setMenuOpen(false)}></div>}
    </>
  );
}

