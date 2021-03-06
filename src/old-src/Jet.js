/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei/useGLTF';
import { PerspectiveCamera } from '@react-three/drei/PerspectiveCamera';

export default function Model(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF('/jet.gltf', true);
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh material={materials.Paint} geometry={nodes.Fuselage.geometry} />
      <mesh material={materials.Paint} geometry={nodes.KanardR.geometry} />
      <mesh material={materials.Paint} geometry={nodes.KanardL.geometry} />
      <mesh material={materials.Paint} geometry={nodes.Tail.geometry} />
      <mesh material={materials.Paint} geometry={nodes.Rudder.geometry} />
      <mesh material={materials.Paint} geometry={nodes.EngineL.geometry} />
      <mesh material={materials.Paint} geometry={nodes.EngineR.geometry} />
      <mesh material={materials.Paint} geometry={nodes.FuelTankL.geometry} />
      <mesh material={materials.Paint} geometry={nodes.FuelTankR.geometry} />
      <mesh material={materials.Paint} geometry={nodes.Damocles.geometry} />
      <mesh material={materials.Paint} geometry={nodes.SlatL.geometry} />
      <mesh material={materials.Paint} geometry={nodes.SlatR.geometry} />
      <mesh material={materials.Paint} geometry={nodes.FlapL.geometry} />
      <mesh material={materials.Paint} geometry={nodes.FlapR.geometry} />
      <mesh material={materials.Paint} geometry={nodes.EleronL.geometry} />
      <mesh material={materials.Paint} geometry={nodes.EleronR.geometry} />
      <mesh material={materials.Paint} geometry={nodes.CanopyRear.geometry} />
      <mesh material={materials.Paint} geometry={nodes.CanopyFront.geometry} />
      <mesh material={materials.Paint} geometry={nodes.CockpitTub.geometry} />
      <mesh material={materials.Paint} geometry={nodes.FrontHub.geometry} />
      <mesh material={materials.Paint} geometry={nodes.RearHub.geometry} />
      <mesh material={materials.Paint} geometry={nodes.RearSeat.geometry} />
      <mesh material={materials.Paint} geometry={nodes.FrontSeat.geometry} />
      <mesh material={materials.Paint} geometry={nodes.GearBoxRear.geometry} />
      <mesh material={materials.Paint} geometry={nodes.GearBoxFront.geometry} />
      <mesh material={materials.Paint} geometry={nodes.DoorsRear1L.geometry} />
      <mesh material={materials.Paint} geometry={nodes.DoorsRear1R.geometry} />
      <mesh material={materials.Paint} geometry={nodes.DoorsRear2L.geometry} />
      <mesh material={materials.Paint} geometry={nodes.DoorsRear2R.geometry} />
      <mesh material={materials.Paint} geometry={nodes.DoorsFront1.geometry} />
      <mesh material={materials.Paint} geometry={nodes.DoorsFront2R.geometry} />
      <mesh material={materials.Paint} geometry={nodes.DoorsFront2L.geometry} />
      <mesh material={materials.Paint} geometry={nodes.PylonTipL.geometry} />
      <mesh material={materials.Paint} geometry={nodes.PylonTipR.geometry} />
      <mesh material={materials.Paint} geometry={nodes.PylonCenter.geometry} />
      <mesh material={materials.Paint} geometry={nodes.Pylon1L.geometry} />
      <mesh material={materials.Paint} geometry={nodes.Pylon1R.geometry} />
      <mesh material={materials.Paint} geometry={nodes.Pylon2L.geometry} />
      <mesh material={materials.Paint} geometry={nodes.Pylon2R.geometry} />
      <mesh material={materials.Paint} geometry={nodes.Pylon3L.geometry} />
      <mesh material={materials.Paint} geometry={nodes.Pylon3R.geometry} />
      <mesh material={materials.Paint} geometry={nodes.Pylon3BaseL.geometry} />
      <mesh material={materials.Paint} geometry={nodes.Pylon3BaseR.geometry} />
      <mesh material={materials.Paint} geometry={nodes.MeteorR.geometry} />
      <mesh material={materials.Paint} geometry={nodes.MeteorL.geometry} />
      <mesh material={materials.Paint} geometry={nodes.MICAR.geometry} />
      <mesh material={materials.Paint} geometry={nodes.MICAL.geometry} />
      <mesh material={materials.Paint} geometry={nodes.ExocetR.geometry} />
      <mesh material={materials.Paint} geometry={nodes.ExocetL.geometry} />
      <mesh material={materials.Paint} geometry={nodes['GBU-24'].geometry} />
      <mesh material={materials.Paint} geometry={nodes.Hook.geometry} />
      <mesh material={materials.Paint} geometry={nodes.HookBase.geometry} />
      <mesh material={materials.Paint} geometry={nodes.WheelL.geometry} />
      <mesh material={materials.Paint} geometry={nodes.WheelR.geometry} />
      <mesh material={materials.Paint} geometry={nodes.NoseWheelL.geometry} />
      <mesh material={materials.Paint} geometry={nodes.NoseWheelR.geometry} />
      <mesh material={materials.Paint} geometry={nodes.UpperStrutL.geometry} />
      <mesh material={materials.Paint} geometry={nodes.UpperStrutR.geometry} />
      <mesh material={materials.Paint} geometry={nodes.MainStrutL.geometry} />
      <mesh material={materials.Paint} geometry={nodes.MainStrutR.geometry} />
      <mesh material={materials.Paint} geometry={nodes.SideStrutL.geometry} />
      <mesh material={materials.Paint} geometry={nodes.SideStrutR.geometry} />
      <mesh material={materials.Paint} geometry={nodes.Strut1L.geometry} />
      <mesh material={materials.Paint} geometry={nodes.Strut1R.geometry} />
      <mesh material={materials.Paint} geometry={nodes.Strut2L.geometry} />
      <mesh material={materials.Paint} geometry={nodes.Strut2R.geometry} />
      <mesh material={materials.Paint} geometry={nodes.Strut3L.geometry} />
      <mesh material={materials.Paint} geometry={nodes.Strut3R.geometry} />
      <mesh material={materials.Paint} geometry={nodes.FrontMainStrut.geometry} />
      <mesh material={materials.Paint} geometry={nodes.FrontLowerStrut.geometry} />
      <mesh material={materials.Paint} geometry={nodes.FrontStrut1.geometry} />
      <mesh material={materials.Paint} geometry={nodes.FrontStrut2.geometry} />
      <mesh material={materials.Paint} geometry={nodes.FrontLights.geometry} />
      <mesh material={materials.Glass} geometry={nodes.GlassRear.geometry} />
      <mesh material={materials.Glass} geometry={nodes.GlassFront.geometry} />
      <PerspectiveCamera
        makeDefault={false}
        far={1000}
        near={0.05}
        fov={40}
        position={[10.35, 12.89, 5.83]}
        rotation={[-1.06, 0.72, 0.86]}
        scale={[1, 1, 1]}
      />
    </group>
  );
}

useGLTF.preload('/jet.gltf');
