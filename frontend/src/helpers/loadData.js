import 'isomorphic-fetch';

async function loadData(api, resourceType) {
  return fetch(`${api}/${resourceType}`)
    .then(res => res.json())
    .then(data => data.filter((_, idx) => idx < 10));
}

export default loadData;