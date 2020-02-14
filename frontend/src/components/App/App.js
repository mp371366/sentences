import React from 'react';
import { StyleSheet, css } from 'aphrodite';

function App({ db }) {
  return (
    <div className={css(styles.app)}>
      <header className={css(styles.header)}>
        {db || 'Database not specified.'}
      </header>
    </div>
  );
}

const styles = StyleSheet.create({
  app: {
    textAlign: 'center',
  },

  header: {
    backgroundColor: '#282c34',
    minHeight: 100 + 'vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white',
  },
});

export default App;
