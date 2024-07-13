import React, { useState, useEffect } from 'react';
import { getActivities } from '../api/activities';
import { getPolicies } from '../api/policies';
import { getUsers } from '../api/auth';
import { getAboutInfo } from '../api/about';

const Dashboard = () => {
  const [activitiesCount, setActivitiesCount] = useState(0);
  const [policiesCount, setPoliciesCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [aboutInfo, setAboutInfo] = useState(null);

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    const activities = await getActivities();
    setActivitiesCount(activities.length);

    const policies = await getPolicies();
    setPoliciesCount(policies.length);

    const users = await getUsers();
    setUsersCount(users.length);

    const about = await getAboutInfo();
    setAboutInfo(about);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">後台管理系統儀表板</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">活動管理</h2>
          <p className="text-3xl font-semibold text-indigo-600">{activitiesCount}</p>
          <p className="text-gray-600">活動總數</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">政策管理</h2>
          <p className="text-3xl font-semibold text-indigo-600">{policiesCount}</p>
          <p className="text-gray-600">政策總數</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">用戶管理</h2>
          <p className="text-3xl font-semibold text-indigo-600">{usersCount}</p>
          <p className="text-gray-600">用戶總數</p>
        </div>
      </div>
      {aboutInfo && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">關於管理</h2>
          <p className="text-xl font-semibold text-indigo-600">{aboutInfo.name}</p>
          <p className="text-gray-600">{aboutInfo.title}</p>
          <p className="text-gray-600">{aboutInfo.biography.join(' ')}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
