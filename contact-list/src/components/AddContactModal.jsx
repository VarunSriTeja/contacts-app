import React, { useState } from "react";

function AddContactModal({ onClose, addContact }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone) return alert("Name and phone are required!");

    const newContact = {
      id: Date.now(),
      name,
      phone,
      email,
      favorite: false,
    };

    addContact(newContact);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content add-modal">
        <h3>Add New Contact</h3>
        <form onSubmit={handleSubmit} className="add-form">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="add-btns">
            <button type="submit" className="add-btn">
              Add
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddContactModal;
