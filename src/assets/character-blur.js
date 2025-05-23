// Word Blur Effect for Hero Title
(function() {
  'use strict';
  
  class WordBlurEffect {
    constructor(element) {
      this.element = element;
      this.originalText = element.textContent;
      this.words = [];
      this.currentBlurredWord = null;
      this.intervalId = null;
      
      this.init();
    }
    
    init() {
      // Split text into words and create structure
      this.createWordElements();
      
      // Start the random blur effect
      this.startRandomBlurCycle();
    }
    
    createWordElements() {
      // Clear the element
      this.element.innerHTML = '';
      
      // Split text into words
      const words = this.originalText.split(' ');
      
      // Create elements for each word
      words.forEach((word, index) => {
        // Create container for word
        const wordSpan = document.createElement('span');
        wordSpan.className = 'word';
        
        // Create spans for each character in the word
        for (let i = 0; i < word.length; i++) {
          const charSpan = document.createElement('span');
          charSpan.className = 'char';
          charSpan.textContent = word[i];
          charSpan.setAttribute('data-char', word[i]);
          wordSpan.appendChild(charSpan);
        }
        
        // Add to element and track
        this.element.appendChild(wordSpan);
        this.words.push(wordSpan);
        
        // Add space between words (except after last word)
        if (index < words.length - 1) {
          this.element.appendChild(document.createTextNode(' '));
        }
      });
    }
    
    getRandomWordIndex() {
      return Math.floor(Math.random() * this.words.length);
    }
    
    clearCurrentBlur() {
      if (this.currentBlurredWord !== null) {
        const chars = this.words[this.currentBlurredWord].querySelectorAll('.char');
        chars.forEach(char => char.classList.remove('char--blur'));
        this.currentBlurredWord = null;
      }
    }
    
    applyRandomBlur() {
      // Clear previous blur
      this.clearCurrentBlur();
      
      // Get random word
      const randomIndex = this.getRandomWordIndex();
      
      // Apply blur to all characters in the selected word
      const chars = this.words[randomIndex].querySelectorAll('.char');
      chars.forEach(char => char.classList.add('char--blur'));
      this.currentBlurredWord = randomIndex;
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
      new WordBlurEffect(heroTitle);
    }
  });
})();