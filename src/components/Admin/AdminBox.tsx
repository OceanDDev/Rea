import React from 'react';

interface AdminBoxProps {
  totalOrders: number;
  totalSales: number;
}

const AdminBox: React.FC<AdminBoxProps> = ({ totalOrders, totalSales }) => {
  return (
    <ul className="box-info">
      <li>
        <i className="bx bxs-calendar-check" />
        <span className="text">
          <h3>{totalOrders}</h3>
          <p>Tổng Đơn Hàng </p>
        </span>
      </li>
      <li>
        <i className="bx bxs-dollar-circle" />
        <span className="text">
          <h3>{totalSales.toLocaleString()} VND</h3>
          <p>Tổng Tiền </p>
        </span>
      </li>
    </ul>
  );
}

export default AdminBox;
