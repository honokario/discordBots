const config = require('./config.json');
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log('Ready...');
});

client.on('guildMemberAdd', member => {
  console.log("%s が サーバーに加入しました。", member.username);
  var name = member.user.username;
});

client.on('voiceStateUpdate', (oldState, newState) => {
  // 通話開始時
  if(oldState.channelID===null && newState.channelID != null){
    console.log("%s が チャンネル %s に入室しました。", newState.member.displayName, newState.channel.name);
    sendMsg(config.channelId.notification, newState.member.displayName + " が チャンネル[" + newState.channel.name + "] に 入室 しました。");
    return;
  }

  // // 通話終了時
  // if(oldState.channelID !=null && newState.channelID === null){
  //   console.log("%s が チャンネル %s を退室しました。", oldState.member.displayName, oldState.channel.name);
  //   sendMsg(config.channelId.notification, oldState.member.displayName + "が チャンネル[" + oldState.channel.name + "] を 退室 しました。");
  //   return;
  // }

  // WEBカメラON
  if(oldState.selfVideo === false && newState.selfVideo === true){
    console.log("%s が WEBカメラ を ON にしました。", newState.member.displayName);
    sendMsg(config.channelId.notification, newState.member.displayName + " が WEBカメラ を ON にしました。");
    return;
  }

  // 画面共有ON
  if(oldState.streaming === false && newState.streaming === true){
    console.log("%s が 画面共有 を ON にしました。", newState.member.displayName);
    sendMsg(config.channelId.notification, newState.member.displayName + " が 画面共有 を ON にしました。");
    return;
  }
});


client.on('message', message => {
  // console.log(message.content);

  if(message.author.bot) return; // BOTの発言だった場合は処理を終了

  if(message.channel.id === config.channelId.notification) {
      message.reply("ここはBOTさんがつぶやくところなのです、「ざつだん」でつぶやくとよいのですよー！にぱー☆ ");
      return;
  }
        
  var userName = message.author.username + "さん";
  if(message.author.username === "そうこう") userName = "おじ";

  if(message.content === "こんにちは") {
    sendReply(message, "はい " + userName + " こんにちは");
    return;
  }

  if(message.content.match(/そうこう/) || message.content.match(/soukou/)) {
    sendReply(message, "それおじな");
    return;
  }

  if(message.content === "サイコロ" || message.content === "さいころ") {
    var numList = [ "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣" ];
    var result = Math.floor(Math.random() * 6); 
    sendReply(message, "結果：" + numList[result]);
    return;
  }

  if(message.content === "おみくじ") {
    var kuziList = [
      "大吉","中吉","小吉","吉","末吉","凶","大凶",
    ];
    var result = Math.floor(Math.random() * kuziList.length); 
    sendReply(message, userName + "の今年の運勢は…… " + kuziList[result] + "!");
    return;
  }

  // EMOJI
  if(message.content.match(/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g)) {
    var emojiCode = Math.floor( Math.random() * (128592 + 1 - 127744) ) + 127744 ; // (128512, 128592) (127744, 128318);
    var emoji = String.fromCodePoint(emojiCode);
    sendMsg(message.channel.id, emoji);
    return;
  }

  if(message.content.match(/gif/)) {
    var gifList = [
      "http://imgur.com/Ib3H8aG.gif", // いけ 150, 100
      "http://imgur.com/uPcuYt6.gif", // いくぞ
      "http://imgur.com/tu2zx2s.gif", // こい
      "http://imgur.com/hTU4ZXO.gif", // やれ
      "http://imgur.com/K6RSLV7.gif", // やるぞ
    ];
    var result = Math.floor(Math.random() * gifList.length); 
    sendMsg(message.channel.id, gifList[result]);
    return;
  }
});

client.login(config.token);

function sendReply(message, text){
  message.reply(text)
    .then(console.log("リプライ送信: " + text))
    .catch(console.error);
}

function sendMsg(channelId, text, option={}){
  client.channels.cache.get(channelId).send(text, option)
    .then(console.log("メッセージ送信: " + text + JSON.stringify(option)))
    .catch(console.error);
}
