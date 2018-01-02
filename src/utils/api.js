const ROOT_URL = 'http://localhost:3001'; // process.env.ROOT_URL

export function fetchCategories() {
  return fetch(`${ROOT_URL}/categories`, {headers: {"Authorization": "whatever-you-want", "Content-Type": "application/json"}, method: 'GET' })
    .then((res) => { return res.json()})
    .then(( data ) => data.categories);
}
