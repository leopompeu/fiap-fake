import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import HomeIcon from '@mui/icons-material/Home';
import BadgeIcon from '@mui/icons-material/Badge';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './Header.css';

function Header() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { path: '/dashboard', label: 'Início', icon: <HomeIcon /> },
    { path: '/carteirinha', label: 'Carteirinha', icon: <BadgeIcon /> },
    { path: '#', label: 'Notas', icon: <AssessmentIcon /> },
    { path: '#', label: 'Financeiro', icon: <AccountBalanceWalletIcon /> },
    { path: '#', label: 'Biblioteca', icon: <LocalLibraryIcon /> },
  ];

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <Link to="/dashboard" className="header-logo">
            <img 
              src="/images (1).webp" 
              alt="FIAP" 
              className="header-logo-img"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <span className="header-logo-text" style={{display: 'none'}}>FIAP</span>
          </Link>
          
          <nav className={`header-nav ${isMenuOpen ? 'open' : ''}`}>
            {menuItems.map((item) => (
              <Link
                key={item.path + item.label}
                to={item.path}
                className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="header-right">
          <div className="header-user">
            <div className="user-avatar">
              <img 
                src="/WhatsApp Image 2026-02-05 at 19.41.06.jpeg" 
                alt={user?.nome}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <span className="avatar-fallback" style={{display: 'none'}}>
                {user?.nome?.charAt(0) || 'U'}
              </span>
            </div>
            <div className="user-info">
              <span className="user-name">{user?.nome}</span>
              <span className="user-ra">RA: {user?.ra}</span>
            </div>
            <div className="user-dropdown">
              <button className="dropdown-toggle">
                <KeyboardArrowDownIcon />
              </button>
              <div className="dropdown-menu">
                <Link to="/carteirinha" className="dropdown-item">
                  <BadgeIcon /> Carteirinha
                </Link>
                <button className="dropdown-item">
                  <SettingsIcon /> Configurações
                </button>
                <button onClick={handleLogout} className="dropdown-item logout">
                  <LogoutIcon /> Sair
                </button>
              </div>
            </div>
          </div>

          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
