import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaRedo } from 'react-icons/fa';

const Recorder: React.FC = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: number | undefined; // Use number type for the interval ID
    if (isActive) {
      interval = window.setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!isActive && time !== 0) {
      window.clearInterval(interval);
    }
    return () => window.clearInterval(interval);
  }, [isActive, time]);

  const handleStartPause = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setTime(0);
    setIsActive(false);
  };

  const formatTime = (time: number) => {
    const milliseconds = (`0${(time / 10) % 100}`).slice(-2);
    const seconds = (`0${Math.floor((time / 1000) % 60)}`).slice(-2);
    return `${seconds}.${milliseconds}`;
  };

  return (
    <div className="bg-purple-500 text-white rounded-lg p-4 flex flex-col items-center mt-5 w-72 ml-9">
      <div className="text-2xl mb-2 bg-white text-purple-500 py-2 px-4 rounded-lg shadow-lg w-64 text-center">
        {formatTime(time)}
        <span className="text-sm ml-1">sec</span>
      </div>
      <div className="flex">
        <button
          onClick={handleStartPause}
          className="bg-white text-purple-500 rounded-lg  p-2 mx-1 shadow-md flex items-center justify-center"
        >
          {isActive ? <FaPause className="w-6 h-6" /> : <FaPlay className="w-6 h-6" />}
        </button>
        <button
          onClick={handleReset}
          className="bg-white text-purple-500 rounded-lg p-2 mx-1 shadow-md flex items-center justify-center"
        >
          <FaRedo className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Recorder;
