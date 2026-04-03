import { useState } from 'react';
import { Header } from './components/Header';
import { ResumeInput } from './components/ResumeInput';
import { ResultsDashboard } from './components/ResultsDashboard';
import { analyzeResume } from './utils/aiAnalyzer';
import type { AnalysisResult } from './utils/types';
import { Sparkles, History, Globe } from 'lucide-react';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async (resumeText: string, targetRole: string) => {
    setIsLoading(true);
    try {
      const analysisResult = await analyzeResume(resumeText, targetRole);
      setResult(analysisResult);
      // Scroll to results
      setTimeout(() => {
        window.scrollTo({
          top: document.getElementById('results-section')?.offsetTop ?? 0 - 20,
          behavior: 'smooth'
        });
      }, 100);
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Something went wrong during analysis. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetAnalysis = () => {
    setResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Navigation / Top Bar */}
        <nav className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Sparkles className="text-white" size={20} />
            </div>
            <span className="font-bold text-xl text-gray-900 dark:text-white tracking-tight">AI Resume Improver</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
              <History size={20} />
            </button>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
              <Globe size={20} />
            </a>
          </div>
        </nav>

        <Header />

        <main className="mt-12 space-y-12">
          {/* Input Section */}
          <section className="max-w-3xl mx-auto">
            <ResumeInput onAnalyze={handleAnalyze} isLoading={isLoading} />
          </section>

          {/* Results Section */}
          {result && (
            <section id="results-section" className="pt-12 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Analysis Results</h2>
                <button 
                  onClick={resetAnalysis}
                  className="text-sm text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                >
                  Start New Analysis
                </button>
              </div>
              <ResultsDashboard result={result} />
            </section>
          )}
        </main>

        <footer className="mt-24 pt-12 border-t border-gray-200 dark:border-gray-800 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>© 2026 AI Resume Improver. Powered by Gemini-3-Flash-Preview.</p>
          <div className="mt-4 flex justify-center gap-6">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Contact Us</a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
