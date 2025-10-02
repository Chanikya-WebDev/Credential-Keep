import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const EditCredentialModal = ({ isOpen, onClose, credential, onUpdate }) => {
  // State for each input field in the modal
  const [websiteName, setWebsiteName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [description, setDescription] = useState(''); // NEW state for the description
  const [isUpdating, setIsUpdating] = useState(false);

  // This effect populates the form with the data of the credential being edited.
  useEffect(() => {
    if (credential) {
      setWebsiteName(credential.websiteName || '');
      setUsername(credential.username || '');
      setPassword(credential.password || '');
      setDescription(credential.description || ''); // Populate the description field
    }
  }, [credential]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      // UPDATED: Include the description in the object sent for updating
      await onUpdate(credential.id, { websiteName, username, password, description });
      onClose(); // Close the modal on successful update
    } catch (error) {
      console.error("Failed to update:", error);
      alert("Update failed. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 border border-gray-700 animate-fade-in">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Edit Credential</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition"><X size={24} /></button>
        </div>
        <form onSubmit={handleUpdate}>
          <input value={websiteName} onChange={e => setWebsiteName(e.target.value)} type="text" placeholder="Website Name" required className="w-full mb-4 p-2 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          <input value={username} onChange={e => setUsername(e.target.value)} type="text" placeholder="Username/Email" required className="w-full mb-4 p-2 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          {/* Using type="text" for password to allow viewing while editing */}
          <input value={password} onChange={e => setPassword(e.target.value)} type="text" placeholder="Password" required className="w-full mb-4 p-2 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          {/* NEW: Textarea for editing the description */}
          <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description (optional)" rows="3" className="w-full mb-4 p-2 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md font-semibold bg-gray-600 hover:bg-gray-500 transition">Cancel</button>
            <button type="submit" disabled={isUpdating} className="px-4 py-2 rounded-md font-semibold bg-indigo-600 hover:bg-indigo-700 transition disabled:opacity-50">
              {isUpdating ? 'Updating...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCredentialModal;

