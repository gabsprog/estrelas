import React from 'react'
import { motion } from 'framer-motion'
import { X, Heart, Star } from 'lucide-react'

const MessageModal = ({ message, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="message-modal"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="message-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão de fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full glass-effect hover:bg-white hover:bg-opacity-20 transition-all duration-200"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Emoji decorativo */}
        <div className="text-center mb-4">
          <div className="text-4xl mb-2 animate-bounce">
            {message.emoji}
          </div>
          <div className="flex justify-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 text-yellow-400"
                fill="currentColor"
                style={{
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Título */}
        <h3 className="text-2xl font-serif font-bold text-center text-gradient mb-4">
          {message.title}
        </h3>

        {/* Conteúdo */}
        <div className="text-center mb-6">
          <p className="text-gray-200 leading-relaxed text-lg">
            {message.content}
          </p>
        </div>

        {/* Decoração */}
        <div className="flex justify-center items-center space-x-2 mb-4">
          <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-yellow-400"></div>
          <Heart className="w-5 h-5 text-red-400 animate-pulse" />
          <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-yellow-400"></div>
        </div>

        {/* Botão de fechar */}
        <div className="text-center">
          <button
            onClick={onClose}
            className="star-button"
          >
            Continuar Explorando
          </button>
        </div>

        {/* Partículas flutuantes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default MessageModal