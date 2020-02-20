import 'isomorphic-fetch';

async function postData(url = '', data = {}) {
  const response = fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  });

  return response.then(res => res.json());
}

export default postData;