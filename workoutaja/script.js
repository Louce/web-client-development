// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
  // Get elements
  const button = document.querySelector('.text button');
  const logoText = document.querySelector('.logo-text');
  const navLinks = document.querySelectorAll('nav ul li a');
  const exclusiveText = document.querySelector('.text h1 span');
  const womanImage = document.querySelector('.woman-image');
  const balls = document.querySelector('#balls');
  const footerLink = document.querySelector('footer a');
  const mainText = document.querySelector('.text');
  const strongElements = document.querySelectorAll('.text p strong');
  
  // Add parallax effect to the background
  document.addEventListener('mousemove', function(e) {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    
    document.body.style.backgroundPosition = `calc(50% + ${moveX}px) calc(50% + ${moveY}px), 0% 0%`;
  });
  
  // Add scroll-triggered animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, { threshold: 0.1 });
  
  // Observe elements for scroll animations
  [mainText, womanImage, button, ...strongElements].forEach(el => {
    if (el) observer.observe(el);
  });
  
  // Add animated cursor effect for all clickable elements
  const clickableElements = [button, logoText, ...navLinks, footerLink];
  
  clickableElements.forEach(element => {
    if (!element) return;
    
    element.addEventListener('mousemove', function(e) {
      const rect = e.target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate the distance from center
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const distanceX = (x - centerX) / centerX;
      const distanceY = (y - centerY) / centerY;
      
      // Apply subtle rotation based on mouse position
      this.style.transform = `perspective(1000px) rotateX(${distanceY * 5}deg) rotateY(${distanceX * 5}deg) scale(1.05)`;
    });
    
    element.addEventListener('mouseleave', function() {
      this.style.transform = 'none';
    });
  });
  
  // Enhanced button interactions
  button.addEventListener('mouseenter', function() {
    this.classList.add('gradient-animation');
    // Add ripple effect
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 1000);
  });
  
  button.addEventListener('mouseleave', function() {
    this.classList.remove('gradient-animation');
    this.classList.add('gradient-reset');
    
    setTimeout(() => {
      this.classList.remove('gradient-reset');
    }, 500);
  });
  
  // Parallax effect for woman image
  document.addEventListener('mousemove', function(e) {
    if (womanImage) {
      const moveX = (e.clientX - window.innerWidth / 2) * 0.005;
      const moveY = (e.clientY - window.innerHeight / 2) * 0.005;
      womanImage.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
    }
  });
  
  // Add floating animation to exclusive text
  if (exclusiveText) {
    exclusiveText.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.1) translateY(-5px)';
      this.style.textShadow = '0 10px 20px rgba(137, 197, 190, 0.3)';
    });
    
    exclusiveText.addEventListener('mouseleave', function() {
      this.style.transform = 'none';
      this.style.textShadow = 'none';
    });
  }
  
  // Add hover effect to strong text elements
  strongElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
      this.style.color = '#ff7e5f';
      this.style.transition = 'all 0.3s ease';
    });
    
    element.addEventListener('mouseleave', function() {
      this.style.color = '';
    });
  });
  
  // Make decorative balls follow cursor with enhanced contrast
  if (balls) {
    document.addEventListener('mousemove', function(e) {
      // Calculate cursor position as percentage of viewport
      const cursorX = e.clientX / window.innerWidth;
      const cursorY = e.clientY / window.innerHeight;
      
      // Set maximum movement range (in pixels)
      const maxX = 30;
      const maxY = 30;
      
      // Calculate offset from bottom-right corner based on cursor position
      const offsetX = maxX * (1 - cursorX);
      const offsetY = maxY * (1 - cursorY);
      
      // Apply transform to move balls
      balls.style.transform = `translate(${-offsetX}px, ${-offsetY}px) rotate(${cursorX * 3}deg)`;
      
      // Dynamically adjust opacity based on cursor position
      const opacityBase = 0.7;
      const opacityBoost = 0.3 * (1 - Math.max(cursorX, cursorY));
      balls.style.opacity = Math.min(1, opacityBase + opacityBoost);
    });
    
    // Reset on mouse leave
    document.addEventListener('mouseleave', function() {
      balls.style.transform = 'translate(0, 0)';
      balls.style.opacity = 0.7;
    });
  }
  
  // Add a subtle glow effect that follows the cursor
  const glowEffect = document.createElement('div');
  glowEffect.classList.add('cursor-glow');
  document.body.appendChild(glowEffect);
  
  document.addEventListener('mousemove', function(e) {
    glowEffect.style.left = `${e.clientX}px`;
    glowEffect.style.top = `${e.clientY}px`;
    
    // Make the glow effect change color slightly based on position
    const hue = (e.clientX / window.innerWidth) * 20 + 160; // Teal to slightly more green
    glowEffect.style.background = `radial-gradient(circle, hsla(${hue}, 60%, 70%, 0.15) 0%, rgba(255,255,255,0) 70%)`;
  });
}); 

// Add the CSS for cursor glow
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .cursor-glow {
      position: fixed;
      width: 300px;
      height: 300px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(137, 197, 190, 0.15) 0%, rgba(255,255,255,0) 70%);
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      transition: background 0.3s ease;
    }
    
    .ripple {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 70%);
      border-radius: inherit;
      animation: ripple-effect 1s ease-out forwards;
      z-index: 1;
    }
    
    @keyframes ripple-effect {
      0% {
        transform: scale(0.3);
        opacity: 1;
      }
      100% {
        transform: scale(3);
        opacity: 0;
      }
    }
  </style>
`); 