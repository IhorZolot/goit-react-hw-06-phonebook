import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { ContactFilter } from './ContactFilter';
import { Container } from './PhonebookContact.styled';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, deleteContact, setFilter } from 'redux/contactsSlice';

export const App = () => {
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const handleChangeSearchValue = event => {
    const { value } = event.target;
    dispatch(setFilter(value));
    // setFilter(value);
  };

  const getFilteredData = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const checkDuplicateContact = name => {
    return contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
  };

  const handleSubmit = newContact => {
    dispatch(addContact(newContact));
    // setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
    // setContacts(prevContacts =>
    //   prevContacts.filter(contact => contact.id !== id)
    // );
  };
  const filteredContacts = getFilteredData();

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm
        checkDuplicateContact={checkDuplicateContact}
        onSubmit={handleSubmit}
      />
      <h2>Contacts</h2>
      <ContactFilter filter={filter} onChange={handleChangeSearchValue} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
    </Container>
  );
};
