import React, { useState, useEffect } from 'react';
import { getUsers, createUser, freezeUser, deleteUser, resetPassword } from '../api/auth';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'assistant' });
  const [createLink, setCreateLink] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleCreateUser = async () => {
    const response = await createUser(newUser);
    setCreateLink(response.link);
    fetchUsers();
  };

  const handleFreezeUser = async (userId) => {
    await freezeUser(userId);
    fetchUsers();
  };

  const handleDeleteUser = async (userId) => {
    await deleteUser(userId);
    fetchUsers();
  };

  const handleResetPassword = async (userId) => {
    await resetPassword(userId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">用戶管理</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">新增用戶</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">姓名</label>
          <input
            type="text"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">電子郵件</label>
          <input
            type="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">角色</label>
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="assistant">助理</option>
            <option value="admin">超級管理員</option>
          </select>
        </div>
        <button onClick={handleCreateUser} className="w-full bg-indigo-600 text-white py-2 rounded">新增用戶</button>
        {createLink && (
          <div className="mt-4">
            <label className="block text-gray-700 mb-2">註冊連結</label>
            <input type="text" value={createLink} readOnly className="w-full px-3 py-2 border rounded" />
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">用戶列表</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-gray-600">用戶名稱</th>
              <th className="px-4 py-2 text-left text-gray-600">角色</th>
              <th className="px-4 py-2 text-left text-gray-600">狀態</th>
              <th className="px-4 py-2 text-left text-gray-600">操作</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{user.username}</td>
                <td className="border px-4 py-2">{user.role}</td>
                <td className="border px-4 py-2">{user.status}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleFreezeUser(user.id)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  >
                    {user.status === 'active' ? '凍結' : '解凍'}
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                  >
                    刪除
                  </button>
                  <button
                    onClick={() => handleResetPassword(user.id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    重設密碼
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
