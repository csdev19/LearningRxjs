

// como hacer un conteo de eventos con js 
// usamos funciones impuras que pueden ocasionar errores
let count = 0;
let cuadritoJs = document.getElementById('cuadritoJs')
cuadritoJs.addEventListener('click', () => {
    console.log(`Js Clicked ${++count} times`)
    let key = '--w-js'
    changeWithByKey(key, count)
});


// con rxjs podemos acceder a una variables temporal que
// acumule los valores clickeados
let cuadritoRx = document.getElementById('cuadritoRx') 
Rx.Observable.fromEvent(cuadritoRx, 'click')
  .scan(count => count + 1, 0)
  .subscribe(count => {
      console.log(`rx Clicked ${count} times`)
      let key = '--w-rx'
      changeWithByKey(key, count)
  });

function changeWithByKey(key, count) {
    var root = document.querySelector(':root');
    let prop = `${count * 20}px`;
    root.style.setProperty(key, prop)
}

