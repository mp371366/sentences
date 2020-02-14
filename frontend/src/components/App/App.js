import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import _ from 'lodash';
import axios from 'axios';

function App({ api }) {
  const [error, setError] = useState(null);
  const [sentences, setSentences] = useState([]);

  useEffect(() => {
    axios.get(api)
      .then(response => {
        setSentences(response.data);
      })
      .catch(setError);
  }, []);

  return (
    <div className={css(styles.app)}>
      <header className={css(styles.header)}>
        {api || 'API not specified.'}
      </header>
      {error && <p>{error}</p>}
      <main className={css(styles.main)}>
        {_.isEmpty(sentences)
          ? 'There is no sentences'
          : _.map(sentences, ({ text, _id }) =>
            <section key={_id}>
              {text}
            </section>
          )
        }
      </main>
    </div>
  );
}

const styles = StyleSheet.create({
  app: {
    textAlign: 'center',
  },

  header: {
    backgroundColor: '#282c34',
    minHeight: 10 + 'vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white',
  },

  main: {
    backgroundColor: '#282c34',
    minHeight: 90 + 'vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white',
  },
});

export default App;
