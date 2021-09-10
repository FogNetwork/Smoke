const http = require('http'),https = require('https'),regex = /\s+(href|src)=['"](.*?)['"]/gi,regex2 = /\s*(location.href|location)\s+=\s+['"](.*?)['"]/g

var { prefix, port } = require('../config.json')
if(!prefix.includes("/", 2)) {prefix = prefix.replace("/", "");prefix = "/"+prefix+"/"}

module.exports = class {
  constructor(prefix, config = {}) {
    this.prefix = prefix
    this.config = config
    this.proxyURL = (req) => {return 'https://'+req.url.replace(prefix, '')}
  }
  request(req, res) {
    https.request(req.url.replace, remoteResponse => {console.log(remoteResponse)}).end()
  }
}

/*res.writeHead(remoteResponse.statusCode, remoteResponse.headers)*/

/*module.exports = {
  request: function(code, url) {
    var url_mime = getMimeType(url).replace('application/vnd.lotus-organizer', 'text/html')
    var proxify = {
      url: function(url, host) {
        if (url.match(/^(#|about:|data:|blob:|mailto:|\{|\*)/)) return url
        if (url.startsWith('javascript:')) return 'javascript:'+proxify.js(url);
        if (url.match(/(https:\/\/|http:\/\/|\/\/)/gi)) {
          url = prefix+url.replace('https://', '').replace('http://', '').replace(/^(\/\/)/g, '')
        } else {
          url = prefix+host+'/'+url+'/'
        }
        return url.replace(/[\.]{1-2}\//g, '')
      },
      css: function(code, host) {
        if (!host.includes('/')) {
          host = host + '/'
        }
        code = code.toString().replace(/(url\("|url\(')[a-zA-Z0-9\.]+("\)|'\))/gmi, (match, p1, p2) => {
          var url = match.replace(p1, '').replace(p2, '')
          url = p1 + proxify.url(url, host) + p2
          return url
        })
        console.log(code)
      },
      js: function(code) {
        return code.toString().replace(/location/gi, 'sLocation')
      }
    }
    if (url_mime==='text/html') {
      code = code.toString().replace(/\s*onclick=["'`](.*)["'`]/gi, function(match, p1) {
        return match.replace(match, proxify.js(match))
      })
      code = code.replace(regex, (match, p1, p2)=>{
        let newUrl = 'https://example.com';
        if(p2.indexOf('http') !== -1) {
            newUrl = p2;
        } else if (p2.substr(0,2) === '//') {
            newUrl = 'http:' + p2;
        } else {
            const searchURL = new URL(url);
            newUrl = '//' + searchURL.host + '/' + p2;
        }
        if (p2.match(/^(#|about:|data:|blob:|mailto:|\{|\*)/)) return match.replace(p2, proxify.url(p2));
        return ` ${p1}="${proxify.url(newUrl, host)}"`;
      });
      code += `<script src="${prefix}smoke" data-proxyConfig={"url":"${url}","prefix":"${prefix}"}></script><meta charset="utf-8"/>`
    } else if (url_mime==='application/javascript') {
      code = proxify.js(code)
    }
    return code
  }
    }*/