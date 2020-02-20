import React, { useState, useEffect, useContext } from 'react';
import _ from 'lodash';
import ErrorContext from '../contexts/ErrorContext';
import DataContext from '../contexts/DataContext';
import loadData from '../helpers/loadData';
import ApiContext from '../contexts/ApiContext';

function Random() {
  const { setError } = useContext(ErrorContext);
  const data = useContext(DataContext);
  const [sentences, setSentences] = useState(data);
  const { api } = useContext(ApiContext);

  useEffect(() => {
    if (_.isEmpty(sentences)) {
      loadData(api, 'sentences')
        .then(setSentences)
        .catch(setError);
    }
  }, [sentences, api, setError]);

  return _.isEmpty(sentences)
    ? 'There is no sentences'
    : _.map(sentences, ({ text, _id }) =>
      <section key={_id}>
        {text}
      </section>
    );
}

export default Random;
