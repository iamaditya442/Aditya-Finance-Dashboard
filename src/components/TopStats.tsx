import React from 'react';
import { useAppState } from '../context/AppState';
import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatCurrency, cn } from '../lib/utils';
import { motion } from 'motion/react';

// A single box showing a specific financial number
interface InfoBoxProps {
  label: string;
  value: number;
  icon: React.ElementType;
  themeColor: string;
  changePercent?: number;
}

const InfoBox: React.FC<InfoBoxProps> = ({ label, value, icon: Icon, themeColor, changePercent }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="flex items-center justify-between mb-4">
      <div className={cn("p-3 rounded-xl", themeColor)}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      {changePercent !== undefined && (
        <div className={cn(
          "flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium",
          changePercent >= 0 ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
        )}>
          {changePercent >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {Math.abs(changePercent)}%
        </div>
      )}
    </div>
    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{label}</p>
    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(value)}</h3>
  </motion.div>
);

// The row of boxes at the top of the dashboard
export const TopStats: React.FC = () => {
  const { summary } = useAppState();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <InfoBox
        label="Current Balance"
        value={summary.balance}
        icon={Wallet}
        themeColor="bg-indigo-600"
        changePercent={12.5}
      />
      <InfoBox
        label="Total Income"
        value={summary.income}
        icon={TrendingUp}
        themeColor="bg-emerald-600"
        changePercent={8.2}
      />
      <InfoBox
        label="Total Expenses"
        value={summary.expense}
        icon={TrendingDown}
        themeColor="bg-rose-600"
        changePercent={-4.3}
      />
    </div>
  );
};
