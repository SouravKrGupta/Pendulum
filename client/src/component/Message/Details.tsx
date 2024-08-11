import React, { useState } from 'react';

interface DetailsProps {
  onClose: () => void;
  description: string;
}

const Details: React.FC<DetailsProps> = ({ onClose, description }) => {
  const [activeTab, setActiveTab] = useState<'description' | 'theory'>('description');

  const handleTabChange = (tab: 'description' | 'theory') => {
    setActiveTab(tab);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
      <div className="relative flex flex-col px-5 py-5 font-bold text-center bg-white rounded-xl w-full max-w-[1200px] shadow-[0px_0px_32px_rgba(0,0,0,0.25)]">
        {/* Header */}
        <header className="flex justify-center items-center text-2xl text-black whitespace-nowrap">
          <h1 className="flex-1">Information</h1>
          <button 
            onClick={onClose} 
            className="absolute top-2 right-2 w-6 h-6 text-lg "
          >
            X
          </button>
        </header>

        {/* Navigation Tabs */}
        <nav className="flex justify-center gap-10 mt-4 w-full text-lg whitespace-nowrap">
          <div 
            className={`cursor-pointer  ${activeTab === 'description' ? 'text-blue-500' : 'text-neutral-500'}`}
            onClick={() => handleTabChange('description')}
          >
            Description
          </div>
          <div 
            className={`cursor-pointer  ${activeTab === 'theory' ? 'text-blue-500' : 'text-neutral-500'}`}
            onClick={() => handleTabChange('theory')}
          >
            Theory
          </div>
        </nav>

        {/* Horizontal Line */}
        <hr className="my-4 border-gray-300" />

        {/* Content based on the active tab */}
        <div className="flex flex-col mt-4 w-full text-black whitespace-normal text-left">
          {activeTab === 'description' ? (
            <div className="mt-4 text-base text-black">{description}</div>
          ) : (
            <div className="mt-4 text-base text-neutral-700">
              {/* Replace with actual theory content */}
              <div>Theory content goes here. This could be detailed explanations, formulas, etc.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Details;
