import React from 'react';
import { Product } from '../../interface/product';

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ products, onEdit, onDelete }) => {
      console.log('Products:', products); // Kiểm tra dữ liệu

  return (
    <table>
      <thead>
        <tr>
          <th>Hình ảnh</th>
          <th>Tên sản phẩm</th>
          <th>Giá</th>
          <th>Vật liệu</th>
          <th>Danh mục</th>
          <th>Bán chạy</th>
          <th>Số lượng</th>
          <th>Chức năng</th>
        </tr>
      </thead>
      <tbody>
        {products.length > 0 ? (
          products.map((product) => (
            <tr key={product._id}>
              <td>
                <img
                  src={product.img ? `https://server-cake-8uhd.vercel.app/images/${product.img}` : '/default-image.png'}
                  alt={product.name}
                  style={{ width: "100px" }}
                />
              </td>
              <td>{product.name || 'N/A'}</td>
              <td>{product.price || 'N/A'}</td>
              <td>{product.material || 'N/A'}</td>
              <td>{product.category?.categoryName || 'N/A'}</td>
              <td>{product.bestseller ? "Có" : "Không"}</td>
              <td>{product.quantity || 'N/A'}</td>
              <td>
                <button className="button-admin" onClick={() => onEdit(product)}>
                  Sửa
                </button>
                <button className="button-admin" onClick={() => onDelete(product._id)}>
                  Xóa
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={8}>No products available</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ProductTable;
