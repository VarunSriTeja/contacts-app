import React, { useState } from "react";

function AddContactForm({ addContact }) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name.trim() || !phone.trim()) {
            alert("Name and phone are required!");
            return;
        }

        const newContact = {
            id: Date.now(),
            name,
            phone,
            email,
        };

        addContact(newContact);

        setName("");
        setPhone("");
        setEmail("");
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Email (optional)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Add Contact</button>
        </form>
    );
}

export default AddContactForm;
