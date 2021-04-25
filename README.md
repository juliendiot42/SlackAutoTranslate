# SlackAutoTranslate

Slack application to translate automatically messages from a given channel to another. It use the [slack API](https://slack.dev/bolt-js/concepts) for connection to slack [DeepL API](https://www.deepl.com/en/docs-api/) for translation.

## Install 

Complete [SlackAutotranslate.service](./SlackAutotranslate.service) file and copy it into `/etc/systemd/system`.

Start it with `systemctl start SlackAutotranslate`.

Enable it to run on boot with `systemctl enable SlackAutotranslate`.

See logs with `journalctl -u SlackAutotranslate`.
