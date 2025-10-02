import React, { useState } from 'react';
import { X } from 'lucide-react';
import { EmailAuthProvider, linkWithCredential, updatePassword } from 'firebase/auth';
import { auth } from '../firebaseConfig.js'; // Corrected the import path

const SettingsModal = ({ isOpen, onClose, user }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // This check is now crucial. It determines which form to show.
  const hasPasswordProvider = user.providerData.some(
    (provider) => provider.providerId === 'password'
  );

  // Resets the form state when the modal is closed or the mode changes
  const resetForm = () => {
    setPassword('');
    setConfirmPassword('');
    setError('');
    setSuccess('');
    setIsProcessing(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  // --- NEW: Function to handle CHANGING the password ---
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
    }
    setIsProcessing(true);
    try {
      await updatePassword(auth.currentUser, password);
      setSuccess("Password updated successfully!");
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      // This is a key security feature of Firebase.
      if (err.code === 'auth/requires-recent-login') {
        setError("This is a sensitive action. Please log out and log back in before changing your password.");
      } else {
        setError("Failed to update password. Please try again.");
      }
      console.error("Error updating password:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  // --- Function to handle ADDING a new password ---
  const handleLinkAccount = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
     if (password.length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
    }
    setIsProcessing(true);
    try {
      const credential = EmailAuthProvider.credential(user.email, password);
      await linkWithCredential(auth.currentUser, credential);
      // We don't close the modal here, so the user sees the success message
      // and the component will re-render to show the "Change Password" view.
      setSuccess("Success! Password added. You can now use it to sign in.");
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Error linking account:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 border border-gray-700 animate-fade-in">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Account Settings</h3>
          <button onClick={handleClose} className="text-gray-400 hover:text-white transition"><X size={24} /></button>
        </div>
        
        {/* Conditional rendering: Show "Change Password" or "Add Password" form */}
        <form onSubmit={hasPasswordProvider ? handleChangePassword : handleLinkAccount}>
          <p className="text-gray-300 mb-4">
            {hasPasswordProvider 
              ? 'Update your password below.'
              : 'Add a password to your account to sign in on devices without Google.'
            }
          </p>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password" 
            required 
            className="w-full mb-4 p-2 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
          />
          <input 
            type="password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm New Password" 
            required 
            className="w-full mb-4 p-2 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
          />
          
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

          <div className="flex justify-end gap-4 mt-6">
            <button type="button" onClick={handleClose} className="px-4 py-2 rounded-md font-semibold bg-gray-600 hover:bg-gray-500 transition">Close</button>
            <button type="submit" disabled={isProcessing} className="px-4 py-2 rounded-md font-semibold bg-indigo-600 hover:bg-indigo-700 transition disabled:opacity-50">
              {isProcessing ? 'Saving...' : (hasPasswordProvider ? 'Update Password' : 'Save Password')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsModal;

