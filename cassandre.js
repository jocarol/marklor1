let ppm = 0
let ppmStart = 404.81
let ppmTarget = 444
let difference = 0

const percentCompletion = () => {
  return 100 * (ppm - ppmStart) / (ppmTarget - ppmStart)
}

const fetchLastPpms = async () => {
  ppm = await fetch('https://global-warming.org/api/co2-api')
    .then(async rawdata => {
      let data = await rawdata.json()

      console.log('fetched last ppm value: ', data.co2[data.co2.length - 1].cycle)
      return Number(data.co2[data.co2.length - 1].cycle)
    })
}

function preload() {
  img = loadImage('https://upload.wikimedia.org/wikipedia/commons/e/e3/They_did_it%21_%2823692333176%29.jpg');
}

async function setup() {
  createCanvas(img.width, img.height)
  await fetchLastPpms()
  setInterval(async () => { ppm = await fetchLastPpms() }, 86400)
  difference = ppmTarget - ppm
  console.log('ppm', ppm)
  console.log('ppmStart', ppmStart)
  console.log('ppmTarget', ppmTarget)
  console.log('difference', difference)
  console.log('percentCompletion', percentCompletion())
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
  console.log(ppm)
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
