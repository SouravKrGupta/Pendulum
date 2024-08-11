import React, { useState } from 'react';

interface OptionsProps {
  onAirResistanceChange: (value: boolean) => void;
  onFreeBodyDiagramChange: (value: boolean) => void;
  onValuesChange: (value: boolean) => void;
}

const Options: React.FC<OptionsProps> = ({
  onAirResistanceChange,
  onFreeBodyDiagramChange,
  onValuesChange,
}) => {
  const [airResistance, setAirResistance] = useState<boolean>(false);
  const [freeBodyDiagram, setFreeBodyDiagram] = useState<boolean>(false);
  const [values, setValues] = useState<boolean>(false);

  const handleAirResistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    setAirResistance(value);
    onAirResistanceChange(value);
  };

  const handleFreeBodyDiagramChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    setFreeBodyDiagram(value);
    onFreeBodyDiagramChange(value);
  };

  const handleValuesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    setValues(value);
    onValuesChange(value);
  };

  return (
    <div className="bg-white shadow-md p-6 mt-5 border border-gray-300 rounded-lg">
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold">Options</h3>
      </div>

      <div className="flex flex-col space-y-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={airResistance}
            onChange={handleAirResistanceChange}
            className="form-checkbox"
          />
          <span>Air Resistance</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={freeBodyDiagram}
            onChange={handleFreeBodyDiagramChange}
            className="form-checkbox"
          />
          <span>Free Body Diagram</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={values}
            onChange={handleValuesChange}
            className="form-checkbox"
          />
          <span>Show Values</span>
        </label>
      </div>
    </div>
  );
};

export default Options;
