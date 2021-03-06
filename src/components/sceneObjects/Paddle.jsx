import { useBox } from '@react-three/cannon';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import lerp from 'lerp';

import Score from './Score';
import { useGameStore } from '../gameStore';

const Paddle = () => {
  const { nodes, materials } = useGLTF('/paddle.glb');
  const { pong } = useGameStore((state) => state.api);
  const welcome = useGameStore((state) => state.welcome);
  const count = useGameStore((state) => state.count);
  const model = useRef(null);
  const [ref, api] = useBox(
    () => ({
      args: [3.4, 1, 3],
      onCollide: (e) => pong(e.contact.impactVelocity),
      type: 'Kinematic'
    }),
    useRef(null)
  );
  const values = useRef([0, 0]);
  const mappedPosition = useRef([0, 0]);

  useFrame(() => {
    const controller = useGameStore.getState().controller;
    mappedPosition.current[0] =
      controller.velocity.x === 0
        ? 0
        : controller.velocity.x > 0
        ? mappedPosition.current[0] + 0.03
        : mappedPosition.current[0] - 0.03;
    mappedPosition.current[1] =
      controller.velocity.y === 0
        ? 0
        : controller.velocity.y > 0
        ? values.current[1] + 0.03
        : values.current[1] - 0.03;

    values.current[0] = lerp(values.current[0], (mappedPosition.current[0] * Math.PI) / 5, 0.2);
    values.current[1] = lerp(values.current[1], (mappedPosition.current[0] * Math.PI) / 5, 0.2);

    api.position.set(mappedPosition.current[0] * 10, mappedPosition.current[1] * 5, 0);
    api.rotation.set(0, 0, values.current[1]);

    if (!model.current) return;

    model.current.rotation.x = lerp(model.current.rotation.x, welcome ? Math.PI / 2 : 0, 0.2);
    model.current.rotation.y = values.current[0];

    console.log(controller.rotation);
    console.log(controller.velocity);
    console.log(values.current);
    console.log(model.current.rotation);
  });

  return (
    <mesh ref={ref} dispose={null}>
      <group ref={model} position={[-0.05, 0.37, 0.3]} scale={[0.15, 0.15, 0.15]}>
        <Score rotation={[-Math.PI / 2, 0, 0]} position={[0, 1, 2]} count={count.toString()} />
        <group rotation={[1.88, -0.35, 2.32]} scale={[2.97, 2.97, 2.97]}>
          <primitive object={nodes.Bone} />
          <primitive object={nodes.Bone003} />
          <primitive object={nodes.Bone006} />
          <primitive object={nodes.Bone010} />
          <skinnedMesh
            castShadow
            receiveShadow
            material={materials.glove}
            material-roughness={1}
            geometry={nodes.arm.geometry}
            skeleton={nodes.arm.skeleton}
          />
        </group>
        <group rotation={[0, -0.04, 0]} scale={[141.94, 141.94, 141.94]}>
          <mesh castShadow receiveShadow material={materials.wood} geometry={nodes.mesh.geometry} />
          <mesh
            castShadow
            receiveShadow
            material={materials.side}
            geometry={nodes.mesh_1.geometry}
          />
          <mesh
            castShadow
            receiveShadow
            material={materials.foam}
            geometry={nodes.mesh_2.geometry}
          />
          <mesh
            castShadow
            receiveShadow
            material={materials.lower}
            geometry={nodes.mesh_3.geometry}
          />
          <mesh
            castShadow
            receiveShadow
            material={materials.upper}
            geometry={nodes.mesh_4.geometry}
          />
        </group>
      </group>
    </mesh>
  );
};

export default Paddle;
