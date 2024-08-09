import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import {Group} from 'three'
interface PendulumProps {
  isPlaying: boolean;
  playbackSpeed: number;
  reset: boolean;
  twoPendulums: boolean;
  length1: number;
  mass1: number;
  length2?: number;
  mass2?: number;
  airResistance: boolean;
  onEnergyChange: (energyData: { color: string; energy: { mechanical: number; kinetic: number; potential: number } }[]) => void;
}

const Pendulum: React.FC<PendulumProps> = ({
  isPlaying,
  playbackSpeed,
  reset,
  twoPendulums,
  length1,
  mass1,
  length2 = 0,
  mass2 = 0,
  airResistance,
  onEnergyChange,
}) => {
  const [angle1, setAngle1] = useState(Math.PI / 4);
  const [speed1, setSpeed1] = useState(0.02);
  const [angle2, setAngle2] = useState(-Math.PI / 4);
  const [speed2, setSpeed2] = useState(0.02);

  const pendulumRef = useRef<Group>(null);

  useEffect(() => {
    setSpeed1(0.02 * playbackSpeed);
    if (twoPendulums) {
      setSpeed2(0.02 * playbackSpeed);
    }
  }, [playbackSpeed, twoPendulums]);

  useEffect(() => {
    if (reset) {
      setAngle1(Math.PI / 6);
      setSpeed1(0.02 * playbackSpeed);
      if (twoPendulums) {
        setAngle2(-Math.PI / 6);
        setSpeed2(0.02 * playbackSpeed);
      }
    }
  }, [reset, playbackSpeed, twoPendulums]);

  useFrame(() => {
    if (isPlaying) {
      const g = 9.81; // Acceleration due to gravity
      const damping = airResistance ? 0.01 : 0; // Simple linear drag coefficient

      // Update angles and speeds
      setAngle1((prev) => {
        const newAngle = prev + speed1;
        if (newAngle > Math.PI / 4 || newAngle < -Math.PI / 4) {
          setSpeed1(-speed1);
        }
        setSpeed1((prevSpeed) => prevSpeed * (1 - damping)); // Apply air resistance
        return newAngle;
      });

      if (twoPendulums) {
        setAngle2((prev) => {
          const newAngle = prev + speed2;
          if (newAngle > Math.PI / 4 || newAngle < -Math.PI / 4) {
            setSpeed2(-speed2);
          }
          setSpeed2((prevSpeed) => prevSpeed * (1 - damping)); // Apply air resistance
          return newAngle;
        });
      }

      // Calculate energies
      const h1 = length1 - length1 * Math.cos(angle1);
      const kinetic1 = mass1 * g * length1 * (Math.cos(angle1) - Math.cos(Math.PI / 4));
      const potential1 = mass1 * g * h1;
      const mechanical1 = kinetic1 + potential1;

      if (twoPendulums) {
        const h2 = length2 - length2 * Math.cos(angle2);
        const kinetic2 = mass2 * g * length2 * (Math.cos(angle2) - Math.cos(-Math.PI / 4));
        const potential2 = mass2 * g * h2;
        const mechanical2 = kinetic2 + potential2;

        onEnergyChange([
          {
            color: 'red',
            energy: { mechanical: mechanical1, kinetic: kinetic1, potential: potential1 }
          },
          {
            color: 'blue',
            energy: { mechanical: mechanical2, kinetic: kinetic2, potential: potential2 }
          }
        ]);
      } else {
        onEnergyChange([
          {
            color: 'red',
            energy: { mechanical: mechanical1, kinetic: kinetic1, potential: potential1 }
          }
        ]);
      }
    }
  });

  return (
    <group ref={pendulumRef} position={[0, 5, 0]}>
      <Line
        points={[
          [0, 0, 0],
          [Math.sin(angle1) * length1, -Math.cos(angle1) * length1, 0],
        ]}
        color="black"
        lineWidth={2}
      />
      <mesh position={[Math.sin(angle1) * length1, -Math.cos(angle1) * length1, 0]}>
        <sphereGeometry args={[mass1, 32, 32]} />
        <meshBasicMaterial color="red" />
      </mesh>

      {twoPendulums && (
        <>
          <Line
            points={[
              [0, 0, 0],
              [Math.sin(angle2) * length2, -Math.cos(angle2) * length2, 0],
            ]}
            color="black"
            lineWidth={2}
          />
          <mesh position={[Math.sin(angle2) * length2, -Math.cos(angle2) * length2, 0]}>
            <sphereGeometry args={[mass2, 32, 32]} />
            <meshBasicMaterial color="blue" />
          </mesh>
        </>
      )}
    </group>
  );
};

export default Pendulum;
