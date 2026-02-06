import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

const MOCK_USER = {
  email: 'leonardo.pompeu@fiap.com.br',
  password: '06032002',
  nome: 'Leonardo Pompeu',
  cpf: '395.769.478-71',
  ra: '348521',
  curso: 'Análise e Desenvolvimento de Sistemas',
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
