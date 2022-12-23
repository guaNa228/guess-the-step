// import { Footprint } from "./classes.js";
// import { arrayToMatrix, getRing, createRottingMatrix } from './utils.js';
import { Footprint, Game } from './classes.js'
import { patterns } from './patterns.js';
import { nickname, setNickname, bestPlayers, allowedPatterns, removeAllowedPattern, addAllowedPattern } from './settings.js';

let g;

let resetButtons = document.querySelectorAll('.resetButton');
let ratingButtons = document.querySelectorAll('.ratingButton');
let settingsButtons = document.querySelectorAll('.settingsButton');
let nicknameInputs = document.querySelectorAll('input[type="text"]');
let menu = document.querySelector('#menu');

let closeSettingsWindowButton = document.querySelector('.closeSettingsButton');
let endgameScreen = document.querySelector('.endgameScreen');
let ratingWindow = document.querySelector('.rating');
let settingsWindow = document.querySelector('.settings');
let list = document.querySelector('.rating .list');

let generalSelectButton = document.querySelector('.generalSelectButton');
let dragSelectButton = document.querySelector('.dragSelectButton');

let bannedContainer = document.querySelector('.banned');
let alllowedContainer = document.querySelector('.allowed');

generalSelectButton.addEventListener('click', function () {
    this.classList.add('chosen');
    this.nextElementSibling.classList.remove('chosen');
    settingsWindow.classList.remove('drag');
});

dragSelectButton.addEventListener('click', function () {
    this.classList.add('chosen');
    this.previousElementSibling.classList.remove('chosen');
    settingsWindow.classList.add('drag');
});

ratingWindow.addEventListener('click', function (e) {
    e.stopPropagation();
    if (e.target == ratingWindow) {
        this.classList.remove('active');
        endgameScreen.classList.add('active');
    }
})

nicknameInputs.forEach((input) => {
    input.addEventListener('input', (event) => {
        setNickname(event.target.value);
    });
});



resetButtons.forEach((button) => {
    button.addEventListener('click', resetGame);
});

ratingButtons.forEach((button) => {
    button.addEventListener('click', showRating);
});

settingsButtons.forEach((button) => {
    button.addEventListener('click', () => {
        settingsWindow.classList.add('active')
    });
});

closeSettingsWindowButton.addEventListener('click', () => {
    settingsWindow.classList.remove('active');
});

function resetGame() {
    menu.classList.remove('active');
    setTimeout(() => {
        menu.outerHTML = '';
    }, 2000)
    g = new Game();
    g.drawRound();
}

function showRating() {
    nicknameInputs.forEach((input) => {
        input.value = nickname;
    });

    endgameScreen.classList.remove('active');
    ratingWindow.classList.add('active');

    let bestPlayersHTML = '';
    bestPlayers.forEach((record, index) => {
        bestPlayersHTML += `<p>${index + 1}. ${record.nick} - ${record.score}</p>`
    });

    list.innerHTML = bestPlayersHTML ? bestPlayersHTML : 'Список лучших игроков пока пуст :(';
}


function drawPatterns() {
    let drawnPatterns = [];
    let drawnPatternsElements = [];
    
    for (let i = 0; i < patterns.length; i++) {
        drawnPatterns.push(new Footprint(patterns[i]));
        if (allowedPatterns.includes(i)) {
            drawnPatterns[i].draw(alllowedContainer);
            drawnPatternsElements.push(drawnPatterns[i].elements[0]);
            drawnPatternsElements[i].classList.add('allowedPattern');
        } else {
            drawnPatterns[i].draw(bannedContainer);
            drawnPatternsElements.push(drawnPatterns[i].elements[0]);
            drawnPatternsElements[i].classList.add('bannedPattern');
        }
        drawnPatternsElements[i].id = i;
        drawnPatterns[i].disableEffects();
    }
    
    drawnPatternsElements.forEach((element) => {
        element.ondragstart = function() {
            return false;
        };
        element.onmousedown = function (e) {
    
            element.style.width = element.getBoundingClientRect().width+'px';
            element.style.height = element.getBoundingClientRect().height+'px';
            element.style.position = 'absolute';
            moveAt(e);
    
            document.body.appendChild(element);
    
            element.style.zIndex = 1000;
    
            function moveAt(e) {
                element.style.left = e.pageX - element.offsetWidth / 2 + 'px';
                element.style.top = e.pageY - element.offsetHeight / 2 + 'px';
            }
    
            document.onmousemove = function (e) {
                moveAt(e);
            }
    
            element.onmouseup = function () {
                if (element.getBoundingClientRect().left<document.body.clientWidth/2 && element.classList.contains('allowedPattern')) {
                    removeAllowedPattern(element.id);
                } else if (element.getBoundingClientRect().left>document.body.clientWidth/2 && element.classList.contains('bannedPattern')) {
                    addAllowedPattern(element.id);
                }
                bannedContainer.innerHTML = '<h2>Неиспользуемые</h2>';
                alllowedContainer.innerHTML = '<h2>Используемые</h2>';
                element.remove();
                drawPatterns();
                document.onmousemove = null;
                element.onmouseup = null;
    
            }
        }
    })
}

drawPatterns();


particlesJS("menu", {
    "particles": {
        "number": {
            "value": 800,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#ffffff"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            },
            "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
            }
        },
        "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": false,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 1,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": false,
                "mode": "repulse"
            },
            "onclick": {
                "enable": false,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 400,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
});
