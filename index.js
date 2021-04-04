const app = require("express")();
const translate = require("./translate.js");

const PORT = 8080;

app.get("/translate", (req, res) => {
  console.log("triggered");

  let from = req.query.from;
  let to = req.query.to;
  let msg = req.query.msg;

  (async () => {
    let out = await translate(
      (fromLang = from),
      (toLang = to),
      (msg = msg),
      (verbose = true),
      (headless = true)
    );
    res.status(200).send(out); //console.log(JSON.stringify(out));
  })();
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
