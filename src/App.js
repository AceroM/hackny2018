import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    isDragged: false,
    img : "",
    text: ""
  }

  componentDidMount(){
  }

  handleImage(reader) {
    const b64 = reader.split(',', 2)[1];
    console.log(b64)
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
              "content": b64
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
    .then(res => {
      console.dir(res);
      return res.json();
    })
    .then(data => {
      console.log(data)
      if (data.responses.length) {
        this.setState({
          text: data.responses["0"].fullTextAnnotation.text
        })
      }
    })
  }
  _fileHandle(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.handleImage(reader.result);
      this.setState({
        img: reader.result
      })
    }
    reader.readAsDataURL(file)
    this.state.isDragged = true;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title"> Picture Notes </h1> 
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <input type="file" onChange={(e) => this._fileHandle(e)}/>
        <img src={this.state.img}/>
        <h1 id="txt"> {this.state.text} </h1>
      </div>
    );
  }
}

export default App;
