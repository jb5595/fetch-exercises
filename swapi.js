// Add your code for SWAPI here!
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector("#crawlBtn").addEventListener("click", openingCrawl)
  document.querySelector("#planetForm").addEventListener("submit", planetSearch)
  displayDroids()
});

function openingCrawl(){
  fetch('https://swapi.co/api/films/1/')
  .then(res => res.json())
  .then(json => displayOpeningCrawl(json))
}

function displayOpeningCrawl(json){
  let parentNode = document.querySelector("#crawlDiv")
  if (parentNode.firstChild) {
    parentNode.removeChild(parentNode.firstChild);
  }
  let crawlNode = document.createElement("p")
  parentNode.appendChild(crawlNode)
  crawlNode.innerHTML = json["opening_crawl"]
}

function planetSearch(event) {
  event.preventDefault()
  let userInput = event.target.querySelector("#planetInput").value
  if (userInput < 1 || userInput >60 || isNaN(userInput)){
    alert("Please Input Number Between 1 and 60")
  }
  let url = `https://swapi.co/api/planets/${userInput}/`
  fetch(url)
  .then(res => res.json())
  .then(json => displayPlanetInfo(json))
}

function displayPlanetInfo(json){
  let parentNode = document.querySelector("#planetData")
  let planetNode = document.createElement("ul")
  parentNode.appendChild(planetNode)
  planetNode.innerHTML = `
  <li>Name: ${json.name}</li>
  <li>Climate ${json.climate}</li>`
}

function displayDroids(){
  let baseUrl = "https://swapi.co/api/people/"
  getDroid(baseUrl+"2/")
  getDroid(baseUrl+"3/")

}

function getDroid(url){
  fetch(url)
  .then(res => res.json())
  .then(json => displayDroid(json))
}

function displayDroid(json){
  let parentNode = document.querySelector("#droidData")
  let planetNode = document.createElement("ul")
  parentNode.appendChild(planetNode)

  planetNode.innerHTML = `
  <li>Name: ${json.name}</li>
  <li>Height ${json.height}</li>
  <li>Weight ${json.mass}</li>
  <button id = '${json.name}-button' data-homeworld = '${json.homeworld}' data-name = '${json.name}' >Show Homeworld Details</button>
  <div id = '${json.name}-homeworld-details'></div>`
  document.querySelector(`#${json.name}-button`).addEventListener("click",showHomeworldDetails)
}

function showHomeworldDetails(event){
  let url = event.target.dataset.homeworld
  fetch(url)
  .then(res => res.json())
  .then(json => displayHomeworldDetails(json, event))
  }


function displayHomeworldDetails(json, event){
  let characterName = event.target.dataset.name
  let parentNode = document.querySelector(`#${characterName}-homeworld-details`)
  let planetNode = document.createElement("ul")
  if (parentNode.firstChild) {
    parentNode.removeChild(parentNode.firstChild);
  }
  parentNode.appendChild(planetNode)
  planetNode.innerHTML = `
  <h7>Homeworld Info </h7>
  <li>Name: ${json.name}</li>
  <li>Climate ${json.climate}</li>`
}


// When the page loads, fetch the data for the characters C-3P0 (id: 2) and R2-D2 (id: 3)
// Show each droid's name, height, and mass on the screen in the #droidData
//
// Display a button for each droid that reads 'Show Homeworld Details'
//
// On click, this button should fetch to the api again to get information about the planet
//
// Things to consider:
//
// What information do you need from the first fetch to make the second?
// How can you store this data on the page (without the user seeing it)?
// When should you add the event listener for these two buttons?
