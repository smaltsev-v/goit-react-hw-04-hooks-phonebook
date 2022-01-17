import { useState,useEffect } from "react";
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';
import './App.css'

import { v4 as uid } from "uuid";
import contacts from './data/contacts.json'


function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [];
  });


   useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
   }, [contacts]);
  const [filter, setFilter] = useState('');

  const formSubmitHandler = (name, number) => {
    const contacts = setContacts

    if (contacts.some((contact) => contact.name === name)) {
      alert(
        `${name} is already in contacts. Want to replace an existing contact ?`
      );
      return;
    }
    const id = uid();
    setContacts({
      contacts: [{ name, number, id }, ...contacts],
      filter: "",
    });

    console.log({ name, number });
  };


  const deleteContact = contactId => {
    setContacts(contacts.filter(({ id }) => id !== contactId));
  };



  const onChangeFilter = e => {
    setFilter(e.currentTarget.value);
  };


  const filterUser = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter),
    );
  };

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


