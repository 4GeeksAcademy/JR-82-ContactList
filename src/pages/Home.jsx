import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React, { useState, useEffect } from "react";
import { Link, UNSAFE_FetchersContext } from "react-router-dom";
import ContactComponent from "../components/ContactComponent.jsx";




export const Home = () => {

     const { store, dispatch } = useGlobalReducer();
	   const agendaSlug = "morbing";
   
     const createAgenda = async() => {
try {
    const response = await fetch(
      `https://playground.4geeks.com/contact/agendas/${agendaSlug}`, {
        method: 'POST',
      body: JSON.stringify({ slug: "morbing" }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    dispatch({ type: "ADD_AGENDA", payload: data });
} catch (error) {
    console.error("Error creating agenda:", error);
}
}

const fetchContacts = async () => {
  try {
    const response = await fetch(`https://playground.4geeks.com/contact/agendas/${agendaSlug}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(`Error fetching contacts: ${data.message}`);
    }
    dispatch({ type: "set_contact", payload: data.contacts });
  } catch (error) {
    console.error("Error fetching contacts:", error);
  }
};
   
     useEffect(() => {

createAgenda();
fetchContacts();
}, []); 

	return (
		<div className="text-center mt-5">
    <ContactComponent />
    <Link to="/addcontacts">
      <button>Add Contact</button>
    </Link>
  </div>
	);
};
