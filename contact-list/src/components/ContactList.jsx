import React, { useState } from "react";
import ContactCard from "./ContactCard";

function ContactList({ contacts, deleteContact }) {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (contacts.length === 0) {
    return (
      <div className="no-contacts">
        <p>No contacts yet.</p>
      </div>
    );
  }

  return (
    <div className="contact-list">
      {contacts.map((contact) => (
        <ContactCard
          key={contact.id}
          contact={contact}
          expanded={expandedId === contact.id}
          onToggle={() => toggleExpand(contact.id)}
          deleteContact={deleteContact}
        />
      ))}
    </div>
  );
}


export default ContactList;
