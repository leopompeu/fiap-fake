import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

const MOCK_USER = {
  email: 'anac.silva@fiap.com',
  password: 'imsofancy12',
  nome: 'Ana Carolina Pereira da Silva',
  cpf: '504.605.188-52',
  ra: '562914',
  foto: '/3p4.jfif',
  curso: 'UI/UX Design',
  turma: '1TDSPS',
  periodo: 'Noturno',
  unidade: 'Paulista',
  validadeCarteirinha: '28/06/2026'
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (email, password) => {
    if (email === MOCK_USER.email && password === MOCK_USER.password) {
      setUser(MOCK_USER);
      setIsAuthenticated(true);
      return { success: true };
    }
    return { success: false, message: 'E-mail ou senha inválidos' };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
