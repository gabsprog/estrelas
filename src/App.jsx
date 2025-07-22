import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import RealisticStarMap from './components/RealisticStarMap'
import WelcomeScreen from './components/WelcomeScreen'
import MessageModal from './components/MessageModal'
import FinalSurprise from './components/FinalSurprise'
import ParticleBackground from './components/ParticleBackground'
import SoundController from './components/SoundController'
import DayNightController from './components/DayNightController'
import enhancedAstronomyService from './services/enhancedAstronomyService'
import { Heart, Star, Moon, Sparkles, MapPin, Clock, Search, Smartphone } from 'lucide-react'

// Função para detectar dispositivos móveis
const getDeviceInfo = () => {
  const userAgent = navigator.userAgent.toLowerCase()
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(userAgent)
  const isTablet = /ipad|tablet/.test(userAgent) || (isMobile && window.screen.width > 768)
  const isLowPowerDevice = navigator.hardwareConcurrency <= 4 || navigator.deviceMemory <= 4
  
  return {
    isMobile: isMobile && !isTablet,
    isTablet,
    isDesktop: !isMobile && !isTablet,
    isLowPowerDevice,
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
    pixelRatio: window.devicePixelRatio || 1
  }
}

// Configurações otimizadas para diferentes dispositivos
const getOptimizedSettings = (deviceInfo) => {
  if (deviceInfo.isMobile) {
    return {
      maxStars: 200,
      maxParticles: 50,
      renderQuality: 'low',
      enableAdvancedEffects: false,
      autoRotateSpeed: 0.1,
      interactionRadius: 0.8, // Aumentar área de toque
      textScale: 1.2,
      buttonScale: 1.3
    }
  } else if (deviceInfo.isTablet) {
    return {
      maxStars: 500,
      maxParticles: 100,
      renderQuality: 'medium',
      enableAdvancedEffects: true,
      autoRotateSpeed: 0.2,
      interactionRadius: 0.6,
      textScale: 1.1,
      buttonScale: 1.1
    }
  } else {
    return {
      maxStars: 1500,
      maxParticles: 200,
      renderQuality: 'high',
      enableAdvancedEffects: true,
      autoRotateSpeed: 0.2,
      interactionRadius: 0.4,
      textScale: 1.0,
      buttonScale: 1.0
    }
  }
}

// Função otimizada para obter dados padrão rápidos
const getDefaultStars = () => [
  { hip: 91262, name: 'Vega', position: [8, 6, -12], mag: 0.03, color: '#A4C2F4', size: 2.5, constellation: 'Lyra' },
  { hip: 32349, name: 'Sirius', position: [-6, -2, -15], mag: -1.46, color: '#A4C2F4', size: 3.0, constellation: 'Canis Major' },
  { hip: 9884, name: 'Polaris', position: [2, 12, -8], mag: 1.98, color: '#F8F7FF', size: 2.0, constellation: 'Ursa Minor' },
  { hip: 27989, name: 'Betelgeuse', position: [-3, 2, -18], mag: 0.42, color: '#FF6B6B', size: 2.8, constellation: 'Orion' },
  { hip: 17702, name: 'Rigel', position: [-5, -3, -16], mag: 0.13, color: '#87CEEB', size: 2.9, constellation: 'Orion' },
  { hip: 15863, name: 'Aldebaran', position: [-8, 1, -14], mag: 0.85, color: '#FFA500', size: 2.6, constellation: 'Taurus' },
  { hip: 24436, name: 'Capella', position: [1, 8, -16], mag: 0.08, color: '#FFF4EA', size: 2.9, constellation: 'Auriga' },
  { hip: 69673, name: 'Arcturus', position: [7, 4, -13], mag: -0.05, color: '#FFCC6F', size: 2.9, constellation: 'Boötes' },
  { hip: 65474, name: 'Spica', position: [4, -1, -17], mag: 0.97, color: '#87CEEB', size: 2.7, constellation: 'Virgo' },
  { hip: 80763, name: 'Antares', position: [6, -4, -12], mag: 1.09, color: '#FF4500', size: 2.7, constellation: 'Scorpius' },
  { hip: 97649, name: 'Altair', position: [9, 3, -11], mag: 0.77, color: '#FFFFFF', size: 2.6, constellation: 'Aquila' },
  { hip: 102098, name: 'Deneb', position: [12, 8, -10], mag: 1.25, color: '#FFFFFF', size: 2.4, constellation: 'Cygnus' },
  { hip: 37279, name: 'Pollux', position: [-2, 4, -15], mag: 1.14, color: '#FFCC6F', size: 2.4, constellation: 'Gemini' },
  { hip: 36850, name: 'Castor', position: [-1, 5, -14], mag: 1.57, color: '#FFFFFF', size: 2.2, constellation: 'Gemini' },
  { hip: 49669, name: 'Regulus', position: [2, 1, -19], mag: 1.35, color: '#87CEEB', size: 2.3, constellation: 'Leo' },
  { hip: 34444, name: 'Procyon', position: [-4, 1, -17], mag: 0.34, color: '#F8F7FF', size: 2.8, constellation: 'Canis Minor' },
  { hip: 30438, name: 'Canopus', position: [5, -8, -12], mag: -0.74, color: '#F8F7FF', size: 3.0, constellation: 'Carina' },
  { hip: 113963, name: 'Fomalhaut', position: [8, -6, -13], mag: 1.16, color: '#FFFFFF', size: 2.4, constellation: 'Piscis Austrinus' }
]

const getDefaultPlanets = () => [
  { name: 'Venus', position: [5, 2, -8], color: '#FFC649', magnitude: -4.0, visible: true, type: 'planet' },
  { name: 'Mars', position: [-7, 1, -6], color: '#CD5C5C', magnitude: 0.7, visible: true, type: 'planet' },
  { name: 'Jupiter', position: [3, 4, -12], color: '#D8CA9D', magnitude: -2.2, visible: true, type: 'planet' },
  { name: 'Saturn', position: [-4, 3, -10], color: '#FAD5A5', magnitude: 0.4, visible: true, type: 'planet' }
]

const getDefaultMoon = () => ({
  position: [6, 5, -9],
  phase: 0.7,
  phaseName: 'Gibosa Crescente',
  visible: true,
  age: 10
})

function EnhancedApp() {
  const [currentScreen, setCurrentScreen] = useState('welcome')
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [showFinalSurprise, setShowFinalSurprise] = useState(false)
  const [discoveredMessages, setDiscoveredMessages] = useState([])
  const [dayNightMode, setDayNightMode] = useState('night')
  const [userLocation, setUserLocation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [deviceInfo, setDeviceInfo] = useState(getDeviceInfo())
  const [optimizedSettings, setOptimizedSettings] = useState(null)
  const [skyData, setSkyData] = useState({
    stars: [],
    planets: [],
    nebulae: [],
    moon: null
  })

  const SPECIAL_DATE = new Date('2024-07-26')
  const COUPLE_NAMES = {
    person1: 'Gabriel',
    person2: 'Clarisse'
  }

  const hiddenMessages = {
    'Vega': {
      title: 'Nossa Primeira Música ✨',
      content: 'Vega, a estrela mais brilhante da Lira celestial, estava tocando nossa música quando nos conhecemos. Cada nota dessa estrela azul-branca ecoa o ritmo do meu coração quando penso em você.',
      emoji: '🎵',
      astronomicalInfo: 'Vega é uma estrela da classe A0V, localizada a 25 anos-luz de distância na constelação da Lira.'
    },
    'Sirius': {
      title: 'A Estrela Mais Brilhante 💫',
      content: 'Sirius, a estrela mais brilhante do céu noturno, testemunhou nosso primeiro beijo. Nem mesmo seu brilho intenso consegue superar a luz que você trouxe para minha vida.',
      emoji: '💋',
      astronomicalInfo: 'Sirius é um sistema binário a 8.6 anos-luz, sendo a estrela mais brilhante vista da Terra.'
    },
    'Polaris': {
      title: 'Minha Estrela Guia ⭐',
      content: 'Como Polaris guia os navegadores há séculos, você é minha direção verdadeira. Não importa onde eu esteja perdido, você sempre me mostra o caminho para casa.',
      emoji: '🧭',
      astronomicalInfo: 'Polaris é uma supergigante amarela localizada muito próxima ao polo norte celestial.'
    },
    'Betelgeuse': {
      title: 'Gigante Vermelha do Amor 🌟',
      content: 'Betelgeuse, a gigante vermelha de Orion, pode explodir em supernova a qualquer momento. Mas nosso amor já explodiu em algo ainda mais brilhante e eterno.',
      emoji: '❤️',
      astronomicalInfo: 'Betelgeuse é uma das maiores estrelas conhecidas, uma supergigante vermelha semi-irregular.'
    },
    'Rigel': {
      title: 'Brilho Azul da Paixão 💙',
      content: 'Rigel, a estrela azul-branca mais brilhante de Orion, arde com a mesma intensidade da paixão que sinto por você. Uma chama azul que nunca se apaga.',
      emoji: '🔥',
      astronomicalInfo: 'Rigel é um sistema estelar múltiplo com uma supergigante azul como estrela primária.'
    },
    'Aldebaran': {
      title: 'Olho do Touro 👁️',
      content: 'Aldebaran, o olho vermelho do Touro, me lembra de como seus olhos capturam toda a luz do universo. Um olhar seu vale mais que todas as estrelas juntas.',
      emoji: '👁️',
      astronomicalInfo: 'Aldebaran é uma gigante laranja tipo K5 III, a estrela mais brilhante da constelação de Touro.'
    },
    'Capella': {
      title: 'A Cabra Celestial 🐐',
      content: 'Capella, na verdade um sistema de quatro estrelas, simboliza como nossa união multiplica nossa força. Juntos, brilhamos mais que qualquer estrela sozinha.',
      emoji: '✨',
      astronomicalInfo: 'Capella é um sistema estelar complexo com quatro componentes principais na constelação de Auriga.'
    },
    'Arcturus': {
      title: 'Guardião da Ursa 🐻',
      content: 'Arcturus, a quarta estrela mais brilhante, é um guardião eterno. Como ela protege a Ursa Maior, eu prometo proteger nosso amor para sempre.',
      emoji: '🛡️',
      astronomicalInfo: 'Arcturus é uma gigante vermelha tipo K1.5 IIIFe-0.5, notable por seu movimento próprio elevado.'
    },
    'Spica': {
      title: 'Espiga de Virgem 🌾',
      content: 'Spica, na verdade duas estrelas orbitando uma à outra, representa nossa dança cósmica. Dois corações que giram em perfeita harmonia.',
      emoji: '💃',
      astronomicalInfo: 'Spica é um sistema binário eclipsante com duas estrelas massivas do tipo B na constelação de Virgem.'
    },
    'Antares': {
      title: 'Rival de Marte 💢',
      content: 'Antares, cujo nome significa "rival de Marte", tem o coração que bate com a mesma intensidade do meu quando penso em você. Um amor que rivaliza com os deuses.',
      emoji: '❤️‍🔥',
      astronomicalInfo: 'Antares é uma das maiores supergigantes vermelhas conhecidas, localizada na constelação de Escorpião.'
    },
    'Altair': {
      title: 'Águia Veloz 🦅',
      content: 'Altair gira tão rapidamente que se achata nos polos. É assim que meu coração dispara quando você se aproxima, acelerado e transformado pelo amor.',
      emoji: '💓',
      astronomicalInfo: 'Altair é notable por sua rápida rotação, completando uma volta em cerca de 9 horas.'
    },
    'Deneb': {
      title: 'Cauda do Cisne 🦢',
      content: 'Deneb, uma das estrelas mais luminosas conhecidas, está a 2.600 anos-luz. Mesmo à essa distância impossível, ela brilha para nós, como nosso amor eterno.',
      emoji: '🌠',
      astronomicalInfo: 'Deneb é uma supergigante branca extremamente luminosa, uma das estrelas mais distantes visíveis a olho nu.'
    },
    'Pollux': {
      title: 'Gêmeo Imortal 👥',
      content: 'Pollux, o gêmeo imortal que dividiu sua imortalidade com Castor, me ensina sobre sacrifício. Eu dividiria minha vida inteira com você sem hesitar.',
      emoji: '♊',
      astronomicalInfo: 'Pollux é uma gigante laranja tipo K0 III e a estrela mais brilhante da constelação de Gêmeos.'
    },
    'Castor': {
      title: 'Gêmeo Mortal 💫',
      content: 'Castor nos lembra que mesmo sendo mortais, podemos criar algo eterno. Nosso amor transcende o tempo, como a lenda dos gêmeos celestiais.',
      emoji: '⭐',
      astronomicalInfo: 'Castor é na verdade um sistema sêxtuplo complexo, composto por três pares de estrelas binárias.'
    },
    'Regulus': {
      title: 'Coração do Leão 🦁',
      content: 'Regulus, o coração do Leão, pulsa com realeza e nobreza. Você desperta em mim um amor digno de reis, majestoso e eterno.',
      emoji: '👑',
      astronomicalInfo: 'Regulus é uma estrela azul-branca que gira tão rapidamente que está quase se desfazendo.'
    },
    'Procyon': {
      title: 'Antes do Cão 🐕',
      content: 'Procyon, que significa "antes do cão", nasce antes de Sirius. Você chegou antes de eu saber que precisava de alguém assim na minha vida.',
      emoji: '🌅',
      astronomicalInfo: 'Procyon é um sistema binário com uma anã branca companheira, localizado a apenas 11.5 anos-luz.'
    },
    'Canopus': {
      title: 'Navegadora do Sul 🧭',
      content: 'Canopus, a segunda estrela mais brilhante, guiou navegadores do hemisfério sul. Você é minha navegadora na jornada da vida.',
      emoji: '⛵',
      astronomicalInfo: 'Canopus é uma supergigante branca-amarela extremamente luminosa, visível principalmente do hemisfério sul.'
    },
    'Fomalhaut': {
      title: 'Solitária do Sul 🐟',
      content: 'Fomalhaut, a "boca do peixe austral", brilha sozinha em uma região escura do céu. Como eu antes de te conhecer, mas solitário.',
      emoji: '🐠',
      astronomicalInfo: 'Fomalhaut é uma estrela jovem do tipo A rodeada por um disco de detritos onde planetas podem estar se formando.'
    },

    'Venus': {
      title: 'Estrela da Manhã 💕',
      content: 'Vênus, o planeta do amor, estava em conjunção especial quando nos encontramos. A própria deusa do amor abençoou nosso relacionamento desde o início.',
      emoji: '💕',
      astronomicalInfo: 'Vênus é o planeta mais quente do sistema solar devido ao extremo efeito estufa.'
    },
    'Mars': {
      title: 'Planeta Vermelho 🔴',
      content: 'Marte, com sua cor vermelha como a paixão, testemunhou nossos primeiros momentos juntos. Um amor marciano que desafia a física do universo.',
      emoji: '🚀',
      astronomicalInfo: 'Marte possui as maiores montanhas e os cânions mais profundos do sistema solar.'
    },
    'Jupiter': {
      title: 'Rei dos Planetas 🪐',
      content: 'Júpiter, o gigante protetor que desvia asteroides da Terra, é como meu amor por você, imenso, protetor e essencial para nossa existência.',
      emoji: '🛡️',
      astronomicalInfo: 'Júpiter possui mais de 80 luas conhecidas e protege os planetas internos de impactos de cometas.'
    },
    'Saturn': {
      title: 'Senhor dos Anéis 💍',
      content: 'Saturno e seus magníficos anéis me lembram do anel que quero colocar em seu dedo. Um símbolo eterno de compromisso que gira ao redor do amor.',
      emoji: '💍',
      astronomicalInfo: 'Os anéis de Saturno são compostos principalmente de gelo de água e têm apenas alguns metros de espessura.'
    },

    'Moon': {
      title: 'Nossa Lua Romântica 🌙',
      content: 'Nossa Lua, com suas fases que mudam mas sempre retornam, representa a constância do nosso amor através de todas as mudanças da vida.',
      emoji: '🌙',
      astronomicalInfo: 'A Lua está se afastando da Terra cerca de 3.8 cm por ano, mas nosso amor só se aproxima mais a cada dia.'
    }
  }

  // Detectar mudanças no dispositivo
  useEffect(() => {
    const handleResize = () => {
      const newDeviceInfo = getDeviceInfo()
      setDeviceInfo(newDeviceInfo)
      setOptimizedSettings(getOptimizedSettings(newDeviceInfo))
    }

    const handleOrientationChange = () => {
      setTimeout(handleResize, 100) // Delay para garantir que as dimensões sejam atualizadas
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleOrientationChange)

    // Configuração inicial
    const initialSettings = getOptimizedSettings(deviceInfo)
    setOptimizedSettings(initialSettings)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleOrientationChange)
    }
  }, [deviceInfo])

  // Sistema de inicialização otimizado para mobile
  useEffect(() => {
    const initializeApp = async () => {
      setLoading(true)
      
      try {
        console.log('🌟 Iniciando sistema astronômico...')
        console.log('📱 Dispositivo detectado:', deviceInfo.isMobile ? 'Mobile' : deviceInfo.isTablet ? 'Tablet' : 'Desktop')
        
        const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1'
        
        let location
        if (isProduction || deviceInfo.isMobile) {
          // Em produção ou mobile, usar localização padrão para evitar prompts
          console.log('🏠 Usando localização padrão (Itapipoca)')
          location = {
            latitude: -3.5133,
            longitude: -39.5781,
            city: 'Itapipoca',
            country: 'Brasil',
            timezone: 'America/Fortaleza'
          }
        } else {
          console.log('🌍 Tentando geolocalização')
          try {
            const locationPromise = enhancedAstronomyService.getUserLocationPrecise()
            const timeoutPromise = new Promise((_, reject) => 
              setTimeout(() => reject(new Error('Timeout')), 3000)
            )
            location = await Promise.race([locationPromise, timeoutPromise])
            console.log('📍 Localização obtida:', location.city)
          } catch (error) {
            console.log('📍 Fallback para Itapipoca')
            location = {
              latitude: -3.5133,
              longitude: -39.5781,
              city: 'Itapipoca',
              country: 'Brasil',
              timezone: 'America/Fortaleza'
            }
          }
        }
        
        setUserLocation(location)

        // Sempre usar modo noturno em mobile/produção para melhor experiência
        if (isProduction || deviceInfo.isMobile) {
          console.log('🌙 Usando modo noturno fixo')
          setDayNightMode('night')
        } else {
          try {
            const mode = await enhancedAstronomyService.getDayNightMode(SPECIAL_DATE, location)
            setDayNightMode(mode === 'day' ? 'day' : 'night')
            console.log('🌅 Modo:', mode)
          } catch (error) {
            console.log('🌙 Fallback modo noturno')
            setDayNightMode('night')
          }
        }

        // Carregar dados do céu otimizados para o dispositivo
        console.log('⭐ Gerando céu otimizado...')
        let skyData = { stars: [], planets: [], nebulae: [], moon: null }
        
        if (deviceInfo.isMobile || isProduction) {
          // Para mobile, usar dados padrão mais rápidos
          console.log('📱 Usando dados otimizados para mobile')
          skyData.stars = getDefaultStars().slice(0, optimizedSettings?.maxStars || 200)
          skyData.planets = getDefaultPlanets()
          skyData.moon = getDefaultMoon()
          skyData.nebulae = []
        } else {
          // Para desktop, tentar dados reais
          try {
            const skyPromise = enhancedAstronomyService.generateRealisticSky(SPECIAL_DATE, location)
            const timeoutSky = new Promise((_, reject) => 
              setTimeout(() => reject(new Error('Sky timeout')), 8000)
            )

            const stars = await Promise.race([skyPromise, timeoutSky])
            skyData.stars = stars.slice(0, optimizedSettings?.maxStars || 1500)
            console.log(`✅ ${skyData.stars.length} estrelas carregadas`)
            
            try {
              skyData.planets = await enhancedAstronomyService.getRealPlanetData(SPECIAL_DATE, location)
              skyData.moon = await enhancedAstronomyService.getPreciseMoonData(SPECIAL_DATE, location)
              skyData.nebulae = await enhancedAstronomyService.getRealNebulaData(SPECIAL_DATE, location)
            } catch (error) {
              skyData.planets = getDefaultPlanets()
              skyData.moon = getDefaultMoon()
              skyData.nebulae = []
            }
          } catch (error) {
            console.log('⭐ Usando estrelas padrão')
            skyData.stars = getDefaultStars()
            skyData.planets = getDefaultPlanets()
            skyData.moon = getDefaultMoon()
            skyData.nebulae = []
          }
        }

        setSkyData(skyData)
        console.log('🎉 Sistema inicializado!')

      } catch (error) {
        console.error('❌ Erro crítico:', error)
        
        // Fallback completo para garantir que a app funcione
        setUserLocation({
          latitude: -3.5133,
          longitude: -39.5781,
          city: 'Itapipoca',
          country: 'Brasil'
        })
        setDayNightMode('night')
        setSkyData({
          stars: getDefaultStars(),
          planets: getDefaultPlanets(),
          nebulae: [],
          moon: getDefaultMoon()
        })
      } finally {
        // Tempo mínimo de loading para UX
        const minLoadTime = deviceInfo.isMobile ? 1500 : 1000
        setTimeout(() => setLoading(false), minLoadTime)
      }
    }

    if (optimizedSettings) {
      initializeApp()
    }
  }, [optimizedSettings, deviceInfo])

  const handleStartExploring = () => {
    setCurrentScreen('starmap')
  }

  const handleStarClick = (starName) => {
    console.log('⭐ Estrela clicada:', starName)
    
    if (hiddenMessages[starName]) {
      setSelectedMessage(hiddenMessages[starName])
      
      if (!discoveredMessages.includes(starName)) {
        setDiscoveredMessages(prev => [...prev, starName])
        console.log('🎉 Nova descoberta:', starName)
        
        // Feedback háptico para mobile
        if (deviceInfo.isMobile && navigator.vibrate) {
          navigator.vibrate([50, 50, 100])
        }
        
        document.dispatchEvent(new CustomEvent('starDiscovered', { detail: starName }))
      }
      return
    }

    console.log('ℹ️ Estrela sem mensagem especial:', starName)
  }

  const handleCloseMessage = () => {
    setSelectedMessage(null)
  }

  const handleShowFinalSurprise = () => {
    setShowFinalSurprise(true)
  }

  const handleBackToStarMap = () => {
    setShowFinalSurprise(false)
  }

  const handleModeChange = (newMode) => {
    setDayNightMode(newMode)
    console.log('🔄 Modo alterado para:', newMode)
  }

  const totalSpecialStars = Object.keys(hiddenMessages).length
  const progressPercentage = (discoveredMessages.length / totalSpecialStars) * 100
  const canShowFinalSurprise = discoveredMessages.length >= 5

  const stats = {
    totalStars: skyData.stars.length,
    brightStars: skyData.stars.filter(s => s.mag < 3).length,
    specialStars: Object.keys(hiddenMessages).length,
    discovered: discoveredMessages.length,
    progress: progressPercentage,
    visiblePlanets: skyData.planets.length,
    visibleNebulae: skyData.nebulae.length,
    moonPhase: skyData.moon?.phaseName || 'Carregando...'
  }

  // Loading otimizado para mobile
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <ParticleBackground />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center glass-effect rounded-3xl p-6 md:p-8 max-w-sm md:max-w-md mx-4"
        >
          <div className="text-6xl md:text-8xl mb-4 md:mb-6 animate-pulse">🌌</div>
          
          <h2 className="text-xl md:text-3xl font-serif mb-3 md:mb-4 text-gradient">
            Carregando o Universo
          </h2>
          
          <div className="space-y-2 md:space-y-3 text-xs md:text-sm text-gray-300">
            <div className="flex items-center justify-center space-x-2">
              <Smartphone className="w-3 h-3 md:w-4 md:h-4 animate-pulse" />
              <span>Otimizando para {deviceInfo.isMobile ? 'mobile' : deviceInfo.isTablet ? 'tablet' : 'desktop'}</span>
            </div>
            
            <div className="flex items-center justify-center space-x-2">
              <Search className="w-3 h-3 md:w-4 md:h-4 animate-spin" />
              <span>Calibrando telescópio virtual...</span>
            </div>
            
            <div className="flex items-center justify-center space-x-2">
              <MapPin className="w-3 h-3 md:w-4 md:h-4 animate-bounce" />
              <span>Obtendo localização precisa...</span>
            </div>
            
            <div className="flex items-center justify-center space-x-2">
              <Clock className="w-3 h-3 md:w-4 md:h-4 animate-pulse" />
              <span>Calculando posições astronômicas...</span>
            </div>
            
            <div className="flex items-center justify-center space-x-2">
              <Star className="w-3 h-3 md:w-4 md:h-4 animate-ping" />
              <span>Carregando {optimizedSettings?.maxStars || 200} estrelas...</span>
            </div>
          </div>
          
          <div className="mt-4 md:mt-6 text-xs text-gray-400">
            Preparando uma experiência astronômica otimizada para você
          </div>
          
          {/* Barra de progresso visual */}
          <div className="mt-4 w-full bg-gray-700 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="bg-gradient-to-r from-pink-500 to-yellow-500 h-2 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground />
      
      {/* Controle de som apenas em desktop para evitar problemas de autoplay mobile */}
      {!deviceInfo.isMobile && <SoundController />}
      
      {/* Controle dia/noite otimizado para mobile */}
      {currentScreen === 'starmap' && !showFinalSurprise && !deviceInfo.isMobile && (
        <DayNightController
          specialDate={SPECIAL_DATE}
          onModeChange={handleModeChange}
          currentMode={dayNightMode}
          location={userLocation}
        />
      )}
      
      {/* Status astronômico otimizado para mobile */}
      {currentScreen === 'starmap' && !showFinalSurprise && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`fixed top-4 right-4 glass-effect rounded-2xl p-3 md:p-4 z-30 ${
            deviceInfo.isMobile ? 'text-xs max-w-48' : 'max-w-64'
          }`}
        >
          <div className="text-center mb-2 md:mb-3">
            <h3 className={`font-serif font-bold text-gradient ${
              deviceInfo.isMobile ? 'text-sm' : 'text-lg'
            }`}>
              Status Astronômico
            </h3>
          </div>
          
          <div className={`space-y-2 ${deviceInfo.isMobile ? 'text-xs' : 'text-xs'}`}>
            <div className={`grid gap-2 md:gap-4 ${deviceInfo.isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
              <div className="text-center">
                <div className={`text-yellow-400 font-bold ${deviceInfo.isMobile ? 'text-sm' : 'text-lg'}`}>
                  {stats.totalStars}
                </div>
                <div className="text-gray-400">Estrelas</div>
              </div>
              {!deviceInfo.isMobile && (
                <div className="text-center">
                  <div className="text-blue-400 font-bold text-lg">{stats.brightStars}</div>
                  <div className="text-gray-400">Brilhantes</div>
                </div>
              )}
            </div>
            
            <div className="border-t border-gray-600 pt-2">
              <div className="flex justify-between items-center mb-1">
                <span>Descobertas:</span>
                <span className="text-pink-400 font-bold">
                  {stats.discovered}/{stats.specialStars}
                </span>
              </div>
              
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stats.progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="bg-gradient-to-r from-pink-500 to-yellow-500 h-2 rounded-full"
                />
              </div>
              
              <div className={`text-center mt-1 text-yellow-400 font-medium ${
                deviceInfo.isMobile ? 'text-xs' : ''
              }`}>
                {stats.progress.toFixed(1)}%
              </div>
            </div>
            
            {!deviceInfo.isMobile && (
              <div className="text-center text-gray-400 border-t border-gray-600 pt-2">
                <div>🪐 {stats.visiblePlanets} planetas</div>
                <div>🌌 {stats.visibleNebulae} nebulosas</div>
                <div>🌙 {stats.moonPhase}</div>
              </div>
            )}
          </div>
        </motion.div>
      )}
      
      <AnimatePresence mode="wait">
        {currentScreen === 'welcome' && (
          <WelcomeScreen 
            onStart={handleStartExploring}
            coupleNames={COUPLE_NAMES}
            specialDate={SPECIAL_DATE}
            deviceInfo={deviceInfo}
            optimizedSettings={optimizedSettings}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {currentScreen === 'starmap' && !showFinalSurprise && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="h-screen"
          >
            <RealisticStarMap 
              onStarClick={handleStarClick}
              discoveredMessages={discoveredMessages}
              specialDate={SPECIAL_DATE}
              isMobile={deviceInfo.isMobile}
              isTablet={deviceInfo.isTablet}
              dayNightMode={dayNightMode}
              location={userLocation}
              skyData={skyData}
              specialMessages={hiddenMessages}
              deviceInfo={deviceInfo}
              optimizedSettings={optimizedSettings}
            />
            
            {/* Botão surpresa final otimizado para mobile */}
            {canShowFinalSurprise && (
              <motion.button
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                whileHover={{ scale: deviceInfo.isMobile ? 1.05 : 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`fixed bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 star-button z-40 ${
                  deviceInfo.isMobile 
                    ? 'px-6 py-3 text-base' 
                    : 'px-8 py-4 text-lg'
                }`}
                onClick={handleShowFinalSurprise}
                style={{ 
                  fontSize: deviceInfo.isMobile ? '14px' : '18px',
                  minHeight: deviceInfo.isMobile ? '44px' : 'auto' // Tamanho mínimo para toque
                }}
              >
                <Heart className={`inline mr-2 animate-pulse ${
                  deviceInfo.isMobile ? 'w-5 h-5' : 'w-6 h-6'
                }`} />
                Surpresa Final Desbloqueada!
                <Sparkles className={`inline ml-2 animate-bounce ${
                  deviceInfo.isMobile ? 'w-5 h-5' : 'w-6 h-6'
                }`} />
              </motion.button>
            )}
            
            {/* Indicador de progresso para mobile */}
            {!canShowFinalSurprise && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`fixed bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 glass-effect rounded-xl md:rounded-2xl p-2 md:p-3 z-40 ${
                  deviceInfo.isMobile ? 'max-w-xs' : ''
                }`}
              >
                <div className={`text-center ${deviceInfo.isMobile ? 'text-xs' : 'text-sm'}`}>
                  <Sparkles className={`inline mr-2 text-pink-400 ${
                    deviceInfo.isMobile ? 'w-3 h-3' : 'w-4 h-4'
                  }`} />
                  Encontre mais {5 - stats.discovered} estrelas especiais
                  <div className={`text-gray-400 mt-1 ${
                    deviceInfo.isMobile ? 'text-xs' : 'text-xs'
                  }`}>
                    para desbloquear a surpresa final
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {showFinalSurprise && (
          <FinalSurprise 
            onBack={handleBackToStarMap}
            coupleNames={COUPLE_NAMES}
            specialDate={SPECIAL_DATE}
            discoveredCount={discoveredMessages.length}
            totalCount={totalSpecialStars}
            deviceInfo={deviceInfo}
            optimizedSettings={optimizedSettings}
          />
        )}
      </AnimatePresence>

      {/* Modal de mensagem otimizado para mobile */}
      <AnimatePresence>
        {selectedMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm p-4"
            onClick={handleCloseMessage}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0, y: 50 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className={`glass-effect rounded-3xl p-6 md:p-8 relative w-full ${
                deviceInfo.isMobile ? 'max-w-sm' : 'max-w-lg'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleCloseMessage}
                className={`absolute top-3 md:top-4 right-3 md:right-4 p-2 rounded-full glass-effect hover:bg-white hover:bg-opacity-20 transition-all duration-200 ${
                  deviceInfo.isMobile ? 'text-lg' : ''
                }`}
                style={{ minHeight: deviceInfo.isMobile ? '44px' : 'auto', minWidth: deviceInfo.isMobile ? '44px' : 'auto' }}
              >
                ✕
              </button>

              <div className="text-center mb-4 md:mb-6">
                <div className={`mb-3 animate-bounce ${
                  deviceInfo.isMobile ? 'text-4xl' : 'text-6xl'
                }`}>
                  {selectedMessage.emoji}
                </div>
                <div className="flex justify-center space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`text-yellow-400 animate-pulse ${
                        deviceInfo.isMobile ? 'w-4 h-4' : 'w-5 h-5'
                      }`}
                      fill="currentColor"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
              </div>

              <h3 className={`font-serif font-bold text-center text-gradient mb-4 md:mb-6 ${
                deviceInfo.isMobile ? 'text-lg' : 'text-2xl'
              }`}>
                {selectedMessage.title}
              </h3>

              <div className="mb-4 md:mb-6">
                <p className={`text-gray-200 leading-relaxed text-center ${
                  deviceInfo.isMobile ? 'text-sm' : 'text-lg'
                }`}>
                  {selectedMessage.content}
                </p>
              </div>

              {selectedMessage.astronomicalInfo && (
                <div className="bg-blue-500 bg-opacity-20 rounded-xl p-3 md:p-4 mb-4 md:mb-6 border border-blue-400">
                  <div className="flex items-center mb-2">
                    <Search className={`text-blue-400 mr-2 ${
                      deviceInfo.isMobile ? 'w-4 h-4' : 'w-5 h-5'
                    }`} />
                    <span className={`text-blue-300 font-medium ${
                      deviceInfo.isMobile ? 'text-xs' : 'text-sm'
                    }`}>
                      Curiosidade Astronômica
                    </span>
                  </div>
                  <p className={`text-blue-200 ${
                    deviceInfo.isMobile ? 'text-xs' : 'text-sm'
                  }`}>
                    {selectedMessage.astronomicalInfo}
                  </p>
                </div>
              )}

              <div className="flex justify-center items-center space-x-3 mb-4 md:mb-6">
                <div className="w-8 md:w-12 h-0.5 bg-gradient-to-r from-transparent to-yellow-400"></div>
                <Heart className={`text-red-400 animate-pulse ${
                  deviceInfo.isMobile ? 'w-5 h-5' : 'w-6 h-6'
                }`} />
                <div className="w-8 md:w-12 h-0.5 bg-gradient-to-l from-transparent to-yellow-400"></div>
              </div>

              <div className="text-center">
                <button
                  onClick={handleCloseMessage}
                  className={`star-button ${
                    deviceInfo.isMobile ? 'px-6 py-3 text-sm' : 'px-8 py-3'
                  }`}
                  style={{ minHeight: deviceInfo.isMobile ? '44px' : 'auto' }}
                >
                  <Sparkles className={`inline mr-2 ${
                    deviceInfo.isMobile ? 'w-4 h-4' : 'w-5 h-5'
                  }`} />
                  Continue Explorando
                </button>
              </div>

              {/* Partículas flutuantes reduzidas para mobile */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                {[...Array(deviceInfo.isMobile ? 8 : 15)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-float"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 3}s`,
                      animationDuration: `${3 + Math.random() * 2}s`,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Indicador de dispositivo para debug (apenas em desenvolvimento) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-2 left-2 glass-effect rounded-lg p-2 text-xs text-gray-400 z-50">
          <div>📱 {deviceInfo.isMobile ? 'Mobile' : deviceInfo.isTablet ? 'Tablet' : 'Desktop'}</div>
          <div>⚡ {deviceInfo.isLowPowerDevice ? 'Low Power' : 'High Power'}</div>
          <div>🌟 Max: {optimizedSettings?.maxStars}</div>
          <div>📐 {deviceInfo.viewportWidth}x{deviceInfo.viewportHeight}</div>
        </div>
      )}
    </div>
  )
}

export default EnhancedApp