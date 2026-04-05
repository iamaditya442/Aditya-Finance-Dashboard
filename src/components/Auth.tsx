import React, { useState } from 'react';
import { useAppState } from '../context/AppState';
import { Wallet, ShieldCheck, User, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { UserRole } from '../types';

// The first page users see to choose their role and log in
export const Auth: React.FC = () => {
  const { handleLogin } = useAppState();
  const [isBusy, setIsBusy] = useState(false);
  const [chosenRole, setChosenRole] = useState<UserRole | null>(null);

  const onLoginClick = async (role: UserRole) => {
    setChosenRole(role);
    setIsBusy(true);
    // Simulate a network delay
    await new Promise(r => setTimeout(r, 800));
    handleLogin(role);
    setIsBusy(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-200 dark:shadow-none mb-6">
            <Wallet className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">MyFinance</h1>
          <p className="text-slate-500 dark:text-slate-400">Select your access level to continue</p>
        </div>

        <div className="space-y-4">
          {/* Admin Login Button */}
          <button
            onClick={() => onLoginClick('admin')}
            disabled={isBusy}
            className="w-full group bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-indigo-500 dark:hover:border-indigo-500 transition-all text-left flex items-center justify-between disabled:opacity-70"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">
                {isBusy && chosenRole === 'admin' ? <Loader2 className="w-6 h-6 animate-spin" /> : <ShieldCheck className="w-6 h-6" />}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">Admin Access</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Full control over records</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
          </button>

          {/* Viewer Login Button */}
          <button
            onClick={() => onLoginClick('viewer')}
            disabled={isBusy}
            className="w-full group bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-emerald-500 dark:hover:border-emerald-500 transition-all text-left flex items-center justify-between disabled:opacity-70"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl text-emerald-600 dark:text-emerald-400">
                {isBusy && chosenRole === 'viewer' ? <Loader2 className="w-6 h-6 animate-spin" /> : <User className="w-6 h-6" />}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">Viewer Access</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">View-only dashboard access</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
          </button>
        </div>

        <p className="mt-12 text-center text-xs text-slate-400 dark:text-slate-600">
          Aditya Verma
        </p>
      </motion.div>
    </div>
  );
};
