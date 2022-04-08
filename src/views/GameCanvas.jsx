import React from 'react';
import PropTypes from 'prop-types';

import { Canvas } from '@react-three/fiber';

// TODO: Fix so that multiple children can be passed in
const GameCanvas = ({ children }) => {
  console.log('GameCanvas.jsx: children: ', children);
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {React.Children.map(children, (child) => child)}
    </Canvas>
  );
};

GameCanvas.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};

export default GameCanvas;
