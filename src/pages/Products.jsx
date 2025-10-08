import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

const products = [
  {
    id: 'kashmir-2g',
    title: 'Indian Kashmiri Saffron',
    weight: '2g',
    price: 1400,
    image: '/saffron-1-Bd_ddMn1.jpg',
  },
  {
    id: 'kashmir-5g',
    title: 'Indian Kashmiri Saffron',
    weight: '5g',
    price: 3400,
    image: '/saffron-3-CQjVsn3U.jpg',
  },
  {
    id: 'spain-2g',
    title: 'Spain Saffron',
    weight: '2g',
    price: 1600,
    image: '/saffron-1-Bd_ddMn1.jpg',
  },
  {
    id: 'spain-5g',
    title: 'Spain Saffron',
    weight: '5g',
    price: 3600,
    image: '/saffron-3-CQjVsn3U.jpg',
  },
];

export default function Products() {
  const navigate = useNavigate();
  const { addItem } = useCart();
  return (
    <div className="container py-5">
      <h1 className="mb-4">Our Products</h1>
      <div className="row g-4">
        {products.map((p) => (
          <div className="col-12 col-sm-6 col-lg-3" key={p.id}>
            <div className="card h-100 shadow-sm">
              <img src={p.image} className="card-img-top" alt={p.title} />
              <div className="card-body">
                <h3 className="h6 mb-2">{p.title}</h3>
                <p className="mb-1">Price: ₹{p.price}</p>
                <h4 className="h6 text-muted">Weight: {p.weight}</h4>
                <div className="d-grid gap-2 mt-2">
                  <button className="btn btn-outline-dark" onClick={() => addItem(p)}>Add to Cart</button>
                  <button className="btn btn-dark" onClick={() => { addItem({ ...p, quantity: 1 }); navigate('/cart'); }}>Buy Now</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


