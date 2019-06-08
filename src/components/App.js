import React, { Component } from 'react';
import Cell from './Cell.js';
import Timer from './Timer.js';
import '../styles/App.css';

class App extends Component {

  _isPrime (num) {
        if (num === 1) return true;
        for(let i = 2, s = Math.sqrt(num); i <= s; i++){
            if(num % i === 0) return false;
        }
        return num > 1;
  }

  _shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
  }

  _makeSequence (n) {
    let seq = [];
    for (let i=0;i<n**2;i++) {
        seq.push(i);
    }
    seq = this._shuffle(seq);
    return seq
  }

  _getRandomInt (max) {
    max = Math.floor(max);
    return Math.floor(Math.random() * (max + 1)) +1;
  }

  state = {
    diff: 400,
    maxTime: null,
    score: 0,
    n: 4,
    data: [],
    orient: false,
  }

  componentWillMount () {
    this.setState({
      data: this.makeData(this.state.n),
      maxTime: Math.floor((this.state.n**2 ) * 0.8),
      diff: (this.state.n * 100),
    });
  }

  componentDidMount () {
    window.addEventListener('resize', () => this.setState({orient: true}));
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.orient === true) {
      this.setState({orient: false});
    }
  }

  makeData = (n) => {
      let mapping = this._makeSequence(n);
      let data = [];

      for (let i=0; i< n**2; i += 2) {
        let val = this._getRandomInt(this.state.diff);
        while (true) {
          if (this._isPrime(val) || val % 2 === 0) {
                val += 1;
                continue
          } else {
                data[mapping[i]] = {val: val, prime: false};
              break
          }
        }

        let valPrime = Math.floor((val + this._getRandomInt(this.state.diff)) / 4);
        while (true) {
          if (this._isPrime(valPrime)) {
              data[mapping[i+1]] = {val: val, prime: false};
              break
          }
          valPrime += 1
        }
      }

      return data
  };

  changeN = (z) => {
    let N = this.state.n;
    this.setState({
        n: N+z, 
        data: this.makeData(N+z),
        maxTime: Math.floor(((N+z)**2 ) * 0.8),
    });
  };

  fillCells = () => {
    let cells = this.state.data.map((value) => {
      return (
        <Cell value={value.val} n={this.state.n} key={Math.random()}/>
      )
    });
    return cells
  };

  acceptRound = () => {
    this.setState({data: this.makeData(this.state.n)});
  }

  render() {
    return (
      <div className="App">
        <h1 className="title">Primer </h1>
        <p id="score">{this.state.score}</p>
        <div className="game-board">
          <div className="cell-board">
            {this.fillCells()}
          </div>
        </div>
        <Timer maxTime={this.state.maxTime} acceptRound={this.acceptRound}/>
      </div>
    )
  }
}

export default App;
