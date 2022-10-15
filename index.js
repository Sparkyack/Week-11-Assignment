const X_CLASS = "x";               //variable for x turn
const CIRCLE_Class = "circle";     //variable for o turn
const WINNING_COMBINATIONS = [     //variable for possible winning combos
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cellElements = document.querySelectorAll("[data-cell]")                            //creates a variable to access each individual cell "div"
const board = document.getElementById("board")                                           //creates variable for board div
const winningMessageElement = document.getElementById("winningMessage")                  //creates variable for the winning message div
const restartButton = document.getElementById("restartButton")                           //creates variable for the restart button element div
const winningMessageTextElement = document.querySelector("[data-winning-message-text]")  //creates variable to access thge winning message div
const turnMessageTextElement = document.querySelector("[data-turn-message-text") 
let circleTurn

startGame()                                                       //calls the start game function

restartButton.addEventListener("click", startGame)                //adds event listener for restart button that takes in click and startgame function

function startGame() {                                            //function made to start the game. starts on x turn circles turn is false
    circleTurn = false                                            //sets all perimeters for how to start game
    cellElements.forEach(cell => {                                //this is to loop through all cells
        cell.classList.remove(X_CLASS)                            //clears all x off board when restart button is clicked
        cell.classList.remove(CIRCLE_Class)                       //clears all o off of board when restart button is clicked
        cell.removeEventListener("click", handleClick)                               
        cell.addEventListener("click", handleClick, {once: true}) //makes it so you can click on the cell only once
    })
    turnMessage()                                                 //calls the turn message to start the game
    setBoardHoverClass()                                          //calls the hover function when the game starts
    winningMessageElement.classList.remove("show")                //this is for the restart button. it removes the show class 
}

function handleClick(e){
    const cell = e.target                                        //function for handle click. takes an evengt for perimeter. you can only click on a cell 1x
    const currentClass = circleTurn ? CIRCLE_Class : X_CLASS     //this applies the class to whose turn it is                               
    placeMark(cell, currentClass)                                //calls the place mark function
    if (checkWin(currentClass)) {                                //if statement to check winning combinations
        endGame(false)                                           //calls endGame function insert the end game messages
    } else if (isDraw()) {                                       //checks conditions for a draw
        endGame(true)                                            //runs endGame function if return true
    } else{                                                      //everything else run swapTurns function and continue to game
        swapTurns()                                              //calls swap turn function after these functions have ran
        turnMessage()                                            //calls the turn message and displays whosa turn it is
        setBoardHoverClass()                                     //calls the hover function after these functions have ran
    }
}

function turnMessage(){                                           //turn message function calls the turn elements and displays whos turn it is
    if(circleTurn){                                               //if circles turn
    turnMessageTextElement.innerText = "O's Turn"                 //display o's turn
    }else{                                                        //everything else 
        turnMessageTextElement.innerText = "X's Turn"             //displays X's turn
    }
}
    

function endGame(draw) {                                                            //function calls all the endGame messages
    if(draw) {                                                                      //if statement takes in the perameter draw
            winningMessageTextElement.innerText = "Draw!"                           //this is thge message for a draw inserts the draw! message into winning message element
    } else {                                                                        //else statement
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!` //sets winning message
    }                                                                               //checks turn, then pints out if o wins or x wins then the text Wins!
        winningMessageElement.classList.add("show")                                 //shows the winning game text element "show"
}

function isDraw(){                                                                           
    return [...cellElements].every(cell => {                                                //isDraw functions checks to see if every cell has been filled
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_Class)    //if every cell has either an x or o return true
    })
}

function placeMark(cell, currentClass){                           //function that places the mark for what classes turn it is
    cell.classList.add(currentClass)
}

function swapTurns(){                                             //function that swaps the turns every other move
    circleTurn = !circleTurn                                      //if not equal to circleTurn its X
}

function setBoardHoverClass(){                                    //function that makes the hover method equal to 
    board.classList.remove(X_CLASS)                               //remove the X class
    board.classList.remove(CIRCLE_Class)                          //remove the circle class
    if (circleTurn) {                                             
        board.classList.add(CIRCLE_Class)                         //if circle turn add the circle hover class to the board div
    }else {                                                       //show circle hover
        board.classList.add(X_CLASS)                              //everything else add the x hover class to the board div
    }                                                             //show circle hover
}

function checkWin(currentClass){                                         //function to compare winning combos.
    return WINNING_COMBINATIONS.some(combination => {                    //if any combos return true that is the winner
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })                                                               //compares all combos that have the same class
    })                              
}
