import * as tokenService from './tokenService'
const BASE_URL = `${process.env.REACT_APP_BACK_END_SERVER_URL}/api/references`

async function create(reference) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokenService.getToken()}`
    },
    body: JSON.stringify(reference)
  })
	return res.json()
}

async function getAll() {
  const res = await fetch(BASE_URL)
  return res.json()
}

async function addPhoto(photoData, referenceId) {
  const res = await fetch(`${BASE_URL}/${referenceId}/add-photo`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`
    },
    body: photoData
  })
	return await res.json()
}

async function update(reference) {
  console.log('THIS IS Reference', reference)
  const res = await fetch(`${BASE_URL}/${reference._id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reference)
  })
  return res.json()
}

async function deleteOne(id) {
  console.log('DeleteOne')
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`
    }
  })
  return res.json()
}

export {
	create,
  getAll,
  addPhoto,
  update,
  deleteOne,
}