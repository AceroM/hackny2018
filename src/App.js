import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  this.state = {
    img : ""
  }

  componentDidMount(){
    fetch('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDyHZ3-o29xV9mjOmXwUFLvkyar4RsoSvU', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "requests":[
          {
            "image":{
              "content": {this.state}
            },
            "features":[
              {
                "type":"TEXT_DETECTION",
                "maxResults":2
              }
            ]
          }
        ]
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
