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

  // Helper to generate a placeholder icon from the first letter of the website
  const siteInitial = credential.websiteName ? credential.websiteName.charAt(0).toUpperCase() : '?';

  return (
    <div className="bg-gray-800/60 p-4 rounded-lg border border-gray-700 flex items-start gap-4 transition-all hover:border-indigo-500/50 hover:bg-gray-800">
      {/* NEW: Added a site initial icon for better visual identification */}
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500/30 flex items-center justify-center font-bold text-indigo-300 border border-indigo-500/50">
        {siteInitial}
      </div>

      <div className="flex-grow min-w-0">
        <h3 className="font-bold text-lg text-white truncate">{credential.websiteName}</h3>
        <p className="text-sm text-gray-300 truncate">{credential.username}</p>
        
        {/* Password and actions are now grouped */}
        <div className="flex items-center gap-2 mt-2">
            <p className="text-sm text-gray-400 font-mono bg-gray-900/50 px-2 py-1 rounded-md flex-grow truncate">
              {isPasswordVisible ? credential.password : '••••••••••••'}
            </p>
            {/* UPDATED: Action buttons are cleaner and grouped together */}
            <button onClick={() => setIsPasswordVisible(!isPasswordVisible)} title="Show/Hide Password" className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md transition">{isPasswordVisible ? <EyeOff size={16} /> : <Eye size={16} />}</button>
            <button onClick={() => copyToClipboard(credential.password, 'Password')} title="Copy Password" className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md transition"><Clipboard size={16} /></button>
        </div>

        {credential.description && (
          <p className="text-xs text-gray-400 mt-2 pt-2 border-t border-gray-700/50 break-words whitespace-pre-wrap">
            {credential.description}
          </p>
        )}
        {credential.tags && credential.tags.length > 0 && (
          <div className="mt-2 pt-2 border-t border-gray-700/50 flex flex-wrap gap-2">
            {credential.tags.map((tag) => (
              <span key={tag} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* NEW: Edit/Delete buttons are now separate for better mobile UX */}
      <div className="flex flex-col gap-2 flex-shrink-0">
        <button onClick={() => onEdit(credential)} title="Edit" className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md transition"><FilePenLine size={16} /></button>
        <button onClick={() => onDelete(credential.id)} title="Delete" className="p-2 text-red-400 hover:text-white hover:bg-red-600 rounded-md transition"><Trash2 size={16} /></button>
      </div>

      {toastMessage && (
        <div className="absolute bottom-2 right-2 bg-green-600 text-white text-xs font-bold py-1 px-2 rounded-md animate-fade-in">
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default CredentialItem;

