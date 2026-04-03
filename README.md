# AI Resume Improver

A modern web application built with React, TypeScript, and Vite that uses AI to analyze and improve your resume.

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
