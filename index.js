const Botkit = require('botkit')
const CronJob = require('cron').CronJob
const dotenv = require('dotenv')
const helper = require('./helper')
const http = require('http')

const env = process.env.NODE_ENV || 'development'

if (env === 'development') {
  dotenv.config()
}

if (!process.env.SLACK_TOKEN) {
  console.error('[ERR] Does not set SLACK_TOKEN')
  process.exit(1)
}

const controller = Botkit.slackbot({
  debug: false,
  retry: true
})

const bot = controller.spawn({ // eslint-disable-line
  token: process.env.SLACK_TOKEN
}).startRTM()

// Jobs

// ゴミ出し

const burnableNotify = new CronJob('0 0 8 * * 1,4', async () => {
  const channelId = await helper.getIdByName('random')

  bot.say({
    text: '可燃ごみを出す',
    channel: channelId
  })
}, null, false, 'Asia/Tokyo')

const unburnableNotify = new CronJob('0 0 8 1-28 * 6', async () => {
  const channelId = await helper.getIdByName('random')
  const indexDay = Math.floor((new Date().getDate() - 1) / 7) + 1
  let output = ''

  if ((indexDay % 2) !== 0) {
    output = '不燃ごみを出す'
  } else {
    output = 'ペットボトルを出す'
  }

  bot.say({
    text: output,
    channel: channelId
  })
}, null, false, 'Asia/Tokyo')

const recyclableNotify = new CronJob('0 0 8 * * 3', async () => {
  const channelId = await helper.getIdByName('random')

  bot.say({
    text: '資源ごみを出す',
    channel: channelId
  })
}, null, false, 'Asia/Tokyo')

burnableNotify.start()
unburnableNotify.start()
recyclableNotify.start()

// Events

controller.hears('ping', 'direct_mention', (bot, message) => {
  bot.reply(message, 'pong')
})

// Server

http.createServer((req, res) => {
  res.end('OK!')
}).listen(3000)
