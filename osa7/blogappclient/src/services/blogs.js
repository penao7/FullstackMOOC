import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => {
  token = newToken;
};


const getAll = async () => {
  const blogs = await axios.get(baseUrl);
  return blogs.data;

};

const create = async (newBlog) => {
  const config = {
    headers: {
      Authorization: `bearer ${token}`
    }
  };
    const returnedNewBlog = await axios.post(baseUrl, newBlog, config);
    return returnedNewBlog.data;
};

const update = async (id, newBlog) => {
  const config = {
    headers: {
      Authorization: `bearer ${token}`
    }
  };
    const updatedBlog = await axios.put(`${baseUrl}/${id}`, newBlog, config);
    return updatedBlog.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: {
      Authorization: `bearer ${token}`
    }
  };
    const deleteData = await axios.delete(`${baseUrl}/${id}`, config)
    return deleteData.data;
};

export default {
  getAll,
  create,
  update,
  deleteBlog,
  setToken
};