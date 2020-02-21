import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Link, Switch } from 'react-router-dom';
import ApiContext from '../contexts/ApiContext';
import ErrorContext from '../contexts/ErrorContext';
import DataContext from '../contexts/DataContext';
import Routes from '../routes';
import { renderRoutes } from 'react-router-config';

function App({ api, data }) {
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null);
    }, 3000);
    return () => clearTimeout(timer);
  }, [error]);

  return (
    <div className={css(styles.app)}>
      <header className={css(styles.header)}>
        <Link to="/">Sentences</Link>
      </header>
      <ApiContext.Provider value={{ api }}>
        <ErrorContext.Provider value={{ error, setError }}>
          <DataContext.Provider value={data}>
            <main className={css(styles.main)}>
              <Switch>
                {renderRoutes(Routes)}
              </Switch>
            </main>
          </DataContext.Provider>
        </ErrorContext.Provider>
      </ApiContext.Provider>
      <a href={api}>API</a>
      {error && <pre>{error.message || error}</pre>}
    </div>
  );
}

const styles = StyleSheet.create({
  app: {
    textAlign: 'center',
  },

  header: {
    backgroundColor: '#202022',
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
    minHeight: 80 + 'vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white',
  },
});

export default App;
