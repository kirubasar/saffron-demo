import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';

export default function Checkout() {
  const navigate = useNavigate();
  const { user, openAuthModal } = useAuth();
  const { items, total, clear } = useCart();
  const [form, setForm] = useState({ name: user?.name || '', phone: '', address: '' });
  const [status, setStatus] = useState('unpaid');

  const isLoggedIn = !!user;
  const isCartEmpty = items.length === 0;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!isLoggedIn) return openAuthModal('login');
    setStatus('paid');
    clear();
  };

  if (!isLoggedIn) {
    return (
      <div className="container py-5">
        <h1 className="mb-3">Checkout</h1>
        <p className="mb-3">You must be logged in to proceed to checkout.</p>
        <button className="btn btn-dark" onClick={() => openAuthModal('login')}>Sign in to continue</button>
      </div>
    );
  }

  if (status === 'paid') {
    return (
      <div className="container py-5">
        <h1 className="mb-3">Order placed</h1>
        <p>Your payment status is <span className="badge bg-success">Paid</span>. Thank you for your order!</p>
        <button className="btn btn-outline-dark" onClick={() => navigate('/track-order')}>Track Order</button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">Checkout</h1>
      {isCartEmpty ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="row g-4">
          <div className="col-md-7">
            <form onSubmit={handlePlaceOrder}>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input className="form-control" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input className="form-control" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Address</label>
                <textarea className="form-control" rows="4" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} required />
              </div>
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-dark">Pay & Place Order</button>
                <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/cart')}>Back to Cart</button>
              </div>
            </form>
          </div>
          <div className="col-md-5">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Order Summary</h5>
                <ul className="list-group list-group-flush mb-3">
                  {items.map((i) => (
                    <li key={i.id} className="list-group-item d-flex justify-content-between">
                      <span>{i.title} × {i.quantity}</span>
                      <span>₹{i.price * i.quantity}</span>
                    </li>
                  ))}
                </ul>
                <div className="d-flex justify-content-between">
                  <strong>Total</strong>
                  <strong>₹{total}</strong>
                </div>
                <div className="mt-3 alert alert-secondary">Payment placeholder: clicking "Pay & Place Order" marks as paid.</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


