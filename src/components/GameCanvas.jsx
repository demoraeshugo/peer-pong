import { Suspense, useRef } from 'react';
import PropTypes from 'prop-types';
import { Canvas } from '@react-three/fiber';
import { MeshReflectorMaterial } from '@react-three/drei';
import { Physics, usePlane, Debug } from '@react-three/cannon';
import clamp from 'lodash-es/clamp';

import { Cursor } from './helpers/Drag';
import Guy from './sceneObjects/Guy';
import { Chair, Table, Lamp } from './sceneObjects/Furniture';
import Ball from './sceneObjects/Ball';
import Paddle from './sceneObjects/Paddle';
import { useGameStore } from './gameStore';

const style = (welcome) => ({
  color: 'white',
  display: welcome ? 'block' : 'none',
  fontSize: '1.2em',
  left: 50,
  position: 'absolute',
  top: 50
});

const Floor = (props) => {
  const { reset } = useGameStore((state) => state.api);
  const [ref] = usePlane(
    () => ({
      type: 'Static',
      onCollide: () => reset(true),
      ...props
    }),
    useRef(null)
  );
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <MeshReflectorMaterial
        color="#878790"
        blur={[400, 400]}
        resolution={428}
        mixBlur={1}
        mixStrength={3}
        depthScale={1}
        minDepthThreshold={0.85}
        metalness={0}
        roughness={1}
      />
    </mesh>
  );
};

const GameCanvas = () => {
  const welcome = useGameStore((state) => state.welcome);
  const { reset } = useGameStore((state) => state.api);

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        padding: '0px',
        top: '0px',
        left: '0px',
        border: '0px',
        margin: '0px',
        zIndex: -1
      }}>
      <Canvas
        dpr={[1, 2]}
        shadows
        camera={{
          position: [-40, 40, 40],
          fov: 25,
          near: 1,
          far: 100
        }}
        onPointerMissed={() => welcome && reset(false)}>
        <color attach="background" args={['#171720']} />
        <fog attach="fog" args={['#171720', 60, 90]} />
        <ambientLight intensity={0.2} />
        <pointLight position={[-20, -5, -20]} color="red" />
        <Physics allowSleep={false} iterations={15} gravity={[0, -200, 0]}>
          <Lamp position={[0, 30, 0]} />
        </Physics>
        <Physics
          iterations={20}
          tolerance={0.0001}
          defaultContactMaterial={{
            contactEquationRelaxation: 1,
            contactEquationStiffness: 1e7,
            friction: 0.9,
            frictionEquationRelaxation: 2,
            frictionEquationStiffness: 1e7,
            restitution: 0.7
          }}
          gravity={[0, -40, 0]}
          allowSleep={false}>
          <Debug>
            <Suspense fallback={null}>
              <Floor position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]} />
              {!welcome && <Ball />}
              <Suspense fallback={null}>
                <Paddle />
              </Suspense>
            </Suspense>
          </Debug>
        </Physics>
      </Canvas>
      {/* <div style={style(welcome)}>* click anywhere to start</div> */}
    </div>
  );
};

GameCanvas.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default GameCanvas;
