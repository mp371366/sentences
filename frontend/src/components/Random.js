import React, { useState, useEffect, useContext } from 'react';
import ErrorContext from '../contexts/ErrorContext';
import DataContext from '../contexts/DataContext';
import loadData from '../helpers/loadData';
import ApiContext from '../contexts/ApiContext';

function Random() {
  const { setError } = useContext(ErrorContext);
  const data = useContext(DataContext);
  const [sentence, setSentence] = useState(data);
  const { api } = useContext(ApiContext);

  useEffect(() => {
    if (!sentence) {
      (async () => {
        loadData(api, 'sentences/random')
          .then(setSentence)
          .catch(setError);
      })();
    }
  }, [sentence, api, setError]);

  return (
    <>
      <p>
        {sentence !== null ?
          (<>{'Sentence for now:'}<i>{sentence}</i></>)
          : 'Wait for sentence'
        }
      </p>
      {sentence !== null && <button onClick={() => setSentence(null)}>Get another sentence!</button>}
    </>
  );
}

export default Random;
