import React, { useState } from "react";
import ContactList from "./ContactList";

function SearchScreen({ contacts, deleteContact }) {
  const [query, setQuery] = useState("");

  const filtered = contacts.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="search-screen">
      <input
        type="text"
        placeholder="Search contacts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ContactList contacts={filtered} deleteContact={deleteContact} />
    </div>
  );
}

export default SearchScreen;
