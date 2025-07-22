class EnhancedAstronomyService {
  constructor() {
    this.nasaAPIKey = 'DEMO_KEY'
    this.ipGeolocationKey = 'YOUR_KEY'
    this.cache = new Map()
    
    this.nasaURL = 'https://api.nasa.gov/planetary/apod'
    this.ipGeoURL = 'https://api.ipgeolocation.io/astronomy'
    this.astronomyURL = 'https://api.astronomyapi.com/api/v1'
    
    this.hipparcosStars = this.loadHipparcosData()
    
    this.starCache = new Map()
    this.constellationCache = new Map()
  }

  loadHipparcosData() {
    return [
      { hip: 677, name: 'Alpheratz', ra: 2.097, dec: 29.090, mag: 2.06, spectrum: 'B8IVpMnHg', constellation: 'Andromeda' },
      { hip: 746, name: 'Caph', ra: 2.294, dec: 59.150, mag: 2.27, spectrum: 'F2III-IV', constellation: 'Cassiopeia' },
      { hip: 1067, name: 'Algenib', ra: 3.308, dec: 15.183, mag: 2.83, spectrum: 'B2IV', constellation: 'Pegasus' },
      { hip: 3179, name: 'Schedar', ra: 10.127, dec: 56.537, mag: 2.23, spectrum: 'K0IIIa', constellation: 'Cassiopeia' },
      { hip: 3419, name: 'Mirach', ra: 11.221, dec: 35.620, mag: 2.06, spectrum: 'M0+IIIab', constellation: 'Andromeda' },
      { hip: 4427, name: 'Gamma Cas', ra: 14.177, dec: 60.717, mag: 2.47, spectrum: 'B0.5IVe', constellation: 'Cassiopeia' },
      { hip: 5447, name: 'Diphda', ra: 17.574, dec: -17.987, mag: 2.04, spectrum: 'K0III', constellation: 'Cetus' },
      { hip: 7588, name: 'Almaak', ra: 24.499, dec: 42.329, mag: 2.26, spectrum: 'K3-IIb', constellation: 'Andromeda' },
      { hip: 8645, name: 'Hamal', ra: 31.793, dec: 23.463, mag: 2.00, spectrum: 'K2IIICa-1', constellation: 'Aries' },
      { hip: 9884, name: 'Polaris', ra: 37.954, dec: 89.264, mag: 1.98, spectrum: 'F7:Ib-IIv', constellation: 'Ursa Minor' },
      { hip: 11767, name: 'Sheratan', ra: 28.660, dec: 20.808, mag: 2.64, spectrum: 'A5V', constellation: 'Aries' },
      { hip: 14135, name: 'Mira', ra: 34.837, dec: -2.978, mag: 3.04, spectrum: 'M7IIIe', constellation: 'Cetus' },
      { hip: 15863, name: 'Aldebaran', ra: 68.980, dec: 16.509, mag: 0.85, spectrum: 'K5+III', constellation: 'Taurus' },
      { hip: 17702, name: 'Rigel', ra: 78.634, dec: -8.202, mag: 0.13, spectrum: 'B8Ia', constellation: 'Orion' },
      { hip: 21421, name: 'Elnath', ra: 81.573, dec: 28.608, mag: 1.68, spectrum: 'B7III', constellation: 'Taurus' },
      { hip: 24436, name: 'Capella', ra: 79.172, dec: 45.998, mag: 0.08, spectrum: 'G5III+G0III', constellation: 'Auriga' },
      { hip: 25336, name: 'Bellatrix', ra: 81.283, dec: 6.350, mag: 1.64, spectrum: 'B2III', constellation: 'Orion' },
      { hip: 25428, name: 'Mintaka', ra: 83.002, dec: -0.299, mag: 2.23, spectrum: 'O9.5II', constellation: 'Orion' },
      { hip: 25930, name: 'Alnilam', ra: 84.053, dec: -1.202, mag: 1.70, spectrum: 'B0Ia', constellation: 'Orion' },
      { hip: 26311, name: 'Alnitak', ra: 85.190, dec: -1.943, mag: 1.77, spectrum: 'O9.5Ib', constellation: 'Orion' },
      { hip: 27989, name: 'Betelgeuse', ra: 88.793, dec: 7.407, mag: 0.42, spectrum: 'M1-M2Ia-Iab', constellation: 'Orion' },
      { hip: 30438, name: 'Canopus', ra: 95.988, dec: -52.696, mag: -0.74, spectrum: 'A9II', constellation: 'Carina' },
      { hip: 32349, name: 'Sirius', ra: 101.287, dec: -16.716, mag: -1.46, spectrum: 'A1V', constellation: 'Canis Major' },
      { hip: 34444, name: 'Procyon', ra: 114.825, dec: 5.225, mag: 0.34, spectrum: 'F5IV-V', constellation: 'Canis Minor' },
      { hip: 37279, name: 'Pollux', ra: 116.329, dec: 28.026, mag: 1.14, spectrum: 'K0IIIb', constellation: 'Gemini' },
      { hip: 36850, name: 'Castor', ra: 113.650, dec: 31.888, mag: 1.57, spectrum: 'A1V+A2Vm', constellation: 'Gemini' },
      { hip: 49669, name: 'Regulus', ra: 152.093, dec: 11.967, mag: 1.35, spectrum: 'B8IVn', constellation: 'Leo' },
      { hip: 65474, name: 'Spica', ra: 201.298, dec: -11.161, mag: 0.97, spectrum: 'B1III-IV+B2V', constellation: 'Virgo' },
      { hip: 69673, name: 'Arcturus', ra: 213.915, dec: 19.182, mag: -0.05, spectrum: 'K1.5IIIFe-0.5', constellation: 'Boötes' },
      { hip: 80763, name: 'Antares', ra: 247.352, dec: -26.432, mag: 1.09, spectrum: 'M1.5Iab-Ib', constellation: 'Scorpius' },
      { hip: 91262, name: 'Vega', ra: 279.234, dec: 38.784, mag: 0.03, spectrum: 'A0Va', constellation: 'Lyra' },
      { hip: 97649, name: 'Altair', ra: 297.696, dec: 8.868, mag: 0.77, spectrum: 'A7V', constellation: 'Aquila' },
      { hip: 102098, name: 'Deneb', ra: 310.358, dec: 45.280, mag: 1.25, spectrum: 'A2Ia', constellation: 'Cygnus' },
      { hip: 113963, name: 'Fomalhaut', ra: 344.413, dec: -29.622, mag: 1.16, spectrum: 'A3Va', constellation: 'Piscis Austrinus' }
    ]
  }

  // Obter localização precisa do usuário
  async getUserLocationPrecise() {
    const cacheKey = 'precise_location'
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)
    }

    try {
      // Primeiro, tentar geolocalização nativa
      const coords = await this.getNavigatorLocation()
      
      // Depois, usar IPGeolocation para dados astronômicos
      const response = await fetch(`${this.ipGeoURL}?apiKey=${this.ipGeolocationKey}&lat=${coords.latitude}&long=${coords.longitude}`)
      const data = await response.json()
      
      const location = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        city: data.city || 'Localização',
        country: data.country_name || 'Terra',
        timezone: data.timezone_name || 'UTC',
        sunrise: data.sunrise,
        sunset: data.sunset,
        moonrise: data.moonrise,
        moonset: data.moonset,
        moon_phase: data.moon_phase
      }
      
      this.cache.set(cacheKey, location)
      return location
    } catch (error) {
      console.log('Usando localização fallback:', error)
      return this.getFallbackLocation()
    }
  }

  // Geolocalização nativa do navegador
  getNavigatorLocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocalização não suportada'))
      }

      navigator.geolocation.getCurrentPosition(
        position => resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }),
        error => reject(error),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
      )
    })
  }

  // Gerar céu realista com milhares de estrelas
  async generateRealisticSky(date, location) {
    const cacheKey = `realistic_sky_${date.toISOString().split('T')[0]}_${Math.round(location.latitude)}_${Math.round(location.longitude)}`
    
    if (this.starCache.has(cacheKey)) {
      return this.starCache.get(cacheKey)
    }

    const julianDate = this.dateToJulian(date)
    const lst = this.calculateLocalSiderealTime(julianDate, location.longitude)
    
    // Calcular posições das estrelas principais (Hipparcos)
    const brightStars = this.hipparcosStars.map(star => {
      const position = this.calculateStarPosition(star, lst, location.latitude)
      return {
        ...star,
        position: position.position,
        visible: position.altitude > -10,
        altitude: position.altitude,
        azimuth: position.azimuth,
        brightness: this.magnitudeToBrightness(star.mag),
        color: this.spectrumToColor(star.spectrum),
        size: this.magnitudeToSize(star.mag)
      }
    }).filter(star => star.visible)

    // Gerar estrelas de fundo (simulação de catálogo completo)
    const backgroundStars = this.generateBackgroundStars(1500, lst, location.latitude)
    
    // Combinar estrelas
    const allStars = [...brightStars, ...backgroundStars]
    
    this.starCache.set(cacheKey, allStars)
    return allStars
  }

  // Gerar estrelas de fundo realistas
  generateBackgroundStars(count, lst, latitude) {
    const stars = []
    
    for (let i = 0; i < count; i++) {
      // Distribuição realística de magnitude (mais estrelas fracas)
      const magnitude = this.generateRealisticMagnitude()
      
      // Posição aleatória no céu
      const ra = Math.random() * 24
      const dec = (Math.random() - 0.5) * 180
      
      const position = this.calculateStarPosition({ ra, dec }, lst, latitude)
      
      if (position.altitude > -5) {
        stars.push({
          hip: 100000 + i,
          name: `Star${i}`,
          ra,
          dec,
          mag: magnitude,
          position: position.position,
          visible: true,
          altitude: position.altitude,
          azimuth: position.azimuth,
          brightness: this.magnitudeToBrightness(magnitude),
          color: this.generateRealisticColor(),
          size: this.magnitudeToSize(magnitude),
          constellation: 'Background'
        })
      }
    }
    
    return stars
  }

  // Distribuição realística de magnitudes
  generateRealisticMagnitude() {
    const rand = Math.random()
    if (rand < 0.01) return 1 + Math.random() * 2 // Estrelas brilhantes (1-3)
    if (rand < 0.05) return 3 + Math.random() * 1 // Médias (3-4)
    if (rand < 0.2) return 4 + Math.random() * 1  // Fracas (4-5)
    return 5 + Math.random() * 2                  // Muito fracas (5-7)
  }

  // Cores realísticas baseadas em temperatura estelar
  generateRealisticColor() {
    const colorTypes = [
      '#9BB0FF', // Classe O - Azul muito quente
      '#AABFFF', // Classe B - Azul-branco
      '#CAD7FF', // Classe A - Branco
      '#F8F7FF', // Classe F - Branco-amarelo
      '#FFF4EA', // Classe G - Amarelo (como o Sol)
      '#FFCC6F', // Classe K - Laranja
      '#FF9500'  // Classe M - Vermelho
    ]
    
    // Distribuição realística (mais estrelas K e M)
    const weights = [0.00003, 0.13, 0.6, 3, 7.6, 12.1, 76.45]
    const random = Math.random() * 100
    let cumulative = 0
    
    for (let i = 0; i < weights.length; i++) {
      cumulative += weights[i]
      if (random <= cumulative) {
        return colorTypes[i]
      }
    }
    
    return colorTypes[colorTypes.length - 1]
  }

  // Converter magnitude para brilho (0-1)
  magnitudeToBrightness(magnitude) {
    return Math.max(0, Math.min(1, (6 - magnitude) / 8))
  }

  // Converter magnitude para tamanho visual
  magnitudeToSize(magnitude) {
    if (magnitude < 0) return 3.0      // Estrelas excepcionalmente brilhantes
    if (magnitude < 1) return 2.5      // Muito brilhantes
    if (magnitude < 2) return 2.0      // Brilhantes
    if (magnitude < 3) return 1.5      // Médias-brilhantes
    if (magnitude < 4) return 1.2      // Médias
    if (magnitude < 5) return 1.0      // Fracas
    return 0.8                         // Muito fracas
  }

  // Converter classe espectral para cor
  spectrumToColor(spectrum) {
    const spectralClass = spectrum[0]
    const colors = {
      'O': '#9BB0FF', // Azul
      'B': '#AABFFF', // Azul-branco
      'A': '#CAD7FF', // Branco
      'F': '#F8F7FF', // Branco-amarelo
      'G': '#FFF4EA', // Amarelo
      'K': '#FFCC6F', // Laranja
      'M': '#FF9500'  // Vermelho
    }
    return colors[spectralClass] || '#FFFFFF'
  }

  // Obter dados reais de planetas usando APIs
  async getRealPlanetData(date, location) {
    const cacheKey = `planets_real_${date.toISOString().split('T')[0]}`
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)
    }

    try {
      // Usar algoritmos de mecânica celeste para posições planetárias
      const planets = await this.calculatePlanetaryPositions(date, location)
      this.cache.set(cacheKey, planets)
      return planets
    } catch (error) {
      console.log('Usando dados planetários padrão:', error)
      return this.getDefaultPlanetData(date, location)
    }
  }

  // Cálculos planetários usando teoria VSOP87 simplificada
  async calculatePlanetaryPositions(date, location) {
    const julianDate = this.dateToJulian(date)
    const T = (julianDate - 2451545.0) / 36525
    const lst = this.calculateLocalSiderealTime(julianDate, location.longitude)

    const planets = []

    // Dados orbitais dos planetas (simplificados)
    const planetData = {
      Mercury: { L0: 252.25032350, L1: 149472.67411175, a: 0.387098, e: 0.205635, i: 7.005, color: '#8C7853' },
      Venus: { L0: 181.97980085, L1: 58517.81538729, a: 0.723332, e: 0.006773, i: 3.39458, color: '#FFC649' },
      Mars: { L0: 355.43299958, L1: 19140.30268499, a: 1.523688, e: 0.093405, i: 1.84969, color: '#CD5C5C' },
      Jupiter: { L0: 34.39644051, L1: 3034.90567464, a: 5.202887, e: 0.048775, i: 1.30327, color: '#D8CA9D' },
      Saturn: { L0: 50.07571329, L1: 1222.11494724, a: 9.536676, e: 0.055723, i: 2.48599, color: '#FAD5A5' }
    }

    for (const [name, data] of Object.entries(planetData)) {
      try {
        const L = (data.L0 + data.L1 * T) % 360
        const position = this.calculatePlanetPosition(L, data, lst, location.latitude)
        
        if (position.altitude > -5) { // Apenas planetas visíveis
          planets.push({
            name,
            position: position.position,
            color: data.color,
            magnitude: this.calculatePlanetMagnitude(name, position.distance),
            visible: true,
            altitude: position.altitude,
            azimuth: position.azimuth,
            distance: position.distance,
            type: 'planet'
          })
        }
      } catch (error) {
        console.log(`Erro calculando ${name}:`, error)
      }
    }

    return planets
  }

  // Calcular magnitude aparente dos planetas
  calculatePlanetMagnitude(planetName, distance) {
    const baseMagnitudes = {
      Mercury: -0.4,
      Venus: -4.4,
      Mars: -2.9,
      Jupiter: -2.9,
      Saturn: -0.3
    }
    
    const base = baseMagnitudes[planetName] || 0
    return base + 5 * Math.log10(distance / 1) // Distância normalizada
  }

  // Obter nebulosas reais do catálogo Messier
  async getRealNebulaData(date, location) {
    const messierObjects = [
      { name: 'M1 - Nebulosa do Caranguejo', ra: 5.575, dec: 22.017, type: 'supernova', magnitude: 8.4 },
      { name: 'M8 - Nebulosa da Lagoa', ra: 18.067, dec: -24.383, type: 'emission', magnitude: 6.0 },
      { name: 'M16 - Nebulosa da Águia', ra: 18.308, dec: -13.817, type: 'emission', magnitude: 6.4 },
      { name: 'M17 - Nebulosa Ômega', ra: 18.342, dec: -16.183, type: 'emission', magnitude: 7.0 },
      { name: 'M20 - Nebulosa Trífida', ra: 18.033, dec: -23.033, type: 'emission', magnitude: 9.0 },
      { name: 'M27 - Nebulosa Dumbell', ra: 19.992, dec: 22.717, type: 'planetary', magnitude: 7.5 },
      { name: 'M42 - Nebulosa de Orion', ra: 5.583, dec: -5.391, type: 'emission', magnitude: 4.0 },
      { name: 'M43 - Nebulosa De Mairan', ra: 5.592, dec: -5.267, type: 'emission', magnitude: 9.0 },
      { name: 'M57 - Nebulosa do Anel', ra: 18.887, dec: 33.033, type: 'planetary', magnitude: 8.8 },
      { name: 'M78 - Nebulosa de Reflexão', ra: 5.783, dec: 0.067, type: 'reflection', magnitude: 8.3 }
    ]

    const julianDate = this.dateToJulian(date)
    const lst = this.calculateLocalSiderealTime(julianDate, location.longitude)

    return messierObjects.map(nebula => {
      const position = this.calculateStarPosition(nebula, lst, location.latitude)
      
      return {
        ...nebula,
        position: position.position,
        visible: position.altitude > 0 && nebula.magnitude < 9, // Apenas visíveis
        altitude: position.altitude,
        azimuth: position.azimuth,
        color: this.getNebulaColor(nebula.type),
        size: this.getNebulaSizeFromMagnitude(nebula.magnitude)
      }
    }).filter(nebula => nebula.visible)
  }

  // Cores realísticas para tipos de nebulosas
  getNebulaColor(type) {
    const colors = {
      'emission': '#FF6B9D',     // Rosa/vermelho - nebulosas de emissão (H-alpha)
      'planetary': '#40E0D0',    // Turquesa - nebulosas planetárias (OIII)
      'reflection': '#87CEEB',   // Azul - nebulosas de reflexão
      'supernova': '#FFD700',    // Dourado - remanescentes de supernova
      'dark': '#2F2F2F'          // Cinza escuro - nebulosas escuras
    }
    return colors[type] || '#8A2BE2'
  }

  // Tamanho da nebulosa baseado na magnitude
  getNebulaSizeFromMagnitude(magnitude) {
    return Math.max(0.5, (10 - magnitude) / 2)
  }

  // Dados da Lua com precisão astronômica
  async getPreciseMoonData(date, location) {
    const cacheKey = `moon_precise_${date.toISOString().split('T')[0]}`
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)
    }

    const moonData = this.calculatePreciseMoonPosition(date, location)
    this.cache.set(cacheKey, moonData)
    return moonData
  }

  // Cálculo preciso da posição lunar
  calculatePreciseMoonPosition(date, location) {
    const julianDate = this.dateToJulian(date)
    const T = (julianDate - 2451545.0) / 36525
    const lst = this.calculateLocalSiderealTime(julianDate, location.longitude)
    
    // Longitude eclíptica média da Lua
    const L = (218.3164591 + 481267.88134236 * T - 0.0013268 * T * T) % 360
    
    // Anomalia média da Lua
    const M = (134.9634114 + 477198.8676313 * T + 0.008997 * T * T) % 360
    const MRad = M * Math.PI / 180
    
    // Correções principais
    const evection = 1.274 * Math.sin((2 * L - M) * Math.PI / 180)
    const annual = 0.658 * Math.sin(2 * L * Math.PI / 180)
    const correction3 = -0.186 * Math.sin(MRad)
    
    const correctedL = L + evection + annual + correction3
    
    // Latitude eclíptica
    const F = (93.2720993 + 483202.0175273 * T - 0.0034029 * T * T) % 360
    const B = 5.128 * Math.sin(F * Math.PI / 180)
    
    // Converter para equatorial
    const epsilon = 23.4393 - 0.0000004 * T
    const lambdaRad = correctedL * Math.PI / 180
    const betaRad = B * Math.PI / 180
    const epsilonRad = epsilon * Math.PI / 180
    
    const ra = Math.atan2(
      Math.sin(lambdaRad) * Math.cos(epsilonRad) - Math.tan(betaRad) * Math.sin(epsilonRad),
      Math.cos(lambdaRad)
    ) * 180 / Math.PI / 15
    
    const dec = Math.asin(
      Math.sin(betaRad) * Math.cos(epsilonRad) + 
      Math.cos(betaRad) * Math.sin(epsilonRad) * Math.sin(lambdaRad)
    ) * 180 / Math.PI
    
    const position = this.calculateStarPosition({ ra, dec }, lst, location.latitude)
    
    // Fase da lua
    const phase = this.calculateMoonPhase(julianDate)
    
    return {
      position: position.position,
      altitude: position.altitude,
      azimuth: position.azimuth,
      phase: phase.illumination,
      phaseName: phase.phaseName,
      age: phase.age,
      visible: position.altitude > -6,
      distance: 384400, // km (aproximado)
      angularSize: 0.52 // graus
    }
  }

  // Cálculo preciso da fase lunar
  calculateMoonPhase(julianDate) {
    const newMoonJD = 2451550.1 // Uma lua nova de referência
    const synodicMonth = 29.53058868 // dias
    
    const daysSinceNewMoon = julianDate - newMoonJD
    const lunarCycles = daysSinceNewMoon / synodicMonth
    const currentCycle = lunarCycles - Math.floor(lunarCycles)
    const age = currentCycle * synodicMonth
    
    const illumination = 0.5 * (1 - Math.cos(2 * Math.PI * currentCycle))
    
    let phaseName
    if (age < 1.84566) phaseName = 'Nova'
    else if (age < 5.53699) phaseName = 'Crescente'
    else if (age < 9.22831) phaseName = 'Quarto Crescente'
    else if (age < 12.91963) phaseName = 'Gibosa Crescente'
    else if (age < 16.61096) phaseName = 'Cheia'
    else if (age < 20.30228) phaseName = 'Gibosa Minguante'
    else if (age < 23.99361) phaseName = 'Quarto Minguante'
    else if (age < 27.68493) phaseName = 'Minguante'
    else phaseName = 'Nova'
    
    return {
      illumination,
      phaseName,
      age
    }
  }

  // Determinar modo dia/noite com precisão astronômica
  async getDayNightMode(date, location) {
    const sunPosition = await this.calculatePreciseSunPosition(date, location)
    
    if (sunPosition.altitude > 6) return 'day'
    if (sunPosition.altitude > -6) return 'twilight'
    if (sunPosition.altitude > -12) return 'nautical_twilight'
    if (sunPosition.altitude > -18) return 'astronomical_twilight'
    return 'night'
  }

  // Cálculo preciso da posição do Sol
  async calculatePreciseSunPosition(date, location) {
    const julianDate = this.dateToJulian(date)
    const T = (julianDate - 2451545.0) / 36525
    const lst = this.calculateLocalSiderealTime(julianDate, location.longitude)
    
    // Longitude média do Sol
    const L0 = (280.46646 + 36000.76983 * T + 0.0003032 * T * T) % 360
    
    // Anomalia média
    const M = (357.52911 + 35999.05029 * T - 0.0001537 * T * T) % 360
    const MRad = M * Math.PI / 180
    
    // Equação do centro
    const C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(MRad) +
              (0.019993 - 0.000101 * T) * Math.sin(2 * MRad) +
              0.000289 * Math.sin(3 * MRad)
    
    // Longitude verdadeira
    const trueLong = L0 + C
    
    // Obliquidade da eclíptica
    const epsilon = 23.439291 - 0.0130042 * T - 0.00000164 * T * T + 0.000000504 * T * T * T
    const epsilonRad = epsilon * Math.PI / 180
    const trueLongRad = trueLong * Math.PI / 180
    
    // Ascensão reta e declinação
    const ra = Math.atan2(Math.cos(epsilonRad) * Math.sin(trueLongRad), Math.cos(trueLongRad)) * 180 / Math.PI / 15
    const dec = Math.asin(Math.sin(epsilonRad) * Math.sin(trueLongRad)) * 180 / Math.PI
    
    return this.calculateStarPosition({ ra, dec }, lst, location.latitude)
  }

  // Utilitários astronômicos
  dateToJulian(date) {
    const a = Math.floor((14 - (date.getMonth() + 1)) / 12)
    const y = date.getFullYear() + 4800 - a
    const m = (date.getMonth() + 1) + 12 * a - 3
    
    let jdn = date.getDate() + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045
    
    const hours = date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600
    return jdn + (hours - 12) / 24
  }

  calculateLocalSiderealTime(julianDate, longitude) {
    const T = (julianDate - 2451545.0) / 36525
    const theta0 = 280.46061837 + 360.98564736629 * (julianDate - 2451545.0) + 
                   0.000387933 * T * T - (T * T * T) / 38710000
    return ((theta0 + longitude) % 360) / 15
  }

  calculateStarPosition(star, lst, latitude) {
    const ha = (lst - star.ra) * 15 // Converter para graus
    const latRad = latitude * Math.PI / 180
    const decRad = star.dec * Math.PI / 180
    const haRad = ha * Math.PI / 180

    // Calcular altitude
    const sinAlt = Math.sin(decRad) * Math.sin(latRad) + 
                   Math.cos(decRad) * Math.cos(latRad) * Math.cos(haRad)
    const altitude = Math.asin(Math.max(-1, Math.min(1, sinAlt))) * 180 / Math.PI

    // Calcular azimute
    const cosAz = (Math.sin(decRad) - Math.sin(latRad) * sinAlt) / 
                  (Math.cos(latRad) * Math.cos(Math.asin(sinAlt)))
    let azimuth = Math.acos(Math.max(-1, Math.min(1, cosAz))) * 180 / Math.PI
    
    if (Math.sin(haRad) > 0) {
      azimuth = 360 - azimuth
    }

    // Converter para coordenadas 3D (sistema de câmera)
    const distance = 20
    const altRad = altitude * Math.PI / 180
    const azRad = (azimuth - 180) * Math.PI / 180 // Ajustar orientação

    const x = distance * Math.cos(altRad) * Math.sin(azRad)
    const y = distance * Math.sin(altRad)
    const z = -distance * Math.cos(altRad) * Math.cos(azRad)

    return {
      position: [x, y, z],
      altitude,
      azimuth,
      distance
    }
  }

  calculatePlanetPosition(longitude, planetData, lst, latitude) {
    // Simplificação: converter longitude eclíptica para equatorial
    const epsilon = 23.4393
    const lambdaRad = longitude * Math.PI / 180
    const epsilonRad = epsilon * Math.PI / 180
    
    const ra = Math.atan2(Math.sin(lambdaRad) * Math.cos(epsilonRad), Math.cos(lambdaRad)) * 180 / Math.PI / 15
    const dec = Math.asin(Math.sin(lambdaRad) * Math.sin(epsilonRad)) * 180 / Math.PI
    
    const position = this.calculateStarPosition({ ra, dec }, lst, latitude)
    
    return {
      ...position,
      distance: planetData.a // UA
    }
  }

  getFallbackLocation() {
    return {
        latitude: -3.5133, // Itapipoca, Ceará
        longitude: -39.5781,
        city: 'Itapipoca',
        country: 'Brasil'
    }
  }

  getDefaultPlanetData(date, location) {
    return [
      { name: 'Venus', position: [5, 2, -8], color: '#FFC649', magnitude: -4.0, visible: true, type: 'planet' },
      { name: 'Mars', position: [-7, 1, -6], color: '#CD5C5C', magnitude: 0.7, visible: true, type: 'planet' },
      { name: 'Jupiter', position: [3, 4, -12], color: '#D8CA9D', magnitude: -2.2, visible: true, type: 'planet' },
      { name: 'Saturn', position: [-4, 3, -10], color: '#FAD5A5', magnitude: 0.4, visible: true, type: 'planet' }
    ]
  }

  // Detectar estrelas com mensagens especiais
  getStarsWithMessages() {
    return [
      'Vega', 'Sirius', 'Polaris', 'Betelgeuse', 'Rigel', 'Aldebaran',
      'Capella', 'Arcturus', 'Spica', 'Antares', 'Altair', 'Deneb',
      'Pollux', 'Castor', 'Regulus', 'Procyon', 'Canopus', 'Fomalhaut'
    ]
  }

  // Verificar se uma estrela tem mensagem especial
  hasSpecialMessage(starName) {
    return this.getStarsWithMessages().includes(starName)
  }
}

export default new EnhancedAstronomyService()