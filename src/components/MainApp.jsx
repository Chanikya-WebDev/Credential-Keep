import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig.js';
import { streamCredentials, addCredential, deleteCredential, updateCredential } from '../services/firestoreService.js';
import CredentialItem from './CredentialItem.jsx';
import Spinner from './common/Spinner.jsx';
import EditCredentialModal from './EditCredentialModal.jsx';
import ConfirmationModal from './ConfirmationModal.jsx';
import SettingsModal from './SettingsModal.jsx'; // NEW: Import the settings modal

const MainApp = ({ user }) => {
  const [credentials, setCredentials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Form state
  const [websiteName, setWebsiteName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [description, setDescription] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false); // NEW: State for settings modal
  const [currentCredential, setCurrentCredential] = useState(null);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = streamCredentials(user.uid, (creds) => {
      setCredentials(creds);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [user]);

  const handleAddCredential = async (e) => {
    e.preventDefault();
    if (!websiteName || !username || !password) return;
    await addCredential(user.uid, { websiteName, username, password, description });
    setWebsiteName('');
    setUsername('');
    setPassword('');
    setDescription('');
  };

  const handleOpenEditModal = (credential) => {
    setCurrentCredential(credential);
    setIsEditModalOpen(true);
  };
  
  const handleUpdateCredential = async (id, updatedData) => {
      await updateCredential(user.uid, id, updatedData);
      setIsEditModalOpen(false);
  };

  const handleOpenDeleteModal = (id) => {
    setCurrentCredential({ id });
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (currentCredential) {
      await deleteCredential(user.uid, currentCredential.id);
    }
    setIsDeleteModalOpen(false);
  };

  const filteredCredentials = credentials.filter(cred =>
    (cred.websiteName || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold">Credential Keep</h1>
          <div className="flex items-center gap-4">
            {/* NEW: Button to open the settings modal */}
            <button onClick={() => setIsSettingsModalOpen(true)} className="bg-gray-600 px-4 py-2 rounded-md font-semibold hover:bg-gray-500 transition">
                Account Settings
            </button>
            <button onClick={() => signOut(auth)} className="bg-indigo-600 px-4 py-2 rounded-md font-semibold hover:bg-indigo-700 transition">
              Sign Out
            </button>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Add Credential</h2>
              <form onSubmit={handleAddCredential}>
                <input value={websiteName} onChange={e => setWebsiteName(e.target.value)} type="text" placeholder="Website Name" required className="w-full mb-4 p-2 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <input value={username} onChange={e => setUsername(e.target.value)} type="text" placeholder="Username/Email" required className="w-full mb-4 p-2 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" required className="w-full mb-4 p-2 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description (optional)" rows="3" className="w-full mb-4 p-2 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
                <button type="submit" className="w-full bg-indigo-600 py-2.5 rounded-md font-semibold hover:bg-indigo-700 transition">
                  Add Credential
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Your Credentials</h2>
              <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search by website..." className="w-full p-2 mb-6 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              {isLoading ? (
                <div className="flex justify-center items-center h-40"><Spinner /></div>
              ) : (
                <div className="space-y-4">
                  {filteredCredentials.length > 0 ? (
                    filteredCredentials.map(cred => (
                      <CredentialItem key={cred.id} credential={cred} onDelete={handleOpenDeleteModal} onEdit={handleOpenEditModal} />
                    ))
                  ) : (
                     <p className="text-gray-400 text-center py-4">
                       {searchTerm ? 'No matches found.' : 'Add your first credential!'}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      
      {/* Render all the modals */}
      <EditCredentialModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} credential={currentCredential} onUpdate={handleUpdateCredential} />
      <ConfirmationModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleConfirmDelete} title="Confirm Deletion" message="Are you sure you want to permanently delete this credential?" />
      {/* NEW: Render the settings modal */}
      <SettingsModal isOpen={isSettingsModalOpen} onClose={() => setIsSettingsModalOpen(false)} user={user} />
    </div>
  );
};

export default MainApp;

