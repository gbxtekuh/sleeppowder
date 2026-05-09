/**
 * Gerenciador de partículas para o hero-banner
 */
const Particles = {
    init() {
        const field = document.querySelector('.particle-field');
        const hero = document.querySelector('.hero-banner');
        
        if (!field || !hero) return;

        // Limpa campo caso já existam partículas
        field.innerHTML = '';

        const count = 50;
        const particles = [];

        for (let i = 0; i < count; i++) {
            const particle = document.createElement('span');
            
            // Valores aleatórios
            const size = Math.random() * 6 + 2; // 2px a 8px
            const posX = Math.random() * 100; // 0% a 100%
            const posY = Math.random() * 100; // 0% a 100%
            const duration = Math.random() * 15 + 10; // 10s a 25s
            const delay = Math.random() * -20; // Delay negativo para começar já em movimento

            // Estilos inline
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            
            // Opacidade variada para profundidade
            particle.style.opacity = Math.random() * 0.5 + 0.2;

            field.appendChild(particle);
            particles.push({
                el: particle,
                x: posX,
                y: posY,
                speed: Math.random() * 0.2 + 0.1
            });
        }

        // Interação com o Mouse
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            particles.forEach(p => {
                const pRect = p.el.getBoundingClientRect();
                const pX = pRect.left - rect.left + pRect.width / 2;
                const pY = pRect.top - rect.top + pRect.height / 2;

                const distX = mouseX - pX;
                const distY = mouseY - pY;
                const distance = Math.sqrt(distX * distX + distY * distY);

                if (distance < 100) {
                    const force = (100 - distance) / 100;
                    const moveX = (distX / distance) * force * -20;
                    const moveY = (distY / distance) * force * -20;
                    p.el.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
                } else {
                    p.el.style.transform = `translate3d(0, 0, 0)`;
                }
            });
        });

        hero.addEventListener('mouseleave', () => {
            particles.forEach(p => {
                p.el.style.transform = `translate3d(0, 0, 0)`;
            });
        });
    }
};

export default Particles;
