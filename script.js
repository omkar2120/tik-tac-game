const statusDisplay = document.querySelector('.game--status');
const header = document.querySelector(".header");
let xResult=Number(document.querySelector("#result1").innerText);
let oResult=Number(document.querySelector("#result2").innerText);



let gameActive = true;              // game start
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
 

const winningMessage = () => `Player ${currentPlayer} Has Won The Game !`;  // winning  game message
const drawMessage = () => `Game Ended In a Draw !`;// draw game message
const currentPlayerTurn = () => `It's ${currentPlayer}'s Turn`;   // current player turn

statusDisplay.innerHTML = currentPlayerTurn();                    // display current player turn

const winningConditions = [ 
    [0, 1, 2],                                                    // conditions  
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// handleCellPlayed function is for when we  click on cell  then its worked

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}
//  we will check whether there are any value in our game


function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            if(currentPlayer=="X")
            {
                xResult++;
                document.querySelector("#result1").innerText=xResult;

            }
            else if(currentPlayer=="O")
            {
                oResult++;
                document.querySelector("#result2").innerText=oResult;

            }
            roundWon = true;
            break
        }
    }

    if (roundWon) {

        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}
 

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute("data-cell-index"));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

// this function work on restart game

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);             

