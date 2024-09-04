import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL + "/categories";

// Lấy danh sách các danh mục
export const getCategories = () => {
  try {
    const resp = axios.get(API_URL);
    return resp;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Lấy danh mục cho trang chủ
export const getCategoriesHome = () => {
  try {
    const resp = axios.get(API_URL + "home");
    return resp;
  } catch (error) {
    console.log(error);
    throw error; 
  }
};

// Thêm một danh mục mới
export const addCategory = (category: { name: string }) => {
  try {
    const resp = axios.post(API_URL, category);
    return resp;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Cập nhật một danh mục
export const updateCategory = (id: string, updatedCategory: { name: string }) => {
  try {
    const resp = axios.put(`${API_URL}/${id}`, updatedCategory);
    return resp;
  } catch (error) {
    console.log(error);
    throw error; 
  }
};

// Xóa một danh mục
export const deleteCategory = (id: string) => {
  try {
    const resp = axios.delete(`${API_URL}/${id}`);
    return resp;
  } catch (error) {
    console.log(error);
    throw error; 
  }
};
