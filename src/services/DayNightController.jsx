import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Clock, MapPin, Eye, EyeOff } from 'lucide-react'
import astronomyService from '../services/astronomyService'

const DayNightController = ({ specialDate, onModeChange, currentMode, location }) => {
  const [isRealTime, setIsRealTime] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [sunPosition, setSunPosition] = useState(null)
  const [showTimeControls, setShowTimeControls] = useState(false)

  useEffect(() => {
    const updateAstronomicalData = async () => {
      if (location) {
        const dateToUse = isRealTime ? currentTime : specialDate
        const sunPos = astronomyService.calculateSunPosition(dateToUse, location)
        setSunPosition(sunPos)
        
        // Determinar se é dia ou noite baseado na posição do sol
        const isDaytime = sunPos.altitude > -6 // Crepúsculo civil
        onModeChange(isDaytime ? 'day' : 'night')
      }
    }

    updateAstronomicalData()
  }, [isRealTime, currentTime, specialDate, location, onModeChange])

  useEffect(() => {
    let interval
    if (isRealTime) {
      interval = setInterval(() => {
        setCurrentTime(new Date())
      }, 60000) // Atualizar a cada minuto
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRealTime])

  const toggleRealTime = () => {
    setIsRealTime(!isRealTime)
    if (!isRealTime) {
      setCurrentTime(new Date())
    }
  }

  const getTimeOfDay = () => {
    const dateToUse = isRealTime ? currentTime : specialDate
    const hours = dateToUse.getHours()
    
    if (hours >= 6 && hours < 12) return 'Manhã'
    if (hours >= 12 && hours < 18) return 'Tarde'
    if (hours >= 18 && hours < 22) return 'Noite'
    return 'Madrugada'
  }

  const getSunPhase = () => {
    if (!sunPosition) return 'Calculando...'
    
    const altitude = sunPosition.altitude
    if (altitude > 50) return 'Sol Alto'
    if (altitude > 30) return 'Sol Médio'
    if (altitude > 0) return 'Sol Baixo'
    if (altitude > -6) return 'Crepúsculo'
    if (altitude > -12) return 'Crepúsculo Náutico'
    if (altitude > -18) return 'Crepúsculo Astronômico'
    return 'Noite'
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40">
      {/* Controle principal */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-effect rounded-2xl p-4 min-w-80"
      >
        {/* Header com modo atual */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            {currentMode === 'day' ? (
              <Sun className="w-6 h-6 text-yellow-400" />
            ) : (
              <Moon className="w-6 h-6 text-blue-300" />
            )}
            <div>
              <h3 className="text-sm font-semibold">
                {currentMode === 'day' ? 'Modo Diurno' : 'Modo Noturno'}
              </h3>
              <p className="text-xs text-gray-400">{getTimeOfDay()}</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowTimeControls(!showTimeControls)}
            className="p-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-200"
          >
            {showTimeControls ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>



        {/* Controles expandidos */}
        <AnimatePresence>
          {showTimeControls && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="border-t border-white border-opacity-20 pt-3 space-y-3">
                {/* Toggle tempo real */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-blue-300" />
                    <span className="text-sm">Tempo Real</span>
                  </div>
                  <button
                    onClick={toggleRealTime}
                    className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                      isRealTime ? 'bg-blue-500' : 'bg-gray-600'
                    }`}
                  >
                    <motion.div
                      animate={{ x: isRealTime ? 24 : 2 }}
                      className="absolute top-1 w-4 h-4 bg-white rounded-full"
                    />
                  </button>
                </div>

                {/* Informações de localização */}
                {location && (
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <MapPin className="w-3 h-3" />
                    <span>{location.city}, {location.country}</span>
                  </div>
                )}

                {/* Data atual */}
                <div className="text-center text-xs text-gray-400">
                  {formatDate(isRealTime ? currentTime : specialDate)}
                </div>

                {/* Informações do sol */}
                {sunPosition && (
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="text-center p-2 bg-black bg-opacity-20 rounded">
                      <div className="text-gray-400">Altitude</div>
                      <div className="font-semibold">
                        {sunPosition.altitude.toFixed(1)}°
                      </div>
                    </div>
                    <div className="text-center p-2 bg-black bg-opacity-20 rounded">
                      <div className="text-gray-400">Azimute</div>
                      <div className="font-semibold">
                        {sunPosition.azimuth.toFixed(1)}°
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Indicador de modo */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
      >
        <div className={`w-3 h-3 rounded-full ${
          currentMode === 'day' ? 'bg-yellow-400' : 'bg-blue-300'
        } animate-pulse`} />
      </motion.div>
    </div>
  )
}

export default DayNightController
