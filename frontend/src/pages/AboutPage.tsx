import { CheckCircle, Shield, Server, PenTool, Layers, TestTube, Code2 } from "lucide-react";

const AboutProject = () => {
  const backendFeatures = [
    "User Authentication with JWT & Secure Cookies",
    "Password Reset with Email Verification",
    "Protected Routes & Role-Based Middleware",
    "Notes CRUD with Rich Text Support",
    "MongoDB + Mongoose Models with Validation",
    "Error Handling & Response Standardization",
    "Helmet + CORS + Rate Limiting Security Applied"
  ];

  const frontendFeatures = [
    "React + TypeScript + Tailwind UI",
    "Protected Routing & State Persistence",
    "Reusable Components & Clean Folder Structure",
    "Rich Text Notes Editor",
    "Responsive Dashboard Layout with Side Navbar",
    "API Integration with Axios Interceptors",
    "Toast Notifications & Smooth UI Animations"
  ];

  const devFeatures = [
    "Jest & React Testing Library for Unit + UI Tests",
    "SonarQube Integration for Code Quality & Bug Detection",
    "ESLint & Prettier Configured for Code Consistency",
    "GitHub Version Control & Branching Strategy"
  ];

  return (
    <div className="p-10 min-h-screen bg-gray-50">
      <h1 className="text-4xl font-extrabold text-blue-700 mb-4">About NoteKro</h1>
      <p className="text-gray-700 text-lg leading-relaxed max-w-3xl">
        <strong>NoteKro</strong> is a modern note-taking and productivity application built using the <strong>MERN Stack</strong>. 
        It provides a secure and fast experience for users to create, edit, store, and organize notes with ease.
      </p>
      <p className="text-gray-600 mt-3 max-w-3xl">
        The project showcases full-stack development best practices with clean design, authentication, 
        testing, scalable backend structure, CI code quality tools, and reusable component architecture.
      </p>

      {/* Key Vision */}
      <div className="mt-8 bg-white shadow-md p-6 rounded-xl max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-3 flex items-center gap-2">
          <PenTool className="text-blue-600" /> The Vision
        </h2>
        <p className="text-gray-600">
          NoteKro aims to provide a minimal yet feature-rich note-keeping system that students and professionals
          can rely on for daily productivity, without complexity.
        </p>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-6 mt-10">
        {/* Backend */}
        <div className="bg-white p-6 shadow-lg rounded-xl">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
            <Server className="text-purple-600" /> Backend Features
          </h3>
          <ul className="space-y-2">
            {backendFeatures.map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Frontend */}
        <div className="bg-white p-6 shadow-lg rounded-xl">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
            <Layers className="text-amber-600" /> Frontend Features
          </h3>
          <ul className="space-y-2">
            {frontendFeatures.map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Dev & Testing */}
        <div className="bg-white p-6 shadow-lg rounded-xl">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
            <Code2 className="text-red-600" /> Development & Quality
          </h3>
          <ul className="space-y-2">
            {devFeatures.map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Security Info */}
      <div className="mt-10 bg-white shadow-md p-6 rounded-xl max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-3 flex items-center gap-2">
          <Shield className="text-green-600" /> Security & Data Protection
        </h2>
        <p className="text-gray-600">
          NoteKro follows modern security standards, including JWT secured auth, encrypted passwords, 
          protected API routes, input validation, and safe headers using Helmet & CORS policies.
        </p>
      </div>
    </div>
  );
};

export default AboutProject;
