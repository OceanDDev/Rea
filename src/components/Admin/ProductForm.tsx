import React, { useState, useEffect } from 'react';
import { Product } from '../../interface/product';
import { Category } from '../../interface/category';
import { getCategories } from '../../data/Categories';

interface ProductFormProps {
  product: Product;
  onSave: (product: Product) => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Product>(product);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response?.data); 
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type, value, files, checked } = e.target as HTMLInputElement ;

    if (type === 'file') {
      setFormData(prevData => ({
        ...prevData,
        [name]: files ? files[0] : prevData[name as keyof Product]
      }));
    } else if (type === 'checkbox') {
      setFormData(prevData => ({
        ...prevData,
        [name]: checked
      }));
    } else if (type === 'select-one') {
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      })); 
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="product-form">
      <h2>{product._id ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Tên sản phẩm:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="price">Giá:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <label htmlFor="material">Vật liệu:</label>
        <input
          type="text"
          id="material"
          name="material"
          value={formData.material}
          onChange={handleChange}
          required
        />

        <label htmlFor="category">Danh mục:</label>
        <select
          id="category"
          name="category"
          onChange={handleChange}
          required
        >
          <option value="">Chọn danh mục</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        <label htmlFor="bestseller">Bán chạy:</label>
        <input
          type="checkbox"
          id="bestseller"
          name="bestseller"
          checked={formData.bestseller || false}
          onChange={handleChange}
        />

        <label htmlFor="quantity">Số lượng:</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />

        <label htmlFor="img">Hình ảnh:</label>
        <input
          type="file"
          id="img"    
          name="img"
          onChange={handleChange}
        />
        {formData.img && typeof formData.img !== 'string' && <img src={URL.createObjectURL(formData.img)} width={200} alt="Product" />}

        <div className="form-buttons">   
          <button type="submit">Lưu</button>
          <button type="button" onClick={onCancel}>Hủy</button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
