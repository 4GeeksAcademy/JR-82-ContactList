import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

const ContactComponent = () => {
  const { store, dispatch } = useGlobalReducer();
  const agendaSlug = "morbing";

  // Move RemoveContacts here
  const RemoveContacts = async (contact) => {
    try {
      const response = await fetch(
        `https://playground.4geeks.com/contact/agendas/${agendaSlug}/contacts/${contact.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Error deleting contact: ${response.statusText}`);
      }
      dispatch({ type: "delete_contact", payload: contact });
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const EditContact = (contact) => {
   fetch(
      `https://playground.4geeks.com/contact/agendas/${agendaSlug}/contacts/${contact.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error updating contact: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        dispatch({ type: "edit_contact", payload: data });
      })
      .catch((error) => {
        console.error("Error updating contact:", error);
      });
  };

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch(
          `https://playground.4geeks.com/contact/agendas/${agendaSlug}`
        );
        const data = await response.json();
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
    <div id="contact-component">
      {store.contacts.map((contact, idx) => (
        <div
          key={`${contact.id || contact.email || idx}`}
          style={{ border: "1px solid #ccc", margin: 8, padding: 8 }}
        >
          <strong>Full name: {contact.name}</strong>
          <div>Email: {contact.email}</div>
          <div>Phone: {contact.phone}</div>
          <div>Address: {contact.address}</div>
         <Link to={`/addcontacts/${contact.id}`}>
         <button>
            Edit
          </button>
          </Link>
          <button onClick={() => RemoveContacts(contact)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ContactComponent;