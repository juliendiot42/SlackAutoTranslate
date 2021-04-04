const puppeteer = require("puppeteer");
const isPi = require("detect-rpi");

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

module.exports = async function (
  fromLang,
  toLang,
  msg,
  verbose = false,
  headless = true
) {
  if (verbose) {
    console.log("Translate: " + msg);
    console.log("From: " + fromLang);
    console.log("To: " + toLang);
  }

  if (isPi()) {
    var browser = await puppeteer.launch({
      headless: headless,
      executablePath: "/usr/bin/chromium-browser",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
  } else {
    var browser = await puppeteer.launch({ headless: headless });
  }

  const page = await browser.newPage();
  await page.goto("https://www.deepl.com/translator");

  // write message
  await page.keyboard.type(msg);

  // select to language:
  const toLangSelect = await page.$('[dl-test="translator-target-lang-btn"]');
  //   console.log(toLangSelect);
  if (toLangSelect) {
    await toLangSelect.click();
    const [toLangBut] = await page.$x(
      "//button[contains(., '" + toLang + "')]"
    );
    sleep(100);
    if (toLangBut) {
      await toLangBut.click();
    }
  }
  sleep(500);

  // select from language:
  const fromLangSelect = await page.$('[dl-test="translator-source-lang-btn"]');
  //   console.log(fromLangSelect);
  if (fromLangSelect) {
    await fromLangSelect.click();
    const [fromLangBut] = await page.$x(
      "//button[contains(., '" + fromLang + "')]"
    );
    if (fromLangBut) {
      await fromLangBut.click();
    }
  }

  sleep(5000);
  // wait for response -- not working
  //   const res = await page.waitForResponse("https://www2.deepl.com/jsonrpc");
  //   if (res.ok()) {
  //     // get translated message
  //     console.log(res);
  //     const translatedDiv = await page.$("#target-dummydiv"); //*[@id="target-dummydiv"]//*[@id="target-dummydiv"]
  //     let transMsg = await page.evaluate((el) => el.textContent, translatedDiv);
  //     console.log(transMsg);
  //     await browser.close();
  //   }

  const translatedDiv = await page.$("#target-dummydiv"); //*[@id="target-dummydiv"]//*[@id="target-dummydiv"]
  let transMsg = await page.evaluate((el) => el.textContent, translatedDiv);

  // create response
  var resp = {
    from: fromLang,
    to: toLang,
    msg: msg,
    transMsg: await transMsg,
  };

  // close browser
  await browser.close();
  // console.log(JSON.stringify(resp));

  return resp;

  // return output
};
