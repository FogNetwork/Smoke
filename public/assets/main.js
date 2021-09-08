document.querySelector('#initiate').addEventListener('click', () => {
  initiate()
})

document.querySelector('#url-input').addEventListener('keyup', (e) => {
  if (e.keyCode==13 || e.key == "Enter") {
    initiate()
  }
})

const initiate = (url) => {
  var url = document.getElementById("url-input").value;
  if (!url == "") {
    var href = '/go/'+document.getElementById('url-input').value.replace(/(https|http):\/\//, '')
    if (href.includes('/', 2)) {
      href = href+'/'
    }
    location.href = href
  } else {
    urlerror()
  }
}

function urlerror() {
  document.getElementById("error-disc").style.display = "inherit";
}
