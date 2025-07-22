import useGlobalReducer from "../hooks/useGlobalReducer"
import { Link } from "react-router-dom";
import React, {useState} from "react";



export const AddContacts = () => {
  
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const {store, dispatch} = useGlobalReducer() 

return (
    <form action="">
<div >
<label htmlFor="fullName">Full Name</label>
<br />
<input id="fullName" type="text" />
<br />
<label htmlFor="">Email</label>
<br />
<input type="text" />
<br />
<label htmlFor="">Phone</label>
<br />
<input type="text" />
<br />
<label htmlFor="">Address</label>
<br />
<input type="text" />
<br />
<button onClick={() => {
    dispatch({
        type: 'add_contact',
        payload: {
            fullName,
            email,
            phone,
            address
        }
    });
    setFullName("");
    setEmail("");
    setPhone("");
    setAddress("");
}}>Add Contact</button> 
<br />
<Link to="/">
  <button>Back to Contact List</button>
</Link>
</div>
</form>
);

}