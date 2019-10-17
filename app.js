'use strict';
// Global Variables -------------------------------
var leftImageEl = document.getElementById('left');
var middleImageEl = document.getElementById('middle');
var rightImageEl = document.getElementById('right');

var containerEl = document.getElementById('image_container');
var tallyListEl = document.getElementById('tally');

Product.productArray = ['breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','usb','water-can','wine-glass'];
var allProducts = [];
var myRounds = 25;
var roundCount = myRounds;
var storageName = 'storedProducts';
Product.uniqueRoundArray = [];

Product.nameData = [];
Product.voteData = [];
//Local storage array in parsed format
Product.localStore = [];

// Helper Functions ------------------------------------------
//Add elements to the DOM
function addElement(childElType, childContent, parentEl) {
  var childElement = document.createElement(childElType);
  childElement.textContent = childContent;
  parentEl.appendChild(childElement);
  return childElement;
}
// Makes the random number
function makeRandom() {
  return Math.floor(Math.random() * allProducts.length);
}
//Create an array of 6 unique values
function uniqueArrayGenerator() {
  while(Product.uniqueRoundArray.length < 6) {
    var random = makeRandom();
    while(!Product.uniqueRoundArray.includes(random)) {
      Product.uniqueRoundArray.push(random);
    }
  }
}
//Main functions and objects ----------------------------------
//Constructor function for products
function Product(name) {
  this.name = name;
  this.path = `img/${name}.jpg`;
  this.views = 0;
  this.votes = 0;
  allProducts.push(this);
}
//**** LocalStorage functions ****/
function getParsedStorage() {
  var storageTerrelsBasement = localStorage.getItem(storageName);
  //parsing TerrelsBasement
  var parsedTerrelsBasement = JSON.parse(storageTerrelsBasement);
  return parsedTerrelsBasement;
}
function setLocalStorage() {
  var terrelsBasementStringified = JSON.stringify(allProducts);
  //storing 'data' into local storage
  localStorage.setItem(storageName, terrelsBasementStringified);
}

//Renders the images to the page
function renderProducts() {
  var uniqueArray = [];

  //Create unique array of 6 numbers
  uniqueArrayGenerator();

  for( var i =0; i < Product.uniqueRoundArray.length; i++) {
    var temp = Product.uniqueRoundArray.shift();
    // console.log('temp is: ',temp);
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

  //Add to local storage AllProducts

  // Build tally list
  addElement('div',`This is round ${roundCount}`,tallyListEl);
  for ( var v = 0; v < allProducts.length; v++) {
    addElement('li',`${allProducts[v].name}: views=${allProducts[v].views} : votes=${allProducts[v].votes}`,tallyListEl);
  }
}

//Creates the Product objects
function createProductsObjects() {

  if (!localStorage.storedProducts) { //Create new products if no storage exist
    console.log('nothing in local storage');
    for (var i = 0; i < Product.productArray.length; i++) {
      new Product(Product.productArray[i]);
    }
    // addproductsStorage();
    console.log('no storage');
  } else { //Create new products from local storage to make sure persist
    Product.localStore = getParsedStorage();
    for (i = 0; i < Product.productArray.length; i++) {
      new Product(Product.localStore[i].name);
      allProducts[i].views = Product.localStore[i].views;
      allProducts[i].votes = Product.localStore[i].votes;
    }
    console.log('storage exist');
  }
}

createProductsObjects();

//Handle Screen Click
function handleClick() {
  var chosenImage = event.target.title;
  for( var i = 0; i < allProducts.length; i++) {
    if(allProducts[i].name === chosenImage) {
      allProducts[i].votes++;
    }
  }

  console.log('Product.localStore: ',Product.localStore);
  roundCount--;
  // End of Rounds
  if (roundCount <= 0) {
    //Build end list
    var select = document.querySelector('#tally');
    select.innerHTML = '';
    var image = document.querySelector('#image_container');
    image.style.display = 'none';
    document.querySelector('#instructions').remove();
    containerEl.removeEventListener('click', handleClick);
    addElement('div',`Results after ${myRounds} rounds:`,tallyListEl);
    for ( var x = 0; x < allProducts.length; x++) {
      addElement('li',`${allProducts[x].name}: views=${allProducts[x].views} : votes=${allProducts[x].votes}`,tallyListEl);
    }
    setLocalStorage();
    makeChart();
  }
  // re render the tally list and start next round
  if (roundCount > 0) {
    select = document.querySelector('#tally');
    select.innerHTML = '';
    renderProducts();
  }
}

//Render Chart
var makeChart = function() {
  // add results to array
  for (var n = 0;n < allProducts.length;n++) {
    Product.nameData[n] = allProducts[n].name;
    Product.voteData[n] = Product.localStore[n].votes;
    console.log(allProducts[n].name,Product.localStore[n].votes);
  }
  var ctx = document.getElementById('barData').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Product.nameData,
      datasets: [{
        label: '# of Votes',
        data: Product.voteData,
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1
      }]
    },
    options: {responsive: true ,maintainAspectRatio: false,
      scales: {yAxes: [{ticks: {beginAtZero: true, stepSize: 1}}]}
    }
  });
};

//Add event listener to container
containerEl.addEventListener('click', handleClick);

//Render first round
renderProducts();
