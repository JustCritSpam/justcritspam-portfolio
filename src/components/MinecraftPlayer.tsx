import { useRef, Suspense, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

const PlayerModel = () => {
  const groupRef = useRef<THREE.Group>(null)
  const headRef = useRef<THREE.Mesh>(null)
  const rightArmRef = useRef<THREE.Group>(null)
  const leftArmRef = useRef<THREE.Group>(null)
  const rightLegRef = useRef<THREE.Mesh>(null)
  const leftLegRef = useRef<THREE.Mesh>(null)
  
  const [isJumping, setIsJumping] = useState(false)
  const [currentAction, setCurrentAction] = useState<'none' | 'shift' | 'wave'>('none')
  const [isHovered, setIsHovered] = useState(false)
  const jumpProgress = useRef(0)
  const actionTimer = useRef(0)
  
  const skinTexture = useTexture('/skin.png')
  skinTexture.magFilter = THREE.NearestFilter
  skinTexture.minFilter = THREE.NearestFilter
  
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()
    
    // Random Action Logic
    actionTimer.current += delta
    if (actionTimer.current > 5 && currentAction === 'none' && !isJumping) {
      if (Math.random() > 0.7) {
        setCurrentAction(Math.random() > 0.5 ? 'shift' : 'wave')
        setTimeout(() => setCurrentAction('none'), 2000)
      }
      actionTimer.current = 0
    }

    // Body position & rotation
    if (groupRef.current) {
      let targetY = Math.sin(t * 1.5) * 0.15 - 0.5
      let targetRotX = 0
      const targetScale = isHovered ? 1.3 : 1.1

      if (isJumping) {
        jumpProgress.current += delta * 7
        targetY = Math.sin(jumpProgress.current) * 2 - 0.5
        targetRotX = -Math.sin(jumpProgress.current) * 0.3
        if (jumpProgress.current >= Math.PI) {
          setIsJumping(false)
          jumpProgress.current = 0
        }
      } else if (currentAction === 'shift') {
        targetY = -0.8
        targetRotX = 0.3
      }

      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.1)
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.1)
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, -0.5, 0.05)
      
      const s = THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.1)
      groupRef.current.scale.set(s, s, s)
    }

    if (headRef.current) {
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, 0, 0.1)
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, (currentAction === 'shift' ? 0.3 : 0), 0.1)
    }

    // Arms movement
    if (rightArmRef.current) {
      let armTargetX = -(isJumping ? Math.PI : 0)
      let armTargetZ = Math.sin(t * 2) * 0.05 + 0.1

      if (currentAction === 'wave') {
        armTargetX = -Math.PI + Math.sin(t * 10) * 0.5
        armTargetZ = 0.2
      }

      rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, armTargetX, 0.1)
      rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, armTargetZ, 0.1)
    }

    if (leftArmRef.current) {
      const armTargetX = -(isJumping ? Math.PI : 0)
      const armTargetZ = -(Math.sin(t * 2) * 0.05 + 0.1)
      leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, armTargetX, 0.1)
      leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, armTargetZ, 0.1)
    }
  })

  // Minecraft UV mapping helper
  const getMaterials = (u: number, v: number, w: number, h: number, d: number) => {
    const s = 1 / 64
    const faces = [
      { x: u + d + w, y: v + d, w: d, h: h }, // Left
      { x: u, y: v + d, w: d, h: h }, // Right
      { x: u + d, y: v, w: w, h: d }, // Top
      { x: u + d + w, y: v, w: w, h: d }, // Bottom
      { x: u + d, y: v + d, w: w, h: h }, // Front
      { x: u + d * 2 + w, y: v + d, w: w, h: h }, // Back
    ]

    return faces.map(f => {
      const tex = skinTexture.clone()
      tex.offset.set(f.x * s, 1 - (f.y + f.h) * s)
      tex.repeat.set(f.w * s, f.h * s)
      tex.needsUpdate = true
      return new THREE.MeshStandardMaterial({ 
        map: tex, 
        transparent: true, 
        alphaTest: 0.1, 
        roughness: 1, 
        metalness: 0,
        side: THREE.DoubleSide
      })
    })
  }

  const headMats = useMemo(() => getMaterials(0, 0, 8, 8, 8), [skinTexture])
  const bodyMats = useMemo(() => getMaterials(16, 16, 8, 12, 4), [skinTexture])
  const armMats = useMemo(() => getMaterials(40, 16, 4, 12, 4), [skinTexture])
  const legMats = useMemo(() => getMaterials(0, 16, 4, 12, 4), [skinTexture])

  return (
    <group 
      ref={groupRef} 
      position={[2.5, -0.5, 0]}
      onPointerEnter={() => {
        setIsHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerLeave={() => {
        setIsHovered(false)
        document.body.style.cursor = 'auto'
      }}
      onClick={(e) => {
        e.stopPropagation()
        if (!isJumping) {
          setIsJumping(true)
          jumpProgress.current = 0
        }
      }}
    >
      {/* Head */}
      <mesh ref={headRef} position={[0, 1.5, 0]} material={headMats}>
        <boxGeometry args={[1, 1, 1]} />
      </mesh>

      {/* Body */}
      <mesh position={[0, 0.25, 0]} material={bodyMats}>
        <boxGeometry args={[1, 1.5, 0.5]} />
      </mesh>

      {/* Right Arm */}
      <group ref={rightArmRef} position={[0.75, 1, 0]}>
        <mesh position={[0, -0.75, 0]} material={armMats}>
          <boxGeometry args={[0.5, 1.5, 0.5]} />
        </mesh>
      </group>

      {/* Left Arm */}
      <group ref={leftArmRef} position={[-0.75, 1, 0]}>
        <mesh position={[0, -0.75, 0]} material={armMats}>
          <boxGeometry args={[0.5, 1.5, 0.5]} />
        </mesh>
      </group>

      {/* Right Leg */}
      <mesh ref={rightLegRef} position={[0.25, -1.25, 0]} material={legMats}>
        <boxGeometry args={[0.5, 1.5, 0.5]} />
      </mesh>

      {/* Left Leg */}
      <mesh ref={leftLegRef} position={[-0.25, -1.25, 0]} material={legMats}>
        <boxGeometry args={[0.5, 1.5, 0.5]} />
      </mesh>
    </group>
  )
}

export const MinecraftPlayer = () => <Suspense fallback={null}><PlayerModel /></Suspense>
