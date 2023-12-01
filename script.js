let gameHasEnded = false
let boxes = Array.from(document.getElementsByClassName("box"))
let spaces = Array(9).fill(null)

const X_TEXT = "X"
const O_TEXT = "O"
const WINNING_ANIMATION_TIME = 200

let currentPlayer = X_TEXT
boxes.forEach(box => {
    box.addEventListener('click', onBoxClick)
    
})

//typing effect
var typingLoopIndex = 0
var speed = 50


function onBoxClick(e){

    if(gameHasEnded)
        return

    const id = e.target.id
    
    if(!spaces[id]){
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer
        e.target.classList.add("onBoxClicked")
     
        if(isWinningGame() !== false){
             winGame(isWinningGame());
        }
        else{
            currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT
        }
    }

}

function winGame([a, b, c]){

    boxes.forEach(box => box.classList.add('inactive-hover'))
    gameHasEnded = true
    document.getElementById("header").innerText = ""
    typeWriter()
    let counter = 0;
    for(const box of [a, b, c]){
        counter++;
        console.log(box);

        setInterval(() => {
            currentBox = boxes[box - 1]
            currentBox.style.backgroundColor = getComputedStyle(document.body).getPropertyValue('--winBoxesColor');
        }, WINNING_ANIMATION_TIME * counter)
    }
}

function typeWriter(){

    var txt = 'Player ' + currentPlayer + ' has won!'
    if (typingLoopIndex < txt.length) {
        document.getElementById("header").innerHTML += txt.charAt(typingLoopIndex)
        typingLoopIndex++
        setTimeout(typeWriter, speed)
      }
}

const winningCombos = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 5, 9], [3, 5, 7], [1, 4, 7], [2, 5, 8], [3, 6, 9]];

function isWinningGame(){
    for(const condition of winningCombos){
        let [a, b, c] = condition
        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])){
            return condition
        }
    }

    return false
}