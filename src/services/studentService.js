import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getStudents = () => axios.get(API_URL);
export const addStudent = (student) => axios.post(API_URL, student);
export const deleteStudent = (id) => axios.delete(`${API_URL}/${id}`);
export const updateStudent = (student) => axios.put(`${API_URL}/${student.id}`, student);
