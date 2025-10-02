import useAuth from './hooks/useAuth';
import AuthScreen from './components/AuthScreen';
import MainApp from './components/MainApp';
import Spinner from './components/common/Spinner';

function App() {
  const { user, isLoading } = useAuth();

  // While the auth state is being checked, show a full-screen spinner
  // This prevents a flash of the login screen before redirecting to the main app
  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-950">
        <Spinner />
      </div>
    );
  }

  // Once loading is complete, render the correct component based on auth state
  return (
    <>
      {user ? <MainApp user={user} /> : <AuthScreen />}
    </>
  );
}

export default App;


