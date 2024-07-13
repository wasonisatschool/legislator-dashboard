import React, { useState, useEffect } from 'react';
import { getHomeInfo, updateHomeInfo, uploadFile } from '../api/home';

const HomeManagement = () => {
  const [homeInfo, setHomeInfo] = useState({
    hero: {
      title: '',
      subtitle: '',
      image: ''
    },
    about: {
      title: '',
      content: ''
    },
    news: [],
    policies: []
  });
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    fetchHomeInfo();
  }, []);

  const fetchHomeInfo = async () => {
    const data = await getHomeInfo();
    setHomeInfo(data);
    setImageUrl(data.hero.image);
  };

  const handleSave = async () => {
    const updatedInfo = { ...homeInfo, hero: { ...homeInfo.hero, image: imageUrl } };
    const response = await updateHomeInfo(updatedInfo);
    alert(response.message);
  };

  const handleFileChange = async (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      const { url } = await uploadFile(uploadedFile);
      setFile(uploadedFile);
      setImageUrl(url);
    }
  };

  const handleChange = (e, section, field) => {
    const { value } = e.target;
    setHomeInfo(prevState => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [field]: value
      }
    }));
  };

  const handleArrayChange = (e, section, index, field) => {
    const { value } = e.target;
    const updatedArray = [...homeInfo[section]];
    updatedArray[index][field] = value;
    setHomeInfo(prevState => ({
      ...prevState,
      [section]: updatedArray
    }));
  };

  const addNewsItem = () => {
    setHomeInfo(prevState => ({
      ...prevState,
      news: [...prevState.news, { id: Math.random(), date: '', title: '', summary: '' }]
    }));
  };

  const addPolicyItem = () => {
    setHomeInfo(prevState => ({
      ...prevState,
      policies: [...prevState.policies, { id: Math.random(), title: '', description: '', image: '', color: '' }]
    }));
  };

  const removeItem = (section, index) => {
    const updatedArray = [...homeInfo[section]];
    updatedArray.splice(index, 1);
    setHomeInfo(prevState => ({
      ...prevState,
      [section]: updatedArray
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">首頁管理</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">主題區域</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">標題</label>
          <input type="text" value={homeInfo.hero.title} onChange={(e) => handleChange(e, 'hero', 'title')} className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">副標題</label>
          <input type="text" value={homeInfo.hero.subtitle} onChange={(e) => handleChange(e, 'hero', 'subtitle')} className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">圖片上傳</label>
          <input type="file" onChange={handleFileChange} className="w-full px-3 py-2 border rounded" />
          {imageUrl && <img src={imageUrl} alt="Hero" className="mt-4 h-48 w-full object-cover" />}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">關於我們</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">標題</label>
          <input type="text" value={homeInfo.about.title} onChange={(e) => handleChange(e, 'about', 'title')} className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">內容</label>
          <textarea value={homeInfo.about.content} onChange={(e) => handleChange(e, 'about', 'content')} className="w-full px-3 py-2 border rounded" rows="4"></textarea>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">最新活動</h2>
        {homeInfo.news.map((item, index) => (
          <div key={item.id} className="mb-4 border-b pb-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-800">活動項目 {index + 1}</h3>
              <button onClick={() => removeItem('news', index)} className="text-red-600 hover:text-red-800">刪除</button>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">日期</label>
              <input type="date" value={item.date} onChange={(e) => handleArrayChange(e, 'news', index, 'date')} className="w-full px-3 py-2 border rounded" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">標題</label>
              <input type="text" value={item.title} onChange={(e) => handleArrayChange(e, 'news', index, 'title')} className="w-full px-3 py-2 border rounded" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">摘要</label>
              <textarea value={item.summary} onChange={(e) => handleArrayChange(e, 'news', index, 'summary')} className="w-full px-3 py-2 border rounded" rows="2"></textarea>
            </div>
          </div>
        ))}
        <button onClick={addNewsItem} className="bg-indigo-600 text-white px-4 py-2 rounded">新增活動</button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">政策議題</h2>
        {homeInfo.policies.map((policy, index) => (
          <div key={policy.id} className="mb-4 border-b pb-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-800">政策項目 {index + 1}</h3>
              <button onClick={() => removeItem('policies', index)} className="text-red-600 hover:text-red-800">刪除</button>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">標題</label>
              <input type="text" value={policy.title} onChange={(e) => handleArrayChange(e, 'policies', index, 'title')} className="w-full px-3 py-2 border rounded" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">描述</label>
              <textarea value={policy.description} onChange={(e) => handleArrayChange(e, 'policies', index, 'description')} className="w-full px-3 py-2 border rounded" rows="2"></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">圖片上傳</label>
              <input type="file" onChange={(e) => handleFileChange(e, 'policies', index)} className="w-full px-3 py-2 border rounded" />
              {policy.image && <img src={policy.image} alt="Policy" className="mt-4 h-48 w-full object-cover" />}
            </div>
          </div>
        ))}
        <button onClick={addPolicyItem} className="bg-indigo-600 text-white px-4 py-2 rounded">新增政策</button>
      </div>

      <button onClick={handleSave} className="bg-indigo-600 text-white px-4 py-2 rounded">保存</button>
    </div>
  );
};

export default HomeManagement;
