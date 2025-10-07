import React, { useState, useEffect, useMemo } from 'react';
import { signOut } from 'firebase/auth';
// Correcting import paths to be relative to the current file location
import { auth } from '../firebaseConfig.js';
import { streamCredentials, deleteCredential, updateCredential } from '../services/firestoreService.js';
import CredentialItem from './CredentialItem.jsx';
import Spinner from './common/Spinner.jsx';
import EditCredentialModal from './EditCredentialModal.jsx';
import ConfirmationModal from './ConfirmationModal.jsx';
import SettingsModal from './SettingsModal.jsx';
import AddCredentialModal from './AddCredentialModal.jsx';
import { PlusCircle } from 'lucide-react';

const MainApp = ({ user }) => {
  const [credentials, setCredentials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [currentCredential, setCurrentCredential] = useState(null);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = streamCredentials(user.uid, (creds) => {
      setCredentials(creds);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [user]);

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
    setCurrentCredential(null);
  };
  
  const allTags = useMemo(() => {
    const tagSet = new Set();
    credentials.forEach(cred => {
      if (cred.tags) {
        cred.tags.forEach(tag => tagSet.add(tag));
      }
    });
    return Array.from(tagSet).sort();
  }, [credentials]);

  const filteredCredentials = useMemo(() => {
    return credentials
      .filter(cred => {
        if (filterTag) {
          return cred.tags && cred.tags.includes(filterTag);
        }
        return true;
      })
      .filter(cred => {
        if (!searchTerm) return true;
        const term = searchTerm.toLowerCase();
        const websiteMatch = (cred.websiteName || '').toLowerCase().includes(term);
        const usernameMatch = (cred.username || '').toLowerCase().includes(term);
        const descriptionMatch = (cred.description || '').toLowerCase().includes(term);
        const tagsMatch = (cred.tags || []).some(tag => tag.toLowerCase().includes(term));
        return websiteMatch || usernameMatch || descriptionMatch || tagsMatch;
      });
  }, [credentials, searchTerm, filterTag]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 p-4 bg-gray-900/30 rounded-lg border border-gray-700 backdrop-blur-sm">
            <h1 className="text-3xl font-bold tracking-wider">Credential Keep</h1>
            <div className="flex items-center gap-4">
                <button onClick={() => setIsSettingsModalOpen(true)} className="bg-gray-700 px-4 py-2 rounded-md font-semibold hover:bg-gray-600 transition">
                    Account Settings
                </button>
                <button onClick={() => signOut(auth)} className="bg-indigo-600 px-4 py-2 rounded-md font-semibold hover:bg-indigo-700 transition">
                Sign Out
                </button>
            </div>
        </header>

        <main>
            <div className="bg-gray-800/50 p-3 rounded-lg shadow-lg border border-gray-700 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold">Your Credentials</h2>
                <button 
                  onClick={() => setIsAddModalOpen(true)} 
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 py-2.5 px-5 rounded-md font-bold hover:bg-indigo-700 transition-transform transform hover:scale-105"
                >
                  <PlusCircle size={20} />
                  Add New Credential
                </button>
              </div>

              <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search website, username, etc..." className="w-full p-2 mb-4 bg-gray-700/50 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              {allTags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                   <button onClick={() => setFilterTag(null)} className={`px-3 py-1 text-sm rounded-full transition ${!filterTag ? 'bg-indigo-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}>
                    All
                  </button>
                  {allTags.map(tag => (
                    <button key={tag} onClick={() => setFilterTag(tag)} className={`px-3 py-1 text-sm rounded-full transition ${filterTag === tag ? 'bg-indigo-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}>
                      {tag}
                    </button>
                  ))}
                </div>
              )}
              
              {isLoading ? (
                <div className="flex justify-center items-center h-40"><Spinner /></div>
              ) : (
                <div className="space-y-3">
                  {filteredCredentials.length > 0 ? (
                    filteredCredentials.map(cred => (
                      <CredentialItem key={cred.id} credential={cred} onDelete={handleOpenDeleteModal} onEdit={handleOpenEditModal} />
                    ))
                  ) : (
                    <div className="text-center text-gray-400 py-10">
                      <h3 className="text-xl font-semibold">Your Vault is Empty</h3>
                      <p className="mt-2">Click "Add New Credential" to get started!</p>
                    </div>
                  )}
                </div>
              )}
            </div>
        </main>
      </div>
      
      <AddCredentialModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} user={user} />
      <SettingsModal isOpen={isSettingsModalOpen} onClose={() => setIsSettingsModalOpen(false)} user={user} />
      <EditCredentialModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} credential={currentCredential} onUpdate={handleUpdateCredential} />
      <ConfirmationModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleConfirmDelete} title="Confirm Deletion" message="Are you sure you want to permanently delete this credential?" />
    </div>
  );
};

export default MainApp;

