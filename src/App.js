import React, { Component } from 'react';
import { render } from 'react-dom';
import FilerobotImageEditor from 'filerobot-image-editor';

import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      isShow: false,
      imgSrc: 'https://cdn.scaleflex.it/demo/stephen-walker-unsplash.jpg'
    }
  }

  showImageEditor = () => {
    this.setState({ isShow: true });
  }

  onClose = () => {
    this.setState({ isShow: false });
  }

  render() {
    const { imgSrc, isShow } = this.state;

    return (
      <div>
        <h1>Filerobot Image Editor
        Prueba 1
        </h1>
        <h1>
          Prueba 2
        </h1>
        <img src={imgSrc} onClick={this.showImageEditor} alt="example image" />

        <FilerobotImageEditor
          show={isShow}
          src={imgSrc}
          onClose={this.onClose}
        />
      </div>
    )
  }

}
export default App;
