import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { User } from '../../interface/Users';
import CheckLogin from '../auth/CheckLogin';

interface AdminRouteProps {
  children: JSX.Element;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = CheckLogin(); // Giả sử CheckLogin() trả về user hoặc null
      setUser(userData);
      setLoading(false);
    };
    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Hoặc một spinner/loading indicator
  }

  if (!user) {
    return <Navigate to="/sign-in" />;
  }

  if (user.role !== 2) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
