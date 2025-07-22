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
import { Heart, Star, Moon, Sparkles, MapPin, Clock, Search } from 'lucide-react'

function EnhancedApp() {
  const [currentScreen, setCurrentScreen] = useState('welcome')
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [showFinalSurprise, setShowFinalSurprise] = useState(false)
  const [discoveredMessages, setDiscoveredMessages] = useState([])
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [dayNightMode, setDayNightMode] = useState('night')
  const [userLocation, setUserLocation] = useState(null)
  const [loading, setLoading] = useState(true)
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
    },

    'M1 - Nebulosa do Caranguejo': {
      title: 'Remanescente de Supernova 💥',
      content: 'M1, resultado da explosão de uma estrela em 1054 d.C., mostra que até as explosões mais violentas podem criar beleza. Como nosso amor nasceu do caos das vidas separadas.',
      emoji: '💥',
      astronomicalInfo: 'M1 contém um pulsar que gira 30 vezes por segundo, resultado da explosão de uma supernova.'
    },
    'M8 - Nebulosa da Lagoa': {
      title: 'Lagoa Estelar 🌊',
      content: 'M8, uma lagoa cósmica onde novas estrelas nascem, é como nosso relacionamento, um berçário de sonhos e possibilidades infinitas.',
      emoji: '🌊',
      astronomicalInfo: 'M8 é uma nebulosa de emissão visível a olho nu na constelação de Sagitário.'
    },
    'M16 - Nebulosa da Águia': {
      title: 'Pilares da Criação 🏛️',
      content: 'M16 contém os famosos Pilares da Criação. Como esses pilares cósmicos, construímos dia a dia os pilares do nosso amor eterno.',
      emoji: '🏗️',
      astronomicalInfo: 'Os Pilares da Criação são colunas de gás e poeira onde novas estrelas estão nascendo.'
    },
    'M17 - Nebulosa Ômega': {
      title: 'Cisne Cósmico 🦢',
      content: 'M17, também chamada de Nebulosa do Cisne, voa graciosamente pelo espaço. Nosso amor tem a mesma elegância e graça eternas.',
      emoji: '🦢',
      astronomicalInfo: 'M17 é uma das nebulosas de emissão mais massivas e luminosas conhecidas.'
    },
    'M20 - Nebulosa Trífida': {
      title: 'Três Cores do Amor 🎨',
      content: 'M20 brilha em três cores distintas - vermelho, azul e rosa. Como nosso amor que tem todas as cores e sentimentos do universo.',
      emoji: '🎨',
      astronomicalInfo: 'M20 combina uma nebulosa de emissão vermelha com uma nebulosa de reflexão azul.'
    },
    'M27 - Nebulosa Dumbell': {
      title: 'Halter Cósmico 🏋️',
      content: 'M27, com sua forma de halter, nos lembra que o amor também é exercício, fortalece a alma e expande o coração todos os dias.',
      emoji: '💪',
      astronomicalInfo: 'M27 foi a primeira nebulosa planetária descoberta, formada por uma estrela moribunda.'
    },
    'M42 - Nebulosa de Orion': {
      title: 'Berçário Estelar 🍼',
      content: 'M42, o berçário estelar mais famoso, é onde milhares de estrelas nascem. Como nosso amor deu origem a infinitos sonhos e possibilidades.',
      emoji: '⭐',
      astronomicalInfo: 'M42 é uma das nebulosas mais estudadas e fotografadas, visível a olho nu como a espada de Orion.'
    },
    'M43 - Nebulosa De Mairan': {
      title: 'Companheira de Orion ✨',
      content: 'M43, a pequena companheira de M42, nunca se separa de sua irmã maior. Como nós, sempre juntos, sempre conectados.',
      emoji: '👫',
      astronomicalInfo: 'M43 é separada da Nebulosa de Orion por uma faixa escura de poeira cósmica.'
    },
    'M57 - Nebulosa do Anel': {
      title: 'Anel de Compromisso Cósmico 💍',
      content: 'M57 forma um anel perfeito no espaço, como o anel que simboliza nosso compromisso eterno. Um círculo sem fim, como nosso amor.',
      emoji: '💍',
      astronomicalInfo: 'M57 é uma nebulosa planetária com uma anã branca central extremamente quente.'
    },
    'M78 - Nebulosa de Reflexão': {
      title: 'Espelho Cósmico 🪞',
      content: 'M78 reflete a luz das estrelas próximas, como você reflete toda a beleza e bondade que existe no universo. Um espelho da perfeição.',
      emoji: '✨',
      astronomicalInfo: 'M78 é uma nebulosa de reflexão azul iluminada por estrelas jovens e quentes.'
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const initializeAdvancedApp = async () => {
      setLoading(true)
      
      try {
        console.log('🌟 Iniciando sistema astronômico...')
        
        const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1'
        
        let location
        if (isProduction) {
          console.log('🚀 Modo produção (Netlify) - usando Itapipoca diretamente')
          location = {
            latitude: -3.5133,
            longitude: -39.5781,
            city: 'Itapipoca',
            country: 'Brasil',
            timezone: 'America/Fortaleza'
          }
        } else {
          console.log('🏠 Modo desenvolvimento - tentando geolocalização')
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

        if (isProduction) {
          console.log('🌅 Usando modo noturno fixo em produção')
          setDayNightMode('night')
        } else {
          try {
            const mode = await enhancedAstronomyService.getDayNightMode(SPECIAL_DATE, location)
            setDayNightMode(mode === 'day' ? 'day' : 'night')
            console.log('🌅 Modo:', mode)
          } catch (error) {
            console.log('🌅 Fallback modo noturno')
            setDayNightMode('night')
          }
        }

        console.log('⭐ Gerando céu...')
        const skyPromise = enhancedAstronomyService.generateRealisticSky(SPECIAL_DATE, location)
        const timeoutSky = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Sky timeout')), isProduction ? 5000 : 10000)
        )

        let skyData = { stars: [], planets: [], nebulae: [], moon: null }
        
        try {
          const stars = await Promise.race([skyPromise, timeoutSky])
          skyData.stars = isProduction ? stars.slice(0, 300) : stars
          console.log(`✅ ${skyData.stars.length} estrelas carregadas`)
        } catch (error) {
          console.log('⭐ Usando estrelas padrão mínimas')
          skyData.stars = getDefaultStars()
        }

        if (isProduction) {
          skyData.planets = getDefaultPlanets()
          skyData.moon = getDefaultMoon()
          skyData.nebulae = []
          console.log('🪐🌙 Usando dados padrão em produção')
        } else {
          try {
            skyData.planets = await enhancedAstronomyService.getRealPlanetData(SPECIAL_DATE, location)
            skyData.moon = await enhancedAstronomyService.getPreciseMoonData(SPECIAL_DATE, location)
            skyData.nebulae = await enhancedAstronomyService.getRealNebulaData(SPECIAL_DATE, location)
          } catch (error) {
            skyData.planets = getDefaultPlanets()
            skyData.moon = getDefaultMoon()
            skyData.nebulae = []
          }
        }

        setSkyData(skyData)
        console.log('🎉 Sistema inicializado!')

      } catch (error) {
        console.error('❌ Erro crítico:', error)
        
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
        setTimeout(() => setLoading(false), 1000)
      }
    }

    initializeAdvancedApp()
  }, [])

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <ParticleBackground />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center glass-effect rounded-3xl p-8 max-w-md"
        >
          <div className="text-8xl mb-6 animate-pulse">🌌</div>
          
          <h2 className="text-3xl font-serif mb-4 text-gradient">
            Carregando o Universo
          </h2>
          
          <div className="space-y-3 text-sm text-gray-300">
            <div className="flex items-center justify-center space-x-2">
              <Search className="w-4 h-4 animate-spin" />
              <span>Calibrando telescópio virtual...</span>
            </div>
            
            <div className="flex items-center justify-center space-x-2">
              <MapPin className="w-4 h-4 animate-bounce" />
              <span>Obtendo localização precisa...</span>
            </div>
            
            <div className="flex items-center justify-center space-x-2">
              <Clock className="w-4 h-4 animate-pulse" />
              <span>Calculando posições astronômicas...</span>
            </div>
            
            <div className="flex items-center justify-center space-x-2">
              <Star className="w-4 h-4 animate-ping" />
              <span>Carregando catálogo Hipparcos...</span>
            </div>
          </div>
          
          <div className="mt-6 text-xs text-gray-400">
            Preparando uma experiência astronômica real para você
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground />
      
      <SoundController />
      
      {currentScreen === 'starmap' && !showFinalSurprise && (
        <DayNightController
          specialDate={SPECIAL_DATE}
          onModeChange={handleModeChange}
          currentMode={dayNightMode}
          location={userLocation}
        />
      )}
      
      {currentScreen === 'starmap' && !showFinalSurprise && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-4 right-4 glass-effect rounded-2xl p-4 z-30"
        >
          <div className="text-center mb-3">
            <h3 className="text-lg font-serif font-bold text-gradient">
              Status Astronômico
            </h3>
          </div>
          
          <div className="space-y-2 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-yellow-400 font-bold text-lg">{stats.totalStars}</div>
                <div className="text-gray-400">Estrelas</div>
              </div>
              <div className="text-center">
                <div className="text-blue-400 font-bold text-lg">{stats.brightStars}</div>
                <div className="text-gray-400">Brilhantes</div>
              </div>
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
              
              <div className="text-center mt-1 text-yellow-400 font-medium">
                {stats.progress.toFixed(1)}%
              </div>
            </div>
            
            <div className="text-center text-gray-400 border-t border-gray-600 pt-2">
              <div>🪐 {stats.visiblePlanets} planetas</div>
              <div>🌌 {stats.visibleNebulae} nebulosas</div>
              <div>🌙 {stats.moonPhase}</div>
            </div>
          </div>
        </motion.div>
      )}
      
      <AnimatePresence mode="wait">
        {currentScreen === 'welcome' && (
          <WelcomeScreen 
            onStart={handleStartExploring}
            coupleNames={COUPLE_NAMES}
            specialDate={SPECIAL_DATE}
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
              isMobile={isMobile}
              dayNightMode={dayNightMode}
              location={userLocation}
              skyData={skyData}
              specialMessages={hiddenMessages}
            />
            
            {canShowFinalSurprise && (
              <motion.button
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="fixed bottom-8 left-1/2 transform -translate-x-1/2 star-button z-40 px-8 py-4 text-lg"
                onClick={handleShowFinalSurprise}
              >
                <Heart className="w-6 h-6 inline mr-2 animate-pulse" />
                Surpresa Final Desbloqueada!
                <Sparkles className="w-6 h-6 inline ml-2 animate-bounce" />
              </motion.button>
            )}
            
            {!canShowFinalSurprise && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed bottom-8 left-1/2 transform -translate-x-1/2 glass-effect rounded-2xl p-3 z-40"
              >
                <div className="text-sm text-center">
                  <Sparkles className="w-4 h-4 inline mr-2 text-pink-400" />
                  Encontre mais {5 - stats.discovered} estrelas especiais
                  <div className="text-xs text-gray-400 mt-1">
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
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm"
            onClick={handleCloseMessage}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0, y: 50 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="glass-effect rounded-3xl p-8 max-w-lg mx-4 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleCloseMessage}
                className="absolute top-4 right-4 p-2 rounded-full glass-effect hover:bg-white hover:bg-opacity-20 transition-all duration-200"
              >
                ✕
              </button>

              <div className="text-center mb-6">
                <div className="text-6xl mb-3 animate-bounce">
                  {selectedMessage.emoji}
                </div>
                <div className="flex justify-center space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 animate-pulse"
                      fill="currentColor"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
              </div>

              <h3 className="text-2xl font-serif font-bold text-center text-gradient mb-6">
                {selectedMessage.title}
              </h3>

              <div className="mb-6">
                <p className="text-gray-200 leading-relaxed text-lg text-center">
                  {selectedMessage.content}
                </p>
              </div>

              {selectedMessage.astronomicalInfo && (
                <div className="bg-blue-500 bg-opacity-20 rounded-xl p-4 mb-6 border border-blue-400">
                  <div className="flex items-center mb-2">
                    <Search className="w-5 h-5 text-blue-400 mr-2" />
                    <span className="text-blue-300 font-medium text-sm">
                      Curiosidade Astronômica
                    </span>
                  </div>
                  <p className="text-blue-200 text-sm">
                    {selectedMessage.astronomicalInfo}
                  </p>
                </div>
              )}

              <div className="flex justify-center items-center space-x-3 mb-6">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-yellow-400"></div>
                <Heart className="w-6 h-6 text-red-400 animate-pulse" />
                <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-yellow-400"></div>
              </div>

              <div className="text-center">
                <button
                  onClick={handleCloseMessage}
                  className="star-button px-8 py-3"
                >
                  <Sparkles className="w-5 h-5 inline mr-2" />
                  Continue Explorando
                </button>
              </div>

              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                {[...Array(15)].map((_, i) => (
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

    </div>
  )
}

export default EnhancedApp