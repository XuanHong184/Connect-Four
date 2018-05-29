var bc = require('../src/helpers/boardCheck');
test('Should find row winner', () => {
  var board = [
    [' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' '],
    ['r','r','r','r',' ',' ',' ']
  ]
  expect(bc.checkRowWinner('r', board)).toBe(true);
});

test('Should find column winner', () => {
  var board = [
    [' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' '],
    ['r',' ',' ',' ',' ',' ',' '],
    ['r',' ',' ',' ',' ',' ',' '],
    ['r',' ',' ',' ',' ',' ',' '],
    ['r',' ',' ',' ',' ',' ',' ']
  ]
  expect(bc.checkColWinner('r', board)).toBe(true);
});

test('Should find diagonal winner', () => {
  var board = [
    [' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ','r',' ',' ',' '],
    [' ',' ','r',' ',' ',' ',' '],
    [' ','r',' ',' ',' ',' ',' '],
    ['r',' ',' ',' ',' ',' ',' ']
  ]
  expect(bc.checkDiaWinner('r', board)).toBe(true);
});

test('Should find no winner', () => {
  var board = [
    [' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ']
  ]
  expect(bc.checkWinner('r', board)).toBe(false);
  expect(bc.checkWinner('b', board)).toBe(false);
});

test('Should find no tie', () => {
  var board = [
    ['r','b','r','b','r','b','r'],
    ['r','b','r','b','r','b','r'],
    ['b','r','b','r','b','r','b'],
    ['b','r','b','r','b','r','b'],
    ['r','b','r','b','r','b','r'],
    ['r','b','r','b','r','b','r']
  ]
  expect(bc.checkTie(board)).toBe(true);
});

test('Should find no tie', () => {
  var board = [
    [' ',' ',' ',' ',' ',' ',' '],
    ['r','b','r','b','r','b','r'],
    ['b','r','b','r','b','r','b'],
    ['b','r','b','r','b','r','b'],
    ['r','b','r','b','r','b','r'],
    ['r','b','r','b','r','b','r']
  ]
  expect(bc.checkTie(board)).toBe(false);
});
