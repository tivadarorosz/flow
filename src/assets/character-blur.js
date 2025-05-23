// Character Blur Effect for Hero Title
(function() {
  'use strict';
  
  class CharacterBlurEffect {
    constructor(element) {
      this.element = element;
      this.originalText = element.textContent;
      this.chars = [];
      this.currentBlurredChar = null;
      this.intervalId = null;
      
      this.init();
    }
    
    init() {
      // Split text into characters and create structure
      this.createCharacterElements();
      
      // Start the random blur effect
      this.startRandomBlurCycle();
    }
    
    createCharacterElements() {
      // Clear the element
      this.element.innerHTML = '';
      
      // Create elements for each character
      for (let i = 0; i < this.originalText.length; i++) {
        const char = this.originalText[i];
        
        if (char === ' ') {
          // For spaces, just add a text node
          this.element.appendChild(document.createTextNode(' '));
        } else {
          // Create container for character
          const charSpan = document.createElement('span');
          charSpan.className = 'char';
          charSpan.textContent = char;
          charSpan.setAttribute('data-char', char);
          
          // Add to element and track
          this.element.appendChild(charSpan);
          this.chars.push(charSpan);
        }
      }
    }
    
    getRandomCharIndex() {
      return Math.floor(Math.random() * this.chars.length);
    }
    
    clearCurrentBlur() {
      if (this.currentBlurredChar !== null) {
        this.chars[this.currentBlurredChar].classList.remove('char--blur');
        this.currentBlurredChar = null;
      }
    }
    
    applyRandomBlur() {
      // Clear previous blur
      this.clearCurrentBlur();
      
      // Get random character
      const randomIndex = this.getRandomCharIndex();
      
      // Apply blur to selected character
      this.chars[randomIndex].classList.add('char--blur');
      this.currentBlurredChar = randomIndex;
    }
    
    startRandomBlurCycle() {
      // Start the cycle
      this.intervalId = setInterval(() => {
        this.applyRandomBlur();
      }, 3000);
      
      // Start with first random blur immediately
      this.applyRandomBlur();
    }
    
    destroy() {
      // Clear interval
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
      
      // Clear any active effects
      this.clearCurrentBlur();
      
      // Restore original text
      this.element.textContent = this.originalText;
    }
  }
  
  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero__title');
    if (heroTitle) {
      new CharacterBlurEffect(heroTitle);
    }
  });
})();