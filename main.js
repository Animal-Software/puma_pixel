"use strict";

// IMPORTS
import CANVAS from "./modules/canvas.js";
import FILE from "./modules/file.js";

// ELEMENTS
const menu_open = document.querySelector('#menu_open');

// INIT
const canvas = new CANVAS();
const canvas_element = canvas.element;
const file_menu = new FILE();

// menu_open.addEventListener('click', () => file_menu.open_file(canvas), false);

// canvas drawing
canvas_element.addEventListener('mousedown', e => canvas.start_drawing(e), false);
document.addEventListener('mouseup', () => canvas.end_drawing(), false);
canvas_element.addEventListener('mousemove', e => canvas.draw_layer(e, 255, 0, 85, 255));
// right click menu
canvas_element.oncontextmenu = () => false;

// default setup
document.addEventListener('DOMContentLoaded', file_menu.new_file(canvas, 16, 16, 50) , false);


const icon = document.querySelector('link[rel = "shortcut icon"]')
const updatePage = (text, image) => { document.title = text, icon.href = `./img/logo/${image}` }

window.addEventListener('blur', () => updatePage('Unsaved Progress', 'grouchy2.png'));
window.addEventListener('focus', () => updatePage('Puma Pixel', 'grouchy.png'));