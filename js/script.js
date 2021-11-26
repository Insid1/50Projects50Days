'use strict'

class ExpandingCards { // js class for 1st exercies
    constructor(slider, popUpBlock = document.querySelector('.pop-up')) {
        this.slider = slider;

        this.initialBlur = 1;
        this.popUpBlock = popUpBlock;
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

    setBlur() {
        for (let i of this.slider) {
            i.style.filter = 'blur(1em)';
        }
    }

    disposeBlur() {
        for (let i of this.slider) {
            let numHolder = 100;
            const intervalId = setInterval(() => {
                numHolder--;
                if (numHolder <= 0) {
                    clearInterval(intervalId)
                    this.popUpBlock.style.display = 'none';
                };
                this.popUpBlock.textContent = 100 - numHolder + '%';
                i.style.filter = `blur(${numHolder / 100}em)`
            }, 30);
        }
    }

    activate() {
        this.makeWider();
        this.disposeBlur();
    }
}

let images = new ExpandingCards(document.querySelectorAll('.slider__inner-img'));
images.activate();


class ProgressSteps { // js class for 1st exercies
    constructor(innerUl, buttons) {
        this.innerUl = innerUl;
        this.buttons = buttons;

        this.firstElement = 1;
        this.currentLineWidth = 0;

    }

    calculateParamets() {
        console.log(this.innerUl)
        this.innerElements = this.innerUl.children

        this.stepWidth = ~~(100 / (this.innerElements.length - 2)) // get % to increase width
        this.progressLine = this.innerElements[0]; // Line goes first in UL
    }

    moveRight() {
        if (this.firstElement === this.innerElements.length - 1) return;

        this.firstElement += 1;
        this.innerElements[this.firstElement].classList.add('progress-step__active');

        this.currentLineWidth += this.stepWidth;
        this.innerElements[0].style.width = this.currentLineWidth + '%';
    }

    moveLeft() {
        // this.buttons[0].disabled = (this.currentLineWidth === 0) ?  true : false;
        // this.buttons[1].disabled = (this.currentLineWidth === this.stepWidth * this.innerElements.length) ?  true : false;

        if (this.firstElement === 1) return;
        this.innerElements[this.firstElement].classList.remove('progress-step__active');
        this.firstElement -= 1;

        this.currentLineWidth -= this.stepWidth;
        this.innerElements[0].style.width = this.currentLineWidth + '%';
    }

    checkButtonsStatus() {
        this.buttons[0].disabled = (this.currentLineWidth === 0) ? true : false;
        this.buttons[1].disabled = (this.currentLineWidth === this.stepWidth * (this.innerElements.length - 2)) ? true : false;
    }

    addEventsToButtons() {
        this.buttons[1].addEventListener('click', () => {
            this.moveRight();
            this.checkButtonsStatus()

        })

        this.buttons[0].addEventListener('click', () => {
            this.moveLeft();
            this.checkButtonsStatus()
        })
    }

    activate() {
        this.calculateParamets();
        this.checkButtonsStatus()
        this.addEventsToButtons()
    }
}


const collect1 = document.querySelector("body > div.wrapper-ex2 > div > ul");
const buttons1 = document.querySelectorAll('body > div.wrapper-ex2 > div > button');

let test1 = new ProgressSteps(collect1, buttons1);
test1.activate()

// clickable search space
const searchButton = document.querySelector("span.search__icon");
const searchSpace = document.querySelector(".search__input");

searchButton.addEventListener('click', () => {
    searchSpace.classList.toggle('search__active');
})

class ScrollAnimation {
    constructor(collection) {
        this.collection = collection;
    }

    checkBoxes() {
        const triggerBottom = (window.innerHeight)/5 * 4;
        this.collection.forEach(box => {
            const boxTop = box.getBoundingClientRect().top
        
        if (boxTop < triggerBottom) {
            box.classList.add('scroll-animation__active');
        } else {
            box.classList.remove('scroll-animation__active');
        }
        })
    }

    activate() {
        window.addEventListener('scroll', () => {
            this.checkBoxes();
        });
    }
}

const contentBoxes = document.querySelectorAll('.scroll-animation__content-box');

const animateScrollingContent = new ScrollAnimation(contentBoxes);
animateScrollingContent.activate();

const splitPages = document.querySelectorAll('.split-landing-page__info');

const leftPart = splitPages[0];
const rightPart = splitPages[1];

leftPart.addEventListener('mouseenter', () => {
    leftPart.classList.add('split-landing-page__active');
})

leftPart.addEventListener('mouseleave', () => {
    leftPart.classList.remove('split-landing-page__active');
})

rightPart.addEventListener('mouseenter', () => {
    rightPart.classList.add('split-landing-page__active');
})

rightPart.addEventListener('mouseleave', () => {
    rightPart.classList.remove('split-landing-page__active');
})












































