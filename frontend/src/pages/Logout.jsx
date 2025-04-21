import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login', { replace: true });
    };

    const token = localStorage.getItem('token');

    if (!token) {
      logout(); // No token = force logout
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const expirationTime = decoded.exp * 1000; // to ms
      const now = Date.now();

      if (expirationTime <= now) {
        logout(); // Token expired
      } else {
        logout(); // For manual logout, just do it immediately
      }
    } catch (err) {
      logout(); // Token invalid
    }
  }, [navigate]);

  return (
    <div className="text-white flex justify-center items-center h-screen bg-[#212121]">
      Logging out...
    </div>
  );
};

export default Logout;
