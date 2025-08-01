import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const ContactComponent = () => {
  const { store, dispatch } = useGlobalReducer();
  const agendaSlug = "morbing";

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch(
          `https://playground.4geeks.com/contact/agendas/${agendaSlug}`
        );
        const data = await response.json();
        // Defensive: always set an array
        dispatch({
          type: "set_contact",
          payload: Array.isArray(data.contacts) ? data.contacts : [],
        });
      } catch (error) {
        console.error("Error fetching contacts:", error);
        dispatch({ type: "set_contact", payload: [] });
      }
    };
    fetchContacts();
  }, [dispatch]);

  if (!Array.isArray(store.contacts)) {
    return <div>Loading contacts...</div>;
  }

  if (store.contacts.length === 0) {
    return <div>No contacts found.</div>;
  }

  return (
    <div>
      {store.contacts.map((contact, idx) => (
        <div
          key={`${contact.id || contact.email || idx}`}
          style={{ border: "1px solid #ccc", margin: 8, padding: 8 }}
        >
          <strong>{contact.full_name}</strong>
          <div>Email: {contact.email}</div>
          <div>Phone: {contact.phone}</div>
          <div>Address: {contact.address}</div>
        </div>
      ))}
    </div>
  );
};

export default ContactComponent;