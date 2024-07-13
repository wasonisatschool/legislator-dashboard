import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white">
      <nav className="space-y-4 p-4">
        <Link to="/dashboard" className="block hover:underline">儀表板</Link>
        <Link to="/posts" className="block hover:underline">文章管理</Link>
        <Link to="/policies" className="block hover:underline">政策管理</Link>
        <Link to="/users" className="block hover:underline">用戶管理</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
