import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import TermsAndConditions from './pages/TermsAndConditions.jsx';
import RefundPolicy from './pages/RefundPolicy.jsx';
import ShippingPolicy from './pages/ShippingPolicy.jsx';
import FAQ from './pages/FAQ.jsx';
import CorporateEssentials from './pages/CorporateEssentials.jsx';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import Products from './pages/Products.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import Account from './pages/Account.jsx';
import TrackOrder from './pages/TrackOrder.jsx';

export default function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/contactus" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-condition" element={<TermsAndConditions />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/corporate-essentials" element={<CorporateEssentials />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/account" element={<Account />} />
          <Route path="/track-order" element={<TrackOrder />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}