import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "../components/Card.jsx";



export const Home = () => {

	   let [userName, setUserName] = useState(`morbing`)
   
   
   useEffect(() => {

}, []); 


  const {store, dispatch} = useGlobalReducer()

	return (
		<div className="text-center mt-5">
	{Card && store.contacts.map((todo) => (
            <Card key={todo.id} todo={todo} />
		)) }
    <Link to="/addcontacts">
        <button>Add Contact</button>
    </Link>
        </div>
	);
};