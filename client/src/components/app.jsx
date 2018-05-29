import React from 'react';
import bc from '../helpers/boardCheck';
import $ from 'jquery';
// import Score from './score.jsx';

export default class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.currentPlayer = 'r';
    this.turnCount = 0;
    this.gameover = false;
    this.winner = 'red';
    this.state = {
      board: [
        [' ',' ',' ',' ',' ',' ',' '],
        [' ',' ',' ',' ',' ',' ',' '],
        [' ',' ',' ',' ',' ',' ',' '],
        [' ',' ',' ',' ',' ',' ',' '],
        [' ',' ',' ',' ',' ',' ',' '],
        [' ',' ',' ',' ',' ',' ',' ']
      ],
      red: -1,
      black: -1
    }
    this.getScores();
  }

  nextTurn() {
    if(this.currentPlayer === 'r') {
      this.currentPlayer = 'b';
    } else {
      this.currentPlayer = 'r';
    }
  }

  handlePieceDrop(event) {
    if(this.gameover) {
      return;
    }
    this.dropPiece(parseInt(event.target.name), this.currentPlayer);
    this.turnCount++;
    if(bc.checkWinner(this.currentPlayer, this.state.board)){
      console.log(`Player: ${this.currentPlayer} WON!`);
      this.gameover = true;
      this.postScores();
    } else if(this.turnCount >= 42) {
      console.log(`GAME OVER, ITS A TIE`);
      this.gameover = true;
    }else {
      this.nextTurn();
    }
  }

  dropPiece(col, piece) {
    var b = this.state.board;
    for(var i = 0; i < b.length; i++) {
      if(i === b.length - 1 && b[i][col] === ' ') {
        b[i][col] = piece;
        this.setState({
          board: b
        });
        return;
      } else if(b[i][col] !== ' ') {
        if(i !== 0) {
          b[i - 1][col] = piece;
          this.setState({
            board: b
          });
        }
        return;
      }
    }
  }

  postScores() {
    if(this.winner === 'r') {
      var winner = 'red';
    } else {
      var winner = 'black';
    }
    var a = this;
    $.ajax({
      url: '/scores',
      type: 'POST',
      dataType: 'text',
      data: winner,
      success: function(data) {
        a.getScores();
        console.log('posted scores');
      },
      error: function(err) {
        console.error(err);
      } 

    })    
  }
  
  getScores() {
    var s = this;
    $.ajax({
      url: '/scores',
      type: 'GET',
      success: function(data) {
        console.log(JSON.parse(data));
        var scoreData = JSON.parse(data);
        s.setState({
          red: scoreData[0].score,
          black: scoreData[1].score
        });
        
      },
      error: function(err) {
        console.error(err);
      }      

    })
  }

  renderBoard() {
    return (
      <div>{this.renderCurrentPlayer()}
      <table>
        <thead>
          <tr>
            <td><button name="0" onClick={this.handlePieceDrop.bind(this)} hidden={this.state.board[0][0] !== ' '}>\/</button></td>
            <td><button name="1" onClick={this.handlePieceDrop.bind(this)} hidden={this.state.board[0][1] !== ' '}>\/</button></td>
            <td><button name="2" onClick={this.handlePieceDrop.bind(this)} hidden={this.state.board[0][2] !== ' '}>\/</button></td>
            <td><button name="3" onClick={this.handlePieceDrop.bind(this)} hidden={this.state.board[0][3] !== ' '}>\/</button></td>
            <td><button name="4" onClick={this.handlePieceDrop.bind(this)} hidden={this.state.board[0][4] !== ' '}>\/</button></td>
            <td><button name="5" onClick={this.handlePieceDrop.bind(this)} hidden={this.state.board[0][5] !== ' '}>\/</button></td>
            <td><button name="6" onClick={this.handlePieceDrop.bind(this)} hidden={this.state.board[0][6] !== ' '}>\/</button></td>
          </tr>
        </thead>
        <tbody>
          {this.state.board.map((row, i) => {
            return (
              <tr>
                {row.map((col, j) => {
                  if(col === 'r') {
                    return <td className="red circle"></td>
                  } else if(col === 'b') {
                    return <td className="black circle"></td>
                  } else {
                    return <td>[{col}]</td>
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {this.renderWinner()}
      </div>
    );
  }

  renderWinner() {
    if(this.gameover) {
      if(this.currentPlayer === 'r') {
        return <div>Player <span className="red circle"></span> is the WINNER!</div>
      } else {
        return <div>Player <span className="black circle"></span> is the WINNER!</div>
      }
    }
  }

  renderCurrentPlayer() {
    if(this.currentPlayer === 'r') {
      return <div id="player">Current Player: <span className="red circle"></span></div>
    } else {
      return <div id="player">Current Player: <span className="black circle"></span></div>
    }
  }

  resetPost() {
    this.post = false;
    console.log('winner posted!')
  }

  render() {
    // console.log(this.post);
    return (
      <div>
        {this.renderBoard()}
        <table>
        <thead>
          <tr><td>Red Score</td><td>Black Score</td></tr>
        </thead>
        <tbody>
          <tr><td>{this.state.red}</td><td>{this.state.black}</td></tr>
        </tbody>
      </table>
      </div>
    );
  }
}
