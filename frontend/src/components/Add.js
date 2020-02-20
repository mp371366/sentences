import React, { useState, useContext } from 'react';
import postData from '../helpers/postData';
import ErrorContext from '../contexts/ErrorContext';
import { StyleSheet, css } from 'aphrodite';
import ApiContext from '../contexts/ApiContext';

function Add() {
  const [waiting, setWaiting] = useState(false);
  const [result, setResult] = useState(undefined);
  const [text, setText] = useState('');
  const { setError } = useContext(ErrorContext);
  const { api } = useContext(ApiContext);

  console.log(api);

  const handleSubmit = (event) => {
    event.preventDefault();

    setResult(undefined);
    setWaiting(true);
    setError(null);

    postData(`${api}/sentences`, { text })
      .then(() => setResult(true))
      .catch(({ message }) => setError(message))
      .finally(() => setWaiting(false))
      .finally(() => setText(''));
  };

  return (
    <div>
      {result !== undefined && (<p>
        {result ? 'Succesfuly added.' : 'Something went wrong. Please try again.'}
      </p>)}
      {waiting
        ? <p>Please wait.</p>
        : <form onSubmit={handleSubmit} className={css(styles.form)}>
          <label htmlFor="new-sentence" className={css(styles.label)}>
            New sentence:
          </label>
          <textarea
            id="new-sentence"
            value={text}
            onChange={event => setText(event.target.value)}
            required
            rows="8"
            cols="50"
          />
          <button type="submit" className={css(styles.button)}>Add</button>
        </form>
      }
    </div >
  );
}

const styles = StyleSheet.create({
  label: {
    alignSelf: 'flex-start'
  },
  button: {
    alignSelf: 'flex-end',
    width: 80,
    height: 30
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
});

export default Add;
