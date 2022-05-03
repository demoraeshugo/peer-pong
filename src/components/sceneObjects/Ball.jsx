import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { useSphere } from '@react-three/cannon';

const Ball = () => {
  // Load texture (the black plus sign)
  const map = useLoader(THREE.TextureLoader, '/cross.jpg');
  // Make the ball a physics object with a low mass
  const [ref] = useSphere(() => ({ mass: 1, args: [0.5], position: [0, 10, 0] }));
  return (
    <mesh castShadow ref={ref}>
      <sphereBufferGeometry attach="geometry" args={[0.5, 64, 64]} />
      <meshStandardMaterial attach="material" map={map} />
    </mesh>
  );
};

export default Ball;
