import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AssessmentIcon from '@mui/icons-material/Assessment';
import BadgeIcon from '@mui/icons-material/Badge';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    const result = login(email, password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-left-content">
          <div className="fiap-logo-large">
            <img src="/images (1).webp" alt="FIAP" className="logo-img" onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }} />
            <span className="logo-fallback" style={{display: 'none'}}>FIAP</span>
          </div>
          <h1>Portal do Aluno</h1>
          <p>Acesse sua área exclusiva e tenha acesso a todos os serviços acadêmicos.</p>
          <div className="features-list">
            <div className="feature-item">
              <MenuBookIcon className="feature-icon" />
              <span>Material Didático</span>
            </div>
            <div className="feature-item">
              <AssessmentIcon className="feature-icon" />
              <span>Notas e Frequência</span>
            </div>
            <div className="feature-item">
              <BadgeIcon className="feature-icon" />
              <span>Carteirinha Digital</span>
            </div>
            <div className="feature-item">
              <CalendarMonthIcon className="feature-icon" />
              <span>Calendário Acadêmico</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="login-right">
        <div className="login-form-container">
          <div className="login-header">
            <div className="fiap-logo-small">
              <span className="logo-text-small">FIAP</span>
            </div>
            <h2>Bem-vindo de volta!</h2>
            <p>Entre com suas credenciais para acessar o portal</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <div className="error-message">
                <WarningAmberIcon className="error-icon" />
                {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">E-mail institucional</label>
              <div className="input-wrapper">
                <EmailOutlinedIcon className="input-icon" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu.nome@fiap.com.br"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <div className="input-wrapper">
                <LockOutlinedIcon className="input-icon" />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>Lembrar-me</span>
              </label>
              <button type="button" className="forgot-password">Esqueci minha senha</button>
            </div>

            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? (
                <span className="loading-spinner"></span>
              ) : (
                'Entrar'
              )}
            </button>
          </form>

          <div className="login-footer">
            <p>Problemas para acessar? <button type="button" className="link-btn">Entre em contato</button></p>
            <div className="footer-links">
              <button type="button" className="link-btn">Termos de Uso</button>
              <span>•</span>
              <button type="button" className="link-btn">Política de Privacidade</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
