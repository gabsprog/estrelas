import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Star, Calendar, Sparkles } from 'lucide-react'

const WelcomeScreen = ({ onStart, coupleNames, specialDate }) => {
  const formatDate = (date) => {
    return date.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const daysSince = Math.floor((new Date() - specialDate) / (1000 * 60 * 60 * 24))

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center text-center px-4"
    >
      {/* Título principal */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mb-8"
      >
        <div className="text-6xl mb-4">✨</div>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-gradient mb-4">
          Nosso Céu
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 font-light">
          Um mapa estelar do nosso amor
        </p>
      </motion.div>

      {/* Informações do casal */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="glass-effect rounded-3xl p-8 mb-8 max-w-md"
      >
        <div className="flex items-center justify-center mb-4">
          <span className="text-lg font-medium">{coupleNames.person1}</span>
          <Heart className="w-6 h-6 text-red-400 mx-3 animate-pulse" />
          <span className="text-lg font-medium">{coupleNames.person2}</span>
        </div>
        
        <div className="flex items-center justify-center text-gray-300 mb-2">
          <Calendar className="w-5 h-5 mr-2" />
          <span>Desde {formatDate(specialDate)}</span>
        </div>
        
        <div className="text-star-gold font-semibold">
          {daysSince} dias juntos ✨
        </div>
      </motion.div>

      {/* Descrição */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="max-w-2xl mb-8"
      >
        <p className="text-lg text-gray-300 leading-relaxed">
          Explore o céu da noite em que começamos nossa jornada juntos. 
          Clique nas estrelas e constelações para descobrir mensagens especiais 
          escondidas entre as estrelas... cada uma conta um pedacinho da nossa história.
        </p>
      </motion.div>

      {/* Instruções */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="flex flex-col md:flex-row gap-4 mb-8 text-sm text-gray-400"
      >
        <div className="flex items-center">
          <Star className="w-4 h-4 mr-2 text-yellow-400" />
          <span>Clique nas estrelas</span>
        </div>
        <div className="flex items-center">
          <Sparkles className="w-4 h-4 mr-2 text-blue-400" />
          <span>Descubra mensagens escondidas</span>
        </div>
        <div className="flex items-center">
          <Heart className="w-4 h-4 mr-2 text-red-400" />
          <span>Encontre a surpresa final</span>
        </div>
      </motion.div>

      {/* Botão de início */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2.5, duration: 0.5, type: 'spring' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        className="star-button text-lg px-8 py-4"
      >
        <Star className="w-6 h-6 inline mr-2" />
        Explorar as Estrelas
      </motion.button>

      {/* Nota romântica */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="mt-8 text-center"
      >
        <p className="text-gray-500 italic text-sm">
          "Clarisse, você é a estrela mais brilhante do meu universo, minha Cartwheel galaxy"
        </p>
      </motion.div>
    </motion.div>
  )
}

export default WelcomeScreen
