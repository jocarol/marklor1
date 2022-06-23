function preload(){
  img = loadImage('https://upload.wikimedia.org/wikipedia/commons/e/e3/They_did_it%21_%2823692333176%29.jpg');
}

function setup(){
  createCanvas(img.width, img.height);
  
  img.loadPixels();
  loadPixels();
  for (let y = 1; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let i = (x + y * width)*4;
      pixels[i+0] = img.pixels[i+0];
      pixels[i+1] = img.pixels[i+1];
      pixels[i+2] = img.pixels[i+2];
      pixels[i+3] = 255;
    }
  }
  updatePixels();
}

function draw(){
  for (let y = 1; y < height-1; y++) {
    for (let x = 0; x < width; x++) {
      let i = (x + y * width)*4;
      
      if(pixels[i] + pixels[i+1] + pixels[i+2] > (pixels[i - width*4]+ pixels[i+1 - width*4]+ pixels[i+2 - width*4])){
        let temp = [pixels[i], pixels[i+1], pixels[i+2], pixels[i+3]]

        pixels[i] = pixels[i - width*4]
        pixels[i+1] = pixels[i+1 - width*4]
        pixels[i+2] = pixels[i+2 - width*4]
        pixels[i+3] = pixels[i+3 - width*4]
        pixels[i - width*4] = temp[0]
        pixels[i+1 - width*4] = temp[1]
        pixels[i+2 - width*4] = temp[2]
        pixels[i+3 - width*4] = temp[3] 
      }
      
      /*
       if(pixels[i] + pixels[i+1] + pixels[i+2]*map(mouseY, 0, height, 1, 5) < (pixels[i + width*4]+ pixels[i+1 + width*4]+ pixels[i+2 + width*4])){
        let temp = [pixels[i], pixels[i+1], pixels[i+2], pixels[i+3]]
        pixels[i] = pixels[i + width*4]
        pixels[i+1] = pixels[i+1 + width*4]
        pixels[i+2] = pixels[i+2 + width*4]
        pixels[i+3] = pixels[i+3 + width*4];
        pixels[i + width*4] = temp[0];
        pixels[i+1 + width*4] = temp[1];
        pixels[i+2 + width*4] = temp[2];
        pixels[i+3 + width*4] = temp[3];
        
      }
      */
    }
  }
  updatePixels();
}

// function mouseClicked(){
  
//   img.loadPixels();
//   loadPixels();
//   for (let y = 1; y < height; y++) {
//     for (let x = 0; x < width; x++) {
//       let i = (x + y * width)*4;
//       pixels[i+0] = img.pixels[i+0];
//       pixels[i+1] = img.pixels[i+1];
//       pixels[i+2] = img.pixels[i+2];
//       pixels[i+3] = 255;
//     }
//   }
//   updatePixels();
// }

// draw()
