import React, { useState, useEffect } from 'react';
import { getActivities, createActivity, updateActivity, deleteActivity, uploadFile } from '../api/activities';
import { Calendar, MapPin, Clock, Users, Share2 } from 'lucide-react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [editingActivity, setEditingActivity] = useState(null);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [agenda, setAgenda] = useState('');
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    const data = await getActivities();
    setActivities(data);
  };

  const handleSave = async () => {
    const agendaItems = agenda.split('\n').map(item => item.trim());
    const activityData = {
      title,
      date,
      time,
      location,
      description,
      agenda: agendaItems,
      image: imageUrl
    };
    if (editingActivity) {
      await updateActivity(editingActivity.id, activityData);
    } else {
      await createActivity(activityData);
    }
    setEditingActivity(null);
    setTitle('');
    setDate('');
    setTime('');
    setLocation('');
    setDescription('');
    setAgenda('');
    setImageUrl('');
    setFile(null);
    fetchActivities();
  };

  const handleEdit = (activity) => {
    setEditingActivity(activity);
    setTitle(activity.title);
    setDate(activity.date);
    setTime(activity.time);
    setLocation(activity.location);
    setDescription(activity.description);
    setAgenda(activity.agenda.join('\n'));
    setImageUrl(activity.image);
  };

  const handleDelete = async (id) => {
    await deleteActivity(id);
    fetchActivities();
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
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">活動管理</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{editingActivity ? '編輯活動' : '新增活動'}</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">標題</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">日期</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">時間</label>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">地點</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">描述</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-2 border rounded" rows="4"></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">議程 (每行一個項目)</label>
          <textarea value={agenda} onChange={(e) => setAgenda(e.target.value)} className="w-full px-3 py-2 border rounded" rows="4"></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">圖片上傳</label>
          <input type="file" onChange={handleFileChange} className="w-full px-3 py-2 border rounded" />
          {imageUrl && <img src={imageUrl} alt="Activity" className="mt-4 h-48 w-full object-cover" />}
        </div>
        <button onClick={handleSave} className="bg-indigo-600 text-white px-4 py-2 rounded">{editingActivity ? '更新' : '保存'}</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {activities.map((activity) => (
          <div key={activity.id} className="bg-white p-6 rounded-lg shadow-lg">
            <img src={activity.image} alt={activity.title} className="w-full h-48 object-cover rounded-t-lg" />
            <h2 className="text-2xl font-bold mb-4 text-gray-800">{activity.title}</h2>
            <div className="flex items-center mb-2 text-gray-600">
              <Calendar className="mr-2" size={20} />
              <span>{activity.date}</span>
            </div>
            <div className="flex items-center mb-2 text-gray-600">
              <Clock className="mr-2" size={20} />
              <span>{activity.time}</span>
            </div>
            <div className="flex items-center mb-2 text-gray-600">
              <MapPin className="mr-2" size={20} />
              <span>{activity.location}</span>
            </div>
            <p className="text-gray-700 mb-4">{activity.description}</p>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">議程</h3>
            <ul className="list-disc list-inside mb-4 text-gray-700">
              {activity.agenda.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <div className="flex space-x-2">
              <button onClick={() => handleEdit(activity)} className="bg-yellow-500 text-white px-4 py-2 rounded">編輯</button>
              <button onClick={() => handleDelete(activity.id)} className="bg-red-600 text-white px-4 py-2 rounded">刪除</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activities;
