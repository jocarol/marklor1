let ppm = 0
let ppmStart = 404.81
let ppmTarget = 444
let difference = 0
let fxPercentCompletion = 0
let pxLimit = 0
let i = 0

const computeFxPercentCompletion = (min, max, curr) => {
  return 100 * (curr - min) / (max - min)
}

const currentPpmToHeight = (fxPercentCompletion) => {
  return (fxPercentCompletion / 100) * img.height
}

const fetchLastPpms = async () => {
  ppm = await fetch('https://global-warming.org/api/co2-api')
    .then(async rawdata => {
      let data = await rawdata.json()

      console.log('fetched last ppm value: ', data.co2[data.co2.length - 1].cycle)
      return Number(data.co2[data.co2.length - 1].cycle)
    })
  // loop()
}

function preload() {
  // img = loadImage('https://upload.wikimedia.org/wikipedia/commons/e/e3/They_did_it%21_%2823692333176%29.jpg');
  // img = loadImage('https://images.axa-contento-118412.eu/www-axa-com/a2157bbb-744b-4cf1-8781-54e687c9a8a8_unclimate1200628.jpg');
  img = loadImage('https://live.staticflickr.com/762/23705940645_71b57e8a56_b.jpg');
}

async function setup() {
  createCanvas(img.width, img.height)
  await fetchLastPpms()
  setInterval(async () => { await fetchLastPpms() }, 86400)
  difference = ppmTarget - ppm
  fxPercentCompletion = computeFxPercentCompletion(ppmStart, ppmTarget, ppm)
  console.log('fxPercentCompletion', fxPercentCompletion)
  pxLimit = currentPpmToHeight(fxPercentCompletion)
  console.log('pxLimit', pxLimit)
  console.log('ppm', ppm)
  console.log('ppmStart', ppmStart)
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

const sortPixels = (pixels) => {
  for (let y = height; y > 1; y--) {
    for (let x = 0; x < width; x++) {
      let i = (x + y * width) * 4;

      if (pixels[i] + pixels[i + 1] + pixels[i + 2] > (pixels[i - width * 4] + pixels[i + 2 - width * 4] + pixels[i + 3 - width * 4])) {
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

function draw() {
  if (pxLimit === 0)
    return
  // if (++i > img.height || i > pxLimit)
  // noLoop()
  sortPixels(pixels)
}
