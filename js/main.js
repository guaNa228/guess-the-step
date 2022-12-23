// import { Footprint } from "./classes.js";
// import { arrayToMatrix, getRing, createRottingMatrix } from './utils.js';
import { Game } from './classes.js'
import { nickname, setNickname, bestPlayers } from './settings.js';

let g;

let resetButtons = document.querySelectorAll('.resetButton');
let ratingButtons = document.querySelectorAll('.ratingButton');
let nicknameInputs = document.querySelectorAll('input[type="text"]');
let menu = document.querySelector('#menu');

let endgameScreen = document.querySelector('.endgameScreen');
let ratingWindow = document.querySelector('.rating');
let nicknameInput = document.querySelector('.rating input');
let list = document.querySelector('.rating .list');

if (!nickname) setNickname('Игрок');
nicknameInput.value = nickname;

ratingWindow.addEventListener('click', function (e) {
    e.stopPropagation();
    if (e.target == ratingWindow) {
        this.classList.remove('active');
        endgameScreen.classList.add('active');
    }
})

nicknameInputs.forEach((input) => {
    input.addEventListener('input', function () {
        setNickname(this.value);
    });
});



resetButtons.forEach((button) => {
    button.addEventListener('click', resetGame);
});

ratingButtons.forEach((button) => {
    button.addEventListener('click', showRating);
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

// let arr = []
// arr.length = 1024;
// arr.fill(true);

// console.log(chickenPattern);

// let fprint = new Footprint(humanPattern, true);

// fprint.draw(document.querySelector('#default'))

// let rotprint = new Footprint(humanPattern, true);
// rotprint.rot();
// rotprint.draw(document.querySelector('#rotted'));
// rotprint.applyEffects();
// // setTimeout(() => {
// //     rotprint.disableEffects();
// // }, 3000)
// // setTimeout(() => {
// //     rotprint.applyEffects();
// // }, 6000)

// // let example = [0, 1, 2, 3];
// // console.log(arrayToMatrix(example));

// // console.log(getRing(778, 32, 2))
