import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React, { useState, useEffect } from "react";
import { Link, UNSAFE_FetchersContext } from "react-router-dom";




export const Home = () => {

     const { store, dispatch } = useGlobalReducer();
	   const agendaSlug = "morbing";
   
   
   useEffect(() => {
const fetchContacts = async () => {
  try {
    const response = await fetch(`https://playground.4geeks.com/contacts/agendas/${agendaSlug}/contacts/`);
    const data = await response.json();
    dispatch({ type: "set_contact", payload: data.contacts });
  } catch (error) {
    console.error("Error fetching contacts:", error);
  }
};
createAgenda();
fetchContacts();
}, []); 


const createAgenda = async() => {
try {
    const response = await fetch(
      `https://playground.4geeks.com/contacts/agendas/${agendaSlug}`, {
        method: 'POST',
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
	return (
		<div className="text-center mt-5">
	{store.contacts.map((contacts) => (
            <Card key={contacts.id} todo={contacts} />
		)) }
    <Link to="/addcontacts">
        <button>Add Contact</button>
    </Link>
        </div>
	);
};
