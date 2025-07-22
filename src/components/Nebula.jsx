import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

const Nebula = ({ position, name, type, color, size = 3, onClick, isDiscovered, dayNightMode }) => {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1
      meshRef.current.material.opacity = dayNightMode === 'night' ? 
        0.3 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1 : 0.05
    }
  })

  const getNebulaGeometry = () => {
    switch (type) {
      case 'planetary':
        return <sphereGeometry args={[1, 32, 32]} />
      case 'emission':
        return <torusGeometry args={[1.5, 0.8, 16, 100]} />
      case 'reflection':
        return <planeGeometry args={[2, 2]} />
      case 'supernova':
        return <sphereGeometry args={[1.2, 32, 32]} />
      default:
        return <sphereGeometry args={[1, 32, 32]} />
    }
  }

  const getNebulaColor = () => {
    switch (type) {
      case 'planetary': return '#00CED1'
      case 'emission': return '#FF69B4'
      case 'reflection': return '#87CEEB'
      case 'supernova': return '#FFD700'
      default: return color || '#8E24AA'
    }
  }

  if (dayNightMode === 'day' && type !== 'supernova') return null

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        scale={size}
        onClick={() => onClick(name)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {getNebulaGeometry()}
        <meshBasicMaterial
          color={isDiscovered ? '#FFD700' : getNebulaColor()}
          transparent
          opacity={hovered ? 0.5 : 0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Efeito de brilho externo */}
      <mesh position={[0, 0, 0]} scale={size * 1.5}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color={getNebulaColor()}
          transparent
          opacity={0.1}
        />
      </mesh>
      
      {/* Partículas internas para nebulosas de emissão */}
      {type === 'emission' && [...Array(20)].map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * size,
            (Math.random() - 0.5) * size,
            (Math.random() - 0.5) * size
          ]}
          scale={0.05}
        >
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial
            color="#FF1493"
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
      
      {/* Label */}
      {(hovered || isDiscovered) && (
        <Text
          position={[0, size + 0.5, 0]}
          fontSize={0.2}
          color={isDiscovered ? '#FFD700' : '#FFFFFF'}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          {name}
        </Text>
      )}
    </group>
  )
}

export default Nebula