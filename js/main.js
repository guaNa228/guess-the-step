// import { Footprint } from "./classes.js";
// import { arrayToMatrix, getRing, createRottingMatrix } from './utils.js';
import { Game } from './classes.js'
import { setNickname } from './settings.js';

let bestPlayers = JSON.parse(localStorage.getItem('bestPlayers')) || [];
let nickname = JSON.parse(localStorage.getItem('nickname')) || '';

let resetButtons = document.querySelectorAll('.resetButton');
let ratingButtons = document.querySelectorAll('.ratingButton');


let endgameScreen = document.querySelector('.endgameScreen');
let ratingWindow = document.querySelector('.rating');
let nicknameInput = document.querySelector('.rating input');
let list = document.querySelector('.rating .list');

nicknameInput.addEventListener('input', function() {
    setNickname(this.value);
})


resetButtons.forEach((button) => {
    button.addEventListener('click', resetGame);
});

ratingButtons.forEach((button) => {
    button.addEventListener('click', showRating);
});

let g = new Game();

g.drawRound();

function resetGame() {
    g = new Game();
    g.drawRound();
}

function showRating() {
    endgameScreen.classList.remove('active');
    ratingWindow.classList.add('active');
    
    let bestPlayersHTML = '';
    bestPlayers.forEach((record, index) => {
        bestPlayersHTML+=`<p>${index+1}. ${record.name} - ${record.score}</p>`
    });

    list.innerHTML = bestPlayersHTML;
}

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
