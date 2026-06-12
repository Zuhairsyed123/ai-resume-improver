# Building and Deploying the Resume Analyser
**A Step-by-Step Guide for Students**

Welcome! This document will walk you through the entire process of how this Resume Analyser project was built from scratch and how it was deployed to the internet. 

---

## 1. The Technology Stack

Before writing any code, we selected modern, industry-standard tools to build this web application. Here is what we used:

- **React (v19):** A popular JavaScript library developed by Facebook for building user interfaces. It allows us to create reusable UI components.
- **TypeScript:** A superset of JavaScript that adds static typing. It helps catch errors early during development and provides better autocomplete in your code editor.
- **Vite:** A blazing fast build tool and development server. It replaces older tools like Create React App or Webpack, making the development experience much faster.
- **Tailwind CSS (v4):** A utility-first CSS framework that lets you style your application directly inside your HTML/JSX without writing separate CSS files.
- **Framer Motion:** A powerful animation library for React that makes it easy to create smooth, beautiful animations.
- **Lucide React:** A beautiful, open-source icon library.
- **pdfjs-dist:** A library based on Mozilla PDF.js used to parse and read the text inside uploaded PDF resumes directly in the browser.
- **GitHub Pages:** The hosting service used to publish the built app from the `dist` folder.

---

## 2. Step-by-Step Building Process

### Step 2.1: Initializing the Project
We started by creating a new React project using Vite. You can do this by running the following command in your terminal:

```bash
npm create vite@latest resume-analyser -- --template react-ts
```
This command creates a new folder called `resume-analyser` with all the base configurations for React and TypeScript.

### Step 2.2: Installing Dependencies
After navigating into the project folder (`cd resume-analyser`), we installed the required libraries:

```bash
# Install core dependencies
npm install

# Install UI and utility libraries
npm install tailwindcss @tailwindcss/vite lucide-react framer-motion axios pdfjs-dist
```

### Step 2.3: Project Structure
We organized our code into a clear folder structure inside the `src` directory:
- `src/components/`: Contains our React UI building blocks like `ResumeInput.tsx` (where users upload PDFs or paste resume text) and `ResultsDashboard.tsx` (where the analysis is shown).
- `src/utils/`: Contains helper functions, specifically `pdfParser.ts` which handles extracting text from the PDF file.
- `src/App.tsx`: The main container that brings all components together.

### Step 2.4: Developing the Features
1. **PDF Upload & Parsing:** Users can upload a resume in PDF format, and the app uses `pdfjs-dist` to parse it in the browser. If the uploaded file is not a PDF, the app shows a friendly error, and users may also paste their resume text manually as an alternative.
2. **User Interface:** We built forms and buttons using standard HTML elements styled beautifully with Tailwind CSS. For example, instead of writing `margin-top: 10px; color: blue;`, we simply added classes like `mt-2 text-blue-500`.
3. **State Management:** We used React's `useState` hook to keep track of whether the application is loading, what errors exist, and the final parsed resume text.

### Step 2.5: Running the Project Locally
During development, we tested the code on our own computer by running:
```bash
npm run dev
```
This started a local server (usually at `http://localhost:5173`) where every code change automatically refreshed the browser.

---

## 3. The Deployment Process

Once the code was working perfectly on our local computer, we needed to put it on the internet so anyone could access it. Here is exactly how we did it.

### Step 3.1: Building for Production
Web browsers cannot natively run TypeScript files (`.tsx`). They only understand plain HTML, CSS, and JavaScript. We told Vite to translate and bundle our code into highly optimized, minified files by running:

```bash
npm run build
```
This command successfully generated a `dist` (distribution) folder containing the final, ready-to-publish website files.

### Step 3.2: Deploying to GitHub Pages
To publish the site on GitHub Pages, we used the `gh-pages` package and the deploy script already configured in `package.json`.

1. Make sure the app is built for production:
   ```bash
   npm run build
   ```
2. Then publish the `dist` folder to GitHub Pages:
   ```bash
   npm run deploy
   ```

This deploy command uses `gh-pages -d dist` to push the compiled files into a `gh-pages` branch and serve them from your GitHub Pages site.

> Note: The repository must be connected to GitHub, and GitHub Pages should be enabled for the `gh-pages` branch in your repository settings.

---

## Conclusion
By combining Vite for fast development, React for UI components, Tailwind for styling, and GitHub Pages for deployment, we built and launched a modern web application quickly and hosted it on GitHub's free static site service. As a student, mastering this exact workflow will let you ship live projects directly from your repository with minimal effort.
