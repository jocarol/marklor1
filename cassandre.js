let ppm = 0
let ppmTarget = 444
let difference = 0

const fetchLastPpms = async () => {
  return await fetch('https://global-warming.org/api/co2-api')
    .then(async   rawdata => {
      let data = await rawdata.json()
      
      return Number(data.co2[data.co2.length - 1].cycle)
    })
}

function preload() {
  
  img = loadImage('https://upload.wikimedia.org/wikipedia/commons/e/e3/They_did_it%21_%2823692333176%29.jpg');
}

async function setup() {
  createCanvas(img.width, img.height)
  ppm = await fetchLastPpms()
  difference = ppmTarget - ppm
  console.log('ppm', ppm)
  console.log('ppmTarget', ppmTarget)
  console.log('difference', difference)
  img.loadPixels();
  loadPixels();
  for (let y = 1; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let i = (x + y * width) * 4;

      pixels[i + 0] = img.pixels[i + 0];
      pixels[i + 1] = img.pixels[i + 1];
      pixels[i + 2] = img.pixels[i + 2];
      pixels[i + 3] = 255;
    }
  }
  updatePixels();
}

function draw() {
  var myHeaders = new Headers();

  var myInit = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default'
  };

  for (let y = height; y > 1; y--) {
    for (let x = 0; x < width; x++) {
      let i = (x + y * width) * 4;

      if (pixels[i] + pixels[i + 1] + pixels[i + 2] > (pixels[i - width * 4] + pixels[i + 1 - width * 4] + pixels[i + 2 - width * 4])) {
        let temp = [pixels[i], pixels[i + 1], pixels[i + 2], pixels[i + 3]]

        pixels[i] = pixels[i - width * 4]
        pixels[i + 1] = pixels[i + 1 - width * 4]
        pixels[i + 2] = pixels[i + 2 - width * 4]
        pixels[i + 3] = pixels[i + 3 - width * 4]
        pixels[i - width * 4] = temp[0]
        pixels[i + 1 - width * 4] = temp[1]
        pixels[i + 2 - width * 4] = temp[2]
        pixels[i + 3 - width * 4] = temp[3]
      }
    }
  }
  updatePixels();

}
