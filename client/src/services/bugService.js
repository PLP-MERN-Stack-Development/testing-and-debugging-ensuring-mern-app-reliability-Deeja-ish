import axios from 'axios';

// Set the base URL for our backend
const API_URL = 'http://localhost:5000/api/bugs/';

// Get all bugs
const getBugs = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Report a new bug
const reportBug = async (bugData) => {
  const response = await axios.post(API_URL, bugData);
  return response.data;
};

// Update a bug's status
const updateBug = async (id, status) => {
  const response = await axios.put(API_URL + id, { status });
  return response.data;
};

// Delete a bug
const deleteBug = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};

const bugService = {
  getBugs,
  reportBug,
  updateBug,
  deleteBug,
};

export default bugService;