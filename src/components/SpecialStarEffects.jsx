import React, { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Html } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'

// Componente para estrelas especiais com efeitos impressionantes
const SpecialStar = ({ 
  star, 
  isDiscovered, 
  onClick, 
  dayNightMode,
  showLabels,
  specialMessage 
}) => {
  const meshRef = useRef()
  const glowRef = useRef()
  const ringsRef = useRef([])
  const particlesRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [pulsePhase, setPulsePhase] = useState(Math.random() * Math.PI * 2)
  
  // Criar geometria de partículas para efeito especial
  const particleCount = 20
  const particles = useRef(
    Array.from({ length: particleCount }, (_, i) => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      ),
      life: Math.random(),
      initialLife: Math.random() * 3 + 1
    }))
  )

  // Animação especial para estrelas não descobertas
  useFrame((state) => {
    if (!meshRef.current) return

    const time = state.clock.elapsedTime
    
    if (!isDiscovered) {
      // Efeito de pulsação rosa chamativo
      const pulse = 1 + Math.sin(time * 3 + pulsePhase) * 0.4
      const glowPulse = 1 + Math.sin(time * 2 + pulsePhase) * 0.6
      
      meshRef.current.scale.setScalar(star.size * pulse * (hovered ? 1.8 : 1.2))
      meshRef.current.material.opacity = 0.9 * (0.7 + Math.sin(time * 4) * 0.3)
      
      // Efeito de brilho externo pulsante
      if (glowRef.current) {
        glowRef.current.scale.setScalar(star.size * 4 * glowPulse)
        glowRef.current.material.opacity = 0.3 * (0.5 + Math.sin(time * 3) * 0.5)
      }
      
      // Anéis orbitais
      ringsRef.current.forEach((ring, index) => {
        if (ring) {
          ring.rotation.z = time * (0.5 + index * 0.2)
          ring.material.opacity = 0.4 * (0.6 + Math.sin(time * 2 + index) * 0.4)
        }
      })
      
      // Partículas flutuantes
      particles.current.forEach((particle, index) => {
        particle.position.add(particle.velocity)
        particle.life -= 0.016
        
        if (particle.life <= 0) {
          particle.position.set(
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2
          )
          particle.life = particle.initialLife
        }
        
        if (particlesRef.current && particlesRef.current.children[index]) {
          particlesRef.current.children[index].position.copy(particle.position)
          particlesRef.current.children[index].material.opacity = particle.life / particle.initialLife * 0.8
        }
      })
    } else {
      // Efeito dourado para estrelas descobertas
      const gentlePulse = 1 + Math.sin(time * 1.5) * 0.15
      meshRef.current.scale.setScalar(star.size * gentlePulse * (hovered ? 1.5 : 1.1))
      
      if (glowRef.current) {
        glowRef.current.scale.setScalar(star.size * 3 * gentlePulse)
        glowRef.current.material.opacity = 0.4
      }
    }
    
    // Efeito de cintilação realística
    const scintillation = 1 + Math.sin(time * 5 + star.hip * 0.01) * 0.1
    if (meshRef.current.material) {
      meshRef.current.material.opacity *= scintillation
    }
  })

  // Não renderizar durante o dia se a estrela for fraca
  if (dayNightMode === 'day' && star.mag > 1) return null

  const starColor = isDiscovered ? '#FFD700' : '#FF69B4'
  const glowColor = isDiscovered ? '#FFA500' : '#FF1493'

  return (
    <group position={star.position}>
      {/* Estrela principal */}
      <mesh
        ref={meshRef}
        onClick={() => onClick(star.name)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial
          color={starColor}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Efeito de brilho principal */}
      <mesh ref={glowRef} scale={star.size * 3}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial
          color={glowColor}
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Raios de difração mais intensos para estrelas especiais */}
      {[0, Math.PI / 4, Math.PI / 2, (3 * Math.PI) / 4].map((angle, index) => (
        <mesh key={index} rotation={[0, 0, angle]} scale={[star.size * 8, 0.02, 1]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            color={starColor}
            transparent
            opacity={isDiscovered ? 0.4 : 0.6}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
      
      {/* Anéis orbitais para estrelas não descobertas */}
      {!isDiscovered && [1.5, 2.2, 3.0].map((radius, index) => (
        <mesh
          key={index}
          ref={(el) => (ringsRef.current[index] = el)}
          rotation={[Math.PI / 2, 0, 0]}
          scale={star.size * radius}
        >
          <ringGeometry args={[0.8, 1.0, 32]} />
          <meshBasicMaterial
            color="#FF69B4"
            transparent
            opacity={0.2}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
      
      {/* Partículas flutuantes para estrelas especiais */}
      <group ref={particlesRef}>
        {particles.current.map((_, index) => (
          <mesh key={index} scale={0.3}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshBasicMaterial
              color={starColor}
              transparent
              opacity={0.6}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        ))}
      </group>
      
      {/* Indicador de mensagem especial */}
      {!isDiscovered && (
        <group position={[0, star.size * 4, 0]}>
          <mesh scale={[0.8, 0.8, 0.8]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial
              color="#FF1493"
              transparent
              opacity={0.8}
            />
          </mesh>
          
          {/* Texto flutuante */}
          <Text
            position={[0, 0.5, 0]}
            fontSize={0.15}
            color="#FF1493"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="#000000"
          >
            💌
          </Text>
        </group>
      )}
      
      {/* Label aprimorado */}
      {(hovered || isDiscovered || showLabels) && (
        <Text
          position={[0, star.size * 5, 0]}
          fontSize={0.35}
          color={starColor}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.04}
          outlineColor="#000000"
          font="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap"
        >
          {star.name}
          {isDiscovered && '\n✨ Descoberta!'}
          {!isDiscovered && '\n💕 Mensagem Especial'}
        </Text>
      )}
      
      {/* Tooltip informativo no hover */}
      {hovered && (
        <Html position={[star.size * 6, star.size * 3, 0]} center>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-effect rounded-xl p-3 text-sm max-w-64 pointer-events-none shadow-2xl"
          >
            <div className="font-bold text-yellow-400 mb-2">{star.name}</div>
            
            {star.constellation !== 'Background' && (
              <div className="text-gray-300 mb-1">
                🌌 Constelação: {star.constellation}
              </div>
            )}
            
            <div className="text-gray-300 mb-1">
              ⭐ Magnitude: {star.mag?.toFixed(2)}
            </div>
            
            {star.spectrum && (
              <div className="text-gray-300 mb-1">
                🌡️ Classe: {star.spectrum.charAt(0)} 
                <span className="text-xs ml-1">
                  ({getSpectralClassDescription(star.spectrum.charAt(0))})
                </span>
              </div>
            )}
            
            <div className="text-gray-400 text-xs mb-2">
              📏 Distância visual: {(star.distance || 20).toFixed(1)} anos-luz*
            </div>
            
            {!isDiscovered ? (
              <div className="bg-pink-500 bg-opacity-20 rounded-lg p-2 border border-pink-400">
                <div className="text-pink-300 font-medium text-xs">
                  💌 Mensagem Especial Escondida!
                </div>
                <div className="text-pink-200 text-xs mt-1">
                  Clique para revelar uma mensagem romântica
                </div>
              </div>
            ) : (
              <div className="bg-yellow-500 bg-opacity-20 rounded-lg p-2 border border-yellow-400">
                <div className="text-yellow-300 font-medium text-xs">
                  ✨ Mensagem Descoberta!
                </div>
                <div className="text-yellow-200 text-xs mt-1">
                  Clique para reler a mensagem
                </div>
              </div>
            )}
            
            <div className="text-gray-500 text-xs mt-2 italic">
              *Distância no cenário virtual
            </div>
          </motion.div>
        </Html>
      )}
    </group>
  )
}

// Função auxiliar para descrição das classes espectrais
function getSpectralClassDescription(spectralClass) {
  const descriptions = {
    'O': 'Azul, muito quente (>30.000K)',
    'B': 'Azul-branco, quente (10.000-30.000K)',
    'A': 'Branco (7.500-10.000K)',
    'F': 'Branco-amarelo (6.000-7.500K)',
    'G': 'Amarelo como o Sol (5.200-6.000K)',
    'K': 'Laranja, fria (3.700-5.200K)',
    'M': 'Vermelha, muito fria (<3.700K)'
  }
  return descriptions[spectralClass] || 'Desconhecida'
}

// Componente para constelações com linhas aprimoradas
const EnhancedConstellation = ({ stars, lines, name, isVisible, dayNightMode }) => {
  const linesRef = useRef([])
  
  useFrame((state) => {
    if (dayNightMode === 'night') {
      linesRef.current.forEach((line, index) => {
        if (line) {
          const opacity = 0.4 + Math.sin(state.clock.elapsedTime * 0.5 + index * 0.2) * 0.1
          line.material.opacity = opacity
        }
      })
    }
  })
  
  if (!isVisible || dayNightMode === 'day') return null
  
  return (
    <group>
      {lines.map((line, index) => {
        const start = stars.find(s => s.name === line[0])
        const end = stars.find(s => s.name === line[1])
        
        if (!start || !end) return null
        
        const points = [
          new THREE.Vector3(...start.position),
          new THREE.Vector3(...end.position)
        ]
        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        
        return (
          <line key={index} geometry={geometry}>
            <lineBasicMaterial
              ref={(el) => (linesRef.current[index] = el)}
              color="#4A90E2"
              transparent
              opacity={0.4}
            />
          </line>
        )
      })}
      
      {/* Nome da constelação */}
      {stars.length > 0 && (
        <Text
          position={[
            stars.reduce((sum, s) => sum + s.position[0], 0) / stars.length,
            stars.reduce((sum, s) => sum + s.position[1], 0) / stars.length + 2,
            stars.reduce((sum, s) => sum + s.position[2], 0) / stars.length
          ]}
          fontSize={0.4}
          color="#4A90E2"
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

// Componente para efeitos de descoberta
const DiscoveryEffect = ({ position, onComplete }) => {
  const groupRef = useRef()
  const [phase, setPhase] = useState(0)
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      setPhase(prev => {
        const newPhase = prev + delta * 2
        if (newPhase > Math.PI * 2) {
          onComplete && onComplete()
          return 0
        }
        return newPhase
      })
      
      groupRef.current.rotation.y = state.clock.elapsedTime * 2
      groupRef.current.scale.setScalar(1 + Math.sin(phase) * 0.5)
    }
  })
  
  return (
    <group ref={groupRef} position={position}>
      {/* Explosão de partículas douradas */}
      {Array.from({ length: 12 }, (_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(i * Math.PI / 6) * 2,
            Math.sin(i * Math.PI / 6) * 2,
            0
          ]}
          scale={0.2}
        >
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshBasicMaterial
            color="#FFD700"
            transparent
            opacity={1 - phase / (Math.PI * 2)}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
      
      {/* Texto de descoberta */}
      <Text
        position={[0, 3, 0]}
        fontSize={0.5}
        color="#FFD700"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.04}
        outlineColor="#000000"
      >
        ✨ Descoberta! ✨
      </Text>
    </group>
  )
}

// Componente para indicador de progresso das descobertas
const DiscoveryProgress = ({ discovered, total, position }) => {
  const progressRef = useRef()
  const percentage = (discovered / total) * 100
  
  useFrame((state) => {
    if (progressRef.current) {
      const glow = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.2
      progressRef.current.scale.setScalar(glow)
    }
  })
  
  return (
    <group position={position}>
      {/* Círculo de progresso */}
      <mesh rotation={[0, 0, 0]}>
        <ringGeometry args={[0.8, 1.0, 32, 1, 0, (percentage / 100) * Math.PI * 2]} />
        <meshBasicMaterial
          color="#FFD700"
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Círculo de fundo */}
      <mesh rotation={[0, 0, 0]}>
        <ringGeometry args={[0.8, 1.0, 32]} />
        <meshBasicMaterial
          color="#333333"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Texto central */}
      <Text
        position={[0, 0, 0.1]}
        fontSize={0.3}
        color="#FFD700"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {discovered}/{total}
        {'\n'}
        <Text fontSize={0.2} color="#FFFFFF">
          {percentage.toFixed(0)}%
        </Text>
      </Text>
      
      {/* Efeito de brilho */}
      <mesh ref={progressRef} scale={1.2}>
        <ringGeometry args={[0.7, 1.1, 32]} />
        <meshBasicMaterial
          color="#FFD700"
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

// Componente para trilha de descobertas
const DiscoveryTrail = ({ discoveredStars }) => {
  const trailRef = useRef([])
  
  useFrame((state) => {
    trailRef.current.forEach((trail, index) => {
      if (trail) {
        const phase = state.clock.elapsedTime * 0.5 + index * 0.3
        trail.material.opacity = 0.3 + Math.sin(phase) * 0.2
      }
    })
  })
  
  if (discoveredStars.length < 2) return null
  
  // Criar linhas conectando as estrelas descobertas em ordem
  const connections = []
  for (let i = 0; i < discoveredStars.length - 1; i++) {
    connections.push([discoveredStars[i], discoveredStars[i + 1]])
  }
  
  return (
    <group>
      {connections.map(([star1, star2], index) => {
        const points = [
          new THREE.Vector3(...star1.position),
          new THREE.Vector3(...star2.position)
        ]
        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        
        return (
          <line key={index} geometry={geometry}>
            <lineBasicMaterial
              ref={(el) => (trailRef.current[index] = el)}
              color="#FFD700"
              transparent
              opacity={0.5}
              linewidth={2}
            />
          </line>
        )
      })}
    </group>
  )
}

// Sistema de partículas ambientes para estrelas especiais
const AmbientStarParticles = ({ specialStars, dayNightMode }) => {
  const particlesRef = useRef()
  const particleCount = 50
  
  const particles = Array.from({ length: particleCount }, (_, i) => ({
    position: new THREE.Vector3(
      (Math.random() - 0.5) * 40,
      (Math.random() - 0.5) * 40,
      (Math.random() - 0.5) * 40
    ),
    velocity: new THREE.Vector3(
      (Math.random() - 0.5) * 0.01,
      (Math.random() - 0.5) * 0.01,
      (Math.random() - 0.5) * 0.01
    ),
    life: Math.random() * 5 + 2,
    maxLife: Math.random() * 5 + 2
  }))
  
  useFrame((state, delta) => {
    if (dayNightMode === 'day') return
    
    particles.forEach((particle, index) => {
      particle.position.add(particle.velocity)
      particle.life -= delta
      
      if (particle.life <= 0) {
        particle.position.set(
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 40
        )
        particle.life = particle.maxLife
      }
      
      if (particlesRef.current && particlesRef.current.children[index]) {
        particlesRef.current.children[index].position.copy(particle.position)
        const opacity = (particle.life / particle.maxLife) * 0.3
        particlesRef.current.children[index].material.opacity = opacity
      }
    })
  })
  
  if (dayNightMode === 'day') return null
  
  return (
    <group ref={particlesRef}>
      {particles.map((_, index) => (
        <mesh key={index} scale={0.1}>
          <sphereGeometry args={[0.05, 6, 6]} />
          <meshBasicMaterial
            color="#FF69B4"
            transparent
            opacity={0.3}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  )
}

// Efeito de zoom para estrela selecionada
const StarZoomEffect = ({ targetStar, isActive, onComplete }) => {
  const groupRef = useRef()
  
  useFrame((state, delta) => {
    if (!isActive || !targetStar) return
    
    if (groupRef.current) {
      // Animação de zoom suave
      groupRef.current.position.lerp(
        new THREE.Vector3(...targetStar.position),
        delta * 2
      )
      
      // Rotação suave
      groupRef.current.rotation.y += delta * 0.5
      
      // Auto-completar após 3 segundos
      if (state.clock.elapsedTime % 3 < delta) {
        onComplete && onComplete()
      }
    }
  })
  
  if (!isActive || !targetStar) return null
  
  return (
    <group ref={groupRef} position={targetStar.position}>
      {/* Anéis de foco */}
      {[2, 3, 4].map((radius, index) => (
        <mesh
          key={index}
          rotation={[Math.PI / 2, 0, 0]}
          scale={radius}
        >
          <ringGeometry args={[0.8, 1.0, 32]} />
          <meshBasicMaterial
            color="#FFD700"
            transparent
            opacity={0.3 - index * 0.1}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
      
      {/* Texto de foco */}
      <Text
        position={[0, 5, 0]}
        fontSize={0.6}
        color="#FFD700"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.04}
        outlineColor="#000000"
      >
        {targetStar.name}
        {'\n'}
        <Text fontSize={0.3} color="#FFFFFF">
          Estrela Especial Focada
        </Text>
      </Text>
    </group>
  )
}

// Componente principal que engloba todos os efeitos especiais
const SpecialStarEffectsSystem = ({ 
  stars, 
  discoveredMessages, 
  onStarClick, 
  dayNightMode,
  showLabels,
  specialMessages 
}) => {
  const [discoveryEffect, setDiscoveryEffect] = useState(null)
  const [zoomEffect, setZoomEffect] = useState(null)
  
  const specialStars = stars.filter(star => 
    specialMessages && specialMessages[star.name]
  )
  
  const discoveredStars = stars.filter(star => 
    discoveredMessages.includes(star.name)
  )
  
  const handleStarClick = (starName) => {
    const star = stars.find(s => s.name === starName)
    if (star && specialMessages && specialMessages[starName]) {
      if (!discoveredMessages.includes(starName)) {
        // Trigger discovery effect
        setDiscoveryEffect({ position: star.position, star })
        setTimeout(() => setDiscoveryEffect(null), 3000)
      }
      
      // Trigger zoom effect
      setZoomEffect({ targetStar: star, isActive: true })
      setTimeout(() => setZoomEffect(null), 3000)
    }
    
    onStarClick(starName)
  }
  
  return (
    <group>
      {/* Render special stars with enhanced effects */}
      {specialStars.map((star) => (
        <SpecialStar
          key={star.hip || star.name}
          star={star}
          isDiscovered={discoveredMessages.includes(star.name)}
          onClick={handleStarClick}
          dayNightMode={dayNightMode}
          showLabels={showLabels}
          specialMessage={specialMessages[star.name]}
        />
      ))}
      
      {/* Ambient particles for atmosphere */}
      <AmbientStarParticles 
        specialStars={specialStars}
        dayNightMode={dayNightMode}
      />
      
      {/* Discovery trail connecting found stars */}
      <DiscoveryTrail discoveredStars={discoveredStars} />
      
      {/* Progress indicator */}
      {specialStars.length > 0 && (
        <DiscoveryProgress
          discovered={discoveredStars.length}
          total={specialStars.length}
          position={[15, 8, -10]}
        />
      )}
      
      {/* Discovery effect */}
      {discoveryEffect && (
        <DiscoveryEffect
          position={discoveryEffect.position}
          onComplete={() => setDiscoveryEffect(null)}
        />
      )}
      
      {/* Zoom effect */}
      {zoomEffect && (
        <StarZoomEffect
          targetStar={zoomEffect.targetStar}
          isActive={zoomEffect.isActive}
          onComplete={() => setZoomEffect(null)}
        />
      )}
    </group>
  )
}

export default SpecialStarEffectsSystem
export { 
  SpecialStar, 
  EnhancedConstellation, 
  DiscoveryEffect, 
  DiscoveryProgress,
  DiscoveryTrail,
  AmbientStarParticles,
  StarZoomEffect
}
            