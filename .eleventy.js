module.exports = function(eleventyConfig) {
  // Watch for SCSS changes
  eleventyConfig.addWatchTarget("./src/scss/");
  
  // Copy assets
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/css");
  
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    }
  };
};