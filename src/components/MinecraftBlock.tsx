import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, MeshDistortMaterial, GradientTexture } from '@react-three/drei'
import * as THREE from 'three'

export const MinecraftBlock = () => {
  const groupRef = useRef<THREE.Group>(null)
  const materialRef = useRef<any>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005
      groupRef.current.rotation.z += 0.002
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3
    }
    if (materialRef.current) {
      materialRef.current.distort = 0.2 + Math.sin(state.clock.getElapsedTime()) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Outer stylized cube */}
      <RoundedBox args={[1.2, 1.2, 1.2]} radius={0.1} smoothness={4}>
        <MeshDistortMaterial
          color="#10b981"
          speed={2}
          distort={0.3}
          radius={1}
          emissive="#064e3b"
          metalness={0.8}
          roughness={0.2}
        />
      </RoundedBox>
      
      {/* Inner solid core */}
      <RoundedBox args={[0.8, 0.8, 0.8]} radius={0.05} smoothness={4}>
        <meshStandardMaterial color="#ffffff" metalness={1} roughness={0} />
      </RoundedBox>

      {/* Floating particles around it */}
      {[...Array(5)].map((_, i) => (
        <mesh key={i} position={[Math.sin(i) * 2, Math.cos(i) * 2, Math.sin(i * 2) * 2]}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={2} />
        </mesh>
      ))}
    </group>
  )
}
