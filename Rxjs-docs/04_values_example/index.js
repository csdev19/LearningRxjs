const RADIUS = 2;
const MIN = 0;

let count = 0;
const rate = 1000;
let lastClick = Date.now() - rate;
let canvasJs = document.getElementById('canvasJs')
canvasJs.addEventListener('click', event => {
  if (Date.now() - lastClick >= rate) {
    // count += event.clientX;
    lastClick = Date.now();
  }
});


let canvasRx = document.getElementById('canvasRx') 
Rx.Observable.fromEvent(canvasRx, 'click')
  // .throttleTime(1000)
  .map(event => {
    return event
  })
  // .scan((count, clientX) => count + clientX, 0)
  .subscribe(values => {
    let canv = document.getElementById('canvasRx');
    let canvG = canv.getBoundingClientRect()
    console.log("TCL: canvG", canvG)
    console.log('values', values)
  });

var cRx = document.getElementById("canvasRx");
var ctx = cRx.getContext("2d");
var cJs = document.getElementById("canvasJs");
var ctx2 = cJs.getContext("2d");

function drawCircle(key){
  console.log("TCL: drawCircle -> key", key)
  //Define Variables
  let point_size = 4;
  let {center_x, center_y} = getRandomPosition(key);
  drawOnCanvas(center_x, center_y, key);
}

function drawOnCanvas(center_x, center_y, key) {
  // center_x = 1;
  // center_x = 301;
  // center_y = 150;/
  // 291 458
  console.log("TCL: drawOnCanvas -> center_x, center_y", center_x, center_y)
  if(key == 'canvasRx') {
    ctx.beginPath();
    ctx.arc(center_x, center_y, RADIUS, 0, 2 * Math.PI);
    ctx.stroke();
  } else {
    ctx2.beginPath();
    ctx2.arc(center_x, center_y, RADIUS, 0, 2 * Math.PI);
    ctx2.stroke();
  }
}

function getRandomPosition(key) {
  // let widthCanvas = document.getElementById(key).offsetWidth;
  let widthCanvas = 300;
  let heightCanvas = 150;
  // let heightCanvas = document.getElementById(key).offsetHeight;
  return {
    center_x: getRandomNumberByMax(widthCanvas),
    center_y: getRandomNumberByMax(heightCanvas)
  }
}



function getRandomNumberByMax(max) {
  return Math.round(Math.random() * (max - MIN) + MIN);
}

const numbers = Rx.Observable.interval(2000);
const takeFourNumbers = numbers.take(2);
takeFourNumbers.subscribe(x => {
  drawCircle('canvasRx');
  drawCircle('canvasJs');
});
