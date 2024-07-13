import React, { useState, useEffect } from 'react';
import { getPolicies, createPolicy, updatePolicy, deletePolicy, uploadFile } from '../api/policies';
import { Check, Target, Clock } from 'lucide-react';

const PolicyManagement = () => {
  const [policies, setPolicies] = useState([]);
  const [editingPolicy, setEditingPolicy] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [objectives, setObjectives] = useState('');
  const [implementation, setImplementation] = useState('');
  const [timeline, setTimeline] = useState('');
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    const data = await getPolicies();
    setPolicies(data);
  };

  const handleSave = async () => {
    const objectivesList = objectives.split('\n').map(item => item.trim());
    const implementationList = implementation.split('\n').map(item => item.trim());
    const policyData = {
      title,
      description,
      content,
      objectives: objectivesList,
      implementation: implementationList,
      timeline,
      image: imageUrl
    };
    if (editingPolicy) {
      await updatePolicy(editingPolicy.id, policyData);
    } else {
      await createPolicy(policyData);
    }
    setEditingPolicy(null);
    setTitle('');
    setDescription('');
    setContent('');
    setObjectives('');
    setImplementation('');
    setTimeline('');
    setImageUrl('');
    setFile(null);
    fetchPolicies();
  };

  const handleEdit = (policy) => {
    setEditingPolicy(policy);
    setTitle(policy.title);
    setDescription(policy.description);
    setContent(policy.content);
    setObjectives(policy.objectives.join('\n'));
    setImplementation(policy.implementation.join('\n'));
    setTimeline(policy.timeline);
    setImageUrl(policy.image);
  };

  const handleDelete = async (id) => {
    await deletePolicy(id);
    fetchPolicies();
  };

  const handleFileChange = async (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      const { url } = await uploadFile(uploadedFile);
      setFile(uploadedFile);
      setImageUrl(url);
    }
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
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">內容</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} className="w-full px-3 py-2 border rounded" rows="4"></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">政策目標 (每行一個目標)</label>
          <textarea value={objectives} onChange={(e) => setObjectives(e.target.value)} className="w-full px-3 py-2 border rounded" rows="4"></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">實施計劃 (每行一個項目)</label>
          <textarea value={implementation} onChange={(e) => setImplementation(e.target.value)} className="w-full px-3 py-2 border rounded" rows="4"></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">實施時間</label>
          <input type="text" value={timeline} onChange={(e) => setTimeline(e.target.value)} className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">圖片上傳</label>
          <input type="file" onChange={handleFileChange} className="w-full px-3 py-2 border rounded" />
          {imageUrl && <img src={imageUrl} alt="Policy" className="mt-4 h-48 w-full object-cover" />}
        </div>
        <button onClick={handleSave} className="bg-indigo-600 text-white px-4 py-2 rounded">{editingPolicy ? '更新' : '保存'}</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {policies.map((policy) => (
          <div key={policy.id} className="bg-white p-6 rounded-lg shadow-lg">
            <img src={policy.image} alt={policy.title} className="w-full h-48 object-cover rounded-t-lg" />
            <h2 className="text-2xl font-bold mb-4 text-gray-800">{policy.title}</h2>
            <p className="text-gray-700 mb-4">{policy.description}</p>
            <div className="flex items-center mb-2 text-gray-600">
              <Target className="mr-2" size={20} />
              <span>政策目標</span>
            </div>
            <ul className="list-disc list-inside mb-4 text-gray-700">
              {policy.objectives.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <div className="flex items-center mb-2 text-gray-600">
              <Clock className="mr-2" size={20} />
              <span>實施時間: {policy.timeline}</span>
            </div>
            <div className="flex space-x-2">
              <button onClick={() => handleEdit(policy)} className="bg-yellow-500 text-white px-4 py-2 rounded">編輯</button>
              <button onClick={() => handleDelete(policy.id)} className="bg-red-600 text-white px-4 py-2 rounded">刪除</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PolicyManagement;
