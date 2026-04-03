import React, { useState } from 'react';
import { Upload, FileText, ChevronDown, CheckCircle2, FileJson } from 'lucide-react';
import { extractTextFromPDF } from '../utils/pdfParser';

interface ResumeInputProps {
  onAnalyze: (text: string, targetRole: string) => void;
  isLoading: boolean;
}

const ROLES = [
  'Software Engineer',
  'Data Scientist',
  'Product Manager',
  'Project Manager',
  'UX/UI Designer',
  'Marketing Specialist',
  'Sales Representative',
  'Customer Success Manager',
  'Human Resources',
  'Other'
];

export const ResumeInput: React.FC<ResumeInputProps> = ({ onAnalyze, isLoading }) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('upload');
  const [pastedText, setPastedText] = useState('');
  const [fileName, setFileName] = useState('');
  const [pdfText, setPdfText] = useState('');
  const [targetRole, setTargetRole] = useState(ROLES[0]);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setError('Please upload a PDF file.');
        return;
      }
      setFileName(file.name);
      setError(null);
      try {
        const text = await extractTextFromPDF(file);
        setPdfText(text);
      } catch (err) {
        setError('Error parsing PDF. Please try again or paste text manually.');
      }
    }
  };

  const handleAnalyze = () => {
    const textToAnalyze = activeTab === 'upload' ? pdfText : pastedText;
    if (!textToAnalyze.trim()) {
      setError('Please provide your resume content.');
      return;
    }
    setError(null);
    onAnalyze(textToAnalyze, targetRole);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          className={`flex-1 py-4 text-sm font-medium transition-colors ${
            activeTab === 'upload'
              ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
              : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('upload')}
        >
          <Upload className="inline-block mr-2" size={18} />
          Upload PDF
        </button>
        <button
          className={`flex-1 py-4 text-sm font-medium transition-colors ${
            activeTab === 'paste'
              ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
              : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('paste')}
        >
          <FileText className="inline-block mr-2" size={18} />
          Paste Resume
        </button>
      </div>

      <div className="p-6">
        {activeTab === 'upload' ? (
          <div className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-10 transition-all ${
            fileName 
              ? 'border-green-400 bg-green-50 dark:bg-green-900/10' 
              : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/50'
          }`}>
            {fileName ? (
              <div className="flex flex-col items-center animate-in zoom-in duration-300">
                <div className="relative">
                  <FileText className="text-red-500 mb-4" size={64} />
                  <CheckCircle2 className="absolute -top-1 -right-1 text-green-500 bg-white dark:bg-gray-800 rounded-full" size={24} />
                </div>
                <p className="text-gray-800 dark:text-gray-200 font-bold text-lg mb-1 truncate max-w-xs">
                  {fileName}
                </p>
                <p className="text-green-600 dark:text-green-400 text-sm font-medium flex items-center gap-1 mb-4">
                  <CheckCircle2 size={14} /> Ready to analyze
                </p>
              </div>
            ) : (
              <>
                <Upload className="text-gray-400 mb-4" size={48} />
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Drag and drop your resume (PDF) here
                </p>
              </>
            )}
            <input
              type="file"
              id="resume-upload"
              className="hidden"
              accept=".pdf"
              onChange={handleFileUpload}
            />
            <label
              htmlFor="resume-upload"
              className="px-6 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer shadow-sm transition-all"
            >
              {fileName ? 'Change File' : 'Browse Files'}
            </label>
          </div>
        ) : (
          <textarea
            className="w-full h-48 p-4 bg-gray-50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white"
            placeholder="Paste your resume content here..."
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
          />
        )}

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Target Role (Optional)
          </label>
          <div className="relative">
            <select
              className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
            >
              {ROLES.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              size={18}
            />
          </div>
        </div>

        {error && (
          <p className="mt-4 text-sm text-red-600 dark:text-red-400 font-medium bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
            {error}
          </p>
        )}

        <button
          className={`w-full mt-8 py-3.5 px-4 rounded-lg font-bold text-white shadow-lg transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center ${
            isLoading
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
          onClick={handleAnalyze}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
              Analyzing Resume...
            </>
          ) : (
            'Analyze Resume'
          )}
        </button>
      </div>
    </div>
  );
};
