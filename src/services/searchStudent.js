import axios from "axios";

const API_URL = "https://student-management-backend-mxll.onrender.com/api/students";

export const searchStudents = (type, keyword) => {
  return axios.get(`${API_URL}/search`, {
    params: {
      type: type,
      value: keyword,
    },
  });
};