import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL + "/users";

// Lấy danh sách các users
export const getuser = () => {
  try {
    const resp = axios.get(API_URL);
    return resp;
  } catch (error) {
    console.log(error);
    throw error;
  }
};



// Thêm một user
export const addUser = (user: { name: string }) => {
  try {
    const resp = axios.post(`${API_URL}/create`, user);
    return resp;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Cập nhật user
export const updateUser = (id: string, updateUser: { name: string }) => {
  try {
    const resp = axios.put(`${API_URL}/${id}`, updateUser);
    return resp;
  } catch (error) {
    console.log(error);
    throw error; 
  }
};

// Xóa user
export const deleteUser = (id: string) => {
  try {
    const resp = axios.delete(`${API_URL}/delete/${id}`);
    return resp;    
  } catch (error) {
    console.log(error);
    throw error; 
  }
};
