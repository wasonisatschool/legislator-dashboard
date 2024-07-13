import React, { useState, useEffect } from 'react';
import { getAboutInfo, updateAboutInfo, uploadFile } from '../api/about';

const AboutManagement = () => {
  const [aboutInfo, setAboutInfo] = useState({
    name: '',
    title: '',
    image: '',
    biography: [],
    education: [],
    expertise: [],
    volunteer: [],
    philosophy: []
  });
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    fetchAboutInfo();
  }, []);

  const fetchAboutInfo = async () => {
    const data = await getAboutInfo();
    setAboutInfo(data);
    setImageUrl(data.image);
  };

  const handleSave = async () => {
    const updatedInfo = { ...aboutInfo, image: imageUrl };
    const response = await updateAboutInfo(updatedInfo);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAboutInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleArrayChange = (e, key) => {
    const { value } = e.target;
    setAboutInfo(prevState => ({
      ...prevState,
      [key]: value.split('\n')
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">關於管理</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">個人信息</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">姓名</label>
          <input type="text" name="name" value={aboutInfo.name} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">標題</label>
          <input type="text" name="title" value={aboutInfo.title} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">個人簡介</label>
          <textarea name="biography" value={aboutInfo.biography.join('\n')} onChange={(e) => handleArrayChange(e, 'biography')} className="w-full px-3 py-2 border rounded" rows="4"></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">學歷</label>
          <textarea name="education" value={aboutInfo.education.join('\n')} onChange={(e) => handleArrayChange(e, 'education')} className="w-full px-3 py-2 border rounded" rows="2"></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">專業領域</label>
          <textarea name="expertise" value={aboutInfo.expertise.join('\n')} onChange={(e) => handleArrayChange(e, 'expertise')} className="w-full px-3 py-2 border rounded" rows="2"></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">志願服務</label>
          <textarea name="volunteer" value={aboutInfo.volunteer.join('\n')} onChange={(e) => handleArrayChange(e, 'volunteer')} className="w-full px-3 py-2 border rounded" rows="2"></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">政治理念</label>
          <textarea name="philosophy" value={aboutInfo.philosophy.join('\n')} onChange={(e) => handleArrayChange(e, 'philosophy')} className="w-full px-3 py-2 border rounded" rows="4"></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">圖片上傳</label>
          <input type="file" onChange={handleFileChange} className="w-full px-3 py-2 border rounded" />
          {imageUrl && <img src={imageUrl} alt="Profile" className="mt-4 h-48 w-full object-cover" />}
        </div>
        <button onClick={handleSave} className="bg-indigo-600 text-white px-4 py-2 rounded">保存</button>
      </div>
    </div>
  );
};

export default AboutManagement;
