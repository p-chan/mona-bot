# mona-bot

> A helpful slack bot

# Features

- ping

# Usage

Copy `.env.example` to `.env` .

```
cp .env.example .env
```

Add slack token.

```.env
SLACK_TOKEN=xoxb-XXXXX
```

Start mona-bot.

```bash
$ npm start
```

Deploy to now.  
If [now](https://github.com/zeit/now-cli) is not installed, run `$ npm i now -g` .

```bash
$ now --dotenv
```

Set alias.

```bash
$ now alias
```

# License

The MIT License. See [LICENSE](LICENSE).
