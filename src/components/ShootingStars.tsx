import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export const ShootingStars = ({ count = 8 }) => {
  const stars = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 80,
        Math.random() * 40 + 20,
        (Math.random() - 0.5) * 40
      ),
      speed: Math.random() * 0.005 + 0.002, // Much slower speed
      size: Math.random() * 0.05 + 0.02,
      trail: Math.random() * 15 + 10, // Much longer trails
    }))
  }, [count])

  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.children.forEach((starGroup: any, i) => {
        const starData = stars[i]
        starGroup.position.y -= starData.speed
        starGroup.position.x += starData.speed
        
        // Reset when out of bounds - slightly randomized reset
        if (starGroup.position.y < -30) {
          starGroup.position.y = 40 + Math.random() * 20
          starGroup.position.x = (Math.random() - 0.7) * 100
        }

        // Pulse effect for the comet head
        const head = starGroup.children[0]
        if (head) {
          head.scale.setScalar(1 + Math.sin(t * 2 + i) * 0.3)
        }

        // Animate trail opacity and length
        const trail = starGroup.children[1]
        if (trail) {
          trail.material.opacity = 0.15 + Math.sin(t * 1.5 + i) * 0.1
        }
      })
    }
  })

  return (
    <group ref={groupRef}>
      {stars.map((star, i) => (
        <group key={i} position={star.position} rotation={[0, 0, Math.PI / 3.5]}>
          {/* Comet Head - Glowing Core */}
          <mesh>
            <sphereGeometry args={[star.size, 16, 16]} />
            <meshStandardMaterial 
              color="#fff" 
              emissive="#10b981" 
              emissiveIntensity={20} 
            />
          </mesh>
          
          {/* Long Tapered Trail - Now using more segments for better look */}
          <mesh position={[0, star.trail / 2, 0]}>
            <cylinderGeometry args={[0.001, star.size, star.trail, 8, 1]} />
            <meshStandardMaterial 
              color="#10b981" 
              transparent 
              opacity={0.4} 
              emissive="#10b981"
              emissiveIntensity={8}
              blending={THREE.AdditiveBlending}
            />
          </mesh>

          {/* Soft Bloom Aura around the head */}
          <mesh>
            <sphereGeometry args={[star.size * 8, 16, 16]} />
            <meshBasicMaterial 
              color="#10b981" 
              transparent 
              opacity={0.05} 
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}
