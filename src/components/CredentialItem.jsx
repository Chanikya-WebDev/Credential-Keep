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
    <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600 relative overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
        <div className="flex-grow min-w-0">
          <h3 className="font-bold text-lg text-white break-words">{credential.websiteName}</h3>
          <p className="text-sm text-gray-300 break-words">{credential.username}</p>
          <p className="text-sm text-gray-400 font-mono break-all mt-1">
            {isPasswordVisible ? credential.password : '••••••••••••'}
          </p>
          {credential.description && (
            <p className="text-xs text-gray-400 mt-2 pt-2 border-t border-gray-600 break-words whitespace-pre-wrap">
              {credential.description}
            </p>
          )}
          {/* NEW: Display tags if they exist */}
          {credential.tags && credential.tags.length > 0 && (
            <div className="mt-2 pt-2 border-t border-gray-600 flex flex-wrap gap-2">
              {credential.tags.map((tag, index) => (
                <span key={index} className="text-xs bg-indigo-600/50 text-indigo-200 px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 self-start sm:self-center">
          <button onClick={() => onEdit(credential)} title="Edit" className="p-2 text-gray-300 hover:text-white hover:bg-gray-600 rounded-md transition"><FilePenLine size={18} /></button>
          <button onClick={() => copyToClipboard(credential.username, 'Username')} title="Copy Username" className="p-2 text-gray-300 hover:text-white hover:bg-gray-600 rounded-md transition"><Clipboard size={18} /></button>
          <button onClick={() => setIsPasswordVisible(!isPasswordVisible)} title="Show/Hide Password" className="p-2 text-gray-300 hover:text-white hover:bg-gray-600 rounded-md transition">{isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}</button>
          <button onClick={() => onDelete(credential.id)} title="Delete" className="p-2 text-red-400 hover:text-white hover:bg-red-500 rounded-md transition"><Trash2 size={18} /></button>
        </div>
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
