'use strict'

class ExpandingCards {
    constructor(slider) {
        this.slider = slider;
    }

    makeWider() {
        this.slider.forEach((img) => {
            img.addEventListener('click', () => {
                this.slider.forEach((img) => {
                    img.classList.remove('slider__active');
                })

                img.classList.toggle('slider__active');
            })
        })
    }

    activate() {
        this.makeWider();
    }
}

let images = new ExpandingCards(document.querySelectorAll('.slider__inner-img'));

images.activate();

class ProgressSteps {
    constructor(innerElements, buttons) {
        this.innerElements = innerElements;
        this.buttons = buttons;

        this.firstElement = 1;
        this.secondElement = 2;
    }

    moveRight() {
        if (this.secondElement === this.innerElements.length) return;
        this.firstElement += 1;
        this.secondElement += 1;
    }

    moveLeft() {
        if (this.firstElement === 1) return;
        this.firstElement -= 1;
        this.secondElement -= 1;
    }

    addIventsToButtons() {
        this.buttons[0].addEventListener('click', () => {
            this.moveLeft();
        })

        this.buttons[1].addEventListener('click', () => {
            this.moveRight();
        })
    }




}
// const innerElements = document.querySelector('.progress-step').children;
// let [firstElement, secondElement] = [1, 2];
// innerElements[firstElement].classList.toggle('progress-step__active');
// innerElements[secondElement].classList.toggle('progress-step__active');



