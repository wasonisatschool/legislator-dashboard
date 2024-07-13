import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <header className="bg-indigo-600 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">後台管理系統</Link>
        <nav>
          <Link to="/dashboard" className="mr-4 hover:underline">儀表板</Link>
          <Link to="/activities" className="mr-4 hover:underline">活動管理</Link>
          <Link to="/policy-management" className="mr-4 hover:underline">政策管理</Link>
          <Link to="/about-management" className="mr-4 hover:underline">關於管理</Link>
          <Link to="/home-management" className="mr-4 hover:underline">首頁管理</Link>
          {user && user.role === 'admin' && (
            <Link to="/users" className="mr-4 hover:underline">用戶管理</Link>
          )}
          <Link to="/login" className="hover:underline">登出</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
