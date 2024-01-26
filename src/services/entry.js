async function get (url) {
  const response = await fetch(url)
  return await response.json()
}

async function post ({ url, body }) {
  const response = await fetch(url, {
    method: 'post',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return await response.json()
}

export { get, post }
