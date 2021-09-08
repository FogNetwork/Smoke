const axios = require('axios')
const http = require('http')
const https = require('https')
const mime = require('mime')
const fs = require('fs')
var proxify = require('./lib/proxy')
btoa = str => new Buffer.from(str).toString('base64'),
atob = str => new Buffer.from(str, 'base64').toString('utf-8')
var { prefix, port, blockedHosts } = require('./config.json')
if(!prefix.includes("/", 2)) {prefix = prefix.replace("/", "");prefix = "/"+prefix+"/"}
function getMimeType(url) {
    if(url.indexOf('?') !== -1) {
        url = url.split("?")[0];
    }
    return mime.getType(url) || 'text/html';
};

app = (req, res) => {
  if (req.url.startsWith('/service')) {
    var queryRegex = /\/service(\/*)\?url=(.*)/gi
    req.query = req.url.replace(queryRegex, function(match, p1, p2) {
      return p2
    })

    res.writeHead(302, { 'Location': prefix + req.query }); res.end()
  }
  else if (req.url.replace(prefix, '')==='smoke') {
    res.writeHead(200, {'content-type': 'application/javascript'})
    res.end(fs.readFileSync('./lib/smoke.js'))
  } else if (req.url.startsWith(prefix)) {
    var url = 'https://'+req.url.replace(prefix, '')
    var urlSlice = new URL(url)
    blockedHosts.map((data) => {
      if (new URL(data.url).host == urlSlice.host) {
        res.writeHead(200, {'content-type': 'text/html'})
        res.end(fs.readFileSync('./lib/err.html', 'utf-8').replace('err_reason', 'Hostname '+data.url+' Blocked: '+(data.reason ? data.reason : 'Hostname on Blocklist. Please ask the Proxy Maintainer for Details')))
        return
      }
    })
    if (!url.replace('https://', '').split('/').length > 2) {
      url = url.slice(0, -1);
    }
    var mime_type = getMimeType(url).replace('application/vnd.lotus-organizer', 'text/html')
    axios.get(url, { responseType: 'arraybuffer'  })
        .then(({ data }) => {
            data = proxify.request(data, url)
            res.writeHead(200, {'content-type': mime_type});
            res.end(data);
        }).catch(error => {
          res.writeHead(200, {'content-type': 'text/html'}).end(fs.readFileSync('./lib/err.html', 'utf-8').replace('err_reason', 'Error: "'+error+'"'))
        })
  } else if (req.url==='/') {
    res.writeHead(200, {'content-type': 'text/html'}).end(fs.readFileSync('./public/index.html'))
  } else {
    var path = './public' + req.url
    if (!fs.existsSync(path)) {
      res.end(fs.readFileSync('./lib/err.html', 'utf-8').replace('err_reason', 'File Not Found, "'+path.replace(/^\.\/public\//gm, '')+'"'))
      return
    }
    res.writeHead(200, {'content-type': getMimeType(req.url)}).end(fs.readFileSync(path, () => {}))
  }
}

http.createServer(app).listen((process.env.PORT || port), () => {console.log('https://localhost:'+(process.env.PORT || port))});