import  { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Pendulum from './component/Pendulum';
import Graph from './component/Graph';
import Recorder from './component/Recorder';
import Controls from './component/Controls';
import Options from './component/Options';
import ControlPanel from './component/ControlPanel';
import Protractor from './component/canvas/Protector'; // Corrected name
import BallGroup from './component/canvas/BallGroup';

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

  const handlePendulumChange = (length1: number, mass1: number, length2?: number, mass2?: number) => {
    setLength1(length1);
    setMass1(mass1);
    setLength2(length2 ?? 0);
    setMass2(mass2 ?? 0);
    setTwoPendulums(length2 !== undefined && mass2 !== undefined);
  };

  const handleAirResistanceChange = (value: boolean) => {
    setAirResistance(value);
  };

  const handleEnergyChange = (newPendulumData: { color: string; energy: { mechanical: number; kinetic: number; potential: number } }[]) => {
    setPendulumData(newPendulumData);
  };

  return (
    <main className="flex flex-col h-fit overflow-hidden bg-white">
      <section className="flex flex-col md:flex-row flex-grow gap-5 p-4 md:p-6">
        <div className="flex flex-col flex-1 text-base text-black space-y-5">
          <Graph energyData={{ mechanical: 0, kinetic: 0, potential: 0 }} pendulumData={pendulumData} />
          <Recorder />
        </div>

        <div className="flex-1 justify-center md:justify-end">
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
            <Protractor /> {/* Ensure this is correctly positioned */}
          </Canvas>
        </div>

        <div className="flex flex-col flex-1 space-y-4">
          <Controls onPendulumChange={handlePendulumChange} />
          <Options 
            onAirResistanceChange={handleAirResistanceChange} 
            onFreeBodyDiagramChange={() => {}} 
            onValuesChange={() => {}} 
          />
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
