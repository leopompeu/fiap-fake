import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useAuth } from '../context/AuthContext';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import DownloadIcon from '@mui/icons-material/Download';
import RefreshIcon from '@mui/icons-material/Refresh';
import VerifiedIcon from '@mui/icons-material/Verified';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import SchoolIcon from '@mui/icons-material/School';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import './Carteirinha.css';

function Carteirinha() {
  const { user } = useAuth();
  const [isFlipped, setIsFlipped] = useState(false);

  const formatCPF = (cpf) => {
    return cpf;
  };

  const getCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // URL de verificação que será codificada no QR Code
  const verificationUrl = `${window.location.origin}/verificar?ra=${user?.ra}`;

  return (
    <div className="carteirinha-page">
      <div className="carteirinha-container">
        <div className="carteirinha-header">
          <h1>Carteirinha Digital</h1>
          <p>Sua identificação estudantil sempre com você</p>
        </div>

        <div className="card-wrapper">
          <div 
            className={`student-card ${isFlipped ? 'flipped' : ''}`}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            {/* Frente da Carteirinha */}
            <div className="card-front">
              <div className="card-header">
                <div className="card-logo">
                  <img 
                    src="/images (1).webp" 
                    alt="FIAP" 
                    className="fiap-logo-card"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <span className="card-logo-text" style={{display: 'none'}}>FIAP</span>
                </div>
                <div className="card-badge">
                  <span>ESTUDANTE</span>
                </div>
              </div>

              <div className="card-body">
                <div className="card-photo">
                  <img 
                    src="/WhatsApp Image 2026-02-05 at 19.41.06.jpeg" 
                    alt={user?.nome}
                    className="student-photo"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="photo-placeholder" style={{display: 'none'}}>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="photo-icon">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                </div>

                <div className="card-info">
                  <div className="info-name">{user?.nome}</div>
                  
                  <div className="info-grid">
                    <div className="info-item">
                      <span className="info-label">RA</span>
                      <span className="info-value">{user?.ra}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">CPF</span>
                      <span className="info-value">{formatCPF(user?.cpf)}</span>
                    </div>
                  </div>

                  <div className="info-item full">
                    <span className="info-label">CURSO</span>
                    <span className="info-value course-value">{user?.curso}</span>
                  </div>

                  <div className="info-grid">
                    <div className="info-item">
                      <span className="info-label">TURMA</span>
                      <span className="info-value">{user?.turma}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">UNIDADE</span>
                      <span className="info-value">{user?.unidade}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-footer">
                <div className="validity">
                  <span className="validity-label">VÁLIDO ATÉ</span>
                  <span className="validity-date">{user?.validadeCarteirinha}</span>
                </div>
                <div className="card-status valid">
                  <span className="status-dot"></span>
                  <span>ATIVO</span>
                </div>
              </div>

              <div className="card-pattern"></div>
            </div>

            {/* Verso da Carteirinha */}
            <div className="card-back">
              <div className="back-header">
                <img 
                  src="/images (1).webp" 
                  alt="FIAP" 
                  className="fiap-logo-card-back"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <span className="card-logo-text-white" style={{display: 'none'}}>FIAP</span>
                <span className="back-subtitle">Faculdade de Informática e Administração Paulista</span>
              </div>

              <div className="back-body">
                <div className="qr-code">
                  <div className="qr-container">
                    <QRCodeSVG 
                      value={verificationUrl}
                      size={100}
                      bgColor="#ffffff"
                      fgColor="#1a1a1a"
                      level="H"
                      includeMargin={false}
                    />
                  </div>
                  <span>Escaneie para validar</span>
                </div>

                <div className="back-info">
                  <p>Esta carteirinha é pessoal e intransferível. Em caso de perda ou roubo, comunique imediatamente a secretaria.</p>
                  
                  <div className="contact-info">
                    <div className="contact-item">
                      <PhoneIcon className="contact-icon" />
                      <span>(11) 3385-8010</span>
                    </div>
                    <div className="contact-item">
                      <LanguageIcon className="contact-icon" />
                      <span>www.fiap.com.br</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="back-footer">
                <div className="barcode">
                  <div className="barcode-lines">
                    {[...Array(50)].map((_, i) => (
                      <div 
                        key={i} 
                        className="barcode-line"
                        style={{ 
                          width: (i % 3 === 0) ? '2px' : '1px',
                          marginRight: (i % 5 === 0) ? '2px' : '1px'
                        }}
                      ></div>
                    ))}
                  </div>
                  <span className="barcode-number">{user?.ra}00{user?.cpf?.replace(/\D/g, '').slice(0, 6)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="card-hint">Clique no cartão para ver o verso</p>

        <div className="carteirinha-actions">
          <button className="action-btn primary">
            <PhoneAndroidIcon className="btn-icon" />
            Adicionar à Wallet
          </button>
          <button className="action-btn secondary">
            <DownloadIcon className="btn-icon" />
            Baixar PDF
          </button>
          <button className="action-btn secondary">
            <RefreshIcon className="btn-icon" />
            Atualizar Dados
          </button>
        </div>

        <div className="carteirinha-info-section">
          <h2>Informações</h2>
          <div className="info-cards">
            <div className="info-card">
              <div className="info-card-icon">
                <VerifiedIcon />
              </div>
              <div className="info-card-content">
                <h3>Carteirinha Válida</h3>
                <p>Sua carteirinha está ativa e válida até {user?.validadeCarteirinha}</p>
              </div>
            </div>
            <div className="info-card">
              <div className="info-card-icon">
                <ConfirmationNumberIcon />
              </div>
              <div className="info-card-content">
                <h3>Benefícios</h3>
                <p>Meia-entrada em cinemas, teatros, shows e eventos culturais</p>
              </div>
            </div>
            <div className="info-card">
              <div className="info-card-icon">
                <SchoolIcon />
              </div>
              <div className="info-card-content">
                <h3>Acesso ao Campus</h3>
                <p>Use o QR Code para acesso rápido às dependências da FIAP</p>
              </div>
            </div>
          </div>
        </div>

        <div className="last-update">
          <span>Última atualização: {getCurrentDate()}</span>
        </div>
      </div>
    </div>
  );
}

export default Carteirinha;
