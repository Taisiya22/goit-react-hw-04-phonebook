import { Section } from '../Section/Section';
import { Form } from '../Form/Form';
import { ContactList } from '../ContactList/ContactList';
import { Filter } from '../Filter/Filter';
import { useLocaleStorage } from 'hooks/useLocaleStorage';
import css from './App.module.css';
import { useMemo } from 'react';

export const App = () => {
  const [contacts, setContacts] = useLocaleStorage('contacts', []);
  const [filter, setFilter] = useLocaleStorage('filter', '');

  const formSubmitHandler = newContact => {
    setContacts([...contacts, newContact]);
  };

  const onDelete = idContact => {
    setContacts(contacts.filter(contact => contact.id !== idContact));
  };

  const onChangeFilter = e => {
    setFilter(e.target.value);
  };

  // const getFilterContact = () => {

  // return contacts.filter(contact =>
  //   contact.name.toLowerCase().includes(filter.toLowerCase())
  // );
  // };

  const getFilterContact = useMemo(() => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [contacts, filter]);

  return (
    <div className={css.wrapper}>
      <Section title="Phone book">
        <Form onSubmit={formSubmitHandler} contacts={contacts} />
      </Section>
      {contacts.length > 0 && (
        <>
          <Section title="Contacts" />
          <Filter value={filter} onChange={onChangeFilter} />
          <ContactList contacts={getFilterContact} onDelete={onDelete} />
        </>
      )}
    </div>
  );
};
