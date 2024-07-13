import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Activities from './pages/Activities';
import PolicyManagement from './pages/PolicyManagement';
import AboutManagement from './pages/AboutManagement';
import HomeManagement from './pages/HomeManagement';
import Users from './pages/Users';
import Login from './pages/Login';

const RequireAuth = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

const RequireAdmin = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || user.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<RequireAuth><Dashboard /></RequireAuth>} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
            <Route path="/activities" element={<RequireAuth><Activities /></RequireAuth>} />
            <Route path="/policy-management" element={<RequireAuth><PolicyManagement /></RequireAuth>} />
            <Route path="/about-management" element={<RequireAuth><AboutManagement /></RequireAuth>} />
            <Route path="/home-management" element={<RequireAuth><HomeManagement /></RequireAuth>} />
            <Route path="/users" element={<RequireAdmin><Users /></RequireAdmin>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
