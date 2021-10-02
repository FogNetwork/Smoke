# Smoke
An official proxy of Fog Network and Ludicrous, smoke is a gateway for uncensored internet

<a href="https://heroku.com/deploy?template=https://github.com/FogNetwork/Smoke" title="Deploy to Heroku"><img alt="Deploy to Heroku" src="https://github.com/FogNetwork/Tsunami/raw/main/deploy/heroku.svg" width="140" height="30"><img></a>
&nbsp;
<a href="https://repl.it/github/FogNetwork/Smoke" title="Run on Replit"><img alt="Run on Replit" src="https://github.com/FogNetwork/Tsunami/raw/main/deploy/replit.svg" width="140" height="30"><img></a>
&nbsp;
<a href="https://glitch.com/edit/#!/import/github/FogNetwork/Smoke" title="Remix on Glitch"><img alt="Remix on glitch" src="https://github.com/FogNetwork/Tsunami/raw/main/deploy/glitch.svg" width="140" height="30"><img></a>
</div>

### Setup Locally

```
cd smoke
```

```
npm install
```

```
npm start
```

### Config

```
{
    "port": "10000",
    "prefix": "/go/",
    "title": "Service",
    "blockedHosts": [],
    "blockedIp": []
}
```

`"port": "8080"` Changes the port 

`"prefix": "/go/"` Changes the prefix for the proxy

`"title": "Service"` Changes the title of websites

`"blockedHosts": [{"url": "https://example.com", "reason": "No Access"}, {"url": "https://example.org"}]` Websites blocked by proxy

`"blockedIp": []` Websites blocked by Ip

Make my EnderKingJ and Nebelung
