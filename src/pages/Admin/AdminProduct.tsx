import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './admin.css';
import ProductTable from "../../components/Admin/ProductTable";
import { addProduct, deleteProduct, ProductsList, updateProduct } from "../../data/ProductsData";
import { Product } from "../../interface/product";
import ProductForm from "../../components/Admin/ProductForm";

const AdminProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const navigate = useNavigate(); // Để điều hướng sau khi đăng xuất

  const fetchProducts = async () => {
    try {
      const response = await ProductsList(1, 10, 'asc');
      setProducts(response.data.result);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleSave = async (product: Product) => {
    try {
      const formData = new FormData();
      Object.keys(product).forEach(key => {
        formData.append(key, (product as never)[key]);
      });

      if (product._id) {
        // Cập nhật sản phẩm hiện có
        await updateProduct(product._id, formData);
        setProducts(products.map(p => p._id === product._id ? product : p));
      } else {
        // Thêm sản phẩm mới
        await addProduct(formData);
        fetchProducts()
        console.log(formData);
        
        
      }
      setEditingProduct(null);
    } catch (error) {
      console.error("Error saving product", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting product", error);
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
            <button className="btn-download" onClick={() => setEditingProduct({} as Product)}>
              <span className="text">Thêm Sản Phẩm</span>
            </button>
          </div>






          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>Recent Orders</h3>
                <i className="bx bx-search" />
                <i className="bx bx-filter" />
              </div>
              {editingProduct && (
                <ProductForm
                  product={editingProduct}
                  onSave={handleSave}
                  onCancel={() => setEditingProduct(null)}
                />
              )}
              <ProductTable
                products={products}
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

export default AdminProduct;
