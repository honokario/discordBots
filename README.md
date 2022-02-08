# discordBots

## Requirement
```
git
npm
Node 10.2.0
```

## Installation

```
cd [deployDirectory]
```
```
git clone https://github.com/honokario/discordBots.git
```
or
```
git clone git@github.com:honokario/discordBots.git
```
```
cd discordBots/senkoudama/
```
```
npm install discord.js@12.5.3
```
```
npm list
```
```
cp config.json.base config.json
```
```
vim config.json
```
``` json:config.json
{
  "prefix": "!",
  "token": "ボットのトークンID",
  "channelId": {
    "observation": "監視テキストチャンネルのID",
    "notification": "Bot通知テキストチャンネルのID",
  }
}
```

## Usage
```
node senkoudamaBotV2.js
```
