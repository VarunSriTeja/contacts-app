import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import ContactList from "./components/ContactList";
import AddContactScreen from "./components/AddContactScreen";
import SearchScreen from "./components/SearchScreen";
import contactsData from "./data/contacts";
import "./App.css";

function App() {
  const [contacts, setContacts] = useState(() => {
  const saved = localStorage.getItem("contacts");
  const loaded = saved ? JSON.parse(saved) : contactsData;
  return loaded.sort((a, b) => a.name.localeCompare(b.name));
});


  const [currentView, setCurrentView] = useState("list"); 
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (newContact) => {
    const updated = [...contacts, newContact].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setContacts(updated);
    setCurrentView("list");
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter((c) => c.id !== id));
  };

  return (
    <div>
      <Header currentView={currentView} setCurrentView={setCurrentView} />

      {currentView === "list" && (
        <ContactList
          contacts={contacts}
          deleteContact={deleteContact}
        />
      )}

      {currentView === "add" && (
        <AddContactScreen addContact={addContact} setCurrentView={setCurrentView} />
      )}

      {currentView === "search" && (
        <SearchScreen
          contacts={contacts}
          setCurrentView={setCurrentView}
          deleteContact={deleteContact}
        />
      )}
    </div>
  );
}

export default App;
