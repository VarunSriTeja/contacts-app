import React, { useRef } from "react";
import { FaUserCircle, FaStar } from "react-icons/fa";

function ContactList({ contacts, deleteContact, onSelect, query = "" }) {
  const listRef = useRef(null);

  // Sort all contacts alphabetically (everyone included)
  const sortedContacts = [...contacts].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  // Separate favorites (but keep them also in main list)
  const favorites = sortedContacts.filter((c) => c.favorite);

  // Group all contacts A–Z
  const grouped = sortedContacts.reduce((acc, c) => {
    const letter = c.name[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(c);
    return acc;
  }, {});
  const letters = Object.keys(grouped).sort();

  // Scroll to letter section
  const scrollToLetter = (letter) => {
    const section = document.getElementById(`section-${letter}`);
    if (section && listRef.current) {
      listRef.current.scrollTo({
        top: section.offsetTop - 70,
        behavior: "smooth",
      });
    }
  };

  // Highlight matched text
  const highlightText = (text) => {
    if (!query) return text;
    const i = text.toLowerCase().indexOf(query.toLowerCase());
    if (i === -1) return text;
    return (
      <>
        {text.slice(0, i)}
        <mark className="highlight">{text.slice(i, i + query.length)}</mark>
        {text.slice(i + query.length)}
      </>
    );
  };

  return (
    <div className="list-wrapper">
      <div className="contact-list" ref={listRef}>
        {/* ⭐ Favorites Section */}
        {favorites.length > 0 && (
          <div id="section-favorites">
            <h4 className="section-title">Favorites</h4>
            {favorites.map((contact) => (
              <div
                key={contact.id}
                className="contact-card"
                onClick={() => onSelect(contact)}
              >
                <div className="contact-info">
                  <FaUserCircle className="contact-icon" />
                  <h3>
                    {highlightText(contact.name)}{" "}
                    <FaStar className="fav-star" />
                  </h3>
                </div>
                <p className="contact-number">{highlightText(contact.phone)}</p>
              </div>
            ))}
          </div>
        )}

        {/*  All Contacts (A–Z) */}
        <div id="section-all">
          <h4 className="section-title"> All Contacts</h4>
          {letters.map((letter) => (
            <div key={letter} id={`section-${letter}`}>
              <h4 className="section-title">{letter}</h4>
              {grouped[letter].map((contact) => (
                <div
                  key={contact.id}
                  className="contact-card"
                  onClick={() => onSelect(contact)}
                >
                  <div className="contact-info">
                    <FaUserCircle className="contact-icon" />
                    <h3>
                      {highlightText(contact.name)}{" "}
                      {contact.favorite && <FaStar className="fav-star" />}
                    </h3>
                  </div>
                  <p className="contact-number">
                    {highlightText(contact.phone)}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>

        {contacts.length === 0 && (
          <div className="no-contacts">
            <p>No contacts yet.</p>
          </div>
        )}
      </div>

      {/* 📚 Alphabet sidebar */}
      <div className="alphabet-sidebar">
        {favorites.length > 0 && (
          <span onClick={() => scrollToLetter("favorites")}>★</span>
        )}
        {letters.map((l) => (
          <span key={l} onClick={() => scrollToLetter(l)}>
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ContactList;
