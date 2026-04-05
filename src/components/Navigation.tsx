import React, { useState } from 'react';
import { useAppState } from '../context/AppState';
import { Wallet, LayoutDashboard, List, PieChart, Settings, LogOut, Moon, Sun, User, ShieldCheck, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { ActivePage } from '../types';

// Individual navigation button
interface NavButtonProps {
  icon: React.ElementType;
  label: string;
  isSelected?: boolean;
  onPress?: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ icon: Icon, label, isSelected, onPress }) => (
  <button
    onClick={onPress}
    className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 w-full text-left group",
      isSelected 
        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20" 
        : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
    )}
  >
    <Icon className={cn("w-5 h-5", isSelected ? "text-white" : "text-slate-400 group-hover:text-indigo-500")} />
    <span className="font-medium">{label}</span>
  </button>
);

// The sidebar that stays on the left (or slides in on mobile)
export const Sidebar: React.FC<{ isVisible: boolean; hideSidebar: () => void }> = ({ isVisible, hideSidebar }) => {
  const { currentPage, setPage, handleLogout } = useAppState();

  const navigateTo = (page: ActivePage) => {
    setPage(page);
    hideSidebar();
  };

  return (
    <>
      {/* Dark background overlay for mobile */}
      {isVisible && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={hideSidebar}
        />
      )}

      <aside className={cn(
        "fixed lg:sticky top-0 left-0 z-50 w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 h-screen flex flex-col p-6 transition-transform duration-300 lg:translate-x-0",
        isVisible ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between mb-10 px-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20">
              <Wallet className="text-white w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">MyFinance</h1>
          </div>
          <button onClick={hideSidebar} className="lg:hidden p-2 text-slate-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-2">
          <NavButton 
            icon={LayoutDashboard} 
            label="Home" 
            isSelected={currentPage === 'home'} 
            onPress={() => navigateTo('home')}
          />
          <NavButton 
            icon={List} 
            label="History" 
            isSelected={currentPage === 'history'} 
            onPress={() => navigateTo('history')}
          />
          <NavButton 
            icon={PieChart} 
            label="Visuals" 
            isSelected={currentPage === 'charts'} 
            onPress={() => navigateTo('charts')}
          />
          <NavButton 
            icon={Settings} 
            label="Settings" 
            isSelected={currentPage === 'settings'} 
            onPress={() => navigateTo('settings')}
          />
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
          <NavButton icon={LogOut} label="Log Out" onPress={handleLogout} />
        </div>
      </aside>
    </>
  );
};

// The top bar with title and user info
export const TopBar: React.FC<{ showSidebar: () => void }> = ({ showSidebar }) => {
  const { userRole, isDarkMode, toggleTheme, currentPage } = useAppState();

  const pageTitles: Record<ActivePage, string> = {
    home: 'My Dashboard',
    history: 'Transaction History',
    charts: 'Spending Visuals',
    settings: 'App Settings'
  };

  return (
    <header className="h-20 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-30 px-4 lg:px-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button 
          onClick={showSidebar}
          className="lg:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{pageTitles[currentPage]}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 hidden sm:block">Good to see you again!</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          {userRole === 'admin' ? (
            <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          ) : (
            <User className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          )}
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
            {userRole}
          </span>
        </div>

        <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 border-2 border-white dark:border-slate-700 flex items-center justify-center overflow-hidden">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aditya" alt="User Avatar" referrerPolicy="no-referrer" />
        </div>
      </div>
    </header>
  );
};
