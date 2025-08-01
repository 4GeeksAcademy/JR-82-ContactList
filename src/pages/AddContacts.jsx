import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

export const AddContacts = () => {
  const { store, dispatch } = useGlobalReducer();
  const agendaSlug = "morbing";
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const AddTheContacts = async (e) => {
    e.preventDefault();

    const body = {
      name: fullName, // <-- FIXED HERE
      email: email,
      phone: phone,
      address: address,
      agenda_slug: agendaSlug,
    };

    const response = await fetch(
      `https://playground.4geeks.com/contact/agendas/${agendaSlug}/contacts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    let data = {};
    try {
      data = await response.json();
    } catch (err) {
      data = { message: "No JSON response" };
    }
    console.log("Response status:", response.status, "Response data:", data);
    if (data.detail) {
      alert("API error: " + JSON.stringify(data.detail));
    }

    if (response.ok) {
      navigate("/");
    } else {
      alert("Failed to add contact. " + (data.message || "Please check your input."));
    }
  };

  return (
    <form onSubmit={AddTheContacts}>
      <div>
        <label htmlFor="fullName">Full Name</label>
        <br />
        <input
          id="fullName"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <br />
        <label htmlFor="email">Email</label>
        <br />
        <input
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="phone">Phone</label>
        <br />
        <input
          id="phone"
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <br />
        <label htmlFor="address">Address</label>
        <br />
        <input
          id="address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <br />
        <button type="submit">Add Contact</button>
        <br />
        <Link to="/">
          <button type="button">Back to Contact List</button>
        </Link>
      </div>
    </form>
  );
};