import React, { useState } from 'react';
import { User } from '../../interface/Users';

interface UserFormProps {
  user: User;
  onSave: (user: User) => void;
  onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState<User>(user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, type, value, checked } = e.target as HTMLInputElement;

    if (type === 'checkbox') {
      setFormData(prevData => ({
        ...prevData,
        [name]: checked
      }));
    } else if (type === 'number' || type === 'text' || type === 'email' || type === 'select-one') {
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
    <div className="user-form">
      <h2>{user._id ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Tên người dùng:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="address">Địa chỉ:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />

        <label htmlFor="phone">Số điện thoại:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <label htmlFor="role">Vai trò:</label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value={1}>User</option>
          <option value={2}>Admin</option>
        </select>

        <div className="form-buttons">
          <button type="submit">Lưu</button>
          <button type="button" onClick={onCancel}>Hủy</button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
