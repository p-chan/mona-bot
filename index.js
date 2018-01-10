require('dotenv').config()

const Botkit = require('botkit')

const controller = Botkit.slackbot({
  debug: false
})

const bot = controller.spawn({ // eslint-disable-line
  token: process.env.SLACK_TOKEN
}).startRTM()

controller.hears('ping', 'direct_mention', (bot, message) => {
  bot.reply(message, 'pong')
})
