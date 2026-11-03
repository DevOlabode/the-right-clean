import ejsPlugin from "@11ty/eleventy-plugin-ejs";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(ejsPlugin);

  // Copy assets as-is, except notes like images/CREDITS.md
  eleventyConfig.addPassthroughCopy("src/assets", { filter: ["**/*", "!**/*.md"] });
  eleventyConfig.addPassthroughCopy({
    "node_modules/bootstrap/dist/css/bootstrap.min.css": "assets/vendor/bootstrap/bootstrap.min.css",
    "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js": "assets/vendor/bootstrap/bootstrap.bundle.min.js",
    "node_modules/bootstrap-icons/font/bootstrap-icons.min.css": "assets/vendor/bootstrap-icons/bootstrap-icons.min.css",
    "node_modules/bootstrap-icons/font/fonts": "assets/vendor/bootstrap-icons/fonts",
  });

  return {
    dir: { input: "src", output: "_site" },
    templateFormats: ["ejs"],
  };
}
