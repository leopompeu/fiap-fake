import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Carteirinha from './components/Carteirinha';
import Verificacao from './components/Verificacao';
import Header from './components/Header';

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="app">
      <Routes>
        {/* Public route for verification */}
        <Route path="/verificar" element={<Verificacao />} />
        
        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <>
                <Header />
                <Dashboard />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/carteirinha"
          element={
            <PrivateRoute>
              <>
                <Header />
                <Carteirinha />
              </>
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
