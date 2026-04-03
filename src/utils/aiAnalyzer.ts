import type { AnalysisResult } from './types';

export const analyzeResume = async (resumeText: string, targetRole: string): Promise<AnalysisResult> => {
  // Simulating an AI analysis delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // In a real app, you would call an LLM API here with the prompts:
  // ATS Evaluation Prompt: "Analyze this resume and give an ATS score out of 100 based on keyword optimization, formatting, clarity, and impact. Then explain the score in 3–5 lines."
  // Feedback Prompt: "Give detailed feedback on this resume in 3 sections: Weak Areas, Needs Improvement, Strong Points. Be specific and actionable."
  // Rewrite Prompt: "Rewrite the following resume bullet points to be more impactful using action verbs and measurable outcomes."
  // Recruiter Prompt: "Act like a recruiter reviewing this resume. Give first impression, strengths, missing elements, and a hire/no hire decision with reasoning."

  // For this demonstration, I'll return a mock result that looks realistic based on the input
  // We use a simple hash function to make the score deterministic for the same resume and role.
  const getDeterministicScore = (text: string, role: string) => {
    const combined = text + role;
    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
      hash = ((hash << 5) - hash) + combined.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    // Map the hash to a 65-95 range
    return Math.abs(hash % 30) + 65;
  };

  const atsScore = getDeterministicScore(resumeText, targetRole);

  return {
    atsScore,
    atsExplanation: `Your resume shows good structure and clear headings, which is great for ATS readability. However, some key skills for ${targetRole} are mentioned but not quantified with impact. The formatting is clean, but could be optimized for keyword density.`,
    feedback: {
      weak: [
        "Lacks quantifiable achievements in the experience section.",
        "Summary is too generic and doesn't highlight your unique value proposition.",
        "Missing some industry-standard keywords for " + targetRole
      ],
      improvement: [
        "Include more action verbs (e.g., 'Spearheaded', 'Optimized', 'Engineered').",
        "Add a dedicated 'Skills' section with categorized technical and soft skills.",
        "Ensure consistent formatting for dates and locations."
      ],
      strong: [
        "Professional and clean layout.",
        "Education section is well-documented.",
        "Contact information is easy to find."
      ]
    },
    rewrittenPoints: [
      "Led a team of 5 to develop a cloud-based application, resulting in a 20% increase in user engagement.",
      "Optimized database queries which reduced latency by 40% for over 10,000 daily active users.",
      "Implemented automated testing pipelines that decreased deployment errors by 15%."
    ],
    recruiterPov: {
      firstImpression: `A solid candidate with a clear background in ${targetRole}. The resume is well-organized and professional.`,
      standsOut: [
        "Experience with modern tech stacks.",
        "Consistent career progression.",
        "Relevant certifications."
      ],
      missing: [
        "Specific project links or portfolio.",
        "Clear demonstration of leadership in recent roles.",
        "More focus on cross-functional collaboration."
      ],
      decision: "Hire (Move to Interview)",
      reason: "The candidate possesses the core technical skills required for the role. While some details could be more data-driven, their experience aligns well with our requirements."
    },
    improvedResume: `[Summary]\nResults-driven ${targetRole} professional with a track record of delivering high-impact solutions...\n\n[Experience]\n* Spearheaded development of scalable applications, improving efficiency by 25%...\n* Optimized legacy systems resulting in $10k annual cost savings...`
  };
};
