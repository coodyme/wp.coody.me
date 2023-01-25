const SIZE = 5
const W = 1920
const H = 1080
const PRIMARY_COLOR = [38, 35, 53]
const SECONDARY_COLOR = [0, 252, 250]
const COLORS = [
  [0, 200, 199],
  [0, 150, 150],
  [0, 103, 105],
  [0, 58, 62],
]
const SCALE = 1

const MAIN_COLORS = Array(SCALE).fill(SECONDARY_COLOR).concat(COLORS)

function setup() {
  createCanvas(W, H);
  noLoop()
}

function draw() {
  let currentColor = color(...PRIMARY_COLOR)
  background(currentColor)
  
  const w = floor(width / SIZE)
  const h = floor(height / SIZE)


  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      let x = i * SIZE
      let y = j * SIZE
      
      noStroke()

      if (i % 2 == 0 && j % 2 == 0) {
       
        let alphaMain = randomGaussian(j * j / 10000, j)
        let mainColorIndex = floor([random(0, MAIN_COLORS.length)])
        let currentMainColor = MAIN_COLORS[mainColorIndex]
        currentColor = color(...currentMainColor, alphaMain)

        if (i == floor(random(w)) || j == floor(random(h))) {
          let alpha = floor(random(0, 255))
          currentColor = color(...SECONDARY_COLOR, alpha)
        }
         
      } else {
        currentColor = color(...PRIMARY_COLOR)
      }
      
      fill(currentColor)
      rect(x, y, SIZE, SIZE)
    }
  }

  //saveCanvas('myCanvas', 'jpg');

}
