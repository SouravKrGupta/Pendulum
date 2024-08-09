// BallGroup.tsx
import React from 'react';
import Ball from './Ball';

const BallGroup: React.FC = () => {
  const numBalls = 1000; // Adjust the number of balls as needed
  const radius = 50; // Radius for distribution

  // Generate positions in a spherical distribution
  const generateSphericalPositions = (numBalls: number, radius: number) => {
    const positions: [number, number, number][] = [];
    for (let i = 0; i < numBalls; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      positions.push([x, y, z]);
    }
    return positions;
  };

  const positions = generateSphericalPositions(numBalls, radius);

  return (
    <>
      {positions.map((position, index) => (
        <Ball key={index} position={position} color={`hsl(${Math.random() * 360}, 100%, 50%)`} />
      ))}
    </>
  );
};

export default BallGroup;
