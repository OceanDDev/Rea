import React from 'react';
import { User } from '../../interface/Users';

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;  
}

const UserTable: React.FC<UserTableProps> = ({ users, onEdit }) => {
  console.log('Users:', users); 

  const handleRoleChange = (user: User, newRole: number) => {
    const updatedUser = { ...user, role: newRole };  
    onEdit(updatedUser); 
  };

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
              <td>
                <select style={{width: '100px'}}
                  value={user.role}  
                  onChange={(e) => handleRoleChange(user, Number(e.target.value))} 
                >
                  <option value={1}>User</option>
                  <option value={2}>Admin</option>
                </select>
              </td>
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
