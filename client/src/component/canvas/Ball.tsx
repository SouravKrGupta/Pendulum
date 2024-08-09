// Ball.tsx
import React from 'react';
import { Sphere } from '@react-three/drei';

interface BallProps {
  position?: [number, number, number];
  color?: string;
}

const Ball: React.FC<BallProps> = ({ position = [0, 0, 0], color = 'blue' }) => {
  return (
    <Sphere args={[0.2, 32, 32]} position={position}>
      <meshBasicMaterial attach="material" color={color} />
    </Sphere>
  );
};

export default Ball;
