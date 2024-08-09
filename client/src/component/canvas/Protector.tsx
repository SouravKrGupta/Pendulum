import React from 'react';
import { Line, Circle, Text } from '@react-three/drei';


const Protractor: React.FC = () => {
  const angleMarks = [];
  for (let i = 0; i <= 180; i += 10) {
    const angle = (i * Math.PI) / 180;
    angleMarks.push(
      <React.Fragment key={i}>
        <Line
          points={[
            [Math.cos(angle) * 3, -Math.sin(angle) * 3, 0],
            [Math.cos(angle) * 3.2, -Math.sin(angle) * 3.2, 0],
          ]}
          color="black"
          lineWidth={1}
        />
        <Text
          position={[Math.cos(angle) * 3.5, -Math.sin(angle) * 3.5, 0]}
          fontSize={0.15}
          color="black"
        >
          {i}
        </Text>
      </React.Fragment>
    );
  }

  return (
    <group position={[0, 4.5, 0]}> {/* Positioned at the top */}
      {/* Protractor arc */}
      <Circle
        args={[3, 64, 0, Math.PI]}
        rotation={[Math.PI, 0, 0]}
        
      />
      {angleMarks}
      {/* Dashed Line from 90 degrees */}
      <Line
        points={[
          [0, 0, 0],
          [0, -9, 0]
        ]}
        color="gray"
        lineWidth={1.5}
        dashed
        dashSize={0.2}
        gapSize={0.1}
      />
    </group>
  );
};

export default Protractor;
