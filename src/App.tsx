import React, { useState } from 'react';
import { AppStateProvider, useAppState } from './context/AppState';
import { Sidebar, TopBar } from './components/Navigation';
import { TopStats } from './components/TopStats';
import { Visuals } from './components/Visuals';
import { History } from './components/History';
import { Tips } from './components/Tips';
import { Auth } from './components/Auth';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, PieChart as AnalyticsIcon } from 'lucide-react';

// The main container for the dashboard pages
const DashboardContent: React.FC = () => {
  const { currentPage } = useAppState();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Tips />
            <TopStats />
            <Visuals />
            <History />
          </>
        );
      case 'history':
        return <History />;
      case 'charts':
        return (
          <div className="space-y-6">
            <Visuals />
            <div className="bg-white dark:bg-slate-900 p-12 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
              <AnalyticsIcon className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Advanced Analytics</h3>
              <p className="text-slate-500 dark:text-slate-400">Detailed financial reports and forecasting coming soon.</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white dark:bg-slate-900 p-12 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
            <Settings className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Account Settings</h3>
            <p className="text-slate-500 dark:text-slate-400">Manage your profile, security, and preferences here.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 font-sans selection:bg-indigo-100 selection:text-indigo-900 dark:selection:bg-indigo-900/30 dark:selection:text-indigo-200">
      <Sidebar isVisible={isSidebarVisible} hideSidebar={() => setIsSidebarVisible(false)} />
      
      <main className="flex-1 flex flex-col min-w-0">
        <TopBar showSidebar={() => setIsSidebarVisible(true)} />
        
        <div className="p-4 lg:p-8 max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderCurrentPage()}
            </motion.div>
          </AnimatePresence>
          
          <footer className="mt-12 pb-8 text-center text-slate-400 dark:text-slate-600 text-sm">
            <p>© 2026 MyFinance Dashboard. Built for Frontend Developer Intern Assignment.</p>
          </footer>
        </div>
      </main>
    </div>
  );
};

// Decides whether to show the login page or the dashboard
const AppWrapper: React.FC = () => {
  const { isLoggedIn } = useAppState();
  return isLoggedIn ? <DashboardContent /> : <Auth />;
};

// The root component that provides state to everything else
export default function App() {
  return (
    <AppStateProvider>
      <AppWrapper />
    </AppStateProvider>
  );
}
