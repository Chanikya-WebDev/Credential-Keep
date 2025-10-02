import React from 'react';
import { X, AlertTriangle } from 'lucide-react'; // Make sure you've run: npm install lucide-react

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) {
    return null;
  }

  return (
    // Main overlay - fixed position, full screen, semi-transparent background
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4"
      onClick={onClose} // Close modal if clicking on the overlay
    >
      {/* Modal content - stops click propagation so clicking inside doesn't close it */}
      <div 
        className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 border border-gray-700 animate-fade-in"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white flex items-center">
            <AlertTriangle className="text-red-500 mr-3" size={24} />
            {title}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition">
            <X size={24} />
          </button>
        </div>

        <p className="text-gray-300 mb-6">
          {message}
        </p>

        {/* Action buttons */}
        <div className="flex justify-end gap-4">
          <button 
            onClick={onClose} 
            className="px-4 py-2 rounded-md font-semibold bg-gray-600 hover:bg-gray-500 transition"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm} 
            className="px-4 py-2 rounded-md font-semibold bg-red-600 hover:bg-red-700 transition"
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;

