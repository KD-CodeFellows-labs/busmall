'use strict';

var leftImageEl = document.getElementById('left');
var middleImageEl = document.getElementById('middle');
var rightImageEl = document.getElementById('right');
var containerEl = document.getElementById('image_container');
var tallyListEl = document.getElementById('tally');

// leftImageEl.src = 'img/bag.jpg';
// leftImageEl.name = 'bag.jpg';
// leftImageEl.title = 'bag';

// middleImageEl.src = 'img/pen.jpg';
// middleImageEl.name = 'pen.jpg';
// middleImageEl.title = 'pen';

rightImageEl.src = 'img/usb.jpg';
rightImageEl.name = 'usb.jpg';
rightImageEl.title = 'usb';

function addElement(childElType, childContent, parentEl) {
  var childElement = document.createElement(childElType);
  childElement.textContent = childContent;
  parentEl.appendChild(childElement);
  return childElement;
}

var allProducts = [];

function Product(name) {
  this.name = name;
  this.path = `img/${name}.jpg`;
  this.views = 0;
  this.votes = 0;
  allProducts.push(this);
}

function makeRandom() {
  return Math.floor(Math.random() * allProducts.length);
}

function renderProducts() {
  var uniquePicsArray = [];
  uniquePicsArray[0] = makeRandom();
  uniquePicsArray[1] = makeRandom();
  uniquePicsArray[2] = makeRandom();

  while(uniquePicsArray[0] === uniquePicsArray[1]) {
    console.error('dup found rerolling!');
    uniquePicsArray[1] = makeRandom();
  }
  allProducts[uniquePicsArray[0]].views++;
  leftImageEl.src = allProducts[uniquePicsArray[0]].path;
  leftImageEl.name = allProducts[uniquePicsArray[0]].name;
  leftImageEl.title = allProducts[uniquePicsArray[0]].name;

  allProducts[uniquePicsArray[1]].views++;
  middleImageEl.src = allProducts[uniquePicsArray[1]].path;
  middleImageEl.name = allProducts[uniquePicsArray[1]].name;
  middleImageEl.title = allProducts[uniquePicsArray[1]].name;
  // Build list
  for ( var i = 0; i < allProducts.length; i++) {
    addElement('li',`${allProducts[i].name}: views=${allProducts[i].views} : votes=${allProducts[i].votes}`,tallyListEl);
  }
}

new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('pen');
new Product('shark');
new Product('usb');

function handleClick() {
  var chosenImage = event.target.title;
  console.log('chosenImage: ',chosenImage);
  for( var i = 0; i < allProducts.length; i++) {
    if(allProducts[i].name === chosenImage) {
      allProducts[i].votes++;
    }
  }
  var select = document.querySelector('#tally');
  select.innerHTML = '';
  renderProducts();
}

containerEl.addEventListener('click', handleClick);

renderProducts();

