import  { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Pendulum from './component/Pendulum';
import Graph from './component/Graph';
import Recorder from './component/Recorder';
import Controls from './component/Controls';
import Options from './component/Options';
import ControlPanel from './component/ControlPanel';
import Protractor from './component/canvas/Protector';
import BallGroup from './component/canvas/BallGroup';
import axios from 'axios';
import Language from './component/Message/Language';
import Details from './component/Message/Details';
import { API_BASE_URL } from './config';
function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [resetPendulum, setResetPendulum] = useState(false);
  const [twoPendulums, setTwoPendulums] = useState(false);
  const [length1, setLength1] = useState(5);
  const [mass1, setMass1] = useState(0.5);
  const [length2, setLength2] = useState(5);
  const [mass2, setMass2] = useState(0.5);
  const [airResistance, setAirResistance] = useState(false);
  const [pendulumData, setPendulumData] = useState<{ color: string; energy: { mechanical: number; kinetic: number; potential: number } }[]>([]);
  const [showLanguagePopup, setShowLanguagePopup] = useState(false);
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [description, setDescription] = useState("Default description");

  const handlePlayPauseClick = () => {
    setIsPlaying(prev => !prev);
  };

  const handleSpeedChange = () => {
    setPlaybackSpeed(prevSpeed => {
      if (prevSpeed === 1) return 1.5;
      if (prevSpeed === 1.5) return 2;
      return 1;
    });
  };

  const handleRedoClick = () => {
    setIsPlaying(false);
    setPlaybackSpeed(1);
    setResetPendulum(true);
    setTimeout(() => setResetPendulum(false), 0);
  };

  const handlePendulumChange = async (length1: number, mass1: number, length2?: number, mass2?: number) => {
    setLength1(length1);
    setMass1(mass1);
    setLength2(length2 ?? 0);
    setMass2(mass2 ?? 0);
    setTwoPendulums(length2 !== undefined && mass2 !== undefined);
    
    try {
      await axios.post(`${API_BASE_URL}/pendulum`, {
        Length1: length1,
        Mass1: mass1,
        Length2: length2 ?? 0,
        Mass2: mass2 ?? 0,
        twoPendulums: length2 !== undefined && mass2 !== undefined
      });
    } catch (error) {
      console.error('Error saving pendulum data:', error);
    }
  };

  const handleAirResistanceChange = (value: boolean) => {
    setAirResistance(value);
    if (value) {
      setShowLanguagePopup(true); // Show popup when airResistance is true
    } else {
      setShowLanguagePopup(false); // Hide popup if airResistance is false
    }
  };

  const handleEnergyChange = (newPendulumData: { color: string; energy: { mechanical: number; kinetic: number; potential: number } }[]) => {
    setPendulumData(newPendulumData);
  };

  const handleCloseLanguagePopup = () => {
    setShowLanguagePopup(false);
  };

  const handleLanguageSave = () => {
    setShowLanguagePopup(false);
    setShowDetailsPopup(true);
  };

  const handleCloseDetailsPopup = () => {
    setShowDetailsPopup(false);
  };

  return (
    <main className="flex flex-col h-fit overflow-hidden bg-white">
      <section className="flex flex-col md:flex-row flex-grow gap-5 p-4 md:p-6">
        <div className="flex flex-col flex-1 text-base text-black space-y-5">
          <Graph energyData={{ mechanical: 0, kinetic: 0, potential: 0 }} pendulumData={pendulumData} />
          <Recorder />
        </div>

        <div className="flex-1 flex justify-center md:justify-end">
          <Canvas
            camera={{ position: [0, 5, 10], fov: 50 }}
            style={{ width: '700px', height: '500px' }}
          >
            <pointLight position={[10, 10, 10]} />
            <Pendulum
              isPlaying={isPlaying}
              playbackSpeed={playbackSpeed}
              reset={resetPendulum}
              twoPendulums={twoPendulums}
              length1={length1}
              mass1={mass1}
              length2={length2}
              mass2={mass2}
              airResistance={airResistance}
              onEnergyChange={handleEnergyChange}
            />
            {airResistance && <BallGroup />}
            <Protractor /> 
          </Canvas>
        </div>

        <div className="flex flex-col flex-1 space-y-4">
          <Controls onPendulumChange={handlePendulumChange} />
          <Options 
            onAirResistanceChange={handleAirResistanceChange} 
            onFreeBodyDiagramChange={() => {}} 
            onValuesChange={() => {}} 
          />
          {showLanguagePopup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="relative bg-white rounded-lg p-6">
                <Language onClose={handleCloseLanguagePopup} onSave={handleLanguageSave} />
              </div>
            </div>
          )}
          {showDetailsPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="relative bg-white rounded-lg p-6">
                <Details onClose={handleCloseDetailsPopup} description={description} />
              </div>
            </div>
          )}
        </div>
      </section>
      <ControlPanel
        isPlaying={isPlaying}
        onPlayPauseClick={handlePlayPauseClick}
        playbackSpeed={playbackSpeed}
        onSpeedChange={handleSpeedChange}
        onRedoClick={handleRedoClick}
      />
    </main>
  );
}

export default App;
