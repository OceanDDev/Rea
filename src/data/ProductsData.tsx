/* eslint-disable react-refresh/only-export-components */
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/products";

// Lấy sản phẩm hot
export const productsHotData = async () => {
  try {
    const resp = await axios.get(`${API_URL}/hot`);
    return resp;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching hot products");
  }
};

export const getAll = async () => {
  try {
    const resp = await axios.get(`${API_URL}`);
    return resp;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching get all products");
  }
};

// Lấy danh sách sản phẩm
export const ProductsList = async (page: number, limit: number, sortOrder: string) => {
  try {
    const resp = await axios.get(`${API_URL}?page=${page}&limit=${limit}&sortOrder=${sortOrder}`);
    return resp;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching products list");
  }
};

// Lấy sản phẩm theo danh mục
export const getProductByCategoryId = async (id: string | undefined, page: number, limit: number, sortOrder: string) => {
  try {
    const resp = await axios.get(`${API_URL}/cate/${id}?page=${page}&limit=${limit}&sortOrder=${sortOrder}`);
    return resp;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching products by category");
  }
};

// Tìm sản phẩm theo tên
export const getProductBySearch = async (name: string | undefined) => {
  try {
    const resp = await axios.get(`${API_URL}/search?name=${name}`);
    return resp;
  } catch (error) {
    console.log(error);
    throw new Error("Error searching products");
  }
};

// Lấy chi tiết sản phẩm
export const getProductDetail = async (slug: string | undefined) => {
  try {
    const resp = await axios.get(`${API_URL}/${slug}`);
    return resp;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching product details");
  }
};

// Thêm sản phẩm
export const addProduct = async (productData: object) => {
  try {
    const resp = await axios.post(`${API_URL}/addProduct`, productData);
    return resp;
  } catch (error) {
    console.log(error);
    
    
    throw new Error("Error adding product");
  }
};

// Sửa sản phẩm
export const updateProduct = async (_id: string, updatedData: object) => {
  try {
    const resp = await axios.put(`${API_URL}/update/${_id}`, updatedData);
    return resp;
  } catch (error) {
    console.log(error);
    throw new Error("Error updating product");
  }
};

// Xóa sản phẩm
export const deleteProduct = async (_id: string) => {
  try {
    const resp = await axios.delete(`${API_URL}/delete/${_id}`);
    return resp;
  } catch (error) {
    console.log(error);
    throw new Error("Error deleting product");
  }
};
