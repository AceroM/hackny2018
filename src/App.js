import React, { Component } from 'react';
import logo from './logo.svg';
import parseData from './helperFunctions';
import './App.css';
var config = require('./config.json');

class App extends Component {
  state = {
    isDragged: false,
    img : "",
    text: []
  }

  componentDidMount(){
  }
  
  handleImage(reader) {
    const b64 = reader.split(',', 2)[1];
    console.log(b64)
    fetch(`https://vision.googleapis.com/v1/images:annotate?key=${config.visionApiKey}`, {
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
                "type": "DOCUMENT_TEXT_DETECTION",
                "maxResults":10 
              } 
            ],
            "imageContext": {
              "languageHints": ["en"]
            }
          }
        ]
      })
    })
    .then(res => res.json())
    .then(data => {
      // console.log(data)
      const parsed = parseData(data.responses["0"].textAnnotations);;
      if (data.responses.length) {
        this.setState({
          text: parsed
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
    const listItems = this.state.text.map((sentence) => {
      <li> {sentence} </li>
    })
    return (
      <div className="App">
        <header>Picture Notes</header>
        <div>
        <input type='file' onChange={(e) => this._fileHandle(e)}/>
        </div>
        <div className="adjust-image">
          <img className="real-img" src={this.state.img}/>
        </div>
        <div className= "adjust-txt">
        <br/>
        <ul id="txt"> {this.state.text.map((line) => <li> {line}</li>)} </ul>
        </div>
      </div>
    );
  }
}

export default App;
