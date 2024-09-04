import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

// css
import './assets/css/index.css';
import './assets/css/base.css';
import './assets/css/reponsive.css';
import './assets/css/reset.css';
import './assets/css/test.css';

// Page
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Signin from './pages/Signin';
import SignupPage from './pages/SignupPage';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import AdminProduct from './pages/Admin/AdminProduct';
import AdminCategory from './pages/Admin/AdminCategory';


// component
import Header from "./components/Header";
import Footer from './components/Footer';
import PageTitle from './components/PageTitle';
import AdminRoute from './components/Admin/AdminRoute';
import AdminUser from './pages/Admin/AdminUser';
import MyAccount from './pages/MyAccount';
import AdminOrder from './pages/Admin/AdminOrder';

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const isAdminPath = pathname.startsWith('/admin');

  return (
    <div className="wrapper">
      {!isAdminPath && <Header />}
      <main>
        <Routes>
          <Route path='/' element={
            <>
              <Home />
              <PageTitle title='Trang Chủ IPUN' />
            </>
          } />
          <Route path='/products' element={
            <>
              <Products />
              <PageTitle title='Sản Phẩm ' />
            </>
          } />
          <Route path='/products/:categoryId' element={
            <>
              <Products />
              <PageTitle title='Sản Phẩm' />
            </>
          } />
          <Route path='/product/:slug' element={<ProductDetail />} />
          <Route path='/sign-in' element={<Signin />} />
          <Route path='/sign-up' element={<SignupPage />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/myaccount' element={<MyAccount  />} />


          
        

          <Route path='/admin' element={
            <AdminRoute>
              <AdminProduct />
            </AdminRoute>
          } />
          <Route path='/admin/category' element={
            <AdminRoute>
              <AdminCategory />
            </AdminRoute>
          } />
          <Route path='/admin/user' element={
            <AdminRoute>
              <AdminUser />
            </AdminRoute>
          } />
           <Route path='/admin/order' element={
            <AdminRoute>
              <AdminOrder/>
            </AdminRoute>
          } />
          
         
        </Routes>
      </main>
      {!isAdminPath && <Footer />}
    </div>
  );
}

export default App;
