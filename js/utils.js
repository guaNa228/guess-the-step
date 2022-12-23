import { gettingBlurProbability, gettingColorProbability, allowedAnimations, allowedPatterns } from "./settings.js";

export function changeState(boolNum) {
    return boolNum ? 0 : 1;
}

export function rotIf(probability) {
    return Math.random() < probability;
}

export function createRottingMatrix(n, centralProbability) {
    let rottingMatrix = [];
    rottingMatrix.length = n ** 2;
    let center = Math.floor(rottingMatrix.length / 2);
    rottingMatrix[center] = centralProbability;
    for (let i = 1; i <= Math.floor(n / 2); i++) {
        fillIndexes(rottingMatrix, getRing(center, n, i), Math.round(centralProbability / (2 ** i) * 1000) / 1000)
    }

    return rottingMatrix;
}

export function arrayToMatrix(array) {
    let rowNum = parseInt(Math.sqrt(array.length));
    console.log(rowNum);
    let matrix = [];
    let tempArray = [];
    for (let i = 0; i < rowNum; i++) {
        tempArray = [];
        for (let j = 0; j < rowNum; j++) {
            tempArray.push(array[i * rowNum + j])
        }
        matrix.push(tempArray);
    }

    return matrix;
}

export function getRing(currentIndex, rowLength, ringLevel) {
    let ringIndexes = [];

    let leftUpperIndex = currentIndex - ringLevel * rowLength - ringLevel;
    let leftLowerIndex = currentIndex + ringLevel * rowLength - ringLevel;
    let rightUpperIndex = currentIndex - ringLevel * rowLength + ringLevel

    for (let k = 0; k < ringLevel * 2 + 1; k++) {
        ringIndexes.push(leftUpperIndex + k);
        ringIndexes.push(leftLowerIndex + k);
    }

    for (let k = 1; k < ringLevel * 2; k++) {
        ringIndexes.push(leftUpperIndex + k * rowLength);
        ringIndexes.push(rightUpperIndex + k * rowLength);
    }

    return ringIndexes;
}

function fillIndexes(arrayToFill, indexes, value) {
    indexes.forEach((index) => {
        arrayToFill[index] = value;
    });
}

export function filterStringFromObject(filterObject) {
    let result = [];
    for (const [key, value] of Object.entries(filterObject)) {
        result.push(`${key}(${value})`);
    }

    return result.join(' ');
}

export function getRandomBlur() {
    return `blur(${Math.random()<=gettingBlurProbability ? 2*Math.random() : 0}px)`;
}

export function getRandomColor() {
    return Math.random()<=gettingColorProbability ? `rgb(${Math.floor(Math.random()*180)}, ${Math.floor(Math.random()*180)}, ${Math.floor(Math.random()*180)})` : 'rgb(0, 0, 0)'
}

export function getRandomAnimation() {
    return Math.floor(Math.random()*allowedAnimations.length);
}

export function getRandomPattern() {
    return [...allowedPatterns[Math.floor(Math.random()*allowedPatterns.length)]]
}

export function formatTime(initial) {
    let minutes = Math.floor(initial/60);
    let seconds = initial%60;

    minutes = minutes<10 ? `0${minutes}` : minutes;
    seconds = seconds<10 ? `0${seconds}` : seconds;

    return `${minutes}:${seconds}`

}