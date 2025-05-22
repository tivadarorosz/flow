const sass = require('sass');
const path = require('path');

module.exports = class {
  data() {
    return {
      permalink: '/css/main.css',
      eleventyExcludeFromCollections: true
    };
  }

  render() {
    const result = sass.compile(path.join(__dirname, 'main.scss'), {
      style: 'compressed',
      sourceMap: false
    });
    
    return result.css;
  }
};