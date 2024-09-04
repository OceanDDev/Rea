import React, { useState } from 'react';
import { Category } from '../../interface/category';

interface CategoryFormProps {
  category: Category;
  onSave: (category: Category) => void;
  onCancel: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ category, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Category>(category);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, type, value, checked } = e.target as  HTMLInputElement;

    if (type === 'checkbox') {
      setFormData(prevData => ({
        ...prevData,
        [name]: checked
      }));
    } else if (type === 'number' || type === 'text' || type === 'select-one') {
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
    <div className="category-form">
      <h2>{category._id ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Tên danh mục:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="home">Hiển thị trên trang chủ:</label>
        <input
          type="checkbox"
          id="home"
          name="home"
          checked={formData.home || false}
          onChange={handleChange}
        />

        <label htmlFor="stt">Thứ tự:</label>
        <input
          type="number"
          id="stt"
          name="stt"
          value={formData.stt}
          onChange={handleChange}
          required
        />

        <label htmlFor="content">Nội dung:</label>
        <input
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
        />

        <label htmlFor="mota">Mô tả:</label>
        <input
          id="mota"
          name="mota"
          value={formData.mota}
          onChange={handleChange}
          required
        />

        <div className="form-buttons">
          <button type="submit">Lưu</button>
          <button type="button" onClick={onCancel}>Hủy</button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
