# AI Resume Improver

AI Resume Improver is an AI-powered web application that analyzes resumes and provides actionable insights to enhance their quality and effectiveness. It generates an ATS score based on keyword relevance, formatting, and overall impact, helping users understand how well their resume performs in modern hiring systems. The platform offers structured feedback, highlights strengths and weaknesses, and suggests improvements. It also features an AI-based bullet point optimizer and a “Recruiter POV” mode that simulates real hiring decisions. Designed for students and professionals, the tool helps create strong, optimized resumes and improves chances of getting shortlisted.

## Features

- **Resume Upload & Parsing**: Upload your resume in PDF format (powered by `pdfjs-dist`) or paste the content manually.
- **ATS Score Analysis**: Get a deterministic ATS score based on your resume content and target role.
- **Detailed Feedback**: Receive structured feedback on strong points, areas needing improvement, and weak points.
- **Bullet Point Rewriter**: Automatically rewrite your experience bullet points using action verbs and quantifiable impact.
- **Recruiter POV**: See how a recruiter might view your resume, including first impressions and a hire/no-hire suggestion.
- **Target Role Optimization**: Tailor the AI analysis by selecting from common industry roles.

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 8
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide-React
- **Animations**: Framer Motion
- **PDF Parsing**: pdfjs-dist

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

## Deterministic Scoring

The ATS score is generated using a custom hashing algorithm that ensures the same resume and target role always produce the same score, providing a consistent user experience.
