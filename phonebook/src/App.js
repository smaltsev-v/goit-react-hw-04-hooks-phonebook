import { useState, useEffect } from "react";
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';
import './App.css'

import { v4 as uid } from "uuid";
import contactsData from './data/contacts.json'


function App() {
  const [contacts, setContacts] = useState(contactsData);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const localContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(localContacts);

    if (!parsedContacts || parsedContacts.length === 0) return;

    setContacts(parsedContacts)
  }, []);

  useEffect(() => {
    if (!contacts) return;

    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = ({ name, number }) => {
    if (contacts.some((contact) => contact.name === name)) {
      alert(
        `${name} is already in contacts. Want to replace an existing contact ?`
      );
      return;
    }
    const id = uid();
    setContacts(contacts => [{ name, number, id }, ...contacts]);
    setFilter('');
  };

  const onChangeFilter = (event) => {
    setFilter(event.currentTarget.value);
  };

  const deleteContact = (contactId) => {
    setContacts(contacts => contacts.filter(contact => contact.id !== contactId))
  };

  const normalizedFilter = filter.toLowerCase();

  const filterUser = contacts.filter((contact) => {
    return contact.name.toLowerCase().includes(normalizedFilter)
  });

  return (
    <div className="container" >
      <h1 className="title">Phonebook</h1>
      <ContactForm onSubmit={formSubmitHandler} />

      <h2 className="title" >Contacts</h2>
      <Filter value={filter} onChange={onChangeFilter} />
      <ContactList
        contacts={filterUser}
        onDeleteContacts={deleteContact}
      />
    </div>
  );
}

export default App;