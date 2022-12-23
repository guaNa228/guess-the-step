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
export let roundTime = 10;
export let allowedPatterns = [...patterns];

export let bestPlayers = JSON.parse(localStorage.getItem('bestPlayers')) || [];
export let nickname = JSON.parse(localStorage.getItem('nickname')) || '';

export function setNickname(arg) {
    nickname = arg;
}

export function addBestPlayer(score) {
    console.log(nickname);
    let topPlayers = bestPlayers.map((value) => value.nick);
    if (topPlayers.includes(nickname)) {
        if (bestPlayers.filter((value) => value.nick==nickname)[0].score < score) {
            bestPlayers = bestPlayers.filter((value) => value.nick!=nickname)
            bestPlayers.push({'nick': nickname, 'score': score});
        }
    } else {
        bestPlayers.push({'nick': nickname, 'score': score});
    }
    bestPlayers = bestPlayers.sort((a, b) => {
        return a.score<b.score;
    });
    bestPlayers = bestPlayers.slice(0, 6);
}

addEventListener('beforeunload', () => {
    console.log(1);
    localStorage.setItem('bestPlayers', JSON.stringify(bestPlayers));
    localStorage.setItem('nickname', JSON.stringify(nickname));
});

// export function addBestPlayer(playerObject) {
//     if ()
// }

/* game settings */

export let choicesNumber = 6;