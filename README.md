# SlackAutoTranslate

Slack application to translate automatically messages from a given channel to another. It use the [slack API](https://slack.dev/bolt-js/concepts) for connection to slack [DeepL API](https://www.deepl.com/en/docs-api/) for translation.


## Create Slack app

First we need to create a Slack API on the [Slack API website](https://api.slack.com/apps) by clicking on "Create New App" after login and selecting your Slack workspace where you want ot install your app.

### Setup Slack app

The Slack API require some authorization to be able to receive and send messages on the Slack workspace.

### Enable Socket mode

- go to the "Socket Mode" page
- Click on "Enable Socket Mode" button
- Give a name to your app token
- Copy and paste your token in a text file name `.env` like this:

```
SLACK_APP_TOKEN = 'xapp-1-XXXXXXXXXXXXXXXXXX'
```


### Event subscription

- On the "Basic Information" page, click on "Add features and functionality" menu.
- Then click on "Event Subscriptions"
- Click on the "Enable Events" button
- On the "Subscribe to bots events" click on "Add Bot User events" and add "message.channels" event
- Save your changes by clicking on the button at the bottom of the page

### Permissions

- On the "Basic Information" page, click on "Add features and functionality" menu.
- Then click on "Permissions"
- On the "Scopes" menu, "Bot Token Scopes" sub menu, click on "Add an OAuth Scope" 
- Add the following scopes:
  - `channels:history`
  - `app_mentions:read`
  - `channels:read`
  - `chat:write`
  - `chat:write.customize`
  - `users:read`
- Click on "Install to Workspace" button on the top of the page
- Copy and paste your "Bot User OAuth Token" in the `.env` file like this:

```
SLACK_APP_TOKEN = 'xapp-1-XXXXXXXXXXXXXXXXXX'
BOT_TOKEN = 'xoxb-XXXXXXXXXXXXXXXXXX'
```

## DeepL API

- Create a DeepL API account on their [web site](https://www.deepl.com/pro?cta=checkout-pro)
- Go to your [account settings](https://www.deepl.com/pro-account/plan) 
- copy and paste your Authentication Key in the `.env` file like this:

```
SLACK_APP_TOKEN = 'xapp-1-XXXXXXXXXXXXXXXXXX'
BOT_TOKEN = 'xoxb-XXXXXXXXXXXXXXXXXX'
DEEPLKEY = 'XXXXXXXXXXXXXXXXXX'
```


## Install 

Complete [SlackAutotranslate.service](./SlackAutotranslate.service) file and copy it into `/etc/systemd/system`.

Start it with `systemctl start SlackAutotranslate`.

Enable it to run on boot with `systemctl enable SlackAutotranslate`.

See logs with `journalctl -u SlackAutotranslate`.
