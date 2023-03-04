
import { p5i } from 'p5i'

const SIZE = 5
const W = 1920
const H = 1080
const PRIMARY_COLOR = [0, 0, 0] // Background 
const SECONDARY_COLOR = hexToRgb('#00DFD8') // Primary
const COLORS = [ // Shades
  hexToRgb('#00B2AC'),
  hexToRgb('#008681'),
  hexToRgb('#005C5A'),
  hexToRgb('#003535'),
]
const SCALE = 5

const MAIN_COLORS = Array(SCALE).fill(SECONDARY_COLOR).concat(COLORS)

const {
  mount,
  noLoop,
  saveCanvas,
  createCanvas,
  redraw,
  color,
  background,
  floor,
  noStroke,
  randomGaussian,
  random,
  fill,
  rect
} = p5i()

const downloadButton = document.getElementById('generate')
const generateButton = document.getElementById('generate')

downloadButton.onclick = () => {
  saveCanvas('coody-wallpaper', 'png')
}

generateButton.onclick = () => {
  if (generateButton.className.includes(' animate-wiggle')) {
    generateButton.className = generateButton.className.replace(' animate-wiggle', '')
  } else {
    generateButton.className = generateButton.className + ' animate-wiggle'
  }
  redraw()
}

function hexToRgb(hex) {
  hex = hex.replace('#', '');

  var bigint = parseInt(hex, 16);

  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;

  return [r, g, b];
}

function setup() {
  let canvas = createCanvas(W, H);
  canvas.position(0, 0)
  canvas.style('z-index', '-3')

  noLoop()
}

function draw({
  width,
  height,
}) {
  let currentColor = color(...PRIMARY_COLOR)
  background(currentColor)

  const w = floor(width / SIZE)
  const h = floor(height / SIZE)


  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      let x = i * SIZE
      let y = j * SIZE

      noStroke()

      if (i % 3 == 0 && j % 3 == 0) {

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

  document.body.style.backgroundColor = 'transparent'
}

mount(document.getElementById('sketch'), { setup, draw })