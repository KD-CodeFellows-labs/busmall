'use strict';

// Product.pics = [
//   document.getElementById('left'), //index 0
//   document.getElementById('middle'), // index 1
//   document.getElementById('right') // index 2
// ];
var leftImageEl = document.getElementById('left');
var middleImageEl = document.getElementById('middle');
var rightImageEl = document.getElementById('right');

var containerEl = document.getElementById('image_container');
var tallyListEl = document.getElementById('tally');

Product.productArray = ['breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','usb','water-can','wine-glass'];
var allProducts = [];
var myRounds = 5;
var roundCount = myRounds;
Product.uniqueRoundArray = [];

function addElement(childElType, childContent, parentEl) {
  var childElement = document.createElement(childElType);
  childElement.textContent = childContent;
  parentEl.appendChild(childElement);
  return childElement;
}

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

function uniqueArrayGenerator() {
  //Create an array of 6 unique values
  while(Product.uniqueRoundArray.length < 6) {
    var random = makeRandom();
    while(!Product.uniqueRoundArray.includes(random)) {
      console.log('building uniqueArray: ',Product.uniqueRoundArray);
      Product.uniqueRoundArray.push(random);
    }
  }
  console.log('uniqueArray completed: ',Product.uniqueRoundArray);
}

function renderProducts() {
  var uniqueArray = [];

  uniqueArrayGenerator();

  for( var i =0; i < Product.uniqueRoundArray.length; i++) {
    var temp = Product.uniqueRoundArray.shift();
    console.log('temp is: ',temp);
    uniqueArray[i] = temp;
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
  addElement('div',`This is round ${roundCount}`,tallyListEl);
  for ( var v = 0; v < allProducts.length; v++) {
    addElement('li',`${allProducts[v].name}: views=${allProducts[v].views} : votes=${allProducts[v].votes}`,tallyListEl);
  }
}

for (var i = 0; i < Product.productArray.length; i++) {
  new Product(Product.productArray[i]);
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
