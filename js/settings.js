import { createRottingMatrix } from "./utils.js";
import { patterns } from './patterns.js'

export let rottingMatrix = createRottingMatrix(5, 0.5);
export let rottingMatrixLength = Math.sqrt(rottingMatrix.length);
export let rottingMatrixCenter = Math.round(rottingMatrix.length / 2);
export let rottingStartProbability = 0.03;
export let footprintLength = 32;
export const animations = ['shaking-horizontal', 'shaking-vertical', 'rotating'];
export let allowedAnimations = [...animations];
export let gettingBlurProbability = 0.2;
export let gettingColorProbability = 0.2;
export let gettingAnimationProbability = 0.2;
export let roundTime = 30;
export let currentPattern = patterns[0];
export let roundNumber = 6;

let bestPlayers = JSON.parse(localStorage.getItem('bestPlayers')) || [];
let nickname = JSON.parse(localStorage.getItem('nickname')) || '';

export function setNickname(arg) {
    nickname = arg;
}

// export function addBestPlayer(playerObject) {
//     if ()
// }

/* game settings */

export let choicesNumber = 6;