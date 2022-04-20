/*###################################--IMPORTING CUSTOMCSSVAR--#########################################*/
import {
  addCSSVar,
  setCSSVar,
  getCSSVar,
} from "./customCSSVariables.js"
/*###################################--IMPORTING CUSTOMCSSVAR--#########################################*/

const QIQI = document.querySelector("[classNameQiqi]")
const jumpSpeed = 0.43 //how tall qiqi can jump
const GRAVITY = 0.0017 //for the physics while jumping
let jumping
let yVelocity //y axis velocity

//baase point of character
export function setupQiqi() {
  jumping = false
  yVelocity = 0
  setCSSVar(QIQI, "--bottom", 0)

  document.removeEventListener("keydown", onJump) //remove the pressed button and resets it back using add if player lose.
  document.addEventListener("keydown", onJump)
}

export function updateQiqi(timeDiff, speedScale) { //updates the char location each frame
  moving(timeDiff, speedScale)
  handleJump(timeDiff)
}

export function getQiqiSize() { //gets the dimension of qiqi
  return QIQI.getBoundingClientRect()
}


//change character image when jump/moving
function moving(timeDiff, speedScale) {
  if (jumping) {
    QIQI.src = `objectImg/qiqijump.jpg`
    return
  }
  else {
    QIQI.src = `objectImg/qiqistand.jpg`
    return
    
  }
  
}

function handleJump(timeDiff) {
  if (!jumping) return //checking if the player has just or not
  addCSSVar(QIQI, "--bottom", yVelocity * timeDiff) //add the velocity of that amount to the base position of character 
  if (getCSSVar(QIQI, "--bottom") <= 0) { //getting the bottom element of the character, if player is as is, leave it be
    setCSSVar(QIQI, "--bottom", 0)
    jumping = false //boolean to let the code know that it is not jumping
  }
  yVelocity -= GRAVITY * timeDiff //when player jump, a jump speed is initialized, as time passes it subtracts gravity from velocity
}

//for the spacebar jump 
function onJump(e) { 
  if (e.code !== "Space" || jumping) return //if space is pressed or is jumping. leave it as is
  yVelocity = jumpSpeed
  jumping = true // boolean to let the code know that it is jumping
}

