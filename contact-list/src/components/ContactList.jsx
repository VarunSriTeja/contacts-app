import React from "react";
import { FaUserCircle, FaStar } from "react-icons/fa";

function ContactList({ contacts, deleteContact, onSelect, query = "" }) {
  const favorites = contacts
    .filter((c) => c.favorite)
    .sort((a, b) => a.name.localeCompare(b.name));

  const all = [...contacts].sort((a, b) => a.name.localeCompare(b.name));

  // ✨ Highlight matched letters
  const highlightText = (text) => {
    if (!query) return text;
    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const start = lowerText.indexOf(lowerQuery);

    if (start === -1) return text;

    const before = text.substring(0, start);
    const match = text.substring(start, start + query.length);
    const after = text.substring(start + query.length);

    return (
      <>
        {before}
        <mark className="highlight">{match}</mark>
        {after}
      </>
    );
  };

  const renderSection = (title, list, showFavIcon = false) => (
    <>
      {list.length > 0 && <h4 className="section-title">{title}</h4>}
      {list.map((contact) => (
        <div
          key={contact.id}
          className="contact-card"
          onClick={() => onSelect(contact)}
        >
          <div className="contact-info">
            <FaUserCircle className="contact-icon" />
            <h3>
              {highlightText(contact.name)}
              {showFavIcon && contact.favorite && (
                <FaStar className="fav-star" />
              )}
            </h3>
          </div>
          <p className="contact-number">{highlightText(contact.phone)}</p>
        
        </div>
      ))}
    </>
  );

  return (
    <div className="contact-list">
      {all.length === 0 ? (
        <div className="no-contacts"><p>No contacts yet.</p></div>
      ) : (
        <>
          {renderSection("⭐ Favorites", favorites)}
          {renderSection("All Contacts", all, true)}
        </>
      )}
    </div>
  );
}

export default ContactList;
