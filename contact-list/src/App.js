import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import ContactList from "./components/ContactList";
import Modal from "./components/Modal";
import AddContactModal from "./components/AddContactModal";
import contactsData from "./data/contacts";
import "./App.css";

function App() {
  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem("contacts");
    const loaded = saved ? JSON.parse(saved) : contactsData;
    return loaded.sort((a, b) => a.name.localeCompare(b.name));
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (newContact) => {
    const updated = [...contacts, newContact].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setContacts(updated);
    setShowAddModal(false);
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter((c) => c.id !== id));
  };

  const toggleFavorite = (id) => {
    const updated = contacts.map((c) =>
      c.id === id ? { ...c, favorite: !c.favorite } : c
    );
    setContacts(updated);
  };

  const openModal = (contact) => setSelectedContact(contact);
  const closeModal = () => setSelectedContact(null);

  const filteredContacts = contacts.filter((c) => {
    const q = searchTerm.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.phone.toLowerCase().includes(q) ||
      (c.email && c.email.toLowerCase().includes(q))
    );
  });

  return (
    <div>
      <Header
        currentView="list"
        setCurrentView={() => {}}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onAddClick={() => setShowAddModal(true)}
      />

      <ContactList
        contacts={filteredContacts}
        deleteContact={deleteContact}
        onSelect={openModal}
        query={searchTerm}
      />

      <Modal
        contact={selectedContact}
        onClose={closeModal}
        onDelete={deleteContact}
        onToggleFavorite={toggleFavorite}
      />

      {showAddModal && (
        <AddContactModal
          onClose={() => setShowAddModal(false)}
          addContact={addContact}
        />
      )}
    </div>
  );
}

export default App;
