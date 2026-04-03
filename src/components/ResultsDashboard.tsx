import React, { useState } from 'react';
import type { AnalysisResult } from '../utils/types';
import { CheckCircle, AlertTriangle, XCircle, TrendingUp, UserCheck, RefreshCw, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ResultsDashboardProps {
  result: AnalysisResult;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ result }) => {
  const [activeTab, setActiveTab] = useState<'feedback' | 'rewriter' | 'recruiter' | 'improved'>('feedback');

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/10';
    return 'text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10';
  };

  return (
    <div className="mt-12 w-full max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* ATS Score Header */}
      <div className={`p-8 rounded-2xl border-2 shadow-xl ${getScoreColor(result.atsScore)} transition-colors`}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left flex-1">
            <h2 className="text-2xl font-bold mb-2 flex items-center justify-center md:justify-start">
              <TrendingUp className="mr-2" /> ATS Optimization Score
            </h2>
            <p className="text-lg opacity-90 leading-relaxed max-w-xl">
              {result.atsExplanation}
            </p>
          </div>
          <div className="relative h-32 w-32 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                className="opacity-20"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={351.8}
                strokeDashoffset={351.8 - (351.8 * result.atsScore) / 100}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <span className="absolute text-4xl font-black">{result.atsScore}</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap justify-center gap-2 border-b border-gray-200 dark:border-gray-700 pb-1">
        {[
          { id: 'feedback', label: 'Detailed Feedback', icon: AlertTriangle },
          { id: 'rewriter', label: 'Bullet Point Rewriter', icon: RefreshCw },
          { id: 'recruiter', label: 'Recruiter POV', icon: UserCheck },
          { id: 'improved', label: 'Improved Resume', icon: FileText },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center px-6 py-3 text-sm font-semibold rounded-t-xl transition-all relative ${
              activeTab === tab.id
                ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <tab.icon size={18} className="mr-2" />
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-tab"
                className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 dark:bg-blue-400"
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'feedback' && (
              <div className="space-y-8">
                <Section title="Strong Points" icon={<CheckCircle className="text-green-500" />} points={result.feedback.strong} color="green" />
                <Section title="Needs Improvement" icon={<AlertTriangle className="text-yellow-500" />} points={result.feedback.improvement} color="yellow" />
                <Section title="Weak Areas" icon={<XCircle className="text-red-500" />} points={result.feedback.weak} color="red" />
              </div>
            )}

            {activeTab === 'rewriter' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Rewritten Bullet Points</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 italic">
                  We've optimized these points using action verbs and quantifiable results:
                </p>
                {result.rewrittenPoints.map((point, i) => (
                  <div key={i} className="p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/50 rounded-lg flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                      {i + 1}
                    </span>
                    <p className="text-gray-800 dark:text-gray-200 leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'recruiter' && (
              <div className="space-y-8">
                <div className="bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-800/50 p-6 rounded-xl">
                  <h3 className="text-lg font-bold text-purple-900 dark:text-purple-300 mb-3">Recruiter's First Impression</h3>
                  <p className="text-gray-800 dark:text-gray-200 italic leading-relaxed">"{result.recruiterPov.firstImpression}"</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Section title="What Stands Out" icon={<CheckCircle className="text-blue-500" />} points={result.recruiterPov.standsOut} color="blue" />
                  <Section title="What is Missing" icon={<XCircle className="text-gray-400" />} points={result.recruiterPov.missing} color="gray" />
                </div>

                <div className={`mt-8 p-6 rounded-xl border-2 flex flex-col md:flex-row items-center gap-6 ${
                  result.recruiterPov.decision.includes('Hire') 
                  ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10' 
                  : 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10'
                }`}>
                  <div className="text-center md:text-left">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-1">Final Recommendation</span>
                    <h4 className={`text-2xl font-black ${
                      result.recruiterPov.decision.includes('Hire') ? 'text-green-600' : 'text-red-600'
                    }`}>{result.recruiterPov.decision}</h4>
                  </div>
                  <div className="flex-1 border-l-2 border-gray-200 dark:border-gray-700 md:pl-6">
                    <p className="text-gray-700 dark:text-gray-300 font-medium">{result.recruiterPov.reason}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'improved' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Improved Resume Output</h3>
                  <button 
                    onClick={() => navigator.clipboard.writeText(result.improvedResume)}
                    className="text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-2"
                  >
                    Copy Text
                  </button>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6 font-mono text-sm text-gray-800 dark:text-gray-300 whitespace-pre-wrap max-h-[600px] overflow-y-auto leading-relaxed">
                  {result.improvedResume}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  points: string[];
  color: 'green' | 'yellow' | 'red' | 'blue' | 'gray';
}

const Section: React.FC<SectionProps> = ({ title, icon, points, color }) => {
  const colorClasses = {
    green: 'bg-green-50 dark:bg-green-900/10 text-green-800 dark:text-green-300',
    yellow: 'bg-yellow-50 dark:bg-yellow-900/10 text-yellow-800 dark:text-yellow-300',
    red: 'bg-red-50 dark:bg-red-900/10 text-red-800 dark:text-red-300',
    blue: 'bg-blue-50 dark:bg-blue-900/10 text-blue-800 dark:text-blue-300',
    gray: 'bg-gray-50 dark:bg-gray-900/10 text-gray-800 dark:text-gray-300',
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h4 className="font-bold text-gray-900 dark:text-white">{title}</h4>
      </div>
      <ul className="space-y-2">
        {points.map((point, i) => (
          <li key={i} className={`text-sm px-4 py-2 rounded-lg border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-colors ${colorClasses[color]}`}>
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
};
