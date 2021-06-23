const score = document.querySelector('.score');
const game = document.querySelector('.game');
const start = document.querySelector('.start');
const gameArea = document.querySelector('.gameArea');
const car = document.createElement('div');

car.classList.add('car')

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
}

const settings = {
    start: false,
    score: 0,
    speed:3
}

const startGame = ()=>{
    start.classList.add('hide');
    settings.start=true
    gameArea.append(car)
    requestAnimationFrame(playGame)
}

const playGame = ()=>{
    console.log('play game')
    if(settings.start){
        requestAnimationFrame(playGame)
    }
}

const startRun = (e)=>{
    e.preventDefault()
    keys[e.key] = true
}

const stopRun = (e)=>{
    e.preventDefault()
    keys[e.key] = true
}

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);