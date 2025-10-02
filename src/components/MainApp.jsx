import React, { useState, useEffect, useMemo } from 'react';
import { signOut } from 'firebase/auth';
// Correcting import paths to be relative to the project's src directory
import { auth } from '../firebaseConfig.js';
import { streamCredentials, addCredential, deleteCredential, updateCredential } from '../services/firestoreService.js';
import CredentialItem from './CredentialItem.jsx';
import Spinner from './common/Spinner.jsx';
import EditCredentialModal from './EditCredentialModal.jsx';
import ConfirmationModal from './ConfirmationModal.jsx';
import SettingsModal from './SettingsModal.jsx';

const MainApp = ({ user }) => {
  const [credentials, setCredentials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Form state
  const [websiteName, setWebsiteName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState(null);

  // Modal state
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

  const handleAddCredential = async (e) => {
    e.preventDefault();
    if (!websiteName || !username || !password) return;
    const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    await addCredential(user.uid, { websiteName, username, password, description, tags: tagsArray });
    setWebsiteName('');
    setUsername('');
    setPassword('');
    setDescription('');
    setTags('');
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
      <div className="max-w-7xl mx-auto">
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

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 lg:sticky lg:top-8 self-start">
            <div className="bg-gray-800/50 p-6 rounded-lg shadow-lg border border-gray-700 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-4">Add Credential</h2>
              <form onSubmit={handleAddCredential}>
                <input value={websiteName} onChange={e => setWebsiteName(e.target.value)} type="text" placeholder="Website Name" required className="w-full mb-4 p-2 bg-gray-700/50 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <input value={username} onChange={e => setUsername(e.target.value)} type="text" placeholder="Username/Email" required className="w-full mb-4 p-2 bg-gray-700/50 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" required className="w-full mb-4 p-2 bg-gray-700/50 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description (optional)" rows="3" className="w-full mb-4 p-2 bg-gray-700/50 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
                <input value={tags} onChange={e => setTags(e.target.value)} type="text" placeholder="Tags (comma-separated)" className="w-full mb-4 p-2 bg-gray-700/50 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <button type="submit" className="w-full bg-indigo-600 py-2.5 rounded-md font-bold hover:bg-indigo-700 transition-transform transform hover:scale-105">
                  Add Credential
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 p-6 rounded-lg shadow-lg border border-gray-700 backdrop-blur-sm">
                <h2 className="text-2xl font-bold mb-4">Your Credentials</h2>
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
                    <div className="space-y-4">
                    {filteredCredentials.length > 0 ? (
                        filteredCredentials.map(cred => (
                        <CredentialItem key={cred.id} credential={cred} onDelete={handleOpenDeleteModal} onEdit={handleOpenEditModal} />
                        ))
                    ) : (
                        <p className="text-gray-400 text-center py-4">
                        {searchTerm || filterTag ? 'No credentials match your filters.' : 'Your credential vault is empty.'}
                        </p>
                    )}
                    </div>
                )}
            </div>
          </div>
        </main>
      </div>
      
      <SettingsModal isOpen={isSettingsModalOpen} onClose={() => setIsSettingsModalOpen(false)} user={user} />
      <EditCredentialModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} credential={currentCredential} onUpdate={handleUpdateCredential} />
      <ConfirmationModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleConfirmDelete} title="Confirm Deletion" message="Are you sure you want to permanently delete this credential?" />
    </div>
  );
};

export default MainApp;

