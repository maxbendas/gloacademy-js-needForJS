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
    speed: 3,
    traffic: 3
}

const moveRoad = () => {
    let lines = document.querySelectorAll('.line')
    lines.forEach((line) => {
        line.y += settings.speed
        line.style.top = line.y + 'px'

        if (line.y >= document.documentElement.clientHeight) {
            line.y = -100
        }
    })
}

const moveEnemy = () => {
    let enemy = document.querySelectorAll('.enemy')
    enemy.forEach((item) => {
        let carRect = car.getBoundingClientRect()
        let enemyRect = item.getBoundingClientRect()

        if (carRect.top <= enemyRect.bottom &&
            carRect.right >= enemyRect.left &&
            carRect.left <= enemyRect.right &&
            carRect.bottom >= enemyRect.top) {
            settings.start = false
            console.warn('DTP')
            start.classList.remove('hide')
            start.style.top = score.offsetHeight + 'px'
        }

        item.y += settings.speed / 2
        item.style.top = item.y + 'px'

        if (item.y >= document.documentElement.clientHeight) {
            item.y = -100 * settings.traffic
            item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px'
        }
    })
}

const playGame = () => {

    if (settings.start) {
        settings.score += settings.speed
        score.textContent = 'SCORE: ' + settings.score
        moveEnemy()
        moveRoad()
        if (keys.ArrowLeft && settings.x > 0) {
            settings.x -= settings.speed
        }
        if (keys.ArrowRight && settings.x < (gameArea.offsetWidth - car.offsetWidth)) {
            settings.x += settings.speed
        }
        if (keys.ArrowUp && settings.y > 0) {
            settings.y -= settings.speed
        }
        if (keys.ArrowDown && settings.y < (gameArea.offsetHeight - car.offsetHeight)) {
            settings.y += settings.speed
        }

        car.style.left = settings.x + 'px'
        car.style.top = settings.y + 'px'
        requestAnimationFrame(playGame)
    }
}

const getQuantityElements = (heightElement) => {
    return document.documentElement.clientHeight / heightElement + 1
}

const startGame = () => {
    start.classList.add('hide');
    gameArea.innerHTML = ''

    for (let i = 0; i < getQuantityElements(100); i++) {
        const line = document.createElement('div')
        line.classList.add('line')
        line.style.top = (i * 100) + 'px'
        line.y = i * 100
        gameArea.append(line)
    }

    for (let i = 0; i < getQuantityElements(100 * settings.traffic); i++) {
        const enemy = document.createElement('div')
        enemy.classList.add('enemy')
        enemy.y = -100 * settings.traffic * (i + 1)
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px'
        enemy.style.top = enemy.y + 'px'
        enemy.style.background = 'transparent url(\'./image/enemy.png\') center / cover no-repeat'
        gameArea.append(enemy)
    }

    settings.score = 0
    settings.start = true
    gameArea.appendChild(car)
    car.style.left = (gameArea.offsetWidth/2-car.offsetWidth/2)+'px'
    car.style.top = 'auto'
    car.style.bottom = '10px'
    settings.x = car.offsetLeft
    settings.y = car.offsetTop
    requestAnimationFrame(playGame)
}

const startRun = (e) => {
    e.preventDefault()
    keys[e.key] = true
}

const stopRun = (e) => {
    e.preventDefault()
    keys[e.key] = false
}

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);