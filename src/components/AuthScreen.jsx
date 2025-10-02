import React, { useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup,
  sendPasswordResetEmail 
} from 'firebase/auth';
import { auth, googleProvider } from '../firebaseConfig';
import Spinner from './common/Spinner';
import { LockKeyhole } from 'lucide-react';

const AuthScreen = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const resetFormState = () => {
      setError('');
      setSuccessMessage('');
      setEmail('');
      setPassword('');
    };

    const handlePasswordReset = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      if (!email) {
        setError("Please enter your email address.");
        setIsLoading(false);
        return;
      }
      setError('');
      setSuccessMessage('');
      try {
        await sendPasswordResetEmail(auth, email);
        setSuccessMessage("Password reset email sent! Check your inbox.");
      } catch (err) {
        setError("Could not send reset email. Is the address correct?");
      }
      setIsLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccessMessage('');
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
        } catch (err) {
             if (err.code === 'auth/email-already-in-use') {
                setError('This email is already in use. Try logging in.');
            } else if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
                setError('Invalid email or password.');
            } else {
                setError('An error occurred. Please try again.');
            }
        }
        setIsLoading(false);
    };
    
    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            if (error.code !== 'auth/popup-closed-by-user') {
               setError('Could not sign in with Google. Please try again.');
            }
            console.error("Google Sign-In Error:", error);
        }
        setIsLoading(false);
    };
    
    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
          <Spinner />
        </div>
      );
    }

    if (isForgotPassword) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
           <div className="w-full max-w-md p-8 space-y-6 bg-gray-800/50 rounded-2xl shadow-2xl border border-gray-700 backdrop-blur-sm">
                <div className="text-center">
                    <LockKeyhole className="mx-auto h-12 w-12 text-indigo-400" />
                    <h2 className="mt-6 text-3xl font-bold text-white">Reset Password</h2>
                    <p className="mt-2 text-sm text-gray-400">Enter your email to receive a reset link.</p>
                </div>
                <form onSubmit={handlePasswordReset} className="space-y-4">
                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" required className="w-full bg-gray-700/50 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" />
                    {error && <p className="text-red-500 text-sm text-center bg-red-900/50 py-2 rounded-md">{error}</p>}
                    {successMessage && <p className="text-green-500 text-sm text-center bg-green-900/50 py-2 rounded-md">{successMessage}</p>}
                    <button type="submit" className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-transform transform hover:scale-105">Send Reset Link</button>
                </form>
                 <div className="text-center">
                    <button onClick={() => { setIsForgotPassword(false); resetFormState(); }} className="font-medium text-sm text-indigo-400 hover:text-indigo-300">
                        Back to Login
                    </button>
                </div>
            </div>
        </div>
      );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-gray-800/50 rounded-2xl shadow-2xl border border-gray-700 backdrop-blur-sm">
                <div className="text-center">
                    <LockKeyhole className="mx-auto h-12 w-12 text-indigo-400" />
                    <h2 className="mt-6 text-3xl font-bold text-white">{isLogin ? 'Welcome Back' : 'Create Your Vault'}</h2>
                    <p className="mt-2 text-sm text-gray-400">Secure and simple credential management.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" required className="w-full bg-gray-700/50 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" />
                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" required className="w-full bg-gray-700/50 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" />
                    
                    {isLogin && (
                      <div className="text-right text-sm">
                        <button type="button" onClick={() => { setIsForgotPassword(true); resetFormState(); }} className="font-medium text-indigo-400 hover:text-indigo-300">
                          Forgot password?
                        </button>
                      </div>
                    )}

                    {error && <p className="text-red-500 text-sm text-center bg-red-900/50 py-2 rounded-md">{error}</p>}
                    <button type="submit" className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-transform transform hover:scale-105">{isLogin ? 'Log In' : 'Sign Up'}</button>
                </form>
                <div className="relative my-2">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-700" /></div>
                  <div className="relative flex justify-center text-sm"><span className="px-2 bg-gray-800 text-gray-500">Or</span></div>
                </div>
                 <button onClick={handleGoogleSignIn} className="w-full flex items-center justify-center py-2.5 px-4 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-white bg-gray-700/50 hover:bg-gray-700 transition">
                    <svg className="w-5 h-5 mr-3" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 381.5 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-72.2 72.2C322 104 288.7 88 248 88c-88.3 0-160 71.7-160 160s71.7 160 160 160c94.4 0 135.3-63.5 140.8-96.2H248v-85.3h236.1c2.3 12.7 3.9 26.9 3.9 41.4z"></path></svg>
                    Continue with Google
                </button>
                 <p className="text-sm text-center text-gray-400">
                    {isLogin ? "Don't have an account?" : 'Already have an account?'}
                    <button onClick={() => { setIsLogin(!isLogin); resetFormState(); }} className="font-medium text-indigo-400 hover:text-indigo-300 ml-1">
                        {isLogin ? 'Sign Up' : 'Log In'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default AuthScreen;

