import React from 'react';
import { Text } from '@react-three/drei';

interface FreeBodyDiagramProps {
  angle: number;
  tension: number;
  kineticEnergy: number;
  potentialEnergy: number;
  totalEnergy: number;
}

const FreeBodyDiagram: React.FC<FreeBodyDiagramProps> = ({
  angle,
  tension,
  kineticEnergy,
  potentialEnergy,
  totalEnergy,
}) => {
  return (
    <group>
      {/* Tension */}
      <Text position={[0, -1.5, 0]} fontSize={0.2} color="red">
        Tension: {tension.toFixed(2)} N
      </Text>
      {/* Angle */}
      <Text position={[0, -2, 0]} fontSize={0.2} color="blue">
        Angle: {(angle * (180 / Math.PI)).toFixed(2)}°
      </Text>
      {/* Kinetic Energy */}
      <Text position={[0, -2.5, 0]} fontSize={0.2} color="green">
        Kinetic Energy: {kineticEnergy.toFixed(2)} J
      </Text>
      {/* Potential Energy */}
      <Text position={[0, -3, 0]} fontSize={0.2} color="orange">
        Potential Energy: {potentialEnergy.toFixed(2)} J
      </Text>
      {/* Total Energy */}
      <Text position={[0, -3.5, 0]} fontSize={0.2} color="purple">
        Total Energy: {totalEnergy.toFixed(2)} J
      </Text>
    </group>
  );
};

export default FreeBodyDiagram;
