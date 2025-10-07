import React, { useState } from 'react';
import { X } from 'lucide-react';
// Correcting the import path
import { addCredential } from '../services/firestoreService.js';

const AddCredentialModal = ({ isOpen, onClose, user }) => {
  // State is now managed inside this component
  const [websiteName, setWebsiteName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const handleClose = () => {
    // Reset form when closing
    setWebsiteName('');
    setUsername('');
    setPassword('');
    setDescription('');
    setTags('');
    setError('');
    setIsSaving(false);
    onClose();
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!websiteName || !username || !password) {
      setError("Please fill in all required fields.");
      return;
    }
    
    setIsSaving(true);
    setError('');
    
    try {
      const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      await addCredential(user.uid, { websiteName, username, password, description, tags: tagsArray });
      handleClose(); // Close and reset form on success
    } catch (err) {
      console.error("Failed to add credential:", err);
      setError("An error occurred. Please try again.");
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 border border-gray-700 animate-fade-in">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Add New Credential</h3>
          <button onClick={handleClose} className="text-gray-400 hover:text-white transition"><X size={24} /></button>
        </div>
        <form onSubmit={handleAdd}>
          <input value={websiteName} onChange={e => setWebsiteName(e.target.value)} type="text" placeholder="Website Name" required className="w-full mb-4 p-2 bg-gray-700/50 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          <input value={username} onChange={e => setUsername(e.target.value)} type="text" placeholder="Username/Email" required className="w-full mb-4 p-2 bg-gray-700/50 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" required className="w-full mb-4 p-2 bg-gray-700/50 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description (optional)" rows="3" className="w-full mb-4 p-2 bg-gray-700/50 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
          <input value={tags} onChange={e => setTags(e.target.value)} type="text" placeholder="Tags (comma-separated)" className="w-full mb-4 p-2 bg-gray-700/50 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <div className="flex justify-end gap-4">
            <button type="button" onClick={handleClose} className="px-4 py-2 rounded-md font-semibold bg-gray-600 hover:bg-gray-500 transition">Cancel</button>
            <button type="submit" disabled={isSaving} className="px-4 py-2 rounded-md font-semibold bg-indigo-600 hover:bg-indigo-700 transition disabled:opacity-50">
              {isSaving ? 'Saving...' : 'Save Credential'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
//<SettingsModal isOpen={isSettingsModalOpen} onClose={() => setIsSettingsModalOpen(false)} user={user} />    
};

export default AddCredentialModal;
