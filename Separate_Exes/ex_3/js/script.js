'use strict'

const article = document.querySelector('.article');
const menuButton = document.querySelector('.corner-button');
const menuLinks = document.querySelector('.menu');

// article.classList.toggle('article__active');
// menuButton.classList.toggle('corner-button__active');
// menuButton.classList.toggle('menu__active');


function assignToButton() {
    menuButton.addEventListener('click', () => {
        article.classList.toggle('article__active');
        menuButton.classList.toggle('corner-button__active');
        menuLinks.classList.toggle('menu__active');
    })
}

assignToButton();












































