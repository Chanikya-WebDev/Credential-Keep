import React from 'react';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center space-x-2">
      <div className="w-4 h-4 rounded-full bg-indigo-400 animate-pulse" style={{ animationDelay: '0s' }}></div>
      <div className="w-4 h-4 rounded-full bg-indigo-400 animate-pulse" style={{ animationDelay: '0.15s' }}></div>
      <div className="w-4 h-4 rounded-full bg-indigo-400 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
    </div>
  );
};

export default Spinner;

