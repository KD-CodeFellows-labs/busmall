'use strict';

var leftImageEl = document.getElementById('left');
var middleImageEl = document.getElementById('middle');
var rightImageEl = document.getElementById('right');
var containerEl = document.getElementById('image_container');
var tallyListEl = document.getElementById('tally');

var productArray = ['breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','usb','water-can','wine-glass'];

var myRounds = 5;
var roundCount = myRounds;

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
  var uniqueArray = [];
  uniqueArray[0] = makeRandom();
  uniqueArray[1] = makeRandom();
  uniqueArray[2] = makeRandom();

  while( uniqueArray[0] === uniqueArray[1] ) {
    console.error('dup found 0=1 rerolling!');
    uniqueArray[1] = makeRandom();
  }
  while( uniqueArray[1] === uniqueArray[2] ) {
    console.error('dup found 1=2 rerolling!');
    uniqueArray[2] = makeRandom();
  }
  while( uniqueArray[2] === uniqueArray[0] ) {
    console.error('dup found 2=0 rerolling!');
    uniqueArray[0] = makeRandom();
  }

  allProducts[uniqueArray[0]].views++;
  leftImageEl.src = allProducts[uniqueArray[0]].path;
  leftImageEl.name = allProducts[uniqueArray[0]].name;
  leftImageEl.title = allProducts[uniqueArray[0]].name;

  allProducts[uniqueArray[1]].views++;
  middleImageEl.src = allProducts[uniqueArray[1]].path;
  middleImageEl.name = allProducts[uniqueArray[1]].name;
  middleImageEl.title = allProducts[uniqueArray[1]].name;

  allProducts[uniqueArray[2]].views++;
  rightImageEl.src = allProducts[uniqueArray[2]].path;
  rightImageEl.name = allProducts[uniqueArray[2]].name;
  rightImageEl.title = allProducts[uniqueArray[2]].name;
  // Build list
  for ( var i = 0; i < allProducts.length; i++) {
    addElement('li',`${allProducts[i].name}: views=${allProducts[i].views} : votes=${allProducts[i].votes}`,tallyListEl);
  }
}

for (var i = 0; i < productArray.length; i++) {
  new Product(productArray[i]);
}
//Handle Screen Click
function handleClick() {
  var chosenImage = event.target.title;
  console.log('chosenImage: ',chosenImage);
  for( var i = 0; i < allProducts.length; i++) {
    if(allProducts[i].name === chosenImage) {
      allProducts[i].votes++;
    }
  }
  roundCount--;
  if (roundCount <= 0) {
    //Build end list
    var select = document.querySelector('#tally');
    select.innerHTML = '';
    var image = document.querySelector('#image_container');
    image.innerHTML = '';
    addElement('div',`Results after ${myRounds} rounds:`,tallyListEl);
    for ( var x = 0; x < allProducts.length; x++) {
      addElement('li',`${allProducts[x].name}: views=${allProducts[x].views} : votes=${allProducts[x].votes}`,tallyListEl);
    }
  }
  //
  if (roundCount > 0) {
    select = document.querySelector('#tally');
    select.innerHTML = '';
    renderProducts();
  }
}

containerEl.addEventListener('click', handleClick);

//Render first round
renderProducts();
