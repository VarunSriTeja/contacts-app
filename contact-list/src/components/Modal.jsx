import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./Modal.css";

function Modal({ contact, onClose, onDelete, onToggleFavorite }) {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    if (contact) setIsFav(contact.favorite || false);
  }, [contact]);

  if (!contact) return null;

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // prevent closing modal accidentally
    setIsFav(!isFav);    // update UI instantly
    onToggleFavorite(contact.id); // sync with parent state
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{contact.name}</h2>
          <button className="favorite-btn" onClick={handleFavoriteClick}>
            {isFav ? (
              <FaHeart className="heart filled" />
            ) : (
              <FaRegHeart className="heart" />
            )}
          </button>
        </div>

        <p><strong>Phone:</strong> {contact.phone}</p>
        <p><strong>Email:</strong> {contact.email}</p>

        <div className="modal-buttons">
          <button
            className="delete-btn"
            onClick={() => {
              if (window.confirm(`Delete ${contact.name}?`)) {
                onDelete(contact.id);
                onClose();
              }
            }}
          >
            Delete
          </button>
          <button className="close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
