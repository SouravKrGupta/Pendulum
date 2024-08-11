import React, { useState } from 'react';

interface LanguageProps {
  onClose: () => void;
  onSave: () => void;
}

const Language: React.FC<LanguageProps> = ({ onClose,onSave }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'languages'>('languages');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('English');

  const handleTabChange = (tab: 'overview' | 'languages') => {
    setActiveTab(tab);
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };
  const handleSaveClick = () => {
    onSave();
  };
  return (
    <div className="flex overflow-hidden flex-col px-5 py-5 font-bold text-center bg-white rounded-xl max-w-[362px] shadow-[0px_0px_32px_rgba(0,0,0,0.25)]">
      {/* Header */}
      <header className="flex items-center text-xl text-black whitespace-nowrap">
        <h1 className="self-stretch my-auto w-[305px]">{activeTab === 'overview' ? 'Overview' : 'Languages'}</h1>
        <button 
          onClick={onClose} 
          className="object-contain shrink-0 self-stretch my-auto w-4 rounded-none aspect-square"
        >
          X
        </button>
      </header>

      {/* Navigation Tabs */}
      <nav className="flex gap-5 justify-between px-11 mt-4 w-full text-lg whitespace-nowrap">
        <div 
          className={`cursor-pointer ${activeTab === 'overview' ? 'text-blue-500' : 'text-neutral-500'}`}
          onClick={() => handleTabChange('overview')}
        >
          Overview
        </div>
        <div className={`flex flex-col ${activeTab === 'languages' ? 'text-black' : 'text-neutral-500'}`}>
          <div 
            className="self-start cursor-pointer"
            onClick={() => handleTabChange('languages')}
          >
            Languages
          </div>
          <div className={`flex shrink-0 bg-blue-500 h-[3px] ${activeTab === 'languages' ? '' : 'hidden'}`} />
        </div>
      </nav>

      {/* Language Selector */}
      {activeTab === 'languages' && (
        <section className="flex flex-col mt-4 w-full text-2xl text-black whitespace-nowrap rounded-none max-w-[322px]">
          <div className="flex gap-10 px-2 py-2 rounded-2xl border border-black border-solid">
            <div
              className={`px-9 py-2.5 rounded-xl ${selectedLanguage === 'English' ? 'bg-indigo-200' : 'bg-white'}`}
              onClick={() => handleLanguageChange('English')}
            >
              English
            </div>
            <div
              className={`px-5 py-2.5 rounded-xl ${selectedLanguage === 'हिन्दी' ? 'bg-indigo-200' : 'bg-white'}`}
              onClick={() => handleLanguageChange('हिन्दी')}
            >
              हिन्दी
            </div>
          </div>
        </section>
      )}

      {/* Action Buttons */}
      {activeTab === 'languages' && (
        <div className="flex justify-center gap-4 mt-6">
          <button onClick={handleSaveClick} className="px-4 py-2 bg-blue-500 text-white rounded-xl">Save</button>
          <button className="px-4 py-2 bg-gray-500 text-white rounded-xl" onClick={onClose}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Language;
