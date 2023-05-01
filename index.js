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
let text = '';
let caps = false;
let shift = false;
let lang = 'EN';

body.prepend(container);
container.append(title, keyboardWrapper, descriptionWrapper);
keyboardWrapper.append(inputElement, keysWrapper);
descriptionWrapper.append(description);

const createButtons = (caps, lang) => {                        // в зависимости от регистра создаем кнопки с соответствующим содержимым
    if(!caps && lang === 'EN') {
        for (let i = 0; i < keyList.length; i++) {
            let btn = createElement('button', `${keyList[i].size}`, `${keyList[i].label[0].low}`);
            keysWrapper.append(btn);
        }
    } else if (caps && lang === 'EN') {
        for (let i = 0; i < keyList.length; i++) {
            let btn = createElement('button', `${keyList[i].size}`, `${keyList[i].label[0].upper}`);
            keysWrapper.append(btn);
        }
    } else if (!caps && lang === 'RU') {
        for (let i = 0; i < keyList.length; i++) {
            let btn = createElement('button', `${keyList[i].size}`, `${keyList[i].label[1].low}`);
            keysWrapper.append(btn);
        }
    } else if (caps && lang === 'RU') {
        for (let i = 0; i < keyList.length; i++) {
            let btn = createElement('button', `${keyList[i].size}`, `${keyList[i].label[1].upper}`);
            keysWrapper.append(btn);
        }
    }
};

window.addEventListener('DOMContentLoaded', () => {
    createButtons(false, 'EN');
})

inputElement.addEventListener('input', (e) => {
    text = e.target.value;
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
        }

        if (content === 'Backspace') {
            text = text.slice(0, -1);
        }

        if (content === 'Enter') {
            text = `${text}\n`;
        }

        if(content === 'Tab') {
            text = `${text}    `;
        }

        if (content === 'Caps' && caps === true  && lang === 'EN'){
            keysWrapper.innerHTML = '';
            createButtons(false, 'EN');
            caps = false;
        } else if (content === 'Caps' && caps === true && lang === "RU") {
            keysWrapper.innerHTML = '';
            createButtons(false, 'RU');
            caps = false;
        } else if (content === 'Caps' && caps === false && lang === "EN") {
            keysWrapper.innerHTML = '';
            createButtons(true, 'EN');
            caps = true;
        } else if (content === 'Caps' && caps === false && lang === "RU") {
            keysWrapper.innerHTML = '';
            createButtons(true, 'RU');
            caps = true;
        }

        if(content === 'Shift') {
            shift = true;
        }
    
        if(content === 'Alt' && shift === true && caps === false  && lang === 'EN') {     
            keysWrapper.innerHTML = '';
            createButtons(false, 'RU');
            lang = 'RU';
            console.log(shift);
        } else if (content === 'Alt' && shift === true && caps === false && lang === 'RU') {
            keysWrapper.innerHTML = '';
            createButtons(false, 'EN');
            lang = 'EN';
        } else if (content === 'Alt' && shift === true && caps === true && lang === 'EN') {
            keysWrapper.innerHTML = '';
            createButtons(true, 'RU');
            lang = 'RU';
        } else if (content === 'Alt' && shift === true && caps === true && lang === 'RU') {
            keysWrapper.innerHTML = '';
            createButtons(true, 'EN');
            lang = 'EN';
        } 

        inputElement.textContent = text;
    }
    
    if(e.target.classList.contains('active')) {
        setTimeout(() => {
            e.target.classList.remove('active')
        }, 500)
    }
});

document.addEventListener('keydown', (e) => { 
    if(e.code !== 'Enter'
        && e.code !== 'Tab'
        && e.code !== 'CapsLock'
        && e.code !== 'ShiftLeft'
        && e.code !== 'ShiftRight'
        && e.code !== 'AltLeft'
        && e.code !== 'AltRight'
        && e.code !== 'Delete'
        && e.code !== 'Enter'
        && e.code !== 'Win'
        && e.code !== 'Backspace'
        && e.code !== 'ControlLeft'
        && e.code !== 'ControlRight'
    ) {
        text += e.key;
    }

    if (e.code === 'Backspace') {
        text = text.slice(0, -1);
    }

    if (e.code === 'Enter') {
        text = `${text}\n`;
    }

    if(e.code === 'Tab') {
        e.preventDefault();
        text = `${text}    `;
    }

    if (e.code === 'CapsLock' && caps === true && lang === 'EN'){
        keysWrapper.innerHTML = '';
        createButtons(false, 'EN');
        caps = false;
    } else if (e.code === 'CapsLock' && caps === true && lang === 'RU'){
        keysWrapper.innerHTML = '';
        createButtons(false, 'RU');
        caps = false;
    } else if (e.code === 'CapsLock' && caps === false && lang == 'EN') {
        keysWrapper.innerHTML = '';
        createButtons(true, 'EN');
        caps = true;
    } else if (e.code === 'CapsLock' && caps === false && lang == 'RU') {
        keysWrapper.innerHTML = '';
        createButtons(true, 'RU');
        caps = true;
    }

    if(e.code === 'Space') {
        e.preventDefault();
    }

    if(e.code === 'ShiftLeft') {
        shift = true;
    }

    if(e.code === 'AltLeft' && shift === true && caps === false  && lang === 'EN') {     // если нажаты Shift + Alt
        keysWrapper.innerHTML = '';
        createButtons(false, 'RU');
        lang = 'RU';
        console.log(shift);
    } else if (e.code === 'AltLeft' && shift === true && caps === false && lang === 'RU') {
        keysWrapper.innerHTML = '';
        createButtons(false, 'EN');
        lang = 'EN';
    } else if (e.code === 'AltLeft' && shift === true && caps === true && lang === 'EN') {
        keysWrapper.innerHTML = '';
        createButtons(true, 'RU');
        lang = 'RU';
    } else if (e.code === 'AltLeft' && shift === true && caps === true && lang === 'RU') {
        keysWrapper.innerHTML = '';
        createButtons(true, 'EN');
        lang = 'EN';
    } 

    inputElement.textContent = text;

    // let buttons = document.querySelectorAll('button');       // TO DO    подсветка при нажатии клавиш клавиатуры 
    // for (let i = 0; i < buttons.length; i++) {
    //     // console.log(buttons[i]);        
    // }
});




