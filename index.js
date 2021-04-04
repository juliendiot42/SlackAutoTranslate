const translate = require("./translate.js");

(async () => {
  let out = await translate(
    (fromLang = "Japanese"),
    (toLang = "English"),
    (msg = "おはよう、元気？"),
    (verbose = true),
    (headless = true)
  );
  console.log(JSON.stringify(out));
})();
