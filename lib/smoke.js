config = JSON.parse(document.currentScript.dataset.proxyconfig)
console.log(config)
config.url = new URL(config.url)
const prefix = config.prefix

var proxify = {
  url: function(url, host) {
    if (url.startsWith('javascript:')) return 'javascript:'+proxify.js(url);
    if (url.match(/(https:\/\/|http:\/\/|\/\/)/gi)) {
      url = prefix+url.replace('https://', '').replace('http://', '').replace(/^(\/\/)/g, '')
    } else {
      url = prefix+config.url.host+'/'+url+'/'
    }
    return url//.replace(/[\.]+\//g, '')
  }
}

window.sLocation = new Proxy({}, {
  set(obj, prop, value) {

      if (prop == 'assign' || prop == 'reload' || prop == 'replace' || prop == 'toString') return;

      console.log(proxify.url(config.url.href.replace(config.url[prop], value)));

      console.log((config.url.href.replace(config.url[prop], value)));


      return location[prop] = proxify.url(config.url.href.replace(config.url[prop], value));
  },
  get(obj, prop) {
      // Had to be done in order to fix Discord.
      if (config.url.origin == atob('aHR0cHM6Ly9kaXNjb3JkLmNvbQ==') && config.url.pathname == '/app') return window.location[prop];

      if (prop == 'assign' || prop == 'reload' || prop == 'replace' || prop == 'toString') return {
          assign: arg => window.location.assign(proxify.url(arg)),
          replace: arg => window.location.replace(proxify.url(arg)),
          reload: () => window.location.reload(),
          toString: () => { return config.url.href }
      }[prop];
      else return config.url[prop];
  }    
})

sLocation = window.sLocation

document.sLocation = window.sLocation