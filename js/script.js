'use strict'

const images = document.querySelectorAll('.slider__inner-img');

function makeWider(imgCollection) {
    imgCollection.forEach((img) => {
        img.addEventListener('click', () => {

            images.forEach((img) => {
                img.classList.remove('slider__active');
            })

            img.classList.toggle('slider__active');
        })
    })
}

makeWider(images);