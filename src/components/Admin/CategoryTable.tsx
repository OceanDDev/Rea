import React from 'react';
import { Category } from '../../interface/category';

interface CategoryTableProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (categoryId: string) => void;
}

const CategoryTable: React.FC<CategoryTableProps> = ({ categories, onEdit, onDelete }) => {
  console.log('Categories:', categories); // Kiểm tra dữ liệu

  return (
    <table>
      <thead>
        <tr>
          <th>Tên danh mục</th>
          <th>Mô tả</th>
          <th>Trạng thái</th>
          <th>Thứ tự</th>
          <th>Chức năng</th>
        </tr>
      </thead>
      <tbody>
        {categories.length > 0 ? (
          categories.map((category) => (
            <tr key={category._id}>
              
              <td>{category.name || 'N/A'}</td>
              <td>{category.mota || 'N/A'}</td>
              <td>{category.home ? "Có" : "Không"}</td>
              <td>{category.stt || 'N/A'}</td>
              <td>
                <button className="button-admin" onClick={() => onEdit(category)}>
                  Sửa
                </button>
                <button className="button-admin" onClick={() => onDelete(category._id)}>
                  Xóa
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={6}>No categories available</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default CategoryTable;
