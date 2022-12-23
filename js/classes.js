import { createRottingMatrix, getRing, filterStringFromObject, getRandomBlur, getRandomColor, getRandomAnimation, formatTime } from "./utils.js";
import { rottingMatrix, rottingMatrixLength, rottingMatrixCenter, rottingStartProbability, footprintLength, currentPattern, choicesNumber, gettingAnimationProbability, allowedAnimations, roundTime, roundNumber } from "./settings.js";

let timer = document.querySelector('span.timer');
let round = document.querySelector('span.roundNumber');

let endgameScreen = document.querySelector('.endgameScreen');
let gameResult = document.querySelector('span.result');
let completedRounds = document.querySelector('p.report span.completedRounds');
let totalRounds = document.querySelector('p.report span.totalRounds');
let scoreElement = document.querySelector('p.report span.score');

export class Footprint {
    constructor(footprintArray, game, main = false) {
        this.game = game;
        this.sample = [...footprintArray];
        this.main = main;
        this.elements = [];
        this.blur = getRandomBlur();
        this.color = getRandomColor();
        this.animation = (Math.random() <= gettingAnimationProbability) ? allowedAnimations[getRandomAnimation()] + ' 1s ease-in-out infinite' : '';
    }

    // applyEffects() {
    //     this.elements.forEach((item) => {
    //         item.style.filter = this.blur;
    //         item.style.animation = this.animation;
    //     })
    // }

    // disableEffects() {
    //     this.elements.forEach((item) => {
    //         item.style.filter = '';
    //         item.style.animation = '';
    //     })
    // }

    compare(otherFootprint) {
        let checkingCounter = 0;
        for (let i = 0; i < this.sample.length; i++) {
            checkingCounter += +(this.sample[i] == otherFootprint.sample[i]);
        }

        console.log(checkingCounter == this.sample.length);
        
        return checkingCounter == this.sample.length;
    }

    draw(parent) {
        let footprintContainer = document.createElement('div');
        if (!this.main) {
            footprintContainer.addEventListener('click', () => {
                if (this.compare(this.game.mainFootprint)) {
                    this.game.winRound();
                } else {
                    this.game.lose();
                }
            });
        }

        footprintContainer.classList.add('footprint');
        footprintContainer.style.filter = this.blur;
        footprintContainer.style.animation = this.animation;

        let newInnerHtml = '';
        for (let i = 0; i < this.sample.length; i++) {
            newInnerHtml += `<div style="background: ${this.sample[i] ? this.color : ''}" class='${this.sample[i] ? 'filled' : ''} ${this.sample[i] == 2 ? 'border' : ''} ${this.sample[i] == 3 ? 'cell' : ''}'></div>`;
        }

        footprintContainer.innerHTML = newInnerHtml;
        this.elements.push(footprintContainer);
        parent.appendChild(footprintContainer);
    }

    rot() {
        let rowLength = parseInt(Math.sqrt(this.sample.lenght));
        for (let i = 0; i <= this.sample.length; i++) {
            if (this.isBorder(i)) {
                if (Math.random() <= rottingStartProbability) {
                    for (let r = 1; r <= Math.round(rottingMatrixLength / 2); r++) {
                        let rottingMatrixRing = getRing(rottingMatrixCenter, rottingMatrixLength, r);
                        let sampleRing = getRing(i, footprintLength, r);
                        rottingMatrixRing.forEach((probabilityIndex, index) => {
                            if (Math.random() <= rottingMatrix[probabilityIndex]) {
                                if (this.sample[sampleRing[index]]) this.sample[sampleRing[index]] = 0;
                            }
                        });
                    }
                }
            }
        }
    }

    isBorder(pixelIndex) {
        let ring = getRing(pixelIndex, footprintLength, 1);
        return this.sample[pixelIndex] == 1 && ring.filter((element) => this.sample[element] == 0).length > 1;
    }
}

export class Game {
    constructor() {
        endgameScreen.classList.remove('active');
        this.round = 0;
        this.mainElement = document.querySelector('.main');
        this.choicesElement = document.querySelector('.choicesContainer');
        this.choices = [];
        this.score = 0;
    }

    createMain() {
        this.mainFootprint = new Footprint(currentPattern, this, true);
    }

    createChoices() {
        for (let i = 0; i < choicesNumber - 1; i++) {
            this.choices[i] = new Footprint(currentPattern, this);
            this.choices[i].rot();
        }
        
    }

    drawRound() {
        this.mainElement.innerHTML = '';
        this.choicesElement.innerHTML = '';

        this.timeLeft = roundTime;
        this.round += 1;
        
        round.textContent = `${this.round}/${roundNumber}`;
        timer.textContent = formatTime(this.timeLeft);

        this.roundInterval = setInterval(() => {
            this.timeLeft-=1;
            if (this.timeLeft==0) {
                clearInterval(this.roundInterval);
                this.lose();
            }
            timer.textContent = formatTime(this.timeLeft);
        }, 1000)

        this.createMain()
        this.mainFootprint.draw(this.mainElement);

        this.createChoices();
        this.choices.push(new Footprint(this.mainFootprint.sample, this));
        this.choices = this.choices.map(value => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value);
        this.choices.forEach((choice) => {
            choice.draw(this.choicesElement);
        })
    }

    winRound() {
        if (this.round<roundNumber) {
            this.choices = [];
            this.mainFootprint = undefined;
            this.score += (this.timeLeft/roundTime)*100;
            clearInterval(this.roundInterval);
            this.drawRound();
        } else {
            gameResult.textContent = 'Вы выиграли';
            completedRounds.textContent = this.round;
            totalRounds.textContent = roundNumber;
            scoreElement.textContent = Math.round(this.score);
            clearInterval(this.roundInterval);
            endgameScreen.classList.add('active');
        }
    }

    lose() {
        gameResult.textContent = 'Вы проиграли';
        completedRounds.textContent = this.round - 1;
        totalRounds.textContent = roundNumber;
        scoreElement.textContent = Math.round(this.score);
        clearInterval(this.roundInterval);
        endgameScreen.classList.add('active');
    }
}