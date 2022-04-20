/*###################################--IMPORTING CUSTOMCSSVAR--#########################################*/
import {
  setCSSVar,
  addCSSVar,
  getCSSVar,
} from "./customCSSVariables.js"
/*###################################--IMPORTING CUSTOMCSSVAR--#########################################*/



/*###################################--DECLARE VARS--#########################################*/
const speed = 0.2 //speed of HuTao

/*time interval between HuTao spawns. The min spawn time will be 300 milliseconds, max is 5 seconds. RNG will pick random numbers between that. */
const minInterval = 300 
const maxInterval = 5000 
const worldElem = document.querySelector("[classNameWorld]")
/*###################################--DECLARE VARS--#########################################*/



let whenHutaoisSpawning
//this function will spawn a HuTao, also removes all the old HuTaos from the previous instance of the game.
export function setHutao() { 
  whenHutaoisSpawning = minInterval
  document.querySelectorAll("[data-hutao]").forEach(hutao => { //selects the HuTaos
    hutao.remove()
  })
}

//movement
export function updateHuTao(timeDiff, speedScale) {
  document.querySelectorAll("[data-hutao]").forEach(hutao => { //selects the HuTaos
    addCSSVar(hutao, "--left", timeDiff * speedScale * speed * -1) // add "--left" value to the product of timeDiff * speedScale * speed * -1
    if (getCSSVar(hutao, "--left") <= -100) { // when Hutao reaches the end side of the screen, remove her!
      hutao.remove()
    }
  })

//when setHutao reaches 0, spawn another one
  if (whenHutaoisSpawning <= 0) { 
    spawnHuTao()
    whenHutaoisSpawning =
      RNG(minInterval, maxInterval) / speedScale
  }
  whenHutaoisSpawning -= timeDiff
}

//Dimension of HuTao
export function getHuTaoSize() {
  return [...document.querySelectorAll("[data-hutao]")].map(hutao => { /*Select all HuTao, spread "..." operator is used to use .map to convert data-hutao to a different value*/
    return hutao.getBoundingClientRect() //return the size of the element.
  })
}

//actual HuTao object.  
function spawnHuTao() {
  const hutao = document.createElement("img")
  hutao.dataset.hutao = true
  hutao.src = "objectImg/hutao.gif"
  hutao.classList.add("hutao")
  setCSSVar(hutao, "--left", 100)
  worldElem.append(hutao)
}

//to make the random spawn time of hutao obstacle.
function RNG(min, max) {
  return Math.floor(Math.random() * (max - min) + min) // math.random will summon a number between 0 and 1. To make sure that value fits within the min max value, multiply and add the min. Math.floor to return whole number.
} 
