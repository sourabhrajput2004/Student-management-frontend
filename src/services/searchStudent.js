import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const searchStudents = (type, keyword) => {
  return axios.get(`${API_URL}/search`, {
    params: {
      type: type,
      value: keyword,
    },
  });
};