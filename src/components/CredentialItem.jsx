import React, { useState } from 'react';
import { Clipboard, Eye, EyeOff, Trash2, FilePenLine } from 'lucide-react';

const CredentialItem = ({ credential, onDelete, onEdit }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      setToastMessage(`${type} copied!`);
      setTimeout(() => setToastMessage(''), 2000);
    });
  };

  return (
    // The main container for a single credential
    <div className="bg-gray-800/60 p-4 rounded-lg border border-gray-700 transition-all hover:border-indigo-500/50 hover:bg-gray-800 relative overflow-hidden flex flex-col gap-3">
      
      {/* Section 1: Main Info (No Icon) */}
      <div className="flex-grow min-w-0">
        <h3 className="font-bold text-lg text-white break-words">{credential.websiteName}</h3>
        {/* The 'truncate' class is removed to allow wrapping on small screens */}
        <p className="text-sm text-gray-300 break-words">{credential.username}</p>
      </div>

      {/* Section 2: Password Display */}
      <div className="w-full">
        <p className="text-sm text-gray-400 font-mono bg-gray-900/50 px-3 py-2 rounded-md break-all">
          {isPasswordVisible ? credential.password : '••••••••••••'}
        </p>
      </div>

      {/* Section 3: Description and Tags */}
      {(credential.description || (credential.tags && credential.tags.length > 0)) && (
        <div className="text-xs text-gray-400 break-words whitespace-pre-wrap border-t border-gray-700/50 pt-3 mt-1">
          {/* NEW: Added a clear label for the description */}
          {credential.description && (
            <div>
                <span className="font-bold text-gray-300">Info:</span>
                <span className="pl-1 opacity-90">{credential.description}</span>
            </div>
          )}
          {credential.tags && credential.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {credential.tags.map((tag) => (
                <span key={tag} className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Section 4: Action Buttons Bar - remains the same, well-suited for mobile */}
      <div className="mt-2 pt-3 border-t border-gray-700/50 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <button onClick={() => setIsPasswordVisible(!isPasswordVisible)} title="Show/Hide Password" className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md transition">{isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}</button>
            <button onClick={() => copyToClipboard(credential.password, 'Password')} title="Copy Password" className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md transition"><Clipboard size={18} /></button>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => onEdit(credential)} title="Edit" className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md transition"><FilePenLine size={18} /></button>
            <button onClick={() => onDelete(credential.id)} title="Delete" className="p-2 text-red-400 hover:text-white hover:bg-red-600 rounded-md transition"><Trash2 size={18} /></button>
          </div>
      </div>
      
      {/* Toast notification for copy action */}
      {toastMessage && (
        <div className="absolute top-4 right-4 bg-green-600 text-white text-xs font-bold py-1 px-2 rounded-md animate-fade-in">
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default CredentialItem;

