import React from 'react';
import { User } from '../../interface/Users';

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users  }) => {
  console.log('Users:', users); // Kiểm tra dữ liệu

  return (
    <table>
      <thead>
        <tr>
          <th>Tên người dùng</th>
          <th>Email</th>
          <th>Vai trò</th>
        </tr>
      </thead>
      <tbody>
        {users.length > 0 ? (
          users.map((user) => (
            <tr key={user._id}>
              <td>{user.name || 'N/A'}</td>
              <td>{user.email || 'N/A'}</td>
              <td>{user.role === 2 ? "Admin" : "User"}</td>
              
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={6}>Không có người dùng nào</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default UserTable;
