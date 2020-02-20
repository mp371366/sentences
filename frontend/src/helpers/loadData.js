import 'isomorphic-fetch';

async function loadData(api, resourceType) {
  return fetch(`${api}/${resourceType}`)
    .then(res => res.json());
}

export default loadData;