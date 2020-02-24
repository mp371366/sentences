import React, { useState, useEffect, useContext } from 'react';
import ErrorContext from '../contexts/ErrorContext';
import DataContext from '../contexts/DataContext';
import loadData from '../helpers/loadData';
import ApiContext from '../contexts/ApiContext';

function Random() {
  const { setError } = useContext(ErrorContext);
  const data = useContext(DataContext);
  const [waiting, setWaiting] = useState(false);
  const [sentence, setSentence] = useState(data);
  const { api } = useContext(ApiContext);

  useEffect(() => {
    if (!sentence) {
      (async () => {
        setWaiting(true);
        loadData(api, 'sentences/random')
          .then((result) => {
            if (typeof result === 'string') {
              setSentence(result);
            } else {
              setSentence(null);
              setError(result);
            }
          })
          .catch(setError)
          .finally(() => setWaiting(false));
      })();
    }
  }, [sentence, api, setError]);

  return (
    <>
      <p>
        {waiting
          ? 'Wait for sentence' : sentence !== null
            ? (<>{'Sentence for now:'}<i>{JSON.stringify(sentence)}</i></>)
            : 'Unable to get sentence.'
        }
      </p>
      {!waiting && <button onClick={() => setSentence(null)}>Get another sentence!</button>}
    </>
  );
}

export default Random;
