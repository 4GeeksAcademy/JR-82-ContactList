import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export const AddContacts = () => {
  const { id } = useParams();
  const { store, dispatch } = useGlobalReducer();
  const agendaSlug = "morbing";
  const navigate = useNavigate();

  // Find the contact in the store if editing, otherwise use empty fields
  const editingContact = id
    ? store.contacts.find((c) => String(c.id) === String(id))
    : null;

  const [contact, setContact] = useState(
    editingContact || { name: "", email: "", phone: "", address: "" }
  );

  useEffect(() => {
    if (editingContact) setContact(editingContact);
  }, [editingContact]);

  const AddTheContacts = async (e) => {
    e.preventDefault();

    const body = {
      name: contact.name, // <-- FIXED HERE
      email: contact.email,
      phone: contact.phone,
      address: contact.address,
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
          value={contact.name}
          onChange={(e) => setContact({ ...contact, name: e.target.value })}
        />
        <br />
        <label htmlFor="email">Email</label>
        <br />
        <input
          id="email"
          type="text"
          value={contact.email}
          onChange={(e) => setContact({ ...contact, email: e.target.value })}
        />
        <br />
        <label htmlFor="phone">Phone</label>
        <br />
        <input
          id="phone"
          type="text"
          value={contact.phone}
          onChange={(e) => setContact({ ...contact, phone: e.target.value })}
        />
        <br />
        <label htmlFor="address">Address</label>
        <br />
        <input
          id="address"
          type="text"
          value={contact.address}
          onChange={(e) => setContact({ ...contact, address: e.target.value })}
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
