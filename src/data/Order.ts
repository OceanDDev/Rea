import axios from "axios";
import { Order } from "../interface/order";
// import.meta.env.VITE_API_URL
const API_URL = import.meta.env.VITE_API_URL;

const newOrder = (body: Order) => {
  return axios.post(`${API_URL}/orders`, body);
};

const getOrders = async () => {
  try {
    const resp = await axios.get(`${API_URL}/orders`);
    return resp;
  } catch (error) {
    console.log(error);
  }
};

const newItem = (body: {
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}) => {
  return axios.post(`${API_URL}/orderItem/`, body);
};

// Thêm hàm để xác nhận đơn hàng
const confirmOrder = (_id: string) => {
  return axios.patch(`${API_URL}/orders/${_id}/confirm`, { order_status: 2 });
};

export { newOrder, newItem, getOrders, confirmOrder };
