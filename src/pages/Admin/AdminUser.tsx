import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './admin.css';
import { addUser, deleteUser, getuser, updateUser } from "../../data/User";
import { User } from "../../interface/Users";
import UserForm from "../../components/Admin/UserForm";
import UserTable from "../../components/Admin/UserTable";

const AdminUser = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getuser();
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };
    fetchUsers();
  }, []);

  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  const handleSave = async (user: User) => {
    try {
      if (user._id) {
        // Cập nhật người dùng hiện có
        await updateUser(user._id, user);
        setUsers(users.map(u => u._id === user._id ? user : u));
      } else {
        // Thêm người dùng mới
        const { data: newUser } = await addUser(user);
        setUsers([...users, newUser]);
      }
      setEditingUser(null);
    } catch (error) {
      console.error("Error saving user", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('access_token');
    navigate('/');
  };

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
          <a href="#" className="nav-link">Users</a>
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
            <button className="btn-download" onClick={() => setEditingUser({ _id: '', name: '', email: '', pass: '', address: '', phone: '', role: 0 })}>
              <span className="text">Thêm Người Dùng</span>
            </button>
          </div>
          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>Người Dùng Gần Đây</h3>
                <i className="bx bx-search" />
                <i className="bx bx-filter" />
              </div>
              {editingUser && (
                <UserForm
                  user={editingUser}
                  onSave={handleSave}
                  onCancel={() => setEditingUser(null)}
                />
              )}
              <UserTable
                users={users}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          </div>
        </main>
      </section>
    </div>
  );
};

export default AdminUser;
