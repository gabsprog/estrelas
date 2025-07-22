import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Star, Gift, MapPin, ArrowLeft, Calendar, Music, Play } from 'lucide-react'

const FinalSurprise = ({ onBack, coupleNames, specialDate }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [showFireworks, setShowFireworks] = useState(false)

  const surpriseSteps = [
    {
      title: "Parabéns! 🎉",
      content: "Você encontrou todas as mensagens escondidas no nosso céu!",
      emoji: "✨"
    },
    {
      title: "Nossa Jornada",
      content: "Cada estrela guarda uma mensagem especial. Pensando na imensidão do universo, é uma boa forma de represetação, pois é impossivel descrever todas as mensagens, todo o amor incomensurável que sinto por você.",
      emoji: "🌟"
    },
    {
      title: "Surpresa Especial",
      content: "Agora, eu queria te dizer algo. Como nós não podemos nos falar, eu preparei um vídeo:",
      emoji: "❤️",
      hasVideo: true
    }
  ]

  // OPÇÃO 1: Vídeo hospedado online (YouTube, Vimeo, etc.)
  const videoUrl = "https://www.youtube.com/embed/SEU_VIDEO_ID"
  
  // OPÇÃO 2: Vídeo local (arquivo no projeto)
  // const videoUrl = "/path/to/your/video.mp4"

  const giftLocation = {
    hint: "Procure no lugar onde compartilhamos nossa primeira refeição juntos...",
    coordinates: "Latitude: ❤️.❤️❤️❤️❤️, Longitude: ❤️.❤️❤️❤️❤️",
    additionalHint: "Debaixo da sua almofada favorita, tem uma caixinha te esperando 💝"
  }

  const handleNext = () => {
    if (currentStep < surpriseSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowFireworks(true)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  useEffect(() => {
    if (showFireworks) {
      const timer = setTimeout(() => {
        setShowFireworks(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [showFireworks])

  const formatDate = (date) => {
    return date.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  // Componente do vídeo
  const VideoPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false)
    
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-6 mb-6"
      >
        {/* OPÇÃO 1: Para YouTube/Vimeo (iframe) */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
          <iframe
            src={videoUrl}
            className="w-full h-64 md:h-80"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Mensagem Especial"
          />
        </div>

        {/* OPÇÃO 2: Para vídeo local (uncomment para usar) */}
        {/*
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <video
            controls
            className="w-full h-64 md:h-80 rounded-2xl"
            poster="/path/to/thumbnail.jpg" // opcional
          >
            <source src={videoUrl} type="video/mp4" />
            <source src={videoUrl.replace('.mp4', '.webm')} type="video/webm" />
            Seu navegador não suporta o elemento de vídeo.
          </video>
        </div>
        */}

        {/* OPÇÃO 3: Botão customizado para abrir vídeo em nova aba */}
        {/*
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.open(videoUrl, '_blank')}
          className="flex items-center justify-center space-x-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-8 py-4 rounded-2xl font-medium text-lg transition-all duration-300 shadow-lg"
        >
          <Play className="w-6 h-6" />
          <span>Assistir Mensagem Especial</span>
        </motion.button>
        */}
        
        <p className="text-sm text-gray-400 mt-3 text-center">
          💕 Uma mensagem especial do meu coração para o seu
        </p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-4"
    >
      {/* Botão de voltar */}
      <motion.button
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        onClick={onBack}
        className="absolute top-4 left-4 glass-effect rounded-full p-3 hover:bg-white hover:bg-opacity-20 transition-all duration-200"
      >
        <ArrowLeft className="w-6 h-6" />
      </motion.button>

      {/* Conteúdo principal */}
      <div className="max-w-2xl w-full text-center">
        <AnimatePresence mode="wait">
          {!showFireworks ? (
            <motion.div
              key={currentStep}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="glass-effect rounded-3xl p-8 mb-8"
            >
              {/* Emoji */}
              <div className="text-6xl mb-6 animate-bounce">
                {surpriseSteps[currentStep].emoji}
              </div>

              {/* Título */}
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gradient mb-6">
                {surpriseSteps[currentStep].title}
              </h2>

              {/* Conteúdo */}
              <p className="text-lg text-gray-200 leading-relaxed mb-4">
                {surpriseSteps[currentStep].content}
              </p>

              {/* Vídeo (apenas no step 2) */}
              {surpriseSteps[currentStep].hasVideo && (
                <VideoPlayer />
              )}

              {/* Navegação */}
              <div className="flex justify-between items-center mt-8">
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    currentStep === 0
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-700 hover:bg-gray-600 text-white'
                  }`}
                >
                  Anterior
                </button>

                <div className="flex space-x-2">
                  {surpriseSteps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentStep ? 'bg-yellow-400' : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="star-button"
                >
                  {currentStep === surpriseSteps.length - 1 ? 'Finalizar' : 'Próximo'}
                </button>
              </div>
            </motion.div>
          ) : (
            // Tela de fogos de artifício
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass-effect rounded-3xl p-8 text-center"
            >
              <div className="text-8xl mb-6">🎆</div>
              <h2 className="text-4xl font-serif font-bold text-gradient mb-4">
                Feliz Aniversário de 1 Ano!
              </h2>
              <p className="text-xl text-gray-200 mb-6">
                Que venham muitos anos de amor, estrelas e momentos especiais juntos!
              </p>
              
              <div className="flex items-center justify-center space-x-4 mb-8">
                <Heart className="w-8 h-8 text-red-400 animate-pulse" />
                <span className="text-2xl font-serif">{coupleNames.person1} & {coupleNames.person2}</span>
                <Heart className="w-8 h-8 text-red-400 animate-pulse" />
              </div>

              <div className="flex items-center justify-center text-gray-400 mb-6">
                <Calendar className="w-5 h-5 mr-2" />
                <span>{formatDate(specialDate)} - {formatDate(new Date())}</span>
              </div>

              <button
                onClick={onBack}
                className="star-button"
              >
                Voltar às Estrelas
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Efeito de fogos de artifício */}
      {showFireworks && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: window.innerHeight,
                scale: 0
              }}
              animate={{
                y: Math.random() * window.innerHeight * 0.3,
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                delay: Math.random() * 2,
                repeat: Infinity,
                repeatDelay: Math.random() * 3
              }}
              className="absolute text-4xl"
              style={{
                color: ['#FFD700', '#FF69B4', '#00CED1', '#FF6347', '#98FB98'][Math.floor(Math.random() * 5)]
              }}
            >
              ✨
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default FinalSurprise