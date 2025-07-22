export const constellationData = {
  'Aries': {
    name: 'Áries',
    season: 'Outono/Inverno',
    hemisphere: 'Norte',
    mythology: 'O carneiro com velo de ouro da mitologia grega',
    stars: [
      { name: 'Hamal', ra: 2.119, dec: 23.463, magnitude: 2.0, color: '#FFA500' },
      { name: 'Sheratan', ra: 1.911, dec: 20.808, magnitude: 2.6, color: '#FFFFFF' },
      { name: 'Mesarthim', ra: 1.878, dec: 19.294, magnitude: 4.8, color: '#87CEEB' }
    ],
    lines: [
      ['Hamal', 'Sheratan'],
      ['Sheratan', 'Mesarthim']
    ],
    bestTime: 'Dezembro',
    romanticMessage: 'Como Áries, nosso amor é corajoso e pioneiro, sempre em busca de novas aventuras juntos.'
  },

  'Taurus': {
    name: 'Touro',
    season: 'Inverno',
    hemisphere: 'Norte',
    mythology: 'O touro em que Zeus se transformou para raptar Europa',
    stars: [
      { name: 'Aldebaran', ra: 4.598, dec: 16.509, magnitude: 0.85, color: '#FFA500' },
      { name: 'Elnath', ra: 5.438, dec: 28.608, magnitude: 1.7, color: '#87CEEB' },
      { name: 'Alcyone', ra: 3.790, dec: 24.105, magnitude: 2.9, color: '#A4C2F4' },
      { name: 'Atlas', ra: 3.804, dec: 24.053, magnitude: 3.6, color: '#A4C2F4' },
      { name: 'Pleione', ra: 3.787, dec: 24.136, magnitude: 5.0, color: '#A4C2F4' }
    ],
    lines: [
      ['Aldebaran', 'Elnath'],
      ['Alcyone', 'Atlas'],
      ['Atlas', 'Pleione']
    ],
    bestTime: 'Janeiro',
    romanticMessage: 'Touro representa a estabilidade e lealdade, como nosso amor que cresce mais forte a cada dia.'
  },

  'Gemini': {
    name: 'Gêmeos',
    season: 'Inverno/Primavera',
    hemisphere: 'Norte',
    mythology: 'Os gêmeos Castor e Pólux, filhos de Zeus',
    stars: [
      { name: 'Pollux', ra: 7.755, dec: 28.026, magnitude: 1.1, color: '#FFA500' },
      { name: 'Castor', ra: 7.576, dec: 31.888, magnitude: 1.6, color: '#FFFFFF' },
      { name: 'Alhena', ra: 6.628, dec: 16.399, magnitude: 1.9, color: '#FFFFFF' },
      { name: 'Wasat', ra: 7.335, dec: 21.982, magnitude: 3.5, color: '#FFFF99' }
    ],
    lines: [
      ['Pollux', 'Castor'],
      ['Pollux', 'Alhena'],
      ['Castor', 'Wasat'],
      ['Wasat', 'Alhena']
    ],
    bestTime: 'Fevereiro',
    romanticMessage: 'Como os gêmeos, somos duas almas que se completam perfeitamente.'
  },

  'Cancer': {
    name: 'Câncer',
    season: 'Primavera',
    hemisphere: 'Norte',
    mythology: 'O caranguejo enviado por Hera para atrapalhar Hércules',
    stars: [
      { name: 'Acubens', ra: 8.974, dec: 11.858, magnitude: 4.3, color: '#FFFFFF' },
      { name: 'Al Tarf', ra: 8.275, dec: 9.186, magnitude: 3.5, color: '#FFA500' },
      { name: 'Asellus Australis', ra: 8.745, dec: 18.154, magnitude: 3.9, color: '#FFA500' },
      { name: 'Asellus Borealis', ra: 8.695, dec: 21.468, magnitude: 4.7, color: '#FFFFFF' }
    ],
    lines: [
      ['Al Tarf', 'Acubens'],
      ['Asellus Australis', 'Asellus Borealis']
    ],
    bestTime: 'Março',
    romanticMessage: 'Câncer simboliza o lar e a proteção, como o abrigo seguro que encontramos um no outro.'
  },

  'Leo': {
    name: 'Leão',
    season: 'Primavera',
    hemisphere: 'Norte',
    mythology: 'O leão de Nemeia, morto por Hércules',
    stars: [
      { name: 'Regulus', ra: 10.139, dec: 11.967, magnitude: 1.4, color: '#87CEEB' },
      { name: 'Algieba', ra: 10.333, dec: 19.842, magnitude: 2.6, color: '#FFA500' },
      { name: 'Denebola', ra: 11.818, dec: 14.572, magnitude: 2.1, color: '#FFFFFF' },
      { name: 'Zosma', ra: 11.235, dec: 20.524, magnitude: 2.6, color: '#FFFFFF' },
      { name: 'Ras Elased Australis', ra: 9.764, dec: 23.774, magnitude: 2.0, color: '#FFA500' }
    ],
    lines: [
      ['Regulus', 'Algieba'],
      ['Algieba', 'Zosma'],
      ['Zosma', 'Denebola'],
      ['Regulus', 'Ras Elased Australis']
    ],
    bestTime: 'Abril',
    romanticMessage: 'Leão representa a coragem e o orgulho, como o orgulho que sinto de ter você ao meu lado.'
  },

  'Virgo': {
    name: 'Virgem',
    season: 'Primavera/Verão',
    hemisphere: 'Norte',
    mythology: 'A deusa da justiça Astreia',
    stars: [
      { name: 'Spica', ra: 13.420, dec: -11.161, magnitude: 0.97, color: '#87CEEB' },
      { name: 'Zavijava', ra: 12.896, dec: 3.398, magnitude: 3.6, color: '#FFFF99' },
      { name: 'Porrima', ra: 12.694, dec: -1.450, magnitude: 2.7, color: '#FFFFFF' },
      { name: 'Auva', ra: 12.927, dec: -0.667, magnitude: 3.4, color: '#FFFFFF' }
    ],
    lines: [
      ['Spica', 'Zavijava'],
      ['Zavijava', 'Porrima'],
      ['Porrima', 'Auva']
    ],
    bestTime: 'Maio',
    romanticMessage: 'Virgem simboliza a pureza e perfeição, como o amor puro que sinto por você.'
  },

  'Libra': {
    name: 'Libra',
    season: 'Verão',
    hemisphere: 'Norte',
    mythology: 'A balança da justiça',
    stars: [
      { name: 'Zubeneschamali', ra: 15.283, dec: -9.383, magnitude: 2.6, color: '#87CEEB' },
      { name: 'Zubenelgenubi', ra: 14.849, dec: -16.042, magnitude: 2.8, color: '#FFFFFF' },
      { name: 'Brachium', ra: 15.592, dec: -14.789, magnitude: 3.3, color: '#FFA500' }
    ],
    lines: [
      ['Zubenelgenubi', 'Zubeneschamali'],
      ['Zubeneschamali', 'Brachium']
    ],
    bestTime: 'Junho',
    romanticMessage: 'Libra representa o equilíbrio e harmonia, como o perfeito equilíbrio que encontramos juntos.'
  },

  'Scorpius': {
    name: 'Escorpião',
    season: 'Verão',
    hemisphere: 'Sul',
    mythology: 'O escorpião que matou Orion',
    stars: [
      { name: 'Antares', ra: 16.490, dec: -26.432, magnitude: 1.09, color: '#FF4500' },
      { name: 'Shaula', ra: 17.560, dec: -37.104, magnitude: 1.6, color: '#87CEEB' },
      { name: 'Sargas', ra: 17.622, dec: -42.999, magnitude: 1.9, color: '#FFFF99' },
      { name: 'Dschubba', ra: 16.005, dec: -19.806, magnitude: 2.3, color: '#87CEEB' },
      { name: 'Larawag', ra: 17.708, dec: -39.030, magnitude: 2.7, color: '#87CEEB' }
    ],
    lines: [
      ['Antares', 'Dschubba'],
      ['Antares', 'Shaula'],
      ['Shaula', 'Sargas'],
      ['Sargas', 'Larawag']
    ],
    bestTime: 'Julho',
    romanticMessage: 'Escorpião representa a paixão intensa, como o fogo que queima em nosso amor.'
  },

  'Sagittarius': {
    name: 'Sagitário',
    season: 'Verão',
    hemisphere: 'Sul',
    mythology: 'O centauro arqueiro',
    stars: [
      { name: 'Kaus Australis', ra: 18.403, dec: -34.385, magnitude: 1.8, color: '#87CEEB' },
      { name: 'Nunki', ra: 18.921, dec: -26.297, magnitude: 2.0, color: '#87CEEB' },
      { name: 'Ascella', ra: 19.084, dec: -29.880, magnitude: 2.6, color: '#FFFFFF' },
      { name: 'Kaus Media', ra: 18.349, dec: -29.828, magnitude: 2.7, color: '#FFA500' },
      { name: 'Kaus Borealis', ra: 18.298, dec: -25.421, magnitude: 2.8, color: '#FFA500' }
    ],
    lines: [
      ['Kaus Australis', 'Kaus Media'],
      ['Kaus Media', 'Kaus Borealis'],
      ['Kaus Australis', 'Nunki'],
      ['Nunki', 'Ascella']
    ],
    bestTime: 'Agosto',
    romanticMessage: 'Sagitário aponta para o futuro, como nossa jornada que ainda tem muito para descobrir.'
  },

  'Orion': {
    name: 'Orion',
    season: 'Inverno',
    hemisphere: 'Ambos',
    mythology: 'O grande caçador da mitologia grega',
    stars: [
      { name: 'Betelgeuse', ra: 5.919, dec: 7.407, magnitude: 0.42, color: '#FF6B6B' },
      { name: 'Rigel', ra: 5.242, dec: -8.202, magnitude: 0.13, color: '#87CEEB' },
      { name: 'Bellatrix', ra: 5.418, dec: 6.350, magnitude: 1.6, color: '#87CEEB' },
      { name: 'Mintaka', ra: 5.533, dec: -0.299, magnitude: 2.2, color: '#87CEEB' },
      { name: 'Alnilam', ra: 5.604, dec: -1.202, magnitude: 1.7, color: '#87CEEB' },
      { name: 'Alnitak', ra: 5.679, dec: -1.943, magnitude: 1.8, color: '#87CEEB' },
      { name: 'Saiph', ra: 5.796, dec: -9.670, magnitude: 2.1, color: '#87CEEB' }
    ],
    lines: [
      ['Betelgeuse', 'Bellatrix'],
      ['Bellatrix', 'Mintaka'],
      ['Mintaka', 'Alnilam'],
      ['Alnilam', 'Alnitak'],
      ['Alnitak', 'Saiph'],
      ['Saiph', 'Rigel'],
      ['Betelgeuse', 'Mintaka'],
      ['Rigel', 'Alnilam']
    ],
    bestTime: 'Janeiro',
    romanticMessage: 'Orion, o caçador, encontrou o maior tesouro: nosso amor que brilha mais que qualquer estrela.'
  },

  'Ursa Major': {
    name: 'Ursa Maior',
    season: 'Primavera',
    hemisphere: 'Norte',
    mythology: 'A grande ursa, também conhecida como Carro',
    stars: [
      { name: 'Dubhe', ra: 11.062, dec: 61.751, magnitude: 1.8, color: '#FFA500' },
      { name: 'Merak', ra: 11.031, dec: 56.382, magnitude: 2.4, color: '#FFFFFF' },
      { name: 'Phecda', ra: 11.897, dec: 53.695, magnitude: 2.4, color: '#FFFFFF' },
      { name: 'Megrez', ra: 12.257, dec: 57.033, magnitude: 3.3, color: '#FFFFFF' },
      { name: 'Alioth', ra: 12.900, dec: 55.960, magnitude: 1.8, color: '#FFFFFF' },
      { name: 'Mizar', ra: 13.399, dec: 54.925, magnitude: 2.3, color: '#FFFFFF' },
      { name: 'Alkaid', ra: 13.792, dec: 49.313, magnitude: 1.9, color: '#87CEEB' }
    ],
    lines: [
      ['Dubhe', 'Merak'],
      ['Merak', 'Phecda'],
      ['Phecda', 'Megrez'],
      ['Megrez', 'Alioth'],
      ['Alioth', 'Mizar'],
      ['Mizar', 'Alkaid'],
      ['Megrez', 'Dubhe']
    ],
    bestTime: 'Abril',
    romanticMessage: 'A Ursa Maior nos guia como o amor nos guia através da vida, sempre presente no céu.'
  },

  'Cassiopeia': {
    name: 'Cassiopeia',
    season: 'Outono',
    hemisphere: 'Norte',
    mythology: 'A rainha vaidosa da Etiópia',
    stars: [
      { name: 'Schedar', ra: 0.675, dec: 56.537, magnitude: 2.2, color: '#FFA500' },
      { name: 'Caph', ra: 0.153, dec: 59.150, magnitude: 2.3, color: '#FFFFFF' },
      { name: 'Gamma Cas', ra: 0.945, dec: 60.717, magnitude: 2.5, color: '#87CEEB' },
      { name: 'Ruchbah', ra: 1.430, dec: 60.235, magnitude: 2.7, color: '#FFFFFF' },
      { name: 'Segin', ra: 1.906, dec: 63.670, magnitude: 3.4, color: '#87CEEB' }
    ],
    lines: [
      ['Caph', 'Schedar'],
      ['Schedar', 'Gamma Cas'],
      ['Gamma Cas', 'Ruchbah'],
      ['Ruchbah', 'Segin']
    ],
    bestTime: 'Novembro',
    romanticMessage: 'Cassiopeia forma um W no céu, como as palavras "We" e "Win" - nós ganhamos juntos!'
  },

  'Cygnus': {
    name: 'Cisne',
    season: 'Verão',
    hemisphere: 'Norte',
    mythology: 'O cisne em que Zeus se transformou',
    stars: [
      { name: 'Deneb', ra: 20.690, dec: 45.280, magnitude: 1.3, color: '#FFFFFF' },
      { name: 'Sadr', ra: 20.371, dec: 40.257, magnitude: 2.2, color: '#FFFF99' },
      { name: 'Gienah', ra: 20.771, dec: 33.970, magnitude: 2.5, color: '#FFA500' },
      { name: 'Delta Cyg', ra: 19.749, dec: 45.131, magnitude: 2.9, color: '#87CEEB' },
      { name: 'Albireo', ra: 19.512, dec: 27.960, magnitude: 3.1, color: '#FFA500' }
    ],
    lines: [
      ['Deneb', 'Sadr'],
      ['Sadr', 'Gienah'],
      ['Sadr', 'Delta Cyg'],
      ['Sadr', 'Albireo']
    ],
    bestTime: 'Setembro',
    romanticMessage: 'O Cisne voa eternamente pelo céu, como nosso amor que nunca para de crescer.'
  },

  'Lyra': {
    name: 'Lira',
    season: 'Verão',
    hemisphere: 'Norte',
    mythology: 'A lira de Orfeu, que tocava músicas celestiais',
    stars: [
      { name: 'Vega', ra: 18.615, dec: 38.784, magnitude: 0.03, color: '#A4C2F4' },
      { name: 'Sheliak', ra: 18.835, dec: 33.363, magnitude: 3.5, color: '#FFFFFF' },
      { name: 'Sulafat', ra: 18.746, dec: 37.605, magnitude: 3.2, color: '#87CEEB' },
      { name: 'Delta Lyr', ra: 18.885, dec: 36.898, magnitude: 4.3, color: '#FFFFFF' }
    ],
    lines: [
      ['Vega', 'Sheliak'],
      ['Sheliak', 'Sulafat'],
      ['Sulafat', 'Delta Lyr'],
      ['Delta Lyr', 'Vega']
    ],
    bestTime: 'Agosto',
    romanticMessage: 'A Lira toca a música do universo, mas nenhuma melodia é mais doce que o som do seu nome.'
  },

  'Aquila': {
    name: 'Águia',
    season: 'Verão',
    hemisphere: 'Norte',
    mythology: 'A águia que carregava os raios de Zeus',
    stars: [
      { name: 'Altair', ra: 19.846, dec: 8.868, magnitude: 0.8, color: '#FFFFFF' },
      { name: 'Tarazed', ra: 19.771, dec: 10.614, magnitude: 2.7, color: '#FFA500' },
      { name: 'Alshain', ra: 19.921, dec: 6.407, magnitude: 3.7, color: '#FFFFFF' },
      { name: 'Deneb el Okab', ra: 19.425, dec: 3.115, magnitude: 3.4, color: '#FFFFFF' }
    ],
    lines: [
      ['Tarazed', 'Altair'],
      ['Altair', 'Alshain'],
      ['Altair', 'Deneb el Okab']
    ],
    bestTime: 'Agosto',
    romanticMessage: 'A Águia voa alto no céu, como nossos sonhos que não conhecem limites.'
  }
}

// Função para obter constelações visíveis por estação
export const getConstellationsBySeason = (season) => {
  return Object.entries(constellationData).filter(([key, constellation]) => 
    constellation.season.toLowerCase().includes(season.toLowerCase())
  )
}

// Função para obter constelações por hemisfério
export const getConstellationsByHemisphere = (hemisphere) => {
  return Object.entries(constellationData).filter(([key, constellation]) => 
    constellation.hemisphere === hemisphere || constellation.hemisphere === 'Ambos'
  )
}

// Mensagens românticas especiais para cada constelação
export const getConstellationRomanticMessage = (constellationName) => {
  const constellation = constellationData[constellationName]
  return constellation ? constellation.romanticMessage : null
}