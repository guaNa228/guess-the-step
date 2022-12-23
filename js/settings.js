import { createRottingMatrix } from "./utils.js";
import { patterns } from './patterns.js'

export let rottingMatrixLength = JSON.parse(localStorage.getItem('rottingMatrixLength')) || 5;
export let centralProbability = JSON.parse(localStorage.getItem('centralProbability')) || 0.5;
export let rottingStartProbability = JSON.parse(localStorage.getItem('rottingStartProbability')) || 0.03;



export let rottingMatrix = createRottingMatrix(rottingMatrixLength, centralProbability);
export let rottingMatrixCenter = Math.round(rottingMatrix.length / 2);


export let footprintLength = 32;
export let choicesNumber = 6;

export const animations = ['shaking-horizontal', 'shaking-vertical', 'rotating'];

export let gettingBlurProbability = JSON.parse(localStorage.getItem('gettingBlurProbability')) || 0.2;
export let gettingColorProbability = JSON.parse(localStorage.getItem('gettingColorProbability')) || 0.2;
export let gettingAnimationProbability = JSON.parse(localStorage.getItem('gettingAnimationProbability')) || 0.2;

export let roundTime = JSON.parse(localStorage.getItem('roundTime')) || 20;

export let allowedPatterns = JSON.parse(localStorage.getItem('allowedPatterns')) || patterns.map((_, index) => index);

export let bestPlayers = JSON.parse(localStorage.getItem('bestPlayers')) || [];
export let nickname = JSON.parse(localStorage.getItem('nickname')) || 'Игрок';

export function setNickname(arg) {
    nickname = arg;
}

export function removeAllowedPattern(patternIndex) {
    allowedPatterns = allowedPatterns.filter((index) => index!=patternIndex);
}

export function addAllowedPattern(patternIndex) {
    allowedPatterns.push(parseInt(patternIndex));
}

export function addBestPlayer(score) {
    let topPlayers = bestPlayers.map((value) => value.nick);
    if (topPlayers.includes(nickname)) {
        if (bestPlayers.filter((value) => value.nick == nickname)[0].score < score) {
            bestPlayers = bestPlayers.filter((value) => value.nick != nickname)
            bestPlayers.push({ 'nick': nickname, 'score': score });
        }
    } else {
        bestPlayers.push({ 'nick': nickname, 'score': score });
    }
    bestPlayers = bestPlayers.sort((a, b) => {
        return a.score < b.score;
    });
    bestPlayers = bestPlayers.slice(0, 5);
}

let rottingFunctions = [(input) => { rottingMatrixLength = input.value / input.dataset.divisor },
(input) => { centralProbability = input.value / input.dataset.divisor },
(input) => { rottingStartProbability = input.value / input.dataset.divisor }];

let rottingBackwardsFunctions = [(input) => {
    input.value = rottingMatrixLength*input.dataset.divisor;
    input.nextElementSibling.textContent = rottingMatrixLength;
}, (input) => {
    input.value = centralProbability*input.dataset.divisor;
    input.nextElementSibling.textContent = centralProbability;
}, (input) => {
    input.value = rottingStartProbability*input.dataset.divisor;
    input.nextElementSibling.textContent = rottingStartProbability;
}]

let rottingInputs = document.querySelectorAll('.rottingInput');

rottingInputs.forEach((input) => {
    rottingBackwardsFunctions[parseInt(input.dataset.order)](input);
    input.addEventListener('change', rottingInputChange)
});

function rottingInputChange() {
    rottingFunctions[parseInt(this.dataset.order)](this);
    this.nextElementSibling.textContent = this.value / this.dataset.divisor;
    if (parseInt(this.dataset.order) < 2) {
        rottingMatrix = createRottingMatrix(rottingMatrixLength, centralProbability);
        rottingMatrixCenter = Math.round(rottingMatrixLength / 2);
    }
}

let effectFunctions = [(input) => { gettingBlurProbability = input.value / input.dataset.divisor },
(input) => { gettingColorProbability = input.value / input.dataset.divisor },
(input) => { gettingAnimationProbability = input.value / input.dataset.divisor }];

let effectInputs = document.querySelectorAll('.effectInput');

let effectBackwardsFunctions = [(input) => {
    input.value = gettingBlurProbability*input.dataset.divisor;
    input.nextElementSibling.textContent = gettingBlurProbability;
}, (input) => {
    input.value = gettingColorProbability*input.dataset.divisor;
    input.nextElementSibling.textContent = gettingColorProbability;
}, (input) => {
    input.value = gettingAnimationProbability*input.dataset.divisor;
    input.nextElementSibling.textContent = gettingAnimationProbability;
}]

effectInputs.forEach((input) => {
    effectBackwardsFunctions[parseInt(input.dataset.order)](input);
    input.addEventListener('change', effectInputChange)
});

function effectInputChange() {
    effectFunctions[parseInt(this.dataset.order)](this);
    this.nextElementSibling.textContent = this.value / this.dataset.divisor;
}

let roundInput = document.querySelector('.roundInput');
roundInput.value = roundTime*roundInput.dataset.divisor;
roundInput.nextElementSibling.textContent = roundTime;
roundInput.addEventListener('change', function () {
    roundTime = this.value;
    this.nextElementSibling.textContent = this.value;
});

addEventListener('beforeunload', () => {
    localStorage.setItem('rottingMatrixLength', JSON.stringify(rottingMatrixLength));
    localStorage.setItem('centralProbability', JSON.stringify(centralProbability));
    localStorage.setItem('rottingStartProbability', JSON.stringify(rottingStartProbability));

    localStorage.setItem('gettingBlurProbability', JSON.stringify(gettingBlurProbability));
    localStorage.setItem('gettingColorProbability', JSON.stringify(gettingColorProbability));
    localStorage.setItem('gettingAnimationProbability', JSON.stringify(gettingAnimationProbability));

    localStorage.setItem('roundTime', JSON.stringify(roundTime));

    localStorage.setItem('bestPlayers', JSON.stringify(bestPlayers));
    localStorage.setItem('nickname', JSON.stringify(nickname));

    localStorage.setItem('allowedPatterns', JSON.stringify(allowedPatterns));
});