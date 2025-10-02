import React, { useState } from 'react';

// A small, presentational component for a single credential.
const CredentialItem = ({ cred, onDelete }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    // Using a more robust toast notification library would be better in a real app.
    const copyToClipboard = (text, type) => {
        navigator.clipboard.writeText(text).then(() => {
            alert(`${type} copied to clipboard!`);
        }, () => {
            alert(`Failed to copy ${type}.`);
        });
    };
    
    return (
        <div className='bg-gray-800 p-4 rounded-lg mb-3 flex flex-col md:flex-row md:items-center justify-between animate-fade-in'>
            <div className="flex-grow mb-3 md:mb-0">
                <p className="font-bold text-lg text-white break-all">{cred.websiteName}</p>
                <p className="text-sm text-gray-400 break-all">{cred.username}</p>
                <p className={`text-sm text-gray-400 mt-1 font-mono break-all ${!isPasswordVisible && 'password-field'}`}>
                    {isPasswordVisible ? cred.password : '•••••••••••'}
                </p>
            </div>
            <div className="flex items-center space-x-2 flex-shrink-0">
                 <button onClick={() => copyToClipboard(cred.username, 'Username')} title="Copy Username" className="p-2 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></button>
                 <button onClick={() => copyToClipboard(cred.password, 'Password')} title="Copy Password" className="p-2 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg></button>
                 <button onClick={() => setIsPasswordVisible(!isPasswordVisible)} title="Show/Hide Password" className="p-2 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors"><svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg></button>
                 <button onClick={() => onDelete(cred.id)} title="Delete Credential" className="p-2 rounded-md bg-red-800 hover:bg-red-700 transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
            </div>
        </div>
    );
};

export default CredentialItem;
