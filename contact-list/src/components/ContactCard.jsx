import React from "react";

function ContactCard({ contact, expanded, onToggle, deleteContact }) {
    return (
        <div className="contact-card" onClick={onToggle}>
            <h3>{contact.name}</h3>
            {expanded && (
                <div className="contact-details">
                    <p> 📞{contact.phone}</p>
                    <p> 📧{contact.email}</p>
                    <button
                        className="delete-btn"
                        onClick={(e) => {
                            e.stopPropagation();
                            const confirmDelete = window.confirm(
                                `Are you sure you want to delete ${contact.name}?`
                            );
                            if (confirmDelete) deleteContact(contact.id);
                        }}
                    >
                        Delete
                    </button>

                </div>
            )}
        </div>
    );
}

export default ContactCard;
