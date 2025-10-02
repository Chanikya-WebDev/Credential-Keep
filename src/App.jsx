import React, { lazy, Suspense } from 'react'; // Import lazy and Suspense
import useAuth from './hooks/useAuth.js';
import Spinner from './components/common/Spinner.jsx';

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
    // The Suspense component shows a fallback UI (our spinner) while
    // the lazy-loaded component's code is being fetched.
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <Spinner />
      </div>
    }>
      {user ? <MainApp user={user} /> : <AuthScreen />}
    </Suspense>
  );
}

export default App;

