import React from 'react';
import { useAppState } from '../context/AppState';
import { Lightbulb, TrendingUp, ShoppingBag, CheckCircle2 } from 'lucide-react';
import { formatCurrency, cn } from '../lib/utils';
import { motion } from 'motion/react';

// This component gives helpful financial advice based on current data
export const Tips: React.FC = () => {
  const { summary } = useAppState();

  const highestSpendingCategory = summary.categoryData[0];
  const savingsRate = summary.income > 0 ? ((summary.income - summary.expense) / summary.income) * 100 : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Top Spending Category */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-800/50"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-indigo-600 rounded-lg">
            <ShoppingBag className="w-5 h-5 text-white" />
          </div>
          <h4 className="font-semibold text-indigo-900 dark:text-indigo-300">Top Spending</h4>
        </div>
        <p className="text-sm text-indigo-700 dark:text-indigo-400 mb-2">
          Your highest spending category is <span className="font-bold">{highestSpendingCategory?.name || 'N/A'}</span>.
        </p>
        <div className="text-2xl font-bold text-indigo-900 dark:text-indigo-200">
          {formatCurrency(highestSpendingCategory?.value || 0)}
        </div>
      </motion.div>

      {/* Savings Rate Info */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-800/50"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-emerald-600 rounded-lg">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <h4 className="font-semibold text-emerald-900 dark:text-emerald-300">Savings Rate</h4>
        </div>
        <p className="text-sm text-emerald-700 dark:text-emerald-400 mb-2">
          You saved <span className="font-bold">{savingsRate.toFixed(1)}%</span> of your income this month.
        </p>
        <div className="text-2xl font-bold text-emerald-900 dark:text-emerald-200">
          {savingsRate > 20 ? 'Great Job!' : 'Keep it up!'}
        </div>
      </motion.div>

      {/* Quick Financial Tip */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-2xl border border-amber-100 dark:border-amber-800/50"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-amber-600 rounded-lg">
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          <h4 className="font-semibold text-amber-900 dark:text-amber-300">Quick Tip</h4>
        </div>
        <p className="text-sm text-amber-700 dark:text-amber-400 leading-relaxed">
          {summary.expense > summary.income 
            ? "Your expenses exceed your income. Consider reviewing your non-essential spending."
            : "You're living within your means. Consider investing your surplus for long-term growth."}
        </p>
      </motion.div>
    </div>
  );
};
