import React, { useState } from 'react';
import { login, googleLogin, passkeyLogin } from '../api/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token, user } = await login(username, password);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { token, user } = await googleLogin();
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/dashboard');
    } catch (err) {
      setError('Google login failed');
    }
  };

  const handlePasskeyLogin = async () => {
    try {
      const { token, user } = await passkeyLogin();
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/dashboard');
    } catch (err) {
      setError('Passkey login failed');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">登入</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">使用者名稱</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-3 py-2 border rounded" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">密碼</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 border rounded" required />
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded mb-4">登入</button>
        <button type="button" onClick={handleGoogleLogin} className="w-full bg-red-600 text-white py-2 rounded mb-4">使用 Google 登入</button>
        <button type="button" onClick={handlePasskeyLogin} className="w-full bg-green-600 text-white py-2 rounded">使用 Passkey 登入</button>
      </form>
    </div>
  );
};

export default Login;
