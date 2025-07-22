import React, { useEffect, useRef } from 'react'

const ParticleBackground = () => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const particlesRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    // Configurar canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Classe para partículas
    class Particle {
      constructor() {
        this.reset()
        this.y = Math.random() * canvas.height
        this.fadeDelay = Math.random() * 600
        this.fadeStart = Date.now() + this.fadeDelay
        this.fadingOut = false
      }

      reset() {
        this.x = Math.random() * canvas.width
        this.y = -10
        this.z = Math.random() * 1000
        this.speed = 0.2 + Math.random() * 1
        this.opacity = Math.random() * 0.5 + 0.5
        this.size = Math.random() * 2 + 1
        this.twinkle = Math.random() * 0.02 + 0.005
        this.twinklePhase = Math.random() * Math.PI * 2
      }

      update() {
        this.y += this.speed
        this.twinklePhase += this.twinkle
        
        // Reset quando sair da tela
        if (this.y > canvas.height + 10) {
          this.reset()
        }

        // Efeito de piscar
        this.opacity = 0.3 + Math.sin(this.twinklePhase) * 0.3
      }

      draw(ctx) {
        ctx.save()
        
        // Gradiente radial para efeito de brilho
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 2
        )
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`)
        gradient.addColorStop(0.4, `rgba(255, 215, 0, ${this.opacity * 0.8})`)
        gradient.addColorStop(1, `rgba(255, 215, 0, 0)`)
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        
        // Efeito de cruz de luz
        if (this.opacity > 0.7) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity * 0.5})`
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.moveTo(this.x - this.size * 2, this.y)
          ctx.lineTo(this.x + this.size * 2, this.y)
          ctx.moveTo(this.x, this.y - this.size * 2)
          ctx.lineTo(this.x, this.y + this.size * 2)
          ctx.stroke()
        }
        
        ctx.restore()
      }
    }

    // Criar partículas
    const particleCount = Math.min(150, Math.floor((canvas.width * canvas.height) / 8000))
    particlesRef.current = Array.from({ length: particleCount }, () => new Particle())

    // Loop de animação
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Gradiente de fundo
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, 'rgba(15, 15, 35, 0.1)')
      gradient.addColorStop(0.5, 'rgba(26, 26, 46, 0.05)')
      gradient.addColorStop(1, 'rgba(22, 33, 62, 0.1)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Atualizar e desenhar partículas
      particlesRef.current.forEach(particle => {
        particle.update()
        particle.draw(ctx)
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        background: 'transparent',
        mixBlendMode: 'screen'
      }}
    />
  )
}

export default ParticleBackground