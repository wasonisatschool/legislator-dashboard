import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} 後台管理系統. 保留所有權利.</p>
      </div>
    </footer>
  );
};

export default Footer;
