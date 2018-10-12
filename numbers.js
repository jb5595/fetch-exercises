// Add your code for the numbers API here!
document.addEventListener('DOMContentLoaded', () => {
setInterval(yearFacts,5000)
document.querySelector("#number-one").addEventListener("click",factAbout1)
document.querySelector("#pick-a-number").addEventListener("keyup",randomNumberFact)
document.querySelector("#all-numbers-button").addEventListener("click", allTheNumbers)
});

// When the page loads, start an interval:
// Every 5 seconds, fetch a fact about a year and show it on the screen in the #year-history div
// Start with this year
// Every 5 seconds, get the fact about the previous year
let year = 2018

function allTheNumbers(){
  let url = "http://numbersapi.com/1..1000"
  fetch(url)
  .then(res => res.json())
  .then(json => displayAllTheNumbers(json))
}

function displayAllTheNumbers(json) {
  let parentNode = document.querySelector("#all-the-numbers")
  while (parentNode.firstChild) {
    parentNode.removeChild(parentNode.firstChild);
  }
  for(number in json){
    let headerNode = document.createElement("h4")
    let node = document.createElement("p")
    parentNode.appendChild(headerNode)
    parentNode.appendChild(node)
    headerNode.innerText = `${number}:`
    node.innerText = `${json[number]}`
  }

}

function yearFacts(){
  let url = `http://numbersapi.com/${year}/year`
    fetch(url)
    .then(res => res.text())
    .then(text => displayYearFact(text, year--))
}
function displayYearFact(text, year) {

  let parentNode = document.querySelector("#year-history")
  let headerNode = document.createElement("h4")
  let node = document.createElement("p")
  parentNode.appendChild(headerNode)
  parentNode.appendChild(node)
  headerNode.innerText = `${year}:`
  node.innerText = text
}


function factAbout1(){

  let url =  "http://numbersapi.com/1"
  fetch(url)
  .then(res => res.text())
  .then(text => displayFactAbout1(text))
  // .then(json => displayFactAbout1(json))
}

function randomNumberFact(event){
  if (isNaN(event.key) && event.key != "Backspace"){
    alert("Number Inputs Only")
  }
  else{
    let userInput = event.target.value
    if (userInput != ""){
      let url = `http://numbersapi.com/${userInput}`
      fetch(url)
      .then(res =>res.text())
      .then(text =>displayRandomNumberFact(text))
    }
  }
}

function displayRandomNumberFact(text){
  let parentNode = document.querySelector("#random-math-fact")
  let factNode = document.createElement("p")
  if (parentNode.firstChild) {
    parentNode.removeChild(parentNode.firstChild);
  }
  parentNode.appendChild(factNode)
  factNode.innerHTML = text;
}

function displayFactAbout1(text){
  let parentNode = document.querySelector("#one-facts")
  let factNode = document.createElement("p")
  if (parentNode.firstChild) {
    parentNode.removeChild(parentNode.firstChild);
  }
  parentNode.appendChild(factNode)
  factNode.innerHTML = text;
}
