# 🔐 Credential Keep: A Secure, Cloud-Native Credential Management Vault

> A modern, secure, and fully-featured web application designed to help users manage their website and application credentials.

## 🗺️ Table of Contents
- [About](#about)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Architecture & Files](#architecture--files)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Security Best Practices](#security-best-practices)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## 💡 About
In today's digital world, managing dozens of online accounts leads to cognitive overload and password reuse, creating significant security risks. Credential Keep solves this by providing a single, secure, and accessible source of truth for all your credentials—a personal digital vault, encrypted and protected in the cloud.

For a Computer Science student, this project is a practical demonstration of designing, building, and deploying a real-world, production-ready application, showcasing skills in full-stack development, security architecture, and modern cloud-native practices.

## ✨ Key Features
- 🔐 **Secure Multi-Provider Authentication**: (Email/Password & Google)
- 🔗 **Flexible Account Management**: (Account Linking, Password Changes, Forgot Password Flow)
- ⚙️ **Full CRUD Functionality**: (Create, Read, Update, Delete credentials)
- 🚀 **Enhanced Search & Filtering**: (Full-Text Search & Tag-Based Filtering)
- 📱 **Professional UI & UX**: (Mobile-First Design, Modern Aesthetics, Lazy Loading)

## 🛠️ Tech Stack
| Component | Technology |
|-----------|------------|
| Frontend | React |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Backend & Database | Firebase (Authentication & Cloud Firestore) |
| Icons | Lucide React |
| Hosting | Vercel |


## 🏗️ Architecture & Files
The application follows a modern serverless architecture. The frontend is a single-page application built with React and Vite, communicating directly with Google's Firebase platform for backend services.

Here is a high-level overview of the repository structure:
```
├── public/                  # Static assets (robots.txt, sitemap.xml)
├── src/
│   ├── components/          # React components
│   ├── hooks/               # Custom React hooks
│   ├── services/            # Firebase service logic
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # Application entry point
│   └── firebaseConfig.js    # Firebase configuration
├── .eslintrc.cjs            # ESLint configuration
├── index.html               # Main HTML file
├── package.json             # Project metadata and dependencies
├── vite.config.js           # Vite configuration
└── README.md                # You are here!
```

## ▶️ Getting Started
To get a local copy up and running, follow these simple steps.

### Prerequisites
- Node.js (v18 or later)
- npm, yarn, or pnpm
- A Google account to create a Firebase project

### Firebase Setup
1. Go to the **Firebase Console** and create a new project.
2. **Enable Authentication**: Enable both `Email/Password` and `Google` providers.
3. **Create a Firestore Database**: Start in `production mode`.
4. **Get Your Configuration**: In your project settings, create a new **Web app** and copy the `firebaseConfig` object.

### Local Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/credential-keep.git
   cd credential-keep
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   - Create a file named `.env.local` in the root of the project.
   - Fill it with your Firebase config values, prefixed with `VITE_`. For example:
     ```
     VITE_FIREBASE_API_KEY="your-api-key"
     VITE_FIREBASE_AUTH_DOMAIN="your-auth-domain"
     # ...and so on for all keys in the firebaseConfig object
     ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` (or the address shown in your terminal) to see the app.


## 🌐 Deployment
This project is configured for seamless deployment with Vercel.

1. **Sign Up & Import**: Sign up for Vercel with your GitHub account and import the project repository.
2. **Configure Environment Variables**: In the Vercel project settings, add all the `VITE_FIREBASE_...` variables from your local `.env.local` file. This is a critical step.
3. **Deploy**: Click the "Deploy" button.
4. **Update API Key Restrictions**: For enhanced security, once deployed, add your new Vercel domain (e.g., `credential-keep.vercel.app`) to the list of allowed HTTP referrers for your Firebase API key in the Google Cloud Console.

## 🛡️ Security Best Practices
- **Environment Variables**: Sensitive keys are stored locally and on the hosting provider, never committed to Git.
- **Firestore Security Rules**: Server-side rules are used to strictly enforce data ownership, ensuring users can only access their own data.
- **Restricted API Key**: The Firebase API Key is restricted in the Google Cloud Console to only accept requests from the application's deployed domain.

## 💪 Contributing
Contributions and suggestions are welcome! Please feel free to open an issue to discuss what you would like to change or submit a pull request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License
This project is licensed under the MIT License. See the `LICENSE` file for details.

## 📧 Contact
My Emial - jchanikya06@gmail.com

Project Link: [https://github.com/Chanikya-WebDev/credential-keep](https://github.com/your-username/credential-keep)
