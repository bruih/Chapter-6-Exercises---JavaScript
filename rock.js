/*###################################--IMPORTING CUSTOMCSSVAR--#########################################*/
import {
  getCSSVar,
  addCSSVar,
  setCSSVar,
} from "./customCSSVariables.js"
/*###################################--IMPORTING CUSTOMCSSVAR--#########################################*/

const speed = 0.05 //set up the speed of the rock movement
const rockElems = document.querySelectorAll("[classNameRock]") //declare which class to move

export function setupRock() { //to combine the rock background element to extend it a little bit, thats why creating 2 is important
  setCSSVar(rockElems[0], "--left", 0)
  setCSSVar(rockElems[1], "--left", 100)
}

export function updateRock(timeDiff, speedScale) {
  rockElems.forEach(rock => { //select all rock
    addCSSVar(rock, "--left", timeDiff * speedScale * speed * -1) 

    if (getCSSVar(rock, "--left") <= -100) { /*to loop the rock background over again, the moment it reaches the other side of the screen, it will loop with the 2nd rock element */
      addCSSVar(rock, "--left", 200) //to consistently bridge the 2 rock backgrounds together
    }
  })
}
