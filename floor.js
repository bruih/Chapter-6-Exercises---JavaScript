/*###################################--IMPORTING CUSTOMCSSVAR--#########################################*/
import {
  getCSSVar,
  addCSSVar,
  setCSSVar,
} from "./customCSSVariables.js"
/*###################################--IMPORTING CUSTOMCSSVAR--#########################################*/

const speed = 0.05
const floorClass = document.querySelectorAll("[classNameFloor]")

//stiching floor element together for extension.
export function setupFloor() {
  setCSSVar(floorClass[0], "--left", 0)
  setCSSVar(floorClass[1], "--left", 100)
}

//movement of the floor
export function updateFloor(timeDiff, speedScale) {
  floorClass.forEach(floor => {
    addCSSVar(floor, "--left", timeDiff * speedScale * speed * -1)

//loop the 2 background jpgs together one after another
    if (getCSSVar(floor, "--left") <= -100) {
      addCSSVar(floor, "--left", 200)
    }
  })
}
