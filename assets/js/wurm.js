/*******************
 * Event Listeners *
 *******************
 */

const is_mobile = () => { return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent); }
console.log(is_mobile());
let ultra = document.querySelector('#ultra')
ultra.addEventListener('mousedown', ultra_feedback)
ultra.addEventListener('mouseup', feedback)

let eyebleeding = document.querySelector('#eyebleeding')
eyebleeding.addEventListener('mousedown', eyebleeding_feedback)
eyebleeding.addEventListener('mouseup', feedback)

if (is_mobile) {
  ultra.addEventListener('touchstart', ultra_feedback)
  ultra.addEventListener('touchend', feedback)
  eyebleeding.addEventListener('touchstart', eyebleeding_feedback)
  eyebleeding.addEventListener('touchend', feedback)
}

const artists = document.querySelectorAll('.artist')
for (let i = 0; i < artists.length; i++) {
  const artist = artists[i];
  artist.addEventListener('mouseover', ultra_feedback)
  artist.addEventListener('mouseout', feedback)
}

const about_btn = document.querySelector('#about-btn')
const about = document.querySelector('.about')
const main = document.querySelector('main')
let about_shown = false
about_btn.addEventListener('click', () => {
  if (!about_shown) {
    about.style.opacity = 1
    about.style.visibility = 'visible'
  } else {
    about.style.opacity = 0
    about.style.visibility = 'hidden'
  }
  about_shown = !about_shown
})
main.addEventListener('click', () => {
  about_shown = false
  about.style.opacity = 0
  about.style.visibility = 'hidden'
})


const titles = document.querySelectorAll('.evheader')
const hidden_divs = document.querySelectorAll('.hidden')
console.log(hidden_divs);
for (let i = 0; i < titles.length; i++) {
  const title = titles[i];
  const hidden = title.parentNode.querySelector('.hidden')
  const id = hidden.childElementCount
  // console.log(title);
  // console.log(hidden);
  title.onclick = (e) => {
    e.preventDefault()
    console.log(hidden.dataset.hidden);
    for (let i = 0; i < hidden_divs.length; i++) {
      const element = hidden_divs[i];
      const is_hidden = element.dataset.hidden
      const index = element.childElementCount
      if (is_hidden === 'false') {
        element.classList.remove('visible')
        element.classList.add('hidden')
        if(id !== index)element.dataset.hidden = 'true'
      }
    }
    const is_hidden = hidden.dataset.hidden
    if (is_hidden === 'true') {
      hidden.classList.remove('hidden')
      hidden.classList.add('visible')
      hidden.dataset.hidden = 'false'
      title.scrollIntoView()
    } else {
      console.log('close');
      hidden.classList.remove('visible')
      hidden.classList.add('hidden')
      hidden.dataset.hidden = 'true'
    }
  }


}


/**************
 * ANIMATIONS *
 **************/

// let s0
let hc = document.querySelector('#hydra')
let p5
hc.width = window.innerWidth
hc.height = window.innerHeight
let hydra = new Hydra({ detectAudio: false, canvas: hc })
let pg // store hydra texture

// window.onmousemove = (e) => {
//   mx = e.clientX
//   my = e.clientY
// }

let img;
let originalWidth, originalHeight;

function preload() {
  img = loadImage('assets/img/wurm_vector.png');
}

function setup() {
  p5 = createCanvas(windowWidth, windowHeight)
  p5.parent('#p5')
  s0.init({ src: drawingContext.canvas })
  // pass p5 canvas to hydra as s0 source
  feedback()
  pg = createGraphics(hc.width, hc.height)
  background(255)

  originalWidth = img.width;
  originalHeight = img.height;
  // get_size();
  rectMode(CENTER)
  textAlign(CENTER, CENTER)
  textSize(24)
}


let offset_x = 0
let offset_y = 0
let val = 20
// let mx, my
function draw() {
  pg.drawingContext.drawImage(hc, 0, 0, pg.width, pg.height) // update texture
  // clear()
  // if (frameCount % 100 < val) {
  //   fill(255, 200)
  //   noStroke()
  //   rect(width * .5, height * .5, width, height * 0.75)
  //   // background(255)
  //   // img.filter(INVERT)
  //   // offset_x = random(20)
  //   // offset_y = random(20)
  //   val = floor(random(1, 21))
  // }
  const w = get_size().w * 0.5
  const h = get_size().h * 0.5

  const x = ((width * 0.5) - w) + offset_x
  const y = ((height * 0.35) - h) + offset_y
  // const pos_x = x + (30 * sin(frameCount * 0.1))
  // const pos_y = y + (30 * cos(frameCount * 0.1))
  const pos_x = x
  const pos_y = y
  push()
  translate(pos_x, pos_y)
  image(img, 0, 0, get_size().w, get_size().h);
  pop()
  push()
  translate(mouseX, mouseY)
  text('🪱', 0, 0)
  pop()
  // console.log(frameRate);
  // if(frameCount % 60 > 50){
  //   ultra_feedback()
  // }else{
  //   feedback()
  // }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function get_size() {
  let w = 0
  let h = 0
  let aspectRatio = originalWidth / originalHeight;

  if (width / height > aspectRatio) {
    w = width
    h = width / aspectRatio
  } else {
    w = height * aspectRatio
    h = height
  }
  return { w, h }
}

function ultra_feedback(e) {
  // console.log(e);
  if (e !== undefined) e.preventDefault();
  clear()
  src(o0)
    .layer(src(s0))
    // .thresh(()=> 0.45 + abs(sin(frameCount * .05) * 0.25))
    // .invert(() => frameCount % 100 < 5 ? 1 : 0)
    // .thresh(0.65)
    // .posterize(0.4)
    .scale(.99)
    // .modulateScale(src(s0).pixelate(15, 10), .5)
    // .scrollY(-1.003)
    .scrollY(() => frameCount % 1000 < 500 ? -1.003 : 1.003)
    // .rotate(() => {
    //   let result = 0
    //   if (frameCount % 100 < 50) { result = sin(frameCount * .001) * .01 }
    //   return result
    // })
    .rotate(0.001)
    .modulateScale(osc(50, .01), .02)
    .out()
}

function eyebleeding_feedback(e) {
  // console.log(e);
  if (e !== undefined)e.preventDefault();
  clear()
  src(o0)
    .layer(src(s0))
    // .thresh(()=> 0.45 + abs(sin(frameCount * .05) * 0.25))
    // .invert(() => frameCount % 100 < 5 ? 1 : 0)
    .invert(() => frameCount % 100 < 75 ? 1 : 0)
    // .thresh(0.65)
    // .posterize(0.4)
    .scale(.99)
    // .modulateScale(src(s0).pixelate(15, 10), .5)
    // .scrollY(-1.003)
    .scrollY(() => frameCount % 1000 < 500 ? -1.003 : 1.003)
    // .rotate(() => {
    //   let result = 0
    //   if (frameCount % 100 < 50) { result = sin(frameCount * .001) * .01 }
    //   return result
    // })
    .rotate(0.001)
    .modulateScale(osc(50, .01), .02)
    .out()
}

let done_once = false
let currentFrame
function feedback() {
  // background(255)
  if (!done_once) {
    const hydra_img = hc.toDataURL()
    // console.log(hydra_img);
    loadImage(hydra_img, img => {
      console.log('image loaded');
      image(img, 0, 0, width, height)
    });

    // currentFrame = get();
    // background(currentFrame);
    done_once = true
  }
  src(o0)
    .layer(src(s0))
    // .thresh(0.65)
    // .scale(.996)
    .out()
}

function remove_program() {
  document.querySelector('.main').style.visibility = 'hidden'
}
function show_program() {
  document.querySelector('.main').style.visibility = 'visible'
}


const keyState = {};
let started_audio = false
document.addEventListener('keydown', (event) => {
  keyState[event.key] = true;
  if (keyState['w'] && keyState['u'] && keyState['r'] && keyState['m']) {
    console.log(`%c⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕
⎕⎕ ñøi$æ µø∂æ ⎕⎕
⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕⎕`, `
    background: black;
    color: white;
    padding: 0.125rem;
  `);
    remove_program()
    if (!started_audio) {
      start_audio()
      started_audio = true
    } else {
      console.log('audio started once already');
      Tone.Master.volume.rampTo(-1, 1)
    }
  }

  if(event.key === 'x'){
    eyebleeding_feedback()
  }
  if(event.key === 'u'){
    ultra_feedback()
  }
  // if(event.key === 'f'){
  //   drone.lpf.frequency.rampTo(500, 0.5)
  // }
});

async function start_audio() {
  await Tone.start();
  init()
}

document.addEventListener('keyup', (event) => {
  keyState[event.key] = false;
  feedback()
});

document.addEventListener('keypress', (event) => {
  if (event.key === 'q') {
    console.log('quit');
    Tone.Master.volume.rampTo(-Infinity, 1)
    show_program()
  }
})


// TONE.JS

// document.querySelector('.start').addEventListener('click', async () => {
//   await Tone.start()
//   console.log('audio is ready')
//   init()
// })

let looping
let drone
function init() {
  drone = null
  Tone.Transport.start();
  Tone.Master.volume.value = -Infinity;
  Tone.Master.volume.rampTo(-1, 1)
  drone = new Drone;
  drone.init()
  drone.play()
  init_mouse();
  looping = new Tone.Loop(function (time) {
    drone.play()
  }, "1n").start("+0.50");
}

function init_mouse() {
  window.onmousemove = (e) => {
    const x = map(e.clientX, 0, innerWidth, 1.0, 10.0);
    const x2 = map(e.clientX, 0, innerWidth, 0.0001, 1.0);
    const y = map(e.clientY, innerHeight, 1.0, 1.0, 50.0);
    const y2 = map(e.clientY, innerHeight, 1.0, 40, 400);
    drone.synth.harmonicity.value = x
    drone.delay.delayTime.value = x2
    drone.synth.modulationIndex.value = y
    drone.synth.frequency.value = y2
  };
}

class Drone {
  constructor() {
    this.synth = new Tone.FMSynth({
      "harmonicity": 1.11,
      "modulationIndex": 5,
      "detune": 0,
      "oscillator": {
        "type": "sine"
      },
      "modulation": {
        "type": "sine"
      },
      "modulationEnvelope": {
        "attack": 0.05,
        "decay": 0,
        "sustain": 1.0,
        "release": 0.2,
      }
    });
    this.noise = new Tone.Noise("pink");
    this.limiter = new Tone.Limiter(-6);
    this.eq = new Tone.EQ3(-10, -20, -1);
    this.lpf = new Tone.Filter(19500, 'lowpass');
    this.dist = new Tone.Distortion(0.9);
    this.vibrato = new Tone.Vibrato(1, 0.1);
    this.delay = new Tone.FeedbackDelay("4n", 0.7);
    this.reverb = new Tone.Freeverb(0.1, 500);
    this.vol = new Tone.Volume(0).toMaster();

  }
  init() {
    this.synth.chain(this.eq,this.lpf, this.vibrato, this.delay, this.reverb, this.dist, this.limiter, this.vol);
  }
  play() {
    this.synth.triggerAttack("C1");
  }
}


