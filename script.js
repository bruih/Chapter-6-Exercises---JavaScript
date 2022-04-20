/*#########################################--IMPORT SCRIPTS--####################################################*/
import { updateFloor, setupFloor } from './floor.js';
import { updateRock, setupRock } from './rock.js';
import { updateQiqi, setupQiqi, getQiqiSize } from './qiqichar.js';
import { updateHuTao, setHutao, getHuTaoSize } from './enemyhutao.js';
/*#########################################--IMPORT SCRIPTS--####################################################*/




/*#########################################--DECLARE VARS--####################################################*/
const worldElem = document.querySelector("[classNameWorld]")
const scoreElem = document.querySelector("[classNameScore]")
const startScreenElem = document.querySelector("[classNameStart]")
const loseScreenElem = document.querySelector("[classNameLose]")
var qiqiSoundSFX = [ 'sound1', 'sound2', 'sound3'] // for randomized sound effect when qiqi jumps

/*for scaling how big the game world is gonna be.*/
const gameWidth = 100
const gameHeight = 30
// for adjusting speed velocity of the game
let speedScale 
let score


// will play the sound effect when spacebar is pressed
document.body.onkeydown = function(e){ 
  if(e.keyCode == 32){ 
    setTimeout(function(){randomSound() }, 150);
  }
}
/*#########################################--DECLARE VARS--####################################################*/




/*#########################################--MAIN MENU OF GAME--################################################*/
setWorldScaling()
window.addEventListener("resize", setWorldScaling)
document.addEventListener("keydown", startGame, { once: true })
loseScreenElem.classList.add("hide")
/*#########################################--MAIN MENU OF GAME--################################################*/





/*###################################--FUNCTIONS FOR CLASSES/OBJECTS--#########################################*/

//function for updating all the pixel positions of the objects in the game consistently since everything is moving to the left, in exception for the character being stationary. 
let lastTime //placeholder for the preceeding time
function update(time) {
  if (lastTime == null) { //change the time from the moment the program begins to avoid hiccups.
    lastTime = time
    window.requestAnimationFrame(update) //calling the function by passing it using window.requestAnimationFrame, the update will base on the refresh rate of the monitor. Duplicated the code to enable loop.
    return
  }
  const timeDiff = time - lastTime

  //calling the object functions to make sure all of it uses the update
  updateRock(timeDiff, speedScale)
  updateFloor(timeDiff, speedScale)
  updateQiqi(timeDiff, speedScale)
  updateHuTao(timeDiff, speedScale)
  updateScore(timeDiff)
  if (isLose()) return gameOver()
  lastTime = time
  window.requestAnimationFrame(update)
}

function isLose() {
  const qiqiSize = getQiqiSize() //declare constant of the character and get the size.
  return getHuTaoSize().some(rect => hitCollision(rect, qiqiSize)) //determines if the object had interacted with the player.
}

function hitCollision(rect1, rect2) { //determines the hit collision of the player and the object.
  return (
    rect1.left < rect2.right && rect1.top < rect2.bottom && rect1.right > rect2.left &&rect1.bottom > rect2.top
  )
}

function updateScore(timeDiff) {
  score += timeDiff * 0.005 //score system is is calculated that every 5 microseconds , u get one point
  scoreElem.textContent = Math.floor(score) // return whole number
}

function startGame() {
  lastTime = null
  speedScale = 1.2 //game speed of the world
  score = 0
  setupFloor() //call function
  setupRock() //call function
  setupQiqi()//call function
  setHutao()//call function
  startScreenElem.classList.add("hide") //hide startscreen
  loseScreenElem.classList.add("hide") //hide losescreen
  window.requestAnimationFrame(update)

  /*pauses the lose-audio and resets it back then play the BGM when game starts over*/
  var audio = document.getElementById("loseaudio");
  audio.pause();
  audio.currentTime = 0; //resets the lose audio back to the start
  playBGM()
}

function playLoseAudio() {
  var audio = document.getElementById("loseaudio");
  audio.play();
}

function playBGM() {
  var audio = document.getElementById("bgmaudio");
  audio.play();
}

function randomSound() {
    var index = Math.floor(Math.random() * 5) % qiqiSoundSFX.length; //used modulo to get the right index that fits to the number of sounds present in the array.
    var id = qiqiSoundSFX[index];
    var audioElement = document.getElementById(id);
    audioElement.play();
}

function gameOver() {
  setTimeout(() => {
    document.addEventListener("keydown", startGame, { once: true }) // game will stay at the game over screen as long as the player did not press any keys.
    loseScreenElem.classList.remove("hide") //while in the timeout, show the game-over text.

/*for pausing the bgm-audio and playing the lose-audio*/
  var audio = document.getElementById("bgmaudio");
  audio.pause();
  audio.currentTime = 0;
    playLoseAudio()
  }, 100)
}

function setWorldScaling() {
  let worldScale
  if (window.innerWidth / window.innerHeight < gameWidth / gameHeight) { /*this is for the total Window interface in pixels, if the interior screen size is bigger than the given value, then scale it depending on the given value.  */
    worldScale = window.innerWidth / gameWidth
  } else {
    worldScale = window.innerHeight / gameHeight
  } 
  worldElem.style.width = `${gameWidth * worldScale}px`
  worldElem.style.height = `${gameHeight * worldScale}px`
}
/*###################################--FUNCTIONS FOR CLASSES/OBJECTS--#########################################*/