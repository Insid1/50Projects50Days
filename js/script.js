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

// clickable search space START
const searchButton = document.querySelector("span.search__icon");
const searchSpace = document.querySelector(".search__input");

searchButton.addEventListener('click', () => {
    searchSpace.classList.toggle('search__active');
})
// clickable search space END

class ScrollAnimation {
    constructor(collection) {
        this.collection = collection;
    }

    checkBoxes() {
        const triggerBottom = (window.innerHeight) / 5 * 4;
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

class SplitPages {
    constructor(splitPages) {
        this.splitPages = splitPages;
    }

    addEvents() {
        this.splitPages.forEach(page => {
            page.addEventListener('mouseenter', () => {
                page.classList.add('split-landing-page__active');
            });
            page.addEventListener('mouseleave', () => {
                page.classList.remove('split-landing-page__active');
            });
        })
    }

    activate() {
        this.addEvents();
    }
}

const pages = document.querySelectorAll('.split-landing-page__info');

const pagesToSplit = new SplitPages(pages);
pagesToSplit.activate();



class FormWaveAnimation {
    constructor(labelsForms, inputForms) {
        this.labelsForms = labelsForms;
        this.inputForms = inputForms;
        this.counter = {};
    }

    representTextAsSpans() {
        this.labelsForms.forEach((label) => {

            this.counter[label.textContent] = 0;

            label.innerHTML =
                label.textContent.split('')
                    .map(letter => `<span>${letter}</span>`)
                    .join('');
        })
    }

    collectionOfLetters(word) {
        return word.querySelectorAll('span');
    }

    setClassInTime(collection, time = 50) {
        let counterHandler = collection[0].parentElement.textContent;

        if (this.counter[counterHandler] === collection.length) return;


        let timeHandler = setTimeout(() => {
            collection[this.counter[counterHandler]].classList.add('form-wave-animation__active');

            this.counter[counterHandler]++;
            return this.setClassInTime(collection);
        }, time)
    }

    removeClassInTime(collection, time = 50) {
        let counterHandler = collection[0].parentElement.textContent;

        if (this.counter[counterHandler] === 0) return;
        let timeHandler = setTimeout(() => {
            collection[this.counter[counterHandler] - 1].classList.remove('form-wave-animation__active');
            this.counter[counterHandler]--;
            return this.removeClassInTime(collection);
        }, time)
    }

    addEvents() {
        this.inputForms.forEach((form, indx) => {
            form.addEventListener('focus', () => {
                this.setClassInTime(this.collectionOfLetters(this.labelsForms[indx]));
            });

            form.addEventListener('blur', () => {
                this.removeClassInTime(this.collectionOfLetters(this.labelsForms[indx]));
            });
        })
    }

    activate() {
        this.representTextAsSpans();
        this.addEvents();
    }
}



// floating labels in form 
const labelsForms = document.querySelectorAll('.form-wave-animation__form-control > label');
// inputs in form 
const inputForms = document.querySelectorAll('.form-wave-animation__form-control > input');

const floatingForm = new FormWaveAnimation(labelsForms, inputForms);
floatingForm.activate();

// ex 9. must be refactored and applied with OOP aproach
const soundsCollection = document.querySelectorAll('[data-sound-type]');

soundsCollection.forEach((sound) => {
    const btn = document.createElement('button');
    btn.classList.add('sound-bar__btn');

    btn.innerText = sound.getAttribute('data-sound-type');

    const btns = document.querySelector('.sound-bar__buttons');
    btns.appendChild(btn);

    btn.addEventListener('click', () => {
        sound.play();
    })

})


// ex. 10;

const joke = document.querySelector('.dads-joke__joke');
const nextJokeBtn = document.querySelector('.dads-joke__btn');

generateJoke()

async function generateJoke() {
    const config = {
        headers: {
            Accept: 'application/json',
        },
    }

    const res = await fetch('https://icanhazdadjoke.com', config);

    // console.log(res);

    const data = await res.json()
    // console.log(data);

    joke.textContent = data['joke'];
}

nextJokeBtn.addEventListener('click', generateJoke);


// ex 11

const eventBoxes = document.querySelectorAll('.key-codes__box');

const eventKey = eventBoxes[0].children[1];
const eventKeyCode = eventBoxes[1].children[1];
const eventCode = eventBoxes[2].children[1];


window.addEventListener('keydown', (eventObj) => {
    console.log(eventObj.key === ' ');

    eventKey.textContent = (eventObj.key === ' ') ? 'Space' : eventObj.key;

    // eventKey.textContent = eventObj.key;
    eventKeyCode.textContent = eventObj.keyCode;
    eventCode.textContent = eventObj.code;
})

































