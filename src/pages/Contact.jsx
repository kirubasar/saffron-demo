import React from 'react';

export default function Contact() {
  return (
    <div className="container py-5">
      <div className="row g-5">
        <div className="col-md-5">
          <h1 className="mb-4">ASK US A QUESTION</h1>
          <button className="btn btn-dark mb-4">CONTACT US</button>
          <h1 className="h2 mt-4">CONTACT DETAILS</h1>
          <p>Our office hours are Monday to Saturday 9 AM to 6 PM.</p>
          <p>Chennai, India</p>
          <p>+91 72001 50588</p>
          <p>zprincessaffron07@gmail.com</p>
        </div>
        <div className="col-md-7">
          <h2 className="mb-3">Need Help ? We're Here</h2>
          <form className="row g-3">
            <div className="col-12">
              <label className="form-label">Name</label>
              <input type="text" className="form-control" placeholder="Your name" />
            </div>
            <div className="col-12">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" placeholder="you@example.com" />
            </div>
            <div className="col-12">
              <label className="form-label">Message</label>
              <textarea className="form-control" rows="5" placeholder="Your message"></textarea>
            </div>
            <div className="col-12">
              <button type="button" className="btn btn-dark">SUBMIT</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


