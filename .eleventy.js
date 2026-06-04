module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("dump", (obj) => JSON.stringify(obj));

  // Keep .html extensions in output (Neocities compatibility)
  eleventyConfig.addGlobalData("permalink", "{{ page.filePathStem }}.html");

  // Pass through static assets unchanged
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("Mango.ttf");

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    // Don't process node_modules or _site
    pathPrefix: "/",
  };
};
