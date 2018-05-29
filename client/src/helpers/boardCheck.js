var checkWinner = function(piece, b) {
    
  if(checkRowWinner(piece, b)) {
    return true;
  }
  if(checkColWinner(piece, b)) {
    return true;
  }
  if(checkDiaWinner(piece, b)) {
    return true;
  }
  return false;
  
}

var checkRowWinner = function(piece, b) {
  for(var i = 0; i < b.length; i++) {
    for(var j = 0; j < 4; j++) {
      if(b[i][j] === piece && b[i][j + 1] === piece && b[i][j + 2] === piece && b[i][j + 3] === piece) {
        return true;
      }
    }
  }
  return false;
}

var checkColWinner = function(piece, b) {
  for(var i = 0; i < b[0].length; i++) {
    for(var j = 0; j < 3; j++) {
      if(b[j][i] === piece && b[j + 1][i] === piece && b[j + 2][i] === piece && b[j + 3][i] === piece) {
        return true;
      }
    }
  }
  return false
}

var checkDiaWinner = function(piece, b) {
  for(var i = 0; i < b.length; i++) {
    for(var j = 0; j < b[0].length; j++) {
      if(checkDiaFromSpace(i, j, piece, b)) {
        return true;
      }
    }
  }
  return false;
}

var checkDiaFromSpace = function(row, col, piece, b) {
  //check UL
  if(row >= 3 && col >= 3 && b[row][col] === piece && b[row - 1][col - 1] === piece && b[row - 2][col - 2] === piece && b[row - 3][col - 3] === piece) {
    return true;
  }
  //check UR
  if(row >= 3 && col <= 3 && b[row][col] === piece && b[row - 1][col + 1] === piece && b[row - 2][col + 2] === piece && b[row - 3][col + 3] === piece) {
    return true;
  }
  //check DL
  if(row <= 2 && col >= 3 && b[row][col] === piece && b[row + 1][col - 1] === piece && b[row + 2][col - 2] === piece && b[row + 3][col - 3] === piece) {
    return true;
  }
  //check DR
  if(row <= 2 && col <= 3 && b[row][col] === piece && b[row + 1][col + 1] === piece && b[row + 2][col + 2] === piece && b[row + 3][col + 3] === piece) {
    return true;
  }

  return false;
}

var checkTie = function(b) {
  for(var i = 0; i < b.length; i++) {
    for(var j = 0; j < b[0].length; j++) {
      if(b[i][j] === ' ') {
        return false;
      }
    }
  }
  return true;
}

module.exports.checkWinner = checkWinner;
module.exports.checkRowWinner = checkRowWinner;
module.exports.checkColWinner = checkColWinner;
module.exports.checkDiaWinner = checkDiaWinner;
module.exports.checkTie = checkTie;
