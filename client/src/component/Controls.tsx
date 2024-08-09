import React, { useState } from 'react';

interface ControlsProps {
  onPendulumChange: (length1: number, mass1: number, length2?: number, mass2?: number) => void;
}

const Controls: React.FC<ControlsProps> = ({ onPendulumChange }) => {
  const [twoPendulum, setTwoPendulum] = useState<boolean>(false);
  const [length1, setLength1] = useState<number>(5);
  const [mass1, setMass1] = useState<number>(0.5);
  const [length2, setLength2] = useState<number>(5);
  const [mass2, setMass2] = useState<number>(0.5);

  const handleTwoPendulumChange = (checked: boolean) => {
    setTwoPendulum(checked);
    if (!checked) {
      setLength2(0);
      setMass2(0);
    }
    onPendulumChange(length1, mass1, checked ? length2 : undefined, checked ? mass2 : undefined);
  };

  return (
    <div className="bg-white shadow-md p-6 border border-gray-300 rounded-lg">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">Controls</h3>
        <button className="text-red-500 font-bold">X</button>
      </div>

      <div className="mt-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={twoPendulum}
            onChange={(e) => handleTwoPendulumChange(e.target.checked)}
            className="form-checkbox"
          />
          <span className="text-sm">Two Pendulum</span>
        </label>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Length (Pendulum 1)</label>
        <input
          type="text"
          value={`${length1} cm`}
          readOnly
          className="w-28 ml-32 mt-1 text-center font-bold border-2 border-gray-300 rounded-md"
        />
        <input
          type="range"
          value={length1}
          onChange={(e) => {
            const newLength = Number(e.target.value);
            setLength1(newLength);
            onPendulumChange(newLength, mass1, twoPendulum ? length2 : undefined, twoPendulum ? mass2 : undefined);
          }}
          min={0}
          max={10}
          className="w-full mt-2"
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Mass (Pendulum 1)</label>
        <input
          type="text"
          value={`${mass1} gm`}
          readOnly
          className="w-28 ml-32 mt-1 text-center font-bold border-2 border-gray-300 rounded-md"
        />
        <input
          type="range"
          value={mass1}
          onChange={(e) => {
            const newMass = Number(e.target.value);
            setMass1(newMass);
            onPendulumChange(length1, newMass, twoPendulum ? length2 : undefined, twoPendulum ? mass2 : undefined);
          }}
          min={0.1}
          max={10}
          className="w-full mt-2"
        />
      </div>

      {twoPendulum && (
        <>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Length (Pendulum 2)</label>
            <input
              type="text"
              value={`${length2} cm`}
              readOnly
              className="w-28 ml-32 mt-1 text-center font-bold border-2 border-gray-300 rounded-md"
            />
            <input
              type="range"
              value={length2}
              onChange={(e) => {
                const newLength = Number(e.target.value);
                setLength2(newLength);
                onPendulumChange(length1, mass1, newLength, mass2);
              }}
              min={0}
              max={10}
              className="w-full mt-2"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Mass (Pendulum 2)</label>
            <input
              type="text"
              value={`${mass2} gm`}
              readOnly
              className="w-28 ml-32 mt-1 text-center font-bold border-2 border-gray-300 rounded-md"
            />
            <input
              type="range"
              value={mass2}
              onChange={(e) => {
                const newMass = Number(e.target.value);
                setMass2(newMass);
                onPendulumChange(length1, mass1, length2, newMass);
              }}
              min={0.1}
              max={10}
              className="w-full mt-2"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Controls;
