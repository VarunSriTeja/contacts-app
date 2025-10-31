import React, { useState } from "react";

function AddContactScreen({ addContact, setCurrentView }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return alert("Name and phone required!");

    const newContact = {
      id: Date.now(),
      name,
      phone,
      email,
    };

    addContact(newContact);
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <input type="email" placeholder="Email (optional)" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button type="submit">Add Contact</button>
    </form>
  );
}

export default AddContactScreen;
