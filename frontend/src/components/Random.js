import React, { useState, useEffect, useContext, useCallback } from 'react';
import ErrorContext from '../contexts/ErrorContext';
import DataContext from '../contexts/DataContext';
import loadData from '../helpers/loadData';
import ApiContext from '../contexts/ApiContext';

function Random() {
  const { setError } = useContext(ErrorContext);
  const data = useContext(DataContext);
  const [waiting, setWaiting] = useState(false);
  const [sentence, setSentence] = useState(null);
  const { api } = useContext(ApiContext);

  const trySetSentence = useCallback(
    (data) => {
      if (typeof data === 'string') {
        setSentence(data);
      } else {
        setSentence(null);
        setError(data);
      }
    },
    [setError]
  );

  const getSentence = useCallback(
    () => {
      setWaiting(true);
      setSentence(null);
      loadData(api, 'sentences/random')
        .then(trySetSentence)
        .catch(setError)
        .finally(() => setWaiting(false));
    },
    [api, setError, trySetSentence],
  );

  useEffect(() => {
    trySetSentence(data);
  }, [data, trySetSentence]);

  return (
    <>
      <p>
        {waiting
          ? 'Wait for sentence' : sentence !== null
            ? (<>{'Sentence for now:'}<i>{JSON.stringify(sentence)}</i></>)
            : 'Unable to get sentence.'
        }
      </p>
      {!waiting && <button onClick={getSentence}>Get another sentence!</button>}
    </>
  );
}

export default Random;
