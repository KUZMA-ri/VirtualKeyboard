"use strict";
import { keyList } from "./scripts/keyList.js";
import { createElement } from "./scripts/createElement.js";

console.log(keyList);

const body = document.querySelector('body');
const container = createElement('div', 'container');
const title  = createElement('h1','title','Virtual Keyboard');
const keyboardWrapper = createElement('div', 'keyboard__wrapper');
const inputElement = createElement('textarea', 'keyboard__text');
const keysWrapper = createElement('div', 'keyboard__keys-wrapper');
const descriptionWrapper = createElement('div', 'keyboard__desc-wrapper');
const description = createElement('p', 'keyboard__desc', 'For changing language you have to use Shift + Alt');

let caps = false;
let text = '';
let lang = 'EN'; 

body.prepend(container);
container.append(title, keyboardWrapper, descriptionWrapper);
keyboardWrapper.append(inputElement, keysWrapper);
descriptionWrapper.append(description);

const createButtons = () => {                        // в зависимости от регистра создаем кнопки с соответствующим содержимым
    if(!caps && lang === 'EN') {
        for (let i = 0; i < keyList.length; i++) {
            let key = createElement('button', `${keyList[i].size}`, `${keyList[i].label[0].low}`);
            keysWrapper.append(key);
        }
    } else if (caps && lang === 'EN') {
        for (let i = 0; i < keyList.length; i++) {
            let key = createElement('button', `${keyList[i].size}`, `${keyList[i].label[0].upper}`);
            keysWrapper.append(key);
        }
    } else if (!caps && lang === 'RU') {
        for (let i = 0; i < keyList.length; i++) {
            let key = createElement('button', `${keyList[i].size}`, `${keyList[i].label[1].low}`);
            keysWrapper.append(key);
        }
    } else if (caps && lang === 'RU') {
        for (let i = 0; i < keyList.length; i++) {
            let key = createElement('button', `${keyList[i].size}`, `${keyList[i].label[1].upper}`);
            keysWrapper.append(key);
        }
    }
}

createButtons();

inputElement.addEventListener('input', (e) => {
    text = e.target.value;
    console.log(text);
});

keysWrapper.addEventListener('click', (e) => {
    if(!e.target.classList.contains('keyboard__keys-wrapper')) {
        e.target.classList.add('active'); 

        let content = e.target.textContent;

        if(content !== 'Enter'             
                && content !== 'Tab'
                && content !== 'Caps'
                && content !== 'Shift'
                && content !== 'Alt'
                && content !== 'Del'
                && content !== 'Enter'
                && content !== 'Win'
                && content !== 'Backspace'
                && content !== 'Ctrl'
            ) {
                text += e.target.textContent;
                inputElement.textContent = text;
                console.log(text);
            }

        if (content === 'Backspace') {
            text = text.slice(0, -1);
            inputElement.textContent = text;
        }
        }
    
    if(e.target.classList.contains('active')) {
        setTimeout(() => {
            e.target.classList.remove('active')
        }, 500)
    }
});

// document.addEventListener('keydown', (e) => {             
//     for (let i = 0; i < keyList.length; i++) {
//         // console.log(e.keyCode);
//         // console.log(keyList[i].code);
//         if(e.keyCode == keyList[i].code) {
//             let buttons = document.querySelectorAll('button');
//             buttons.forEach((btn) => {
//                 console.log(btn);
//                 console.log(btn.textContent === e.code);
//             })
//         }           
//     }
// });




