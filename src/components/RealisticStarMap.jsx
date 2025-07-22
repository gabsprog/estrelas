import React, { useRef, useEffect, useState, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Stars, Text, Html } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'
import { ArrowLeft, Info, Compass, Sun as SunIcon, Moon as MoonIcon, Sparkles, Eye, Search } from 'lucide-react'
import enhancedAstronomyService from '../services/enhancedAstronomyService'

// Componente para uma estrela individual realística
const RealisticStar = ({ 
  star, 
  isSpecial, 
  isDiscovered, 
  onClick, 
  dayNightMode,
  showLabels 
}) => {
  const meshRef = useRef()
  const glowRef = useRef()
  const [hovered, setHovered] = useState(false)
  
  // Calcular intensidade baseada no modo dia/noite
  const intensity = useMemo(() => {
    const baseBrightness = star.brightness || 0.5
    if (dayNightMode === 'day') {
      return star.mag < 1 ? baseBrightness * 0.3 : 0 // Apenas estrelas muito brilhantes de dia
    }
    return baseBrightness
  }, [star.brightness, star.mag, dayNightMode])

  // Não renderizar estrelas fracas durante o dia
  if (dayNightMode === 'day' && star.mag > 1) return null

  useFrame((state) => {
    if (meshRef.current && intensity > 0) {
      // Animação de cintilação realística
      const scintillation = 1 + Math.sin(state.clock.elapsedTime * 3 + star.hip * 0.01) * 0.1 * intensity
      meshRef.current.scale.setScalar(star.size * scintillation * (hovered ? 1.5 : 1))
      
      // Efeito de brilho especial para estrelas com mensagens
      if (isSpecial && !isDiscovered) {
        const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.3
        meshRef.current.material.opacity = intensity * 0.8 * pulse
      } else {
        meshRef.current.material.opacity = intensity * (hovered ? 1 : 0.8)
      }
      
      // Efeito de halo para estrelas descobertas
      if (glowRef.current && isDiscovered) {
        const glow = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.2
        glowRef.current.scale.setScalar(star.size * 3 * glow)
      }
    }
  })

  if (intensity <= 0) return null

  return (
    <group position={star.position}>
      {/* Estrela principal */}
      <mesh
        ref={meshRef}
        onClick={() => onClick(star.name)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial
          color={isDiscovered ? '#FFD700' : isSpecial ? '#FF69B4' : star.color}
          transparent
          opacity={intensity * 0.8}
        />
      </mesh>
      
      {/* Efeito de difração para estrelas brilhantes */}
      {star.mag < 2 && (
        <>
          {/* Raios horizontais */}
          <mesh rotation={[0, 0, 0]} scale={[star.size * 4, 0.02, 1]}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial
              color={star.color}
              transparent
              opacity={intensity * 0.3}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
          
          {/* Raios verticais */}
          <mesh rotation={[0, 0, Math.PI / 2]} scale={[star.size * 4, 0.02, 1]}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial
              color={star.color}
              transparent
              opacity={intensity * 0.3}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </>
      )}
      
      {/* Halo para estrelas descobertas */}
      {isDiscovered && (
        <mesh ref={glowRef} scale={star.size * 3}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial
            color="#FFD700"
            transparent
            opacity={0.2}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}
      
      {/* Indicador especial para estrelas com mensagens */}
      {isSpecial && !isDiscovered && (
        <mesh position={[0, star.size * 2, 0]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial
            color="#FF69B4"
            transparent
            opacity={0.6}
          />
        </mesh>
      )}
      
      {/* Label */}
      {(hovered || isDiscovered || (showLabels && star.mag < 2)) && (
        <Text
          position={[0, star.size * 3, 0]}
          fontSize={0.3}
          color={isDiscovered ? '#FFD700' : isSpecial ? '#FF69B4' : '#FFFFFF'}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.03}
          outlineColor="#000000"
        >
          {star.name}
          {star.constellation && star.constellation !== 'Background' && (
            <meshBasicMaterial attach="material" color={star.color} />
          )}
        </Text>
      )}
      
      {/* Informações detalhadas no hover */}
      {hovered && (
        <Html position={[star.size * 4, star.size * 2, 0]} center>
          <div className="glass-effect rounded-lg p-2 text-xs max-w-48 pointer-events-none">
            <div className="font-semibold">{star.name}</div>
            {star.constellation !== 'Background' && (
              <div className="text-gray-300">Constelação: {star.constellation}</div>
            )}
            <div className="text-gray-300">Magnitude: {star.mag?.toFixed(2)}</div>
            {star.spectrum && (
              <div className="text-gray-300">Classe: {star.spectrum}</div>
            )}
            {isSpecial && (
              <div className="text-pink-400 font-medium">✨ Mensagem Especial</div>
            )}
          </div>
        </Html>
      )}
    </group>
  )
}

// Componente para planetas realísticos
const RealisticPlanet = ({ planet, onClick, isDiscovered, dayNightMode }) => {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1
      
      // Planetas são mais visíveis durante o dia
      const visibility = dayNightMode === 'day' ? 0.9 : 0.7
      meshRef.current.material.opacity = visibility * (hovered ? 1 : 0.8)
    }
  })

  const planetScale = 0.2 + (3 - Math.abs(planet.magnitude)) * 0.05

  return (
    <group position={planet.position}>
      <mesh
        ref={meshRef}
        onClick={() => onClick(planet.name)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? planetScale * 1.3 : planetScale}
      >
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial
          color={isDiscovered ? '#FFD700' : planet.color}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Anéis para Saturno */}
      {planet.name === 'Saturn' && (
        <mesh rotation={[Math.PI / 2, 0, 0]} scale={planetScale * 1.8}>
          <ringGeometry args={[1.2, 2.0, 32]} />
          <meshBasicMaterial
            color={planet.color}
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
      
      {/* Brilho planetário */}
      <mesh scale={planetScale * 2}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial
          color={planet.color}
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {(hovered || isDiscovered) && (
        <Text
          position={[0, planetScale + 1, 0]}
          fontSize={0.4}
          color={isDiscovered ? '#FFD700' : '#FFFFFF'}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.03}
          outlineColor="#000000"
        >
          {planet.name}
        </Text>
      )}
    </group>
  )
}

// Lua realística com fases
const RealisticMoon = ({ moonData, onClick, isDiscovered, dayNightMode }) => {
  const meshRef = useRef()
  const shadowRef = useRef()
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05
      
      // Ajustar opacidade baseada no modo dia/noite
      const visibility = dayNightMode === 'day' ? 0.6 : 1.0
      meshRef.current.material.opacity = visibility * 0.9
    }
  })

  if (!moonData.visible) return null

  const moonScale = 0.4

  return (
    <group position={moonData.position}>
      {/* Lua */}
      <mesh
        ref={meshRef}
        onClick={() => onClick('Moon')}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? moonScale * 1.2 : moonScale}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color={isDiscovered ? '#E8EAF6' : '#F5F5F5'}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Sombra da fase lunar */}
      <mesh
        ref={shadowRef}
        position={[moonScale * 0.1, 0, moonScale * 0.9]}
        scale={moonScale}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#0A0A0A"
          transparent
          opacity={1 - moonData.phase}
        />
      </mesh>
      
      {/* Brilho lunar */}
      <mesh scale={moonScale * 2.5}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial
          color="#E8EAF6"
          transparent
          opacity={0.1 * moonData.phase}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Crateras visíveis */}
      <mesh position={[moonScale * 0.3, moonScale * 0.2, moonScale * 0.8]} scale={0.08}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color="#D1C4E9" transparent opacity={0.6} />
      </mesh>
      
      {(hovered || isDiscovered) && (
        <Text
          position={[0, moonScale + 1.5, 0]}
          fontSize={0.4}
          color={isDiscovered ? '#E8EAF6' : '#FFFFFF'}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.03}
          outlineColor="#000000"
        >
          Lua ({moonData.phaseName})
          {'\n'}{Math.round(moonData.phase * 100)}% iluminada
        </Text>
      )}
    </group>
  )
}

// Nebulosas realísticas
const RealisticNebula = ({ nebula, onClick, isDiscovered, dayNightMode }) => {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  
  // Nebulosas só são visíveis à noite
  if (dayNightMode === 'day') return null
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.05
      
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.1
      meshRef.current.material.opacity = 0.4 * pulse
    }
  })

  return (
    <group position={nebula.position}>
      <mesh
        ref={meshRef}
        onClick={() => onClick(nebula.name)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={nebula.size}
      >
        {nebula.type === 'planetary' ? (
          <torusGeometry args={[0.8, 0.3, 16, 32]} />
        ) : (
          <sphereGeometry args={[1, 16, 16]} />
        )}
        <meshBasicMaterial
          color={isDiscovered ? '#FFD700' : nebula.color}
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Efeito de brilho externo */}
      <mesh scale={nebula.size * 1.5}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial
          color={nebula.color}
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {(hovered || isDiscovered) && (
        <Text
          position={[0, nebula.size + 0.8, 0]}
          fontSize={0.25}
          color={isDiscovered ? '#FFD700' : '#FFFFFF'}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          {nebula.name}
          {'\n'}Mag: {nebula.magnitude?.toFixed(1)}
        </Text>
      )}
    </group>
  )
}

// Componente principal da cena realística
const RealisticStarScene = ({ 
  onStarClick, 
  discoveredMessages, 
  specialDate, 
  dayNightMode, 
  location,
  showLabels,
  filterMagnitude 
}) => {
  const { camera, scene } = useThree()
  const [stars, setStars] = useState([])
  const [planets, setPlanets] = useState([])
  const [nebulae, setNebulae] = useState([])
  const [moonData, setMoonData] = useState(null)
  const [loading, setLoading] = useState(true)
  
  const specialStars = enhancedAstronomyService.getStarsWithMessages()

  useEffect(() => {
    camera.position.set(0, 0, 10)
    camera.lookAt(0, 0, 0)
  }, [camera])

  useEffect(() => {
    const loadRealisticSky = async () => {
      if (!location) return
      
      setLoading(true)
      try {
        // Carregar céu realístico
        const skyData = await enhancedAstronomyService.generateRealisticSky(specialDate, location)
        setStars(skyData)

        // Carregar planetas
        const planetData = await enhancedAstronomyService.getRealPlanetData(specialDate, location)
        setPlanets(planetData)

        // Carregar nebulosas
        const nebulaData = await enhancedAstronomyService.getRealNebulaData(specialDate, location)
        setNebulae(nebulaData)

        // Carregar dados da lua
        const moonInfo = await enhancedAstronomyService.getPreciseMoonData(specialDate, location)
        setMoonData(moonInfo)
      } catch (error) {
        console.error('Erro carregando céu realístico:', error)
      } finally {
        setLoading(false)
      }
    }

    loadRealisticSky()
  }, [specialDate, location])

  // Filtrar estrelas baseado na magnitude
  const filteredStars = useMemo(() => {
    return stars.filter(star => star.mag <= filterMagnitude)
  }, [stars, filterMagnitude])

  // Configurar ambiente baseado no modo dia/noite
  useEffect(() => {
    if (dayNightMode === 'day') {
      scene.background = new THREE.Color(0x87CEEB) // Azul céu
      scene.fog = new THREE.Fog(0x87CEEB, 15, 40)
    } else {
      scene.background = new THREE.Color(0x000011) // Azul escuro noturno
      scene.fog = new THREE.Fog(0x000011, 25, 80)
    }
  }, [dayNightMode, scene])

  if (loading) {
    return (
      <group>
        <Text
          position={[0, 0, -5]}
          fontSize={0.8}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
        >
          Carregando céu real...
          {'\n'}Processando {stars.length || 0} estrelas
        </Text>
      </group>
    )
  }

  return (
    <>
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        minDistance={3}
        maxDistance={30}
        autoRotate={dayNightMode === 'night'}
        autoRotateSpeed={0.2}
      />

      {/* Fundo estelar */}
      <Stars
        radius={150}
        depth={60}
        count={dayNightMode === 'night' ? 12000 : 1000}
        factor={dayNightMode === 'night' ? 8 : 2}
        saturation={0}
        fade={true}
        speed={0.5}
      />

      {/* Iluminação */}
      {dayNightMode === 'day' ? (
        <>
          <ambientLight intensity={0.9} color="#FFF8DC" />
          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#FFEB3B" />
        </>
      ) : (
        <>
          <ambientLight intensity={0.2} color="#E3F2FD" />
          <pointLight position={[0, 10, 10]} intensity={0.4} color="#E3F2FD" />
        </>
      )}

      {/* Estrelas realísticas */}
      {filteredStars.map((star) => (
        <RealisticStar
          key={star.hip}
          star={star}
          isSpecial={specialStars.includes(star.name)}
          isDiscovered={discoveredMessages.includes(star.name)}
          onClick={onStarClick}
          dayNightMode={dayNightMode}
          showLabels={showLabels}
        />
      ))}

      {/* Planetas */}
      {planets.map((planet) => (
        <RealisticPlanet
          key={planet.name}
          planet={planet}
          onClick={onStarClick}
          isDiscovered={discoveredMessages.includes(planet.name)}
          dayNightMode={dayNightMode}
        />
      ))}

      {/* Nebulosas */}
      {nebulae.map((nebula) => (
        <RealisticNebula
          key={nebula.name}
          nebula={nebula}
          onClick={onStarClick}
          isDiscovered={discoveredMessages.includes(nebula.name)}
          dayNightMode={dayNightMode}
        />
      ))}

      {/* Lua */}
      {moonData && (
        <RealisticMoon
          moonData={moonData}
          onClick={onStarClick}
          isDiscovered={discoveredMessages.includes('Moon')}
          dayNightMode={dayNightMode}
        />
      )}

      {/* Via Láctea (apenas à noite) */}
      {dayNightMode === 'night' && (
        <mesh position={[0, 0, -35]} rotation={[0, 0, Math.PI / 8]} scale={[40, 6, 1]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            color="#E1BEE7"
            transparent
            opacity={0.15}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}
    </>
  )
}

// Componente principal do mapa estelar realístico
const RealisticStarMap = ({ 
  onStarClick, 
  discoveredMessages, 
  specialDate, 
  isMobile, 
  dayNightMode, 
  location 
}) => {
  const [showInstructions, setShowInstructions] = useState(true)
  const [showLabels, setShowLabels] = useState(false)
  const [filterMagnitude, setFilterMagnitude] = useState(6.0)
  const [showControls, setShowControls] = useState(false)

  const formatDate = (date) => {
    return date.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getVisibleStarsCount = () => {
    if (dayNightMode === 'day') return '~100'
    if (filterMagnitude <= 3) return '~50'
    if (filterMagnitude <= 4) return '~150'
    if (filterMagnitude <= 5) return '~500'
    return '~1500+'
  }

  const specialStarsCount = enhancedAstronomyService.getStarsWithMessages().filter(
    starName => discoveredMessages.includes(starName)
  ).length

  return (
    <div className="relative w-full h-screen">
      {/* Canvas 3D com céu realístico */}
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        <RealisticStarScene
          onStarClick={onStarClick}
          discoveredMessages={discoveredMessages}
          specialDate={specialDate}
          dayNightMode={dayNightMode}
          location={location}
          showLabels={showLabels}
          filterMagnitude={filterMagnitude}
        />
      </Canvas>

      {/* Interface overlay aprimorada */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Header informativo */}
        <div className="absolute top-4 left-4 glass-effect rounded-2xl p-4 pointer-events-auto">
          <div className="flex items-center space-x-3 mb-3">
            {dayNightMode === 'day' ? (
              <SunIcon className="w-7 h-7 text-yellow-400" />
            ) : (
              <MoonIcon className="w-7 h-7 text-blue-300" />
            )}
            <div>
              <h2 className="text-xl font-serif font-bold text-gradient">
                Céu Real - {dayNightMode === 'day' ? 'Diurno' : 'Noturno'}
              </h2>
              <p className="text-sm text-gray-400">
                {formatDate(specialDate)}
              </p>
            </div>
          </div>
          
          {location && (
            <div className="text-xs text-gray-500 mb-2">
              📍 {location.city}, {location.country}
            </div>
          )}
          
          <div className="text-xs text-gray-400">
            Estrelas visíveis: {getVisibleStarsCount()}
          </div>
        </div>

        {/* Controles avançados */}
        <div className="absolute top-4 right-4 pointer-events-auto">
          <button
            onClick={() => setShowControls(!showControls)}
            className="glass-effect rounded-2xl p-3 hover:bg-white hover:bg-opacity-10 transition-all duration-200 mb-2"
          >
            <Info className="w-6 h-6" />
          </button>
          
          <AnimatePresence>
            {showControls && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="glass-effect rounded-2xl p-4 w-80 max-h-96 overflow-y-auto"
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Search className="w-5 h-5 mr-2" />
                  Controles do Céu
                </h3>
                
                {/* Filtro de magnitude */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">Magnitude Limite:</label>
                    <span className="text-sm text-gray-400">{filterMagnitude.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="7"
                    step="0.5"
                    value={filterMagnitude}
                    onChange={(e) => setFilterMagnitude(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="text-xs text-gray-400">
                    Menor = menos estrelas, mais brilhantes
                  </div>
                </div>

                {/* Toggle de labels */}
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-medium">Mostrar Nomes:</label>
                  <button
                    onClick={() => setShowLabels(!showLabels)}
                    className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                      showLabels ? 'bg-blue-500' : 'bg-gray-600'
                    }`}
                  >
                    <motion.div
                      animate={{ x: showLabels ? 24 : 2 }}
                      className="absolute top-1 w-4 h-4 bg-white rounded-full"
                    />
                  </button>
                </div>

                {/* Informações sobre estrelas especiais */}
                <div className="bg-black bg-opacity-20 rounded-lg p-3">
                  <div className="flex items-center mb-2">
                    <Sparkles className="w-4 h-4 text-pink-400 mr-2" />
                    <span className="text-sm font-medium">Estrelas Especiais</span>
                  </div>
                  <div className="text-xs text-gray-300 mb-2">
                    Encontradas: {specialStarsCount}/{enhancedAstronomyService.getStarsWithMessages().length}
                  </div>
                  <div className="text-xs text-gray-400">
                    Estrelas cor-de-rosa têm mensagens especiais escondidas!
                  </div>
                </div>

                {/* Legenda de cores */}
                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-medium">Legenda:</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-pink-400 rounded-full mr-2"></div>
                      <span>Com mensagem</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
                      <span>Descoberta</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-300 rounded-full mr-2"></div>
                      <span>Estrelas classe O/B</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-white rounded-full mr-2"></div>
                      <span>Estrelas classe A/F</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-200 rounded-full mr-2"></div>
                      <span>Estrelas classe G</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-orange-400 rounded-full mr-2"></div>
                      <span>Estrelas classe K/M</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>


        {/* Estatísticas em tempo real */}
        <div className="absolute bottom-4 left-4 glass-effect rounded-xl p-3 pointer-events-auto">
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span>Modo:</span>
              <span className="font-medium">{dayNightMode === 'day' ? 'Diurno' : 'Noturno'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Magnitude:</span>
              <span className="font-medium">≤ {filterMagnitude.toFixed(1)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Descobertas:</span>
              <span className="font-medium text-yellow-400">
                {discoveredMessages.length}
              </span>
            </div>
            {dayNightMode === 'night' && (
              <div className="text-xs text-gray-400 border-t border-gray-600 pt-2">
                💡 Durante a noite você pode ver mais estrelas e nebulosas
              </div>
            )}
          </div>
        </div>

        {/* Controles de navegação para mobile */}
        {isMobile && (
          <div className="absolute bottom-4 right-4 glass-effect rounded-xl p-3 pointer-events-auto">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => setShowLabels(!showLabels)}
                className={`p-2 rounded-lg transition-all ${
                  showLabels ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-300'
                }`}
              >
                <Eye className="w-4 h-4 mx-auto" />
                <div>Labels</div>
              </button>
              <button
                onClick={() => setShowControls(!showControls)}
                className="p-2 rounded-lg bg-gray-600 text-gray-300 hover:bg-gray-500 transition-all"
              >
                <Info className="w-4 h-4 mx-auto" />
                <div>Info</div>
              </button>
            </div>
          </div>
        )}

        {/* Indicador de carregamento */}
        <AnimatePresence>
          {location === null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 glass-effect rounded-2xl p-6 pointer-events-auto"
            >
              <div className="text-center">
                <div className="animate-spin w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-sm">Obtendo sua localização...</p>
                <p className="text-xs text-gray-400 mt-2">Para um céu preciso</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default RealisticStarMap