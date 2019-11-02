let count = 0;
const RATE = 3000;
let lastClick = Date.now() - RATE;
const COLOR_DISABLED = '#484848';

let buttonJs = document.getElementById('cuadritoJs');
buttonJs.addEventListener('click', () => {
  if (Date.now() - lastClick >= RATE) {
    let key = {
      id_timer  : 'timerJs',
      key_color : '--color-js',
      color     : '#ffff00',
      letter    : ''
    };
    let color = '#ffff00';
    disableAnimation(key, color);
    lastClick = Date.now();
  }
});


// importamos lo necesario de RXJS

let buttonRx = document.getElementById('cuadritoRx');
Rx.Observable.fromEvent(buttonRx, 'click')
  .throttleTime(RATE)
  .scan(count => count + 1, 0)
  .subscribe(count => {
        let key = {
          id_timer  : 'timerRx',
          key_color : '--color-rx',
          key_letter: '',
          color     : '#c2185b' 
        };
        // let color = '#c2185b';
        disableAnimation(key);
    });


function disableAnimation(key) {
  setColorToDiv(key.key_color, COLOR_DISABLED);
  setTimerByKey(key.id_timer, 0);
  startTimer(key);
}

function startTimer(key) {
  const numbers = Rx.Observable.interval(1000);
  const takeFourNumbers = numbers.take(RATE / 1000);
  takeFourNumbers
    .subscribe(x => {
      setTimerByKey(key.id_timer, x + 1);
      setTimeout(() => {
        if(RATE/1000 == (x + 1)) {
          setColorToDiv(key.key_color, key.color);
          setTimerByKey(key.id_timer, null);
        }
      }, 100);
    })
}

function setTimerByKey(key, value) {
  let msj = getMsjByValue(value);
  let timer = document.getElementById(key);
  timer.innerHTML = msj;
}

function getMsjByValue(value) {
  if(value == null) return null;
  let segs = (RATE / 1000) - value;
  const header = `El boton se habilitara en ${segs} ${segs > 1 ? 
      'segundos' : 'segundo'}`;
  return header;
}

function setColorToDiv(key,value) {
  var root = document.querySelector(':root');
  root.style.setProperty(key, value)
}



