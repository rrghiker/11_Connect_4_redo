/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */
function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array

  const subArr = []         //create new, local subArray
  board.length = 0;         //empty board

  // Make board without a shallow copy
  for (let y = 0; y < HEIGHT; y++){   
    let subArr = [];   
    for (let x = 0; x < WIDTH; x++) {
      subArr.push(null);
    }
    board.push(subArr);
  }
 
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  let htmlBoard = document.getElementById("board")      //board has to be linked to the table in html; id='board'


  // TODO: add comment for this code
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  // Appends tds to the top row and assigns a column
  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);                    //appends top row to the table

  // TODO: add comment for this code
  for (let y = 0; y < HEIGHT; y++) {            //creates new row 
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);     //creates cell and assigns position id in the table matrix 
      row.append(cell);                         //appends cell to the row
    }
    htmlBoard.append(row);                      //appends new row to the table
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  // let z = HEIGHT - 1;

    for (let y = HEIGHT-1; y > -1; y--){
      if (board[y][x] === null){
        return y;
      }
  }
  return false; 
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell

  //has to get the id from the click listener to know matrix position
  //position should be passed into the table
  //add div to correct td cell with class=piece

  //get specified table tr

  const cell = document.getElementById(`${y}-${x}`);
  const div = document.createElement("div");

  div.classList.add(`p${currPlayer}`);

  cell.append(div);

}

/** endGame: announce game end */

function endGame(message) {
  // TODO: pop up alert message
  alert(message);


}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
     
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === false) {
    return;
  }
 
 
    // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);
  board[y][x] = currPlayer;


    // check for win
    if (checkForWin()) {
      return endGame(`Player ${currPlayer} won!`);
    }
  
      // check for tie
    // TODO: check if all cells in board are filled; if so call, call endGame

    //planned to loop through solution.  Checked solution and they used two every methods
    // let newArr = board[6].every(function(val){
    //   return val !== null;
    // });
    // if(newArr){
    //   let message = "Tie game! Play again!";
    //   endGame(message);
    // }



    // switch players
  // TODO: switch currPlayer 1 <-> 2
    currPlayer = (currPlayer == 1) ? 2:1;  


}





/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>          //checks if all the coordinates are in bounds
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer      //checks if player has this square and returns true 
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
