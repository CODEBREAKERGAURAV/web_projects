const boxes=document.querySelectorAll('.box');
const gameInfo=document.querySelector('.game-info');
const newGameBtn=document.querySelector('.btn');

let currentPlayer;
let gameGrid;

const winnningPositions=[
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

function initGame()
{
  currentPlayer="X";
  gameGrid=["", "", "", "", "", "", "", "", ""];
  boxes.forEach((box) => {
    box.innerText="";
    box.classList.remove("win");
    box.style.pointerEvents = "auto"; // Enable pointer events
});

  newGameBtn.classList.remove("active");
  gameInfo.innerText=`Current Player -${currentPlayer}`;
   
}
initGame();

function swapTurn()
{
  if(currentPlayer=="X")
  {
    currentPlayer="O";
  }
  else{
     currentPlayer="X";
  }
  gameInfo.innerText=`Current Player-${currentPlayer}`;
}

function checkGameOver() {
  let answer = "";

  winnningPositions.forEach((position) => {
      if (
          gameGrid[position[0]] !== "" &&
          gameGrid[position[0]] === gameGrid[position[1]] &&
          gameGrid[position[1]] === gameGrid[position[2]]
      ) {
          answer = gameGrid[position[0]];
          boxes[position[0]].classList.add("win");
          boxes[position[1]].classList.add("win");
          boxes[position[2]].classList.add("win");
      }
  });

  if (answer !== "") {
      gameInfo.innerText = `Winner - ${answer}`;
      boxes.forEach((box) => box.style.pointerEvents = "none");
      newGameBtn.classList.add("active");
      return; // Stop further checks since the game is over.
  }

  // Check for a tie
  if (!gameGrid.includes("")) {
      gameInfo.innerText = "Game Tied!";
      newGameBtn.classList.add("active");
  }
}


function handleClick(index){
  if(gameGrid[index]==""){
    boxes[index].innerHTML=currentPlayer;
    gameGrid[index]=currentPlayer;
    boxes[index].style.pointerEvents="none";
    swapTurn();
    checkGameOver(); 
  }

}

boxes.forEach((box,index)=>{
  box.addEventListener("click",()=>{
    handleClick(index);
  })
});

newGameBtn.addEventListener("click",initGame);



 