import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

export default function Cart() {
  const { items, removeItem, clear, total, increment, decrement } = useCart();
  return (
    <div className="container py-5">
      <h1 className="mb-4">Your Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {items.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <div className="fw-semibold">{item.title} — {item.weight}</div>
                  <small className="text-muted">₹{item.price} × {item.quantity}</small>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <button className="btn btn-sm btn-outline-secondary" onClick={() => decrement(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button className="btn btn-sm btn-outline-secondary" onClick={() => increment(item.id)}>+</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => removeItem(item.id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="d-flex justify-content-between align-items-center">
            <div className="fw-bold">Total: ₹{total}</div>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-secondary" onClick={clear}>Clear</button>
              <Link className="btn btn-dark" to="/checkout">Checkout</Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}


