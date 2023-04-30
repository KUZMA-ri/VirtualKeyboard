"use strict";
import { keyList } from "./scripts/keyList.js";
import { createElement } from "./scripts/createElement.js";

console.log(keyList);

const body = document.querySelector('body');
const container = createElement('div', 'container');
const keyboardWrapper = createElement('div', 'keyboard__wrapper');
const title  = createElement('h1','title','Virtual Keyboard');
const descriptionWrapper = createElement('div', 'keyboard__desc-wrapper');
const description = createElement('p', 'keyboard__desc', 'For changing language you have to use Shift + Alt')

body.prepend(container);
container.append(title, keyboardWrapper, descriptionWrapper);
descriptionWrapper.append(description);