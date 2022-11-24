// function addRandomBoom(cellI, cellJ, gBoard) {
//   //mark true the neg of start in  all mat

//   console.log('add boom')
//   gBoard[3][3].isMine = true
//   gBoard[2][2].isMine = true

// }

// //mark true the neg of start in  all mat
// function negOfStartPoint(cellI, cellJ, gBoard) {
//   var neighborsCount = 0
//   for (var i = cellI - 1; i <= cellI + 1; i++) {
//     if (i < 0 || i >= gBoard.length) continue
//     for (var j = cellJ - 1; j <= cellJ + 1; j++) {
//       if (i === cellI && j === cellJ) continue
//       if (j < 0 || j >= gBoard[i].length) continue
//       gBoard[i][j].relatedStartGamePoint = true
//       console.log(gBoard[i][j])
//     }
//   }
// }


// function getArrayWithNoStartAndNeg(gBoard) {
//   var emptyNegAndPos = []
//   for (var i = 0; i < gBoard.length; i++) {
//     for (var j = 0; j < gBoard[0].length; j++) {
//       if (gBoard[i][j].relatedStartGamePoint = flase) emptyNegAndPos.push({ i: i, j: j })
//     }
//   }
//   console.log(emptyNegAndPos)
// }