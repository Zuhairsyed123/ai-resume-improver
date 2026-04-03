export type AnalysisResult = {
  atsScore: number;
  atsExplanation: string;
  feedback: {
    weak: string[];
    improvement: string[];
    strong: string[];
  };
  rewrittenPoints: string[];
  recruiterPov: {
    firstImpression: string;
    standsOut: string[];
    missing: string[];
    decision: string;
    reason: string;
  };
  improvedResume: string;
}
