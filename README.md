🔐 Credential Keep: A Secure, Cloud-Native Credential Management Vault
Credential Keep is a modern, secure, and fully-featured web application designed to help users manage their website and application credentials. Built with a production-grade technology stack, it offers a seamless and responsive experience for storing, viewing, editing, and searching for sensitive login information. The application is architected with a strong emphasis on security, ensuring that each user's data is completely isolated and accessible only to them.

🗺️ Table of Contents
What is Credential Keep & Why is it Valuable?

Key Features

High-Level Architecture

Tech Stack

Getting Started

Deployment with Vercel

Security Best Practices

💡 What is Credential Keep & Why is it Valuable?
❌ The Problem
In today's digital world, the average person juggles dozens of online accounts for education, work, social media, and services. This leads to several significant problems:

Cognitive Overload: It's nearly impossible to remember a unique, strong password for every single service.

Password Reuse: As a result, many people reuse the same one or two passwords across multiple sites. This is a massive security risk; if one site is breached, all of their accounts are compromised.

Cross-Device Inconvenience: Accessing your accounts on a new or different device becomes a frustrating exercise of password resets and security questions.

✅ The Solution: A Centralized, Secure Vault
Credential Keep directly solves these problems by providing a single, secure, and accessible source of truth for all of a user's credentials. It acts as a personal digital vault, encrypted and protected in the cloud, available on any device with a web browser.

🎓 Why This Project is a Valuable Portfolio Piece
For a Computer Science student like myself in Hyderabad, this project is more than just a tool; it is a practical demonstration of my ability to design, build, and deploy a real-world, production-ready application. It showcases a range of critical skills that are highly sought after in the tech industry:

Full-Stack Development: Demonstrates proficiency in building a complete user experience, from a polished frontend with React and Tailwind CSS to a secure, scalable backend using Firebase's cloud services.

Security Architecture: Proves an understanding of secure user authentication, data isolation with server-side security rules, and best practices for handling sensitive API keys.

Modern Frontend Expertise: Highlights skills in creating dynamic, responsive, and performant user interfaces using modern tools like Vite and advanced React features like lazy loading.

Cloud & Serverless Proficiency: Shows experience with modern cloud-native and serverless architecture.

End-to-End Project Management: Mirrors a professional development lifecycle from concept and design to implementation, security hardening, and deployment.

✨ Key Features
This application is a full-featured credential manager with a professional feature set:

🔐 Secure Multi-Provider Authentication: (Email/Password & Google)

🔗 Flexible Account Management: (Account Linking, Password Changes, Forgot Password Flow)

⚙️ Full CRUD Functionality: (Create, Read, Update, Delete)

🚀 Enhanced Search & Filtering: (Full-Text Search & Tag-Based Filtering)

📱 Professional UI & UX: (Mobile-First Design, Modern Aesthetics, Lazy Loading)

🏗️ High-Level Architecture
The application follows a modern serverless architecture. The frontend is a single-page application built with React and Vite. It communicates directly with Google's Firebase platform, which handles all backend services:

Firebase Authentication: Manages user sign-up, login, and session persistence.

Cloud Firestore: A NoSQL database that stores the encrypted credential data, secured by server-side rules.

Vercel: Hosts the static frontend application and provides a global CDN for fast load times.

🛠️ Tech Stack
Frontend: React

Build Tool: Vite

Styling: Tailwind CSS

Backend & Database: Firebase

Icons: Lucide React

▶️ Getting Started
To get a local copy up and running, follow these simple steps.

Prerequisites
Node.js (v18 or later)

npm or yarn

A Google account to create a Firebase project

Firebase Setup
Go to the Firebase Console and create a new project.

Enable Authentication Methods: Enable both Email/Password and Google.

Create a Firestore Database: Start in production mode and update the Rules.

Get Your Configuration: Create a new Web app and copy the firebaseConfig object.

Local Installation
Clone the repo:

git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
cd your-repo-name

Install NPM packages:

npm install

Set Up Environment Variables:

Create a file named .env.local.

Fill it with your Firebase config values, prefixed with VITE_.

Run the development server:

npm run dev

🌐 Deployment with Vercel
Vercel offers a seamless way to deploy Vite applications directly from your GitHub repository.

Sign Up & Import: Sign up for Vercel with your GitHub account and import the project repository.

Configure Environment Variables: In the Vercel project settings, add all the VITE_FIREBASE_... variables from your local .env.local file. This is a critical step.

Deploy: Click the "Deploy" button.

Update API Key Restrictions: Once deployed, add your new Vercel domain (e.g., credential-keep.vercel.app) to the list of allowed HTTP referrers for your API key in the Google Cloud Console.

🛡️ Security Best Practices
Environment Variables: Sensitive keys are stored locally and on the hosting provider, never committed to Git.

Firestore Security Rules: Server-side rules strictly enforce data ownership.

Restricted API Key: The Firebase API Key is restricted to only accept requests from the application's domain.