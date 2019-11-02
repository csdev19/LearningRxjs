

let cuadritoJs = document.getElementById('cuadritoJs')

cuadritoJs.addEventListener('click', () => {
    console.log('Clicked by js!')
});
    
let cuadritoRx = document.getElementById('cuadritoRx') 
Rx.Observable.fromEvent(cuadritoRx, 'click').subscribe(() => {
    console.log('Clicked by rxjs!')
});
