Credential Keep: A Secure Credential Management Vault
Credential Keep is a modern, secure, and fully-featured web application designed to help users manage their website and application credentials. Built with a production-grade technology stack, it offers a seamless and responsive experience for storing, viewing, editing, and searching for sensitive login information. The application is architected with a strong emphasis on security, ensuring that each user's data is completely isolated and accessible only to them.

Table of Contents
About The Project

Key Features

Tech Stack

Getting Started

Prerequisites

Firebase Setup

Local Installation

Security Best Practices

About The Project
In an era where the average person has dozens of online accounts, remembering credentials for each one is a significant challenge. Forgetting a password can lead to a frustrating and time-consuming recovery process. This project solves that problem by providing a centralized, secure vault for all your credentials, accessible from any device.

This application was built from the ground up to serve as a real-world example of a modern, multi-user web application, incorporating best practices in security, performance, and user interface design.

Key Features
This application is more than just a simple list. It's a full-featured credential manager with a professional feature set:

🔐 Secure Multi-Provider Authentication:

Users can sign up and log in using the traditional Email & Password method.

Seamless Google Account Sign-In provides a one-click login experience.

🔗 Flexible Account Management:

Account Linking: Users who sign up with Google can later add a password to their account, allowing them to log in on devices where their Google account isn't available.

Password Management: Users can securely change their linked password.

Forgot Password Flow: A secure email-based password reset functionality is available from the login screen.

** CRUD Functionality:**

Create: Easily add new credentials, including a website name, username, password, an optional description, and tags.

Read: View all credentials in a clean, responsive interface.

Update: Edit any credential's details through a non-disruptive pop-up modal.

Delete: Securely delete credentials with a confirmation step to prevent accidental removal.

🚀 Enhanced Search & Filtering:

Full-Text Search: The search bar intelligently scans across the website name, username, description, and tags to find relevant results instantly.

Tag-Based Filtering: All unique tags are automatically collected and displayed as filter buttons, allowing users to categorize and view their credentials with a single click.

📱 Professional UI & UX:

Mobile-First Responsive Design: The entire application, from the login screen to the credential cards, is designed to look and function beautifully on all screen sizes.

Modern Aesthetics: A sleek dark-mode interface with smooth transitions and a polished look and feel.

Lazy Loading: For optimal performance and SEO, the main application components are lazy-loaded, reducing the initial bundle size and improving load times.

Tech Stack
This project leverages a modern, powerful, and scalable technology stack:

Frontend: React (with Hooks)

Build Tool: Vite

Styling: Tailwind CSS

Backend & Database: Firebase (Authentication & Firestore)

Icons: Lucide React

Getting Started
To get a local copy up and running, follow these simple steps.

Prerequisites
Node.js (v18 or later)

npm or yarn

A Google account to create a Firebase project

Firebase Setup
Go to the Firebase Console and create a new project.

Enable Authentication Methods:

In your project, go to Build > Authentication > Sign-in method.

Enable both the Email/Password and Google providers.

Create a Firestore Database:

Go to Build > Firestore Database and create a database. Start in production mode.

Navigate to the Rules tab and paste the following security rules to ensure user data privacy:

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}

Get Your Configuration:

In your project settings (click the gear icon), scroll down to "Your apps".

Create a new Web app.

Copy the firebaseConfig object. You will need these values.

Local Installation
Clone the repo:

git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
cd your-repo-name

Install NPM packages:

npm install

Set Up Environment Variables:

Create a new file in the root of the project called .env.local.

Copy the contents of .env.example into this new file.

Fill in the values using the firebaseConfig object you copied from the Firebase console. Remember to prefix each variable with VITE_.

VITE_FIREBASE_API_KEY="YOUR_API_KEY"
VITE_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
# ... and so on for all the variables

Run the development server:

npm run dev

Your application should now be running on http://localhost:5173 (or a similar port).

Security Best Practices
Security is paramount for an application that handles sensitive data. This project adheres to several key security principles:

Environment Variables: All API keys and Firebase configuration details are stored in a .env.local file, which is explicitly ignored by Git via .gitignore. This prevents sensitive keys from ever being committed to the repository.

Firestore Security Rules: The database is protected by server-side rules that strictly enforce data ownership. A user can only read and write documents that are stored under their unique user ID, making it impossible for one user to access another's data.

Restricted API Key: For production deployment, the Firebase Web API Key should be restricted in the Google Cloud Console to only accept requests from your application's specific domain, preventing unauthorized use.