import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BadgeIcon from '@mui/icons-material/Badge';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import DescriptionIcon from '@mui/icons-material/Description';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './Dashboard.css';

function Dashboard() {
  const { user } = useAuth();

  const quickActions = [
    { icon: <BadgeIcon />, label: 'Carteirinha Digital', description: 'Acesse sua carteirinha', path: '/carteirinha', highlight: true },
    { icon: <AssessmentIcon />, label: 'Notas e Faltas', description: 'Consulte seu desempenho', path: '#' },
    { icon: <CalendarMonthIcon />, label: 'Calendário', description: 'Datas importantes', path: '#' },
    { icon: <AccountBalanceWalletIcon />, label: 'Financeiro', description: 'Boletos e pagamentos', path: '#' },
    { icon: <LocalLibraryIcon />, label: 'Biblioteca', description: 'Acervo digital', path: '#' },
    { icon: <DescriptionIcon />, label: 'Requerimentos', description: 'Solicitações acadêmicas', path: '#' },
  ];

  const notifications = [
    { type: 'info', message: 'Período de matrícula aberto até 15/03/2026', time: '2h atrás' },
    { type: 'success', message: 'Nota da disciplina de IA lançada', time: '1 dia atrás' },
    { type: 'warning', message: 'Boleto de março disponível', time: '2 dias atrás' },
  ];

  const upcomingClasses = [
    { time: '19:00', subject: 'Inteligência Artificial', room: 'Lab 3', professor: 'Prof. André' },
    { time: '20:40', subject: 'Desenvolvimento Web', room: 'Sala 205', professor: 'Prof. Marina' },
    { time: '22:00', subject: 'Banco de Dados', room: 'Lab 5', professor: 'Prof. Ricardo' },
  ];

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'info': return <InfoIcon />;
      case 'success': return <CheckCircleIcon />;
      case 'warning': return <WarningIcon />;
      default: return <InfoIcon />;
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <section className="welcome-section">
          <div className="welcome-content">
            <h1>Olá, {user?.nome?.split(' ')[0]}!</h1>
            <p>Bem-vindo ao Portal do Aluno FIAP. Aqui você encontra tudo o que precisa para sua jornada acadêmica.</p>
          </div>
          <div className="welcome-stats">
            <div className="stat-card">
              <span className="stat-value">85%</span>
              <span className="stat-label">Frequência</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">7.8</span>
              <span className="stat-label">Média Geral</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">3º</span>
              <span className="stat-label">Semestre</span>
            </div>
          </div>
        </section>

        <section className="student-info-card">
          <div className="student-avatar">
            <img 
              src="/WhatsApp Image 2026-02-05 at 19.41.06.jpeg" 
              alt={user?.nome}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="avatar-placeholder" style={{display: 'none'}}>
              {user?.nome?.charAt(0)}
            </div>
          </div>
          <div className="student-details">
            <h3>{user?.nome}</h3>
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">RA</span>
                <span className="detail-value">{user?.ra}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Curso</span>
                <span className="detail-value">{user?.curso}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Turma</span>
                <span className="detail-value">{user?.turma}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Período</span>
                <span className="detail-value">{user?.periodo}</span>
              </div>
            </div>
          </div>
        </section>

        <div className="dashboard-grid">
          <section className="quick-actions">
            <h2>Acesso Rápido</h2>
            <div className="actions-grid">
              {quickActions.map((action, index) => (
                <Link 
                  key={index} 
                  to={action.path} 
                  className={`action-card ${action.highlight ? 'highlight' : ''}`}
                >
                  <span className="action-icon">{action.icon}</span>
                  <div className="action-info">
                    <span className="action-label">{action.label}</span>
                    <span className="action-description">{action.description}</span>
                  </div>
                  <ArrowForwardIcon className="action-arrow" />
                </Link>
              ))}
            </div>
          </section>

          <section className="today-classes">
            <h2>Aulas de Hoje</h2>
            <div className="classes-list">
              {upcomingClasses.map((cls, index) => (
                <div key={index} className="class-item">
                  <div className="class-time">
                    <span>{cls.time}</span>
                  </div>
                  <div className="class-info">
                    <span className="class-subject">{cls.subject}</span>
                    <span className="class-details">{cls.room} • {cls.professor}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="notifications">
            <h2>Notificações</h2>
            <div className="notifications-list">
              {notifications.map((notification, index) => (
                <div key={index} className={`notification-item ${notification.type}`}>
                  <div className="notification-icon">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="notification-content">
                    <span className="notification-message">{notification.message}</span>
                    <span className="notification-time">{notification.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
