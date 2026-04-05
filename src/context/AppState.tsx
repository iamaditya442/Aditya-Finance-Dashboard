import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { FinanceRecord, UserRole, FinanceSummary, ActivePage } from '../types';
import { initialRecords } from '../data/SampleData';

// This context manages the entire app's data and user state
interface AppStateContextType {
  records: FinanceRecord[];
  userRole: UserRole;
  isLoggedIn: boolean;
  currentPage: ActivePage;
  isDarkMode: boolean;
  summary: FinanceSummary;
  handleLogin: (role: UserRole) => void;
  handleLogout: () => void;
  setPage: (page: ActivePage) => void;
  toggleTheme: () => void;
  addNewRecord: (record: Omit<FinanceRecord, 'id'>) => void;
  editRecord: (id: string, record: Partial<FinanceRecord>) => void;
  removeRecord: (id: string) => void;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load saved data or use defaults
  const [records, setRecords] = useState<FinanceRecord[]>(() => {
    const saved = localStorage.getItem('my_finance_data');
    return saved ? JSON.parse(saved) : initialRecords;
  });

  const [userRole, setUserRole] = useState<UserRole>('viewer');
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('is_user_logged_in') === 'true';
  });
  const [currentPage, setCurrentPage] = useState<ActivePage>('home');

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('app_theme_mode');
    return saved ? JSON.parse(saved) : false;
  });

  // Sync with local storage whenever state changes
  useEffect(() => {
    localStorage.setItem('my_finance_data', JSON.stringify(records));
  }, [records]);

  useEffect(() => {
    localStorage.setItem('is_user_logged_in', JSON.stringify(isLoggedIn));
    if (isLoggedIn) {
      const savedRole = localStorage.getItem('user_access_role');
      if (savedRole) setUserRole(savedRole as UserRole);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('app_theme_mode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    localStorage.setItem('user_access_role', role);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('is_user_logged_in');
    localStorage.removeItem('user_access_role');
    setCurrentPage('home');
  };

  const setPage = (page: ActivePage) => setCurrentPage(page);

  const addNewRecord = (record: Omit<FinanceRecord, 'id'>) => {
    const newEntry = {
      ...record,
      id: Math.random().toString(36).substring(2, 11),
    };
    setRecords([newEntry, ...records]);
  };

  const editRecord = (id: string, updates: Partial<FinanceRecord>) => {
    setRecords(records.map(r => r.id === id ? { ...r, ...updates } : r));
  };

  const removeRecord = (id: string) => {
    setRecords(records.filter(r => r.id !== id));
  };

  // Calculate all the numbers for the dashboard
  const summary = useMemo(() => {
    const income = records
      .filter(r => r.type === 'income')
      .reduce((total, r) => total + r.amount, 0);
    
    const expense = records
      .filter(r => r.type === 'expense')
      .reduce((total, r) => total + r.amount, 0);

    const balance = income - expense;

    const categoryMap = records
      .filter(r => r.type === 'expense')
      .reduce((acc, r) => {
        acc[r.category] = (acc[r.category] || 0) + r.amount;
        return acc;
      }, {} as Record<string, number>);

    const categoryData = Object.entries(categoryMap).map(([name, value]) => ({
      name,
      value: value as number,
    })).sort((a, b) => b.value - a.value);

    const sortedRecords = [...records].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    let runningBalance = 0;
    const trendData = sortedRecords.map(r => {
      if (r.type === 'income') runningBalance += r.amount;
      else runningBalance -= r.amount;
      return {
        date: r.date,
        balance: runningBalance,
      };
    });

    return {
      balance,
      income,
      expense,
      categoryData,
      trendData,
    };
  }, [records]);

  return (
    <AppStateContext.Provider value={{
      records,
      userRole,
      isLoggedIn,
      currentPage,
      isDarkMode,
      summary,
      handleLogin,
      handleLogout,
      setPage,
      toggleTheme,
      addNewRecord,
      editRecord,
      removeRecord,
    }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};
