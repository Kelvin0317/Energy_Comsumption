import React, { Component } from 'react';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      energy: []
    }
  }

componentDidMount() {
 fetch('http://127.0.0.1:5000/')
    .then(res =>{
      return res.json()
    }).then(res => {
      console.log(res);
      this.setState({
        energy:res
      })
    }).catch(err => {
      console.log("Error Reading Data" + err);
    });
}

render(){
  return(
        <div className="App">
          <div id="chart">

          </div>
        </div>

      );
}
}

export default App;
