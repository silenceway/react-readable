const ROOT_URL = 'http://localhost:3001'; // process.env.ROOT_URL

export function fetchCategories() {
  return fetch(`${ROOT_URL}/categories`, {headers: {"Authorization": "whatever-you-want", "Content-Type": "application/json"}, method: 'GET' })
    .then((res) => { return res.json()})
    .then(( data ) => data.categories);
}

export function fetchPosts(category = '') {
  const url = (category !== '') ? `${ROOT_URL}/${category}/posts` : `${ROOT_URL}/posts`;

  return fetch(url, {headers: {"Authorization": "whatever-you-want", "Content-Type": "application/json"}, method: 'GET' })
    .then((res) => { return res.json()})
    .then(( data ) => data);
}

export function fetchPost(postId = '') {
  const url = `${ROOT_URL}/posts/${postId}`;

  return fetch(url, {headers: {"Authorization": "whatever-you-want", "Content-Type": "application/json"}, method: 'GET' })
    .then((res) => { return res.json()})
    .then(( data ) => data);
}

export function updatePost(post) {
  return fetch(`${ROOT_URL}/posts`, {headers: {"Authorization": "whatever-you-want", "Content-Type": "application/json"}, body: JSON.stringify(post), method: 'POST' })
    .then((res) => { return res.json()})
    .then(( data ) => data);
}

export function deletePost(post) {
  return fetch(`${ROOT_URL}/posts/${post.id}`, {headers: {"Authorization": "whatever-you-want", "Content-Type": "application/json"}, body: JSON.stringify(post), method: 'DELETE' })
    .then((res) => { return res.json()})
    .then(( data ) => data);
}

export function votePost(post, type) {
  return fetch(`${ROOT_URL}/posts/${post.id}`, {headers: {"Authorization": "whatever-you-want", "Content-Type": "application/json"}, body: JSON.stringify({ "option" : type}), method: 'POST' })
    .then((res) => { return res.json()})
    .then(( data ) => data);
}

export function fetchComments(post) {
  return fetch(`${ROOT_URL}/posts/${post}/comments`, {headers: {"Authorization": "whatever-you-want", "Content-Type": "application/json"}, method: 'GET' })
    .then((res) => { return res.json()})
    .then(( data ) => data);
}

export function deleteComment(comment) {
  return fetch(`${ROOT_URL}/comments/${comment.id}`, {headers: {"Authorization": "whatever-you-want", "Content-Type": "application/json"}, body: JSON.stringify(comment), method: 'DELETE' })
    .then((res) => { return res.json()})
    .then(( data ) => data);
}

export function updateComment(comment) {
  return fetch(`${ROOT_URL}/comments`, {headers: {"Authorization": "whatever-you-want", "Content-Type": "application/json"}, body: JSON.stringify(comment), method: 'POST' })
    .then((res) => { return res.json()})
    .then(( data ) => data);
}

export function voteComment(comment, type) {
  return fetch(`${ROOT_URL}/comments/${comment}`, {headers: {"Authorization": "whatever-you-want", "Content-Type": "application/json"}, body: JSON.stringify({ "option" : type}), method: 'POST' })
    .then((res) => { return res.json()})
    .then(( data ) => data);
}

