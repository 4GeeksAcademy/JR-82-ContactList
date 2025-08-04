import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const AddContacts = () => {
  const { store, dispatch } = useGlobalReducer();
  const { theId } = useParams();
  const navigate = useNavigate();

  // Find the contact in the store if editing, otherwise use empty fields
  const editingContact = store.contacts?.find((c) => String(c.id) === String(theId));
  const [form, setForm] = useState(
    editingContact || { name: "", email: "", phone: "", address: "" }
  );

  // If editing, update form state when store changes
  useEffect(() => {
    if (editingContact) setForm(editingContact);
  }, [editingContact]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (theId) {
      // EDIT: PUT request
      const response = await fetch(
        `https://playground.4geeks.com/contact/agendas/morbing/contacts/${theId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      if (response.ok) {
        const updated = await response.json();
        dispatch({ type: "edit_contact", payload: updated });
        navigate("/");
      } else {
        alert("Failed to update contact");
      }
    } else {
      // CREATE: POST request
      const response = await fetch(
        `https://playground.4geeks.com/contact/agendas/morbing/contacts`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, agenda_slug: "morbing" }),
        }
      );
      if (response.ok) {
        const created = await response.json();
        dispatch({ type: "add_contact", payload: created });
        navigate("/");
      } else {
        alert("Failed to create contact");
      }
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} >
        <h2>{theId ? "Edit Contact" : "Add Contact"}</h2>
        <input
          name="name"
          value={form.name}
        onChange={handleChange}
        placeholder="Full Name"
        style={{ width: `${Math.max(30, form.name.length)}ch` }}
        required
      />
      <br />
      <br />
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        style={{ width: `${Math.max(30, form.email.length)}ch` }}
        required
      />
      <br />
      <br />
      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Phone"
        style={{ width: `${Math.max(30, form.phone.length)}ch` }}
        required
      />
      <br />
      <br />
      <input
        name="address"
        value={form.address}
        onChange={handleChange}
        placeholder="Address"
        style={{ width: `${Math.max(30, form.address.length)}ch` }}
        required
      />
      <br />
      <br />
      <button type="submit">{theId ? "Update" : "Create"}</button>
      <Link to="/">
        <button id="back-button" type="button">Back to Contact List</button>
      </Link>
    </form>
    </div>
  );
};
