import React, { useState, useEffect, useMemo } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { getCredentials, addCredential, deleteCredential } from '../services/firestoreService';
import CredentialItem from './CredentialItem';
import Spinner from './common/Spinner';

const MainApp = ({ user }) => {
  const [credentials, setCredentials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [websiteName, setWebsiteName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Set up real-time listener for credentials
  useEffect(() => {
    if (!user) return;
    
    setIsLoading(true);
    const unsubscribe = getCredentials(user.uid, (creds) => {
      setCredentials(creds);
      setIsLoading(false);
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, [user]);

  const handleAddCredential = async (e) => {
    e.preventDefault();
    if (!websiteName || !username || !password) return;
    try {
      await addCredential(user.uid, { websiteName, username, password });
      setWebsiteName('');
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to add credential.");
    }
  };
  
  const handleDeleteCredential = async (id) => {
    if (window.confirm("Are you sure you want to delete this credential?")) {
        try {
            await deleteCredential(user.uid, id);
        } catch (error) {
            console.error("Error deleting document: ", error);
            alert("Failed to delete credential.");
        }
    }
  };
  
  // useMemo will only re-calculate the filtered list when credentials or searchTerm change.
  const filteredCredentials = useMemo(() => 
    credentials.filter(cred => cred.websiteName.toLowerCase().includes(searchTerm.toLowerCase())),
    [credentials, searchTerm]
  );

  return (
    <div className="w-full h-screen p-4 bg-gray-950">
        <div className="w-full max-w-6xl mx-auto bg-gray-900 rounded-2xl shadow-2xl flex flex-col h-full border border-gray-700">
            <header className="p-4 sm:p-6 border-b border-gray-700 flex items-center justify-between flex-shrink-0">
                <div>
                    <h1 className="text-2xl font-bold text-white">Credential Keep</h1>
                    <p className="text-gray-400 text-sm truncate" title={user.email}>{user.email || 'Signed In'}</p>
                </div>
                <button onClick={() => signOut(auth)} className="py-2 px-4 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-600">Log Out</button>
            </header>
            <main className="flex-grow flex flex-col md:flex-row overflow-hidden">
                <div className="w-full md:w-1/3 p-6 border-r border-gray-700 flex-shrink-0 overflow-y-auto">
                    <h2 className="text-lg font-semibold mb-4 text-white">Add New Credential</h2>
                    <form onSubmit={handleAddCredential} className="space-y-4">
                        <input value={websiteName} onChange={e => setWebsiteName(e.target.value)} type="text" placeholder="Website Name" required className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        <input value={username} onChange={e => setUsername(e.target.value)} type="text" placeholder="Email or Username" required className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" required className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">Add Credential</button>
                    </form>
                </div>
                <div className="flex-grow flex flex-col p-6 overflow-hidden">
                    <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search by website name..." className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4 flex-shrink-0" />
                    <div className="flex-grow overflow-y-auto pr-2">
                        {isLoading ? (
                           <div className="h-full flex items-center justify-center"><Spinner /></div>
                        ) : filteredCredentials.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center text-gray-500"><svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v3m-6 4h12a2 2 0 002-2v-3a2 2 0 00-2-2H6a2 2 0 00-2 2v3a2 2 0 002 2z"></path></svg><h3 className="text-lg font-semibold">No Credentials Found</h3><p className="mt-1">{searchTerm ? 'Try a different search term.' : 'Use the form to add one.'}</p></div>
                        ) : (
                            filteredCredentials.map(cred => <CredentialItem key={cred.id} cred={cred} onDelete={handleDeleteCredential} />)
                        )}
                    </div>
                </div>
            </main>
        </div>
    </div>
  );
};

export default MainApp;
