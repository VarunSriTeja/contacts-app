import React from "react";
import { FaPlus, FaSearch } from "react-icons/fa";

function Header({ searchTerm, setSearchTerm, onAddClick }) {
  return (
    <div className="header">
      <h2>Contacts</h2>

      <div className={`search-container ${searchTerm ? "glow-active" : ""}`}>
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="header-search"
        />
      </div>

      <div className="header-icons">
        <button className="add-contact-btn" onClick={onAddClick}>
          <FaPlus className="add-icon" />
          <span className="add-text">Add Contact</span>
        </button>
      </div>
    </div>
  );
}

export default Header;
