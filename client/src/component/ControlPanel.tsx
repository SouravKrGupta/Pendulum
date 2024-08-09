import React from 'react';
import { FaRedo, FaPause, FaInfoCircle, FaUsers, FaPlay } from 'react-icons/fa';

interface ControlPanelProps {
  isPlaying: boolean;
  onPlayPauseClick: () => void;
  playbackSpeed: number;
  onSpeedChange: () => void;
  onRedoClick: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  isPlaying,
  onPlayPauseClick,
  playbackSpeed,
  onSpeedChange,
  onRedoClick,
}) => {
  return (
    <section className="bottom-0 left-0 right-0 flex justify-center gap-2 items-center p-2">
      <div
        className="flex items-center justify-center bg-white rounded-full h-12 w-12 cursor-pointer"
        onClick={onRedoClick}
        role="button"
        aria-label="Redo"
        tabIndex={0}
      >
        <FaRedo className="text-gray-700 w-6 h-6" aria-label="Redo" />
      </div>
      <div
        className="flex items-center justify-center bg-white rounded-full h-12 w-12 cursor-pointer"
        onClick={onPlayPauseClick}
        role="button"
        aria-label={isPlaying ? 'Pause' : 'Play'}
        tabIndex={0}
      >
        {isPlaying ? (
          <FaPause className="text-gray-700 w-6 h-6" aria-label="Pause" />
        ) : (
          <FaPlay className="text-gray-700 w-6 h-6" aria-label="Play" />
        )}
      </div>
      <div
        className="flex items-center justify-center bg-white rounded-full h-12 w-12 cursor-pointer"
        onClick={onSpeedChange}
        role="button"
        aria-label={`${playbackSpeed}x`}
        tabIndex={0}
      >
        {`${playbackSpeed}x`}
      </div>
      <div className="flex items-center justify-center bg-white rounded-full h-12 w-12 cursor-pointer" tabIndex={0} role="button" aria-label="Info">
        <FaInfoCircle className="text-gray-700 w-6 h-6" aria-label="Info" />
      </div>
      <div className="flex items-center justify-center bg-white rounded-full h-12 w-12 cursor-pointer">
        <FaUsers className="text-gray-700 w-6 h-6" aria-label="Users" />
      </div>
    </section>
  );
};

export default ControlPanel;
