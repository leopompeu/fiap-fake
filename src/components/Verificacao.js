import React from 'react';
import { useSearchParams } from 'react-router-dom';
import VerifiedIcon from '@mui/icons-material/Verified';
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import SchoolIcon from '@mui/icons-material/School';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import './Verificacao.css';

function Verificacao() {
  const [searchParams] = useSearchParams();
  
  // Dados do aluno (em produção viria de uma API)
  const studentData = {
    nome: 'Leonardo Pompeu',
    ra: '348521',
    cpf: '395.769.478-71',
    curso: 'Análise e Desenvolvimento de Sistemas',
    turma: '1TDSPS',
    unidade: 'Paulista',
    periodo: 'Noturno',
    validade: '28/06/2026',
    status: 'ATIVO',
    foto: '/WhatsApp Image 2026-02-05 at 19.41.06.jpeg'
  };

  const ra = searchParams.get('ra') || studentData.ra;
  const isValid = ra === studentData.ra;

  const currentDate = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <div className="verificacao-page">
      <div className="verificacao-container">
        <div className="verificacao-header">
          <img 
            src="/images (1).webp" 
            alt="FIAP" 
            className="fiap-logo"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <span className="logo-fallback" style={{display: 'none'}}>FIAP</span>
          <h1>Verificação de Carteirinha</h1>
          <p>Sistema de autenticação de documentos estudantis</p>
        </div>

        {isValid ? (
          <>
            <div className="status-card success">
              <div className="status-icon">
                <VerifiedIcon />
              </div>
              <div className="status-content">
                <h2>Carteirinha Válida</h2>
                <p>Este documento é autêntico e está ativo no sistema da FIAP</p>
              </div>
            </div>

            <div className="student-card-verification">
              <div className="student-photo-section">
                <img 
                  src={studentData.foto} 
                  alt={studentData.nome}
                  className="student-photo-large"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div className="photo-verified">
                  <CheckCircleIcon />
                  <span>Foto verificada</span>
                </div>
              </div>

              <div className="student-data">
                <div className="data-item">
                  <div className="data-icon"><PersonIcon /></div>
                  <div className="data-content">
                    <span className="data-label">Nome Completo</span>
                    <span className="data-value">{studentData.nome}</span>
                  </div>
                </div>

                <div className="data-row">
                  <div className="data-item">
                    <div className="data-icon"><BadgeIcon /></div>
                    <div className="data-content">
                      <span className="data-label">RA</span>
                      <span className="data-value">{studentData.ra}</span>
                    </div>
                  </div>

                  <div className="data-item">
                    <div className="data-icon"><BadgeIcon /></div>
                    <div className="data-content">
                      <span className="data-label">CPF</span>
                      <span className="data-value">{studentData.cpf}</span>
                    </div>
                  </div>
                </div>

                <div className="data-item">
                  <div className="data-icon"><SchoolIcon /></div>
                  <div className="data-content">
                    <span className="data-label">Curso</span>
                    <span className="data-value">{studentData.curso}</span>
                  </div>
                </div>

                <div className="data-row">
                  <div className="data-item">
                    <div className="data-icon"><SchoolIcon /></div>
                    <div className="data-content">
                      <span className="data-label">Turma</span>
                      <span className="data-value">{studentData.turma}</span>
                    </div>
                  </div>

                  <div className="data-item">
                    <div className="data-icon"><LocationOnIcon /></div>
                    <div className="data-content">
                      <span className="data-label">Unidade</span>
                      <span className="data-value">{studentData.unidade}</span>
                    </div>
                  </div>
                </div>

                <div className="data-item highlight">
                  <div className="data-icon"><CalendarMonthIcon /></div>
                  <div className="data-content">
                    <span className="data-label">Válido até</span>
                    <span className="data-value">{studentData.validade}</span>
                  </div>
                  <div className="status-badge active">
                    <span className="status-dot"></span>
                    {studentData.status}
                  </div>
                </div>
              </div>
            </div>

            <div className="verification-footer">
              <div className="verification-info">
                <p>Verificação realizada em: <strong>{currentDate}</strong></p>
                <p>Código de autenticação: <strong>FIAP-{studentData.ra}-2026</strong></p>
              </div>
              <div className="security-notice">
                <VerifiedIcon />
                <span>Documento verificado pelo sistema oficial da FIAP</span>
              </div>
            </div>
          </>
        ) : (
          <div className="status-card error">
            <div className="status-icon">
              <VerifiedIcon />
            </div>
            <div className="status-content">
              <h2>Carteirinha Não Encontrada</h2>
              <p>Não foi possível verificar este documento. Verifique o QR Code e tente novamente.</p>
            </div>
          </div>
        )}

        <div className="back-link">
          <a href="/">Voltar ao Portal do Aluno</a>
        </div>
      </div>
    </div>
  );
}

export default Verificacao;
