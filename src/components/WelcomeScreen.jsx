import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Star, Calendar, Sparkles, Smartphone, Tablet, Monitor } from 'lucide-react'

const WelcomeScreen = ({ onStart, coupleNames, specialDate, deviceInfo, optimizedSettings }) => {
  const formatDate = (date) => {
    return date.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const daysSince = Math.floor((new Date() - specialDate) / (1000 * 60 * 60 * 24))
  
  const isMobile = deviceInfo?.isMobile || false
  const isTablet = deviceInfo?.isTablet || false
  
  // Obter ícone do dispositivo
  const getDeviceIcon = () => {
    if (isMobile) return <Smartphone className="w-5 h-5" />
    if (isTablet) return <Tablet className="w-5 h-5" />
    return <Monitor className="w-5 h-5" />
  }
  
  // Obter texto de otimização
  const getOptimizationText = () => {
    if (isMobile) return "Otimizado para seu celular"
    if (isTablet) return "Otimizado para seu tablet"
    return "Experiência completa desktop"
  }

  // Animações diferentes para mobile
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: isMobile ? 0.2 : 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { y: isMobile ? 20 : 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: isMobile ? 0.5 : 0.8,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className={`min-h-screen flex flex-col items-center justify-center text-center px-4 safe-top safe-bottom ${
        isMobile ? 'py-8' : 'py-16'
      }`}
    >
      {/* Indicador de otimização para dispositivo */}
      <motion.div
        variants={itemVariants}
        className={`mb-4 glass-effect rounded-full px-4 py-2 flex items-center space-x-2 ${
          isMobile ? 'text-xs' : 'text-sm'
        }`}
      >
        {getDeviceIcon()}
        <span className="text-gray-300">{getOptimizationText()}</span>
      </motion.div>

      {/* Título principal responsivo */}
      <motion.div
        variants={itemVariants}
        className={`mb-6 ${isMobile ? 'mb-4' : 'mb-8'}`}
      >
        <div className={`mb-3 ${isMobile ? 'text-4xl' : 'text-6xl'}`}>✨</div>
        <h1 className={`font-serif font-bold text-gradient mb-3 ${
          isMobile ? 'text-3xl' : 'text-4xl md:text-6xl'
        }`}>
          Nosso Céu
        </h1>
        <p className={`text-gray-300 font-light ${
          isMobile ? 'text-lg' : 'text-xl md:text-2xl'
        }`}>
          Um mapa estelar do nosso amor
        </p>
      </motion.div>

      {/* Informações do casal responsivas */}
      <motion.div
        variants={itemVariants}
        className={`glass-effect rounded-3xl p-6 mb-6 ${
          isMobile ? 'max-w-xs mb-4' : 'max-w-md mb-8'
        }`}
      >
        <div className="flex items-center justify-center mb-3">
          <span className={`font-medium ${isMobile ? 'text-base' : 'text-lg'}`}>
            {coupleNames.person1}
          </span>
          <Heart className={`text-red-400 mx-3 animate-pulse ${
            isMobile ? 'w-5 h-5' : 'w-6 h-6'
          }`} />
          <span className={`font-medium ${isMobile ? 'text-base' : 'text-lg'}`}>
            {coupleNames.person2}
          </span>
        </div>
        
        <div className={`flex items-center justify-center text-gray-300 mb-2 ${
          isMobile ? 'text-sm' : ''
        }`}>
          <Calendar className={`mr-2 ${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
          <span>Desde {formatDate(specialDate)}</span>
        </div>
        
        <div className={`text-star-gold font-semibold ${
          isMobile ? 'text-sm' : ''
        }`}>
          {daysSince} dias juntos ✨
        </div>
      </motion.div>

      {/* Descrição responsiva */}
      <motion.div
        variants={itemVariants}
        className={`mb-6 ${isMobile ? 'max-w-sm mb-4' : 'max-w-2xl mb-8'}`}
      >
        <p className={`text-gray-300 leading-relaxed ${
          isMobile ? 'text-sm' : 'text-lg'
        }`}>
          {isMobile 
            ? "Explore o céu da nossa noite especial. Toque nas estrelas rosa para descobrir mensagens de amor escondidas entre as constelações."
            : "Explore o céu da noite em que começamos nossa jornada juntos. Clique nas estrelas e constelações para descobrir mensagens especiais escondidas entre as estrelas... cada uma conta um pedacinho da nossa história."
          }
        </p>
      </motion.div>

      {/* Instruções responsivas */}
      <motion.div
        variants={itemVariants}
        className={`flex gap-4 mb-6 text-gray-400 ${
          isMobile 
            ? 'flex-col text-xs mb-4' 
            : 'flex-col md:flex-row text-sm mb-8'
        }`}
      >
        <div className="flex items-center justify-center">
          <Star className={`mr-2 text-yellow-400 ${
            isMobile ? 'w-3 h-3' : 'w-4 h-4'
          }`} />
          <span>{isMobile ? 'Toque' : 'Clique'} nas estrelas</span>
        </div>
        <div className="flex items-center justify-center">
          <Sparkles className={`mr-2 text-blue-400 ${
            isMobile ? 'w-3 h-3' : 'w-4 h-4'
          }`} />
          <span>Descubra mensagens escondidas</span>
        </div>
        <div className="flex items-center justify-center">
          <Heart className={`mr-2 text-red-400 ${
            isMobile ? 'w-3 h-3' : 'w-4 h-4'
          }`} />
          <span>Encontre a surpresa final</span>
        </div>
      </motion.div>

      {/* Informações de otimização para mobile */}
      {isMobile && optimizedSettings && (
        <motion.div
          variants={itemVariants}
          className="glass-effect rounded-xl p-3 mb-6 max-w-xs"
        >
          <div className="text-xs text-gray-400 space-y-1">
            <div className="flex justify-between">
              <span>Estrelas carregadas:</span>
              <span className="text-yellow-400">{optimizedSettings.maxStars}</span>
            </div>
            <div className="flex justify-between">
              <span>Qualidade:</span>
              <span className="text-blue-400 capitalize">{optimizedSettings.renderQuality}</span>
            </div>
            <div className="text-center text-green-400 font-medium mt-2">
              ⚡ Performance otimizada
            </div>
          </div>
        </motion.div>
      )}

      {/* Botão de início responsivo */}
      <motion.button
        variants={itemVariants}
        whileHover={{ scale: isMobile ? 1.02 : 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        className={`star-button ${
          isMobile 
            ? 'text-base px-8 py-4' 
            : 'text-lg px-8 py-4'
        }`}
        style={{ 
          minHeight: isMobile ? '48px' : 'auto',
          touchAction: 'manipulation'
        }}
      >
        <Star className={`inline mr-2 ${
          isMobile ? 'w-5 h-5' : 'w-6 h-6'
        }`} />
        Explorar as Estrelas
      </motion.button>

      {/* Nota romântica responsiva */}
      <motion.div
        variants={itemVariants}
        className={`mt-6 text-center ${isMobile ? 'mt-4' : 'mt-8'}`}
      >
        <p className={`text-gray-500 italic ${
          isMobile ? 'text-xs px-4' : 'text-sm'
        }`}>
          "Clarisse, você é a estrela mais brilhante do meu universo, minha Cartwheel galaxy"
        </p>
      </motion.div>

      {/* Instruções específicas para mobile */}
      {isMobile && (
        <motion.div
          variants={itemVariants}
          className="fixed bottom-4 left-4 right-4 glass-effect rounded-xl p-3 safe-bottom"
        >
          <div className="text-center">
            <div className="text-xs text-gray-400 mb-2">
              💡 Dicas para a melhor experiência:
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
              <div>👆 Toque e arraste para girar</div>
              <div>🤏 Dois dedos para zoom</div>
              <div>✨ Estrelas rosa têm surpresas</div>
              <div>🔄 Gire o device se precisar</div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Indicador de orientação para mobile */}
      {isMobile && (
        <motion.div
          variants={itemVariants}
          className="fixed top-4 right-4 glass-effect rounded-lg p-2 safe-top"
        >
          <div className="text-xs text-gray-400 flex items-center space-x-1">
            <span>📱</span>
            <span className="hidden landscape:inline">Paisagem OK</span>
            <span className="landscape:hidden">Retrato OK</span>
          </div>
        </motion.div>
      )}

      {/* Partículas de fundo reduzidas para mobile */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(isMobile ? 12 : 20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-400 opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: isMobile ? '0.5rem' : '0.75rem'
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>

      {/* Informações de debug (apenas em desenvolvimento) */}
      {process.env.NODE_ENV === 'development' && (
        <motion.div
          variants={itemVariants}
          className="fixed bottom-2 left-2 glass-effect rounded-lg p-2 text-xs text-gray-500"
        >
          <div>Device: {isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'}</div>
          <div>Viewport: {deviceInfo?.viewportWidth}×{deviceInfo?.viewportHeight}</div>
          <div>DPR: {deviceInfo?.pixelRatio}</div>
          {optimizedSettings && (
            <>
              <div>Max Stars: {optimizedSettings.maxStars}</div>
              <div>Quality: {optimizedSettings.renderQuality}</div>
            </>
          )}
        </motion.div>
      )}
    </motion.div>
  )
}

export default WelcomeScreen