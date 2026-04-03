import { Sparkles } from 'lucide-react';

export const Header = () => {
  return (
    <header className="py-8 text-center">
      <div className="flex items-center justify-center mb-4">
        <div className="bg-blue-600 p-2 rounded-lg mr-3">
          <Sparkles className="text-white" size={32} />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          AI Resume Improver
        </h1>
      </div>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Optimize your resume for ATS, get expert feedback, and rewrite your bullet points for maximum impact.
      </p>
    </header>
  );
};
