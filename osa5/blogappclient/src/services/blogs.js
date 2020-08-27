import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => {
  token = newToken;
};

const getAll = () => {
  return axios.get(baseUrl)
    .then(res => { return res.data; });
};

const create = async (newBlog) => {
  const config = {
    headers: {
      Authorization: `bearer ${token}`
    }
  };
  return axios.post(baseUrl, newBlog, config)
    .then(res => { return res.data; });
};

const update = (id, newBlog) => {
  const config = {
    headers: {
      Authorization: `bearer ${token}`
    }
  };
  return axios.put(`${baseUrl}/${id}`, newBlog, config)
    .then(res => { return res.data; });
};

const deleteBlog = async (id) => {
  const config = {
    headers: {
      Authorization: `bearer ${token}`
    }
  };
  return axios.delete(`${baseUrl}/${id}`, config)
    .then(res => { return res; });
};

export default {
  getAll,
  create,
  update,
  deleteBlog,
  setToken
};