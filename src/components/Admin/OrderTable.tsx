import React from 'react';
import { Order } from '../../interface/oderConfirm';

interface OrderTableProps {
  orders: Order[];
  onConfirmOrder: (_id: string) => void;
}

const OrderTable: React.FC<OrderTableProps> = ({ orders, onConfirmOrder }) => {
  return (
    <table >
      <thead>
        <tr>
          <th>Tên Khách Hàng</th>
          <th>Email</th>
          <th>Địa Chỉ</th>
          <th>Số Điện Thoại</th>
          <th>Ngày Đặt Hàng</th>
          <th>Tổng Tiền</th>
          <th>Phương Thức Thanh Toán</th>
          <th>Trạng Thái Đơn Hàng</th>
          <th>Thao Tác</th>
        </tr>
      </thead>
      <tbody>
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <tr key={order.user_id + '-' + index}>
              <td >{order.name}</td>
              <td>{order.email}</td>
              <td>{order.address}</td>
              <td>{order.phone}</td>
              <td>{new Date(order.order_date).toLocaleDateString()}</td>
              <td>{order.total_amount?.toLocaleString() || 'N/A'} VND</td>
              <td>{order.type_payment === 1 ? "Thanh Toán Online" : "Thanh Toán Khi Nhận Hàng"}</td>
              <td>{order.order_status === 1 ? "Chưa giao" : "Đã giao"}</td>
              <td>
                {order.order_status === 1 && (
                  <button
                    className="confirm-btn"
                    onClick={(e) => {
                      e.preventDefault(); // Ngăn chặn hành vi mặc định
                      onConfirmOrder(order._id!);
                    }}
                  >
                    Xác Nhận
                  </button>
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={9}>No orders available</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default OrderTable;
