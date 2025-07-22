import React from "react";


export const Card = ({ fullName, email, phone, address }) => (
  <div className="card">
    <h2>FullName: {fullName}</h2>
    <p>Email: {email}</p>
    <p>Phone: {phone}</p>
    <p>Address: {address}</p>
  </div>
);