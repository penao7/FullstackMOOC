import axios from 'axios';
const baseUrl = '/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
    .then(res => { return res.data });
};

const create = newPerson => {
  return axios.post(baseUrl, newPerson)
    .then(res => { return res.data })
};

const update = (id, newPerson) => {
  return axios.put(`${baseUrl}/${id}`, newPerson)
    .then(res => { return res.data });
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
    .then(res => { return res });
};

export default {
  getAll,
  create,
  update,
  deletePerson
};