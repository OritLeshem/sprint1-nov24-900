'use strict'
const MINE = '💣'
const WALL = 'WALL'
const FLOOR = 'FLOOR'
const BALL = 'BALL'
const GAMER = 'GAMER'

const GAMER_IMG = '<img src="img/gamer.png">'
const BALL_IMG = '<img src="img/ball.png">'

// Model:
var countNeg
var gBoard
var gGamerPos
var gInterval
var gballsCounter
var gBallsOnBoard = 2

function onInitGame() {
  gballsCounter = 0
  gGamerPos = { i: 2, j: 9 }
  gBoard = buildBoard()
  gInterval = setInterval(addBall, 3000)
  clearInterval(gInterval)
  renderBoard(gBoard)
  // countUpNegs(gGamerPos.i, gGamerPos.j, gBoard)

  addBall()
}

function buildBoard() {
  const board = []
  // DONE: Create the Matrix 10 * 12 
  // DONE: Put FLOOR everywhere and WALL at edges
  for (var i = 0; i < 10; i++) {
    board[i] = []
    for (var j = 0; j < 12; j++) {
      board[i][j] = { type: FLOOR, gameElement: null, miesAroundCount: 4, isShown: false, isMine: false, isMarked: true }
      if (i === 0 || i === 9 || j === 0 || j === 11) {
        board[i][j].type = WALL
      }
    }
  }
  board[3][3].isMine = true
  board[0][5].type = 'FLOOR'
  board[0][5].gameElement = null
  board[9][5].type = 'FLOOR'
  board[9][5].gameElement = null

  board[5][0].type = 'FLOOR'
  board[5][0].gameElement = null
  board[5][11].type = 'FLOOR'
  board[5][11].gameElement = null


  // DONE: Place the gamer and two balls
  board[gGamerPos.i][gGamerPos.j].gameElement = GAMER//{i:2, j:9}
  board[5][5].gameElement = BALL
  board[7][2].gameElement = BALL

  // console.log(board)
  return board
}

// Render the board to an HTML table
function renderBoard(board) {

  const elBoard = document.querySelector('.board')
  var strHTML = ''
  for (var i = 0; i < board.length; i++) {
    strHTML += '<tr>\n'
    for (var j = 0; j < board[0].length; j++) {
      const currCell = board[i][j]

      var cellClass = getClassName({ i: i, j: j })
      // console.log('cellClass:', cellClass)

      if (currCell.type === FLOOR) cellClass += ' floor'
      else if (currCell.type === WALL) cellClass += ' wall'

      strHTML += `\t<td class="cell ${cellClass}"  onclick="moveTo(${i},${j})" >\n`
      if (currCell.isMine === true) strHTML += MINE
      if (currCell.gameElement === GAMER) {
        strHTML += GAMER_IMG
      } else if (currCell.gameElement === BALL) {
        strHTML += BALL_IMG
      }

      strHTML += '\t</td>\n'
    }
    strHTML += '</tr>\n'
  }

  elBoard.innerHTML = strHTML
}

// Move the player to a specific location

function moveTo(i, j) {
  console.log(i, j)
  countNeg = 0
  // countUpNegs(i, j, gBoard)

  // Calculate distance to make sure we are moving to a neighbor cell
  const iAbsDiff = Math.abs(i - gGamerPos.i)
  const jAbsDiff = Math.abs(j - gGamerPos.j)

  // If the clicked Cell is one of the four allowed
  if ((iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0)
    || (iAbsDiff === gBoard.length - 1) || (iAbsDiff === gBoard[0].length - 1)) {

    if (j === -1) j = gBoard[0].length - 1
    else if (j === gBoard[0].length) j = 0
    const targetCell = gBoard[i][j]

    if (targetCell.type === WALL) return

    if (targetCell.gameElement === BALL) {
      console.log('Collecting!')
      playSound()
      gBallsOnBoard--
      gballsCounter++


      if (!gBallsOnBoard) console.log("victory")
      var elCounter = document.querySelector('h2')
      elCounter.innerText = `counter : ${gballsCounter}`
    }

    // DONE: Move the gamer
    // REMOVING FROM
    // update Model
    gBoard[gGamerPos.i][gGamerPos.j].gameElement = null
    // update DOM
    renderCell(gGamerPos, '')

    // ADD TO
    // update Model
    targetCell.gameElement = GAMER
    gGamerPos = { i, j }
    // update DOM
    renderCell(gGamerPos, GAMER_IMG)

  }
}


// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
  const cellSelector = '.' + getClassName(location) // cell-i-j
  const elCell = document.querySelector(cellSelector)
  elCell.innerHTML = value

}

// Move the player by keyboard arrows
function onHandleKey(event) {
  const i = gGamerPos.i
  const j = gGamerPos.j
  console.log('event.key:', event.key)

  switch (event.key) {
    case 'ArrowLeft':
      moveTo(i, j - 1)
      break
    case 'ArrowRight':
      moveTo(i, j + 1)
      break
    case 'ArrowUp':
      moveTo(i - 1, j)
      break
    case 'ArrowDown':
      moveTo(i + 1, j)
      break
  }
}

// Returns the class name for a specific cell
function getClassName(location) {
  const cellClass = 'cell-' + location.i + '-' + location.j
  return cellClass
}
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}
console.log(gBoard)
function countUpNegs(cellI, cellJ, mat) {
  // console.log(cellI, cellJ, mat)

  console.log(cellI, cellJ, mat)
  // console.log('cellI', cellI)
  // console.log('cellJ', cellJ)
  countNeg = 0
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= mat.length) continue
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (j < 0 || j >= mat[0].length) continue
      if (i === cellI && j === cellJ) continue
      // console.log('mat[i][j]', mat[i][j])
      if (mat[i][j].gameElement === BALL) {
        countNeg++
        // Update the model :
        var elNeg = document.querySelector('h3')
        elNeg.innerText = `neighbours : ${countNeg}`
        console.log("countNeg", countNeg++)
        // mat[i][j] = ''


      }
    }
  }
  // console.log('mat', mat)



}

function playSound() {
  const sound = new Audio('pop.wav')
  sound.play()
}
function onRestart() {
  clearInterval(gInterval)
  gInterval = setInterval(addBall, 3000)
  console.log("restart clicked")
  gballsCounter = 0
  gGamerPos = { i: 2, j: 9 }
  gBoard = buildBoard()
  renderBoard(gBoard)
  addBall()
}


function addBall() {
  console.log("random add ball")
  var indexBall = getRandomBallPos()
  gBoard[indexBall.i][indexBall.j].gameElement = 'BALL'
  renderCell(indexBall, '⚽️')
  console.log("random add ball in position :", indexBall.i, indexBall.j)
  gBallsOnBoard++
}

function checkEmptyCells() {
  var emptyCellsArr = []
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[0].length; j++) {
      // console.log(gBoard[i][j])
      if (gBoard[i][j].gameElement === null && gBoard[i][j].type === 'FLOOR') emptyCellsArr.push({ i, j })
    }
  }
  return emptyCellsArr
}

function getRandomBallPos() {
  var emptyArr = checkEmptyCells()
  // console.log(` emptyArr :`, emptyArr)

  var randomCell = getRandomIntInclusive(0, emptyArr.length - 1)
  // console.log(` randomCell :`, randomCell)
  // console.log(emptyArr[randomCell].i, emptyArr[randomCell].j)
  return { i: emptyArr[randomCell].i, j: emptyArr[randomCell].j }
}
