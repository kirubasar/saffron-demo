import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Account() {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', dob: user?.dob || '' });

  if (!user) {
    return (
      <div className="container py-5">
        <h1 className="mb-3">Account</h1>
        <p>Please sign in to view your account.</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">My Account</h1>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Basic Settings</h5>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input className="form-control" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input className="form-control" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div className="mb-3">
                <label className="form-label">Date of Birth</label>
                <input type="date" className="form-control" value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} />
              </div>
              <button className="btn btn-dark" onClick={() => updateProfile(form)}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


