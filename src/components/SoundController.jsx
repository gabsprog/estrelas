import React, { useState, useRef, useEffect } from 'react'
import { Volume2, VolumeX, Music } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const SoundController = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showMusicInfo, setShowMusicInfo] = useState(false)
  const audioRef = useRef(null)

  // Música ambiente (você pode adicionar um arquivo MP3 na pasta public)
  const musicTrack = {
    title: "Clair de Lune",
    artist: "Claude Debussy",
    description: "Uma melodia suave para acompanhar nossa jornada estelar"
  }

  useEffect(() => {
    // Criar contexto de áudio para sons ambiente
    const createAmbientSound = () => {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)()
        
        // Criar sons suaves de ambiente espacial
        const createTone = (frequency, duration, startTime) => {
          const oscillator = audioContext.createOscillator()
          const gainNode = audioContext.createGain()
          
          oscillator.connect(gainNode)
          gainNode.connect(audioContext.destination)
          
          oscillator.frequency.setValueAtTime(frequency, startTime)
          gainNode.gain.setValueAtTime(0, startTime)
          gainNode.gain.linearRampToValueAtTime(0.02, startTime + 0.1)
          gainNode.gain.linearRampToValueAtTime(0, startTime + duration)
          
          oscillator.start(startTime)
          oscillator.stop(startTime + duration)
        }

        // Tocar sons ambiente ocasionais
        const playAmbientSound = () => {
          if (isPlaying && !isMuted) {
            const now = audioContext.currentTime
            const frequencies = [220, 330, 440, 523, 659] // Notas musicais suaves
            const frequency = frequencies[Math.floor(Math.random() * frequencies.length)]
            createTone(frequency, 2, now)
          }
        }

        // Tocar sons ambiente a cada 10-15 segundos
        const ambientInterval = setInterval(() => {
          if (Math.random() > 0.7) { // 30% de chance
            playAmbientSound()
          }
        }, 12000)

        return () => {
          clearInterval(ambientInterval)
          audioContext.close()
        }
      } catch (error) {
        console.log('Audio context not supported')
      }
    }

    if (isPlaying) {
      const cleanup = createAmbientSound()
      return cleanup
    }
  }, [isPlaying, isMuted])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
    if (!isPlaying) {
      setShowMusicInfo(true)
      setTimeout(() => setShowMusicInfo(false), 3000)
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  // Efeitos sonoros para interações (simulados com Web Audio API)
  const playClickSound = () => {
    if (isMuted) return
    
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1)
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.1)
    } catch (error) {
      console.log('Audio not supported')
    }
  }

  const playStarSound = () => {
    if (isMuted) return
    
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.setValueAtTime(523, audioContext.currentTime) // C5
      oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1) // E5
      oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.2) // G5
      
      gainNode.gain.setValueAtTime(0.05, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.5)
    } catch (error) {
      console.log('Audio not supported')
    }
  }

  // Adicionar event listeners globais para sons
  useEffect(() => {
    const handleStarClick = () => playStarSound()
    const handleButtonClick = () => playClickSound()

    // Adicionar listeners para cliques em estrelas
    document.addEventListener('starClick', handleStarClick)
    
    // Adicionar listeners para cliques em botões
    const buttons = document.querySelectorAll('button')
    buttons.forEach(button => {
      button.addEventListener('click', handleButtonClick)
    })

    return () => {
      document.removeEventListener('starClick', handleStarClick)
      buttons.forEach(button => {
        button.removeEventListener('click', handleButtonClick)
      })
    }
  }, [isMuted])

  return (
    <>
      {/* Controles de som */}
      <div className="fixed top-4 right-4 z-50 flex space-x-2">
        {/* Botão de música */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={togglePlay}
          className={`glass-effect rounded-full p-3 transition-all duration-300 ${
            isPlaying ? 'bg-yellow-400 bg-opacity-20 text-yellow-400' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Music className="w-5 h-5" />
        </motion.button>

        {/* Botão de mute */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMute}
          className={`glass-effect rounded-full p-3 transition-all duration-300 ${
            isMuted ? 'bg-red-400 bg-opacity-20 text-red-400' : 'text-gray-400 hover:text-white'
          }`}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </motion.button>
      </div>

      {/* Informações da música */}
      <AnimatePresence>
        {showMusicInfo && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed top-20 right-4 z-40 glass-effect rounded-2xl p-4 max-w-xs"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Music className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">{musicTrack.title}</h4>
                <p className="text-xs text-gray-400">{musicTrack.artist}</p>
              </div>
            </div>
            <p className="text-xs text-gray-300 mt-2">{musicTrack.description}</p>
            
            {/* Visualizador de áudio simples */}
            <div className="flex space-x-1 mt-3">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-yellow-400 rounded-full"
                  animate={{
                    height: isPlaying ? [4, 16, 8, 20, 6, 14, 10, 18] : [4, 4, 4, 4, 4, 4, 4, 4]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.1
                  }}
                  style={{ height: '4px' }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Indicador de som ambiente */}
      {isPlaying && !isMuted && (
        <div className="fixed bottom-4 right-4 z-40">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="glass-effect rounded-full p-2"
          >
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Ambiente sonoro ativo</span>
            </div>
          </motion.div>
        </div>
      )}
    </>
  )
}

export default SoundController
