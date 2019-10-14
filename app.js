'use strict';

var leftImageEl = document.getElementById('left');
var middleImageEl = document.getElementById('middle');
var rightImageEl = document.getElementById('right');

leftImageEl.src = 'img/bag.jpg';
leftImageEl.name = 'bag.jpg';
leftImageEl.title = 'bag';

middleImageEl.src = 'img/pen.jpg';
middleImageEl.name = 'pen.jpg';
middleImageEl.title = 'pen';

rightImageEl.src = 'img/usb.jpg';
rightImageEl.name = 'usb.jpg';
rightImageEl.title = 'usb';

var allProducts = [];

// function Product(name) {
//   this.name = name;
//   this.path = `img/${name}.jpg`;
//   this.views = 0;
//   this.votes = 0;
//   allProducts.push(this);
// }

// function makeRandom() {
//   return Math.floor(Math.random() * allProducts.length);
// }

// function renderProducts() {
//     var uniquePicsArray
// }

