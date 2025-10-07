import React, { lazy, Suspense } from 'react'; // Import lazy and Suspense
import useAuth from './hooks/useAuth.js';
import Spinner from './components/common/Spinner.jsx';
import { HelmetProvider } from 'react-helmet-async';
import SEO from './components/SEO.jsx';

// LAZY LOADING: Dynamically import the MainApp component.
// The code for MainApp will now be in a separate chunk and only loaded when needed.
const MainApp = lazy(() => import('./components/MainApp.jsx'));
const AuthScreen = lazy(() => import('./components/AuthScreen.jsx'));

function App() {
  const { user, isLoading } = useAuth();

  // Show a spinner while the initial authentication check is running
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <Spinner />
      </div>
    );
  }

  return (
    <HelmetProvider>
      <SEO 
        title="Credentials Keep - Securely Store Your Credentials"
        description="A secure and user-friendly app to manage your credentials with ease. Keep safely your credentials without fear of forgetting credentials."
        name="Credentials Keep"
        type="website"
      />
      
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <Spinner />
      </div>
    }>
      {user ? <MainApp user={user} /> : <AuthScreen />}
    </Suspense>
    </HelmetProvider>
  );
}

export default App;

