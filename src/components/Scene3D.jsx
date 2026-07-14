import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment, MeshDistortMaterial, Icosahedron, TorusKnot } from '@react-three/drei'
import * as THREE from 'three'

/** The lime blob. Rotates slowly and drifts toward the pointer. */
function Blob() {
  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.getElapsedTime()
    ref.current.rotation.x = t * 0.12
    ref.current.rotation.y = t * 0.18
    // gentle parallax toward the pointer
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, state.pointer.x * 0.4, 0.04)
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, state.pointer.y * 0.4, 0.04)
  })

  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.1}>
      <Icosahedron ref={ref} args={[1.45, 12]}>
        <MeshDistortMaterial
          color="#c6f24e"
          roughness={0.15}
          metalness={0.35}
          distort={0.38}
          speed={1.6}
          emissive="#3a4a14"
          emissiveIntensity={0.25}
        />
      </Icosahedron>
    </Float>
  )
}

/** The dark wire ring orbiting behind it. */
function Ring() {
  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.getElapsedTime()
    ref.current.rotation.z = t * 0.25
    ref.current.rotation.x = Math.sin(t * 0.3) * 0.5
  })

  return (
    <Float speed={1} rotationIntensity={0.4} floatIntensity={0.8}>
      <TorusKnot ref={ref} args={[2.6, 0.06, 220, 16]} position={[0, 0, -1]}>
        <meshStandardMaterial color="#2c2c38" roughness={0.4} metalness={0.6} />
      </TorusKnot>
    </Float>
  )
}

export default function Scene3D() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 42 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} />
      <pointLight position={[-4, -2, -4]} intensity={1.2} color="#c6f24e" />
      <Blob />
      <Ring />
      <Environment preset="city" />
    </Canvas>
  )
}
