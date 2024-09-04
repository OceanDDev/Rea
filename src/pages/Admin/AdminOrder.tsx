import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './admin.css';
import { getOrders, confirmOrder } from "../../data/Order";
import OrderTable from "../../components/Admin/OrderTable";
import AdminBox from "../../components/Admin/AdminBox";
import { Order } from "../../interface/oderConfirm";

const AdminOrder = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders();
        setOrders(response!.data);
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };
    fetchOrders();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('access_token');
    navigate('/');
  };

  const handleConfirmOrder = async (_id: string) => {
    try {
      await confirmOrder(_id); // Gửi yêu cầu xác nhận đơn hàng tới API
      // Cập nhật danh sách đơn hàng sau khi xác nhận thành công
      const updatedOrders = orders.map(order =>
        order.user_id === _id ? { ...order, order_status: 2 } : order
      );
      setOrders(updatedOrders);
    } catch (error) {
      console.error("Error confirming order", error);
    }
  };

  // Tính tổng số đơn hàng và tổng số tiền
  const totalOrders = orders.length;
  const totalSales = orders.reduce((sum, order) => sum + (order.total_amount || 0), 0);

  return (
    <div>
      <section id="sidebar">
      <Link to="/" className="brand">
          <i className="bx bxs-smile" />
          <span className="text">Ipun Admin</span>
        </Link>
        <ul className="side-menu">
          <li>
            <Link to="/admin">
              <i className="bx bxs-box" />
              <span className="text">Sản Phẩm</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/category">
              <i className="bx bxs-category" />
              <span className="text">Danh Mục</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/user">
              <i className="bx bxs-user" />
              <span className="text">Người Dùng</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/order">
              <i className="bx bxs-package" />
              <span className="text">Đơn hàng</span>
            </Link>
          </li>
          <li>
            <a href="#" onClick={handleLogout}>
              <i className="bx bxs-log-out" />
              <span className="text">Đăng Xuất</span>
            </a>
          </li>
        </ul>
      </section>
      <section id="content">
        <nav>
          <i className="bx bx-menu" />
          <a href="#" className="nav-link">Orders</a>
          <form action="#">
            <div className="form-input">
              <input type="search" placeholder="Search..." />
              <button type="submit" className="search-btn">
                <i className="bx bx-search" />
              </button>
            </div>
          </form>
          <input type="checkbox" id="switch-mode" hidden />
          <label htmlFor="switch-mode" className="switch-mode" />
          <a href="#" className="notification">
            <i className="bx bxs-bell" />
            <span className="num">8</span>
          </a>
          <a href="#" className="profile">
            <img src="../images/dog.jpg" alt="Profile" />
          </a>
        </nav>
        <main>
          <div className="head-title">
            <div className="left">
              <h1>Dashboard</h1>
              <ul className="breadcrumb">
                <li><a href="#">Dashboard</a></li>
                <li><i className="bx bx-chevron-right" /></li>
                <li><a className="active" href="#">Home</a></li>
              </ul>
            </div>
          </div>
          <AdminBox totalOrders={totalOrders} totalSales={totalSales} />
          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>Đơn Hàng Gần Đây</h3>
                <i className="bx bx-search" />
                <i className="bx bx-filter" />
              </div>
              <OrderTable orders={orders} onConfirmOrder={handleConfirmOrder} />
            </div>
          </div>
        </main>
      </section>
    </div>
  );
};

export default AdminOrder;
