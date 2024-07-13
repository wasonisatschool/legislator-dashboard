import React, { useState, useEffect } from 'react';
import { getPolicies, createPolicy, updatePolicy, deletePolicy } from '../api/policies';

const Policies = () => {
  const [policies, setPolicies] = useState([]);
  const [editingPolicy, setEditingPolicy] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    const data = await getPolicies();
    setPolicies(data);
  };

  const handleSave = async () => {
    if (editingPolicy) {
      await updatePolicy(editingPolicy.id, { title, description });
    } else {
      await createPolicy({ title, description });
    }
    setEditingPolicy(null);
    setTitle('');
    setDescription('');
    fetchPolicies();
  };

  const handleEdit = (policy) => {
    setEditingPolicy(policy);
    setTitle(policy.title);
    setDescription(policy.description);
  };

  const handleDelete = async (id) => {
    await deletePolicy(id);
    fetchPolicies();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">政策管理</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{editingPolicy ? '編輯政策' : '新增政策'}</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">標題</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">描述</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-2 border rounded" rows="6"></textarea>
        </div>
        <button onClick={handleSave} className="bg-indigo-600 text-white px-4 py-2 rounded">{editingPolicy ? '更新' : '保存'}</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {policies.map((policy) => (
          <div key={policy.id} className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">{policy.title}</h2>
            <p className="text-gray-600">{policy.description}</p>
            <div className="mt-4 flex space-x-2">
              <button onClick={() => handleEdit(policy)} className="bg-yellow-500 text-white px-4 py-2 rounded">編輯</button>
              <button onClick={() => handleDelete(policy.id)} className="bg-red-600 text-white px-4 py-2 rounded">刪除</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Policies;
