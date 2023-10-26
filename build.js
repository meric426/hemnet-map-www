const fs = require("fs");
const browserify = require("browserify");
const sass = require("sass");

browserify("./src/index.js")
  .transform("babelify", { presets: ["@babel/preset-env"] })
  .bundle()
  .pipe(fs.createWriteStream("dist/bundle.js"));

const result = sass.compile("./src/style.scss");
fs.writeFile("./dist/style.css", result.css, (err) => {
  if (err) throw err;
  console.log("The CSS has been saved to style.css!");
});
