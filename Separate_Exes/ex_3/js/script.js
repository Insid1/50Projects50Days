'use strict'

class RotatingNavigationAnimation {
    constructor(divArticle, menuButton, menuLinks) {
        this.divArticle = divArticle;
        this.menuButton = menuButton;
        this.menuLinks = menuLinks;
    }

    assignToButton() {
        this.menuButton.addEventListener('click', () => {
            this.divArticle.classList.toggle('article__active');
            this.menuButton.classList.toggle('corner-button__active');
            this.menuLinks.classList.toggle('menu__active');
        })
    }

    activate() {
        this.assignToButton();
    }
}


const article = document.querySelector('.article');
const menuButton = document.querySelector('.corner-button');
const menuLinks = document.querySelector('.menu');

const rotateMenu = new RotatingNavigationAnimation(article, menuButton, menuLinks);
rotateMenu.activate()












































