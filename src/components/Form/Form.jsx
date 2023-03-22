import { useState} from 'react';
// import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import css from './Form.module.css';



export const Form = ({ contacts, onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');


  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ id: nanoid(), name, number });

    if (contacts.find(contact => contact.name === name)) {
      alert(`${name} is alredy in contacts`);
    }

    if (contacts.find(contact => contact.number === number)) {
      alert(`This ${number} is already in contacts`);
    }

    reset();
  };
  const reset = () => {
    setName('');
    setNumber('');
  };
  return (
    <form className={css.formWrapper} onSubmit={handleSubmit}>
      <label htmlFor="name">
        <p className={css.title}>Name</p>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label htmlFor="number">
        <p className={css.title}>Number</p>
        <input
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button className={css.addBtn} type="submit">
        Add contact
      </button>
    </form>
  );
};

// Form.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
//   contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
// };
