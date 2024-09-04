import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './admin.css';
import CategoryTable from "../../components/Admin/CategoryTable";
import { addCategory, deleteCategory, getCategories, updateCategory } from "../../data/Categories";
import { Category } from "../../interface/category";
import CategoryForm from "../../components/Admin/CategoryForm";

const AdminCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    fetchCategories();
  }, []);

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
  };

  const handleSave = async (category: Category) => {
    try {
      if (category._id) {
        // Cập nhật danh mục hiện có
        await updateCategory(category._id, category); 
        setCategories(categories.map(c => c._id === category._id ? category : c));
      } else {
        // Thêm danh mục mới
        const { data: newCategory } = await addCategory(category); 
        setCategories([...categories, newCategory]);
      }
      setEditingCategory(null);
    } catch (error) {
      console.error("Error saving category", error);
    }
  };
  
  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id);
      setCategories(categories.filter((category) => category._id !== id));
    } catch (error) {
      console.error("Error deleting category", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('access_token');
    navigate('/'); // Chuyển hướng về trang chính sau khi đăng xuất
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
          <a href="#" className="nav-link">Categories</a>
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
            <button className="btn-download" onClick={() => setEditingCategory({ _id: '', name: '', home: false, stt: 0, content: '', mota: '' })}>
              <span className="text">Thêm Danh Mục</span>
            </button>
          </div>

          
          <div className="table-data">
            <div className="order"> 
              <div className="head">
                <h3>Danh Mục Gần Đây</h3>
                <i className="bx bx-search" />
                <i className="bx bx-filter" />
              </div>
              {editingCategory && (
                <CategoryForm
                  category={editingCategory}
                  onSave={handleSave}
                  onCancel={() => setEditingCategory(null)}
                />
              )}
              <CategoryTable
                categories={categories}
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

export default AdminCategory;
