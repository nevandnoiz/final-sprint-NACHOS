export default {
  domColor
}
async function domColor(imgUrl) {
  let hex = await getDomColor(imgUrl)
  return hex;
}


async function getDomColor(imgUrl) {
  var element = document.createElement('div');
  // element.className = 'row';
  element.innerHTML =`<div class="cell image"><img crossorigin="anonymous" src="${imgUrl}"/></div>`

  var img = element.querySelector('img');
  
  var hexPrm = new Promise((resolve, rej) => {
    img.onload = async function () {
      var rgb = await getAverageColor(img);
      var hexStr = '#' + ('0' + rgb.r.toString(16)).slice(-2) + ('0' + rgb.g.toString(16)).slice(-2) + ('0' + rgb.b.toString(16)).slice(-2);
      resolve(hexStr)
    };
  })
  return hexPrm
}

function getAverageColor(img) {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var width = canvas.width = img.naturalWidth;
  var height = canvas.height = img.naturalHeight;

  ctx.drawImage(img, 0, 0);

  var imageData = ctx.getImageData(0, 0, width, height);
  var data = imageData.data;
  var r = 0;
  var g = 0;
  var b = 0;

  for (var i = 0, l = data.length; i < l; i += 4) {
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
  }

  r = Math.floor(r / (data.length / 4));
  g = Math.floor(g / (data.length / 4));
  b = Math.floor(b / (data.length / 4));

  return { r: r, g: g, b: b };
}