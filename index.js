#!/usr/bin/env node

require("dotenv").config("./.env");
const translate = require("./translate.js");
const { App } = require("@slack/bolt");

const fromChannelid = process.env.FROM_ID;
const toChannelid = process.env.TO_ID;

const app = new App({
  token: process.env.BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

(async () => {
  await app.start();
  console.log("⚡️ Bolt app started");
})();

app.message(async ({ message, client }) => {
  console.log(`Message received: ${JSON.stringify(message)}`);
  // console.log(`Message received: ${message.text}`);

  if (message.channel === fromChannelid) {
    console.log(message.text);

    // get sender information:
    try {
      // Call the users.info method using the WebClient
      var fromUser = await client.users.info({
        user: message.user,
      });
      var fromName = fromUser.user.display_name;
    } catch (error) {
      console.error(error);
      var fromName = "Unidentified User";
    }

    // translate message:
    try {
      var resp = await translate(
        (fromLang = "Japanese"),
        (toLang = "English"),
        (msg = message.text),
        (verbose = true),
        (headless = true)
      );
      console.log(JSON.stringify(resp));
    } catch (error) {
      console.error(error);
      var resp = { transMsg: "Error during translation" };
    }
    // var resp = { transMsg: "fast return" };

    // post message:
    var postmsg = `(DeepL translation):\n`;
    postmsg = postmsg.concat(`${resp.transMsg}`);

    // detect attatchment:
    if (message.attachments) {
      postmsg = postmsg.concat(`> --- attachement not translated sorry ---`);
    }

    let result = await client.chat.postMessage({
      text: postmsg,
      channel: toChannelid,
      // as_user: false,
      username: `AutoTranslate: ${fromUser.user.profile.display_name}`,
      icon_url: fromUser.user.profile.image_48,
    });

    // await say(resp.transMsg);
  }
});
