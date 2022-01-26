import React, { Component } from 'react';
import DayChart from './component/DayChart';
import WeekChart from './component/WeekChart';
import MonthChart from './component/MonthChart';
import PVChart from './component/PVChart';
import TNBChart from './component/TNBChart';
import ExportChart from './component/ExportChart';
import TotalChart from './component/TotalChart';
import Select from 'react-select';

const options = [
  { value: 'Days', label: 'Days' },
  { value: 'Weeks', label: 'Weeks' },
  { value: 'Months', label: 'Months' },
  { value: 'PV (Power)', label: 'PV (Power)' },
  { value: 'Ulitily-TNB (Power)', label: 'Ulitily-TNB (Power)' },
  { value: 'Utility Export (Power)', label: 'Utility Export (Power)' },
  { value: 'Total Power Demand', label: 'Total Power Demand' },
];
class App extends Component {
  
  state = {
    selectedOption: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      energy: []
    }
    this.state = {
      chart : []
    }
  }

  componentDidMount() {
  fetch('http://127.0.0.1:5000/')
      .then(res =>{
        return res.json()
      }).then(res => {
        // console.log(res);
        this.setState({
          energy:res
        })
      }).catch(err => {
        console.log("Error Reading Data" + err);
      });
  }


  handleChange = selectedOption => {
    this.setState({ selectedOption });
    if(selectedOption.value == "Days"){
      this.state.chart = "day"
      console.log(this.state.chart)
    }
    if(selectedOption.value == "Weeks"){
      this.state.chart = "week"
      console.log(this.state.chart)
    }
    if(selectedOption.value == "Months"){
      this.state.chart = "month"
      console.log(this.state.chart)
    }
    if(selectedOption.value == "Total Power Demand"){
      this.state.chart = "Total Power Demand"
      console.log(this.state.chart)
    }
    if(selectedOption.value == "PV (Power)"){
      this.state.chart = "PV"
      console.log(this.state.chart)
    }
    if(selectedOption.value == "Ulitily-TNB (Power)"){
      this.state.chart = "TNB"
      console.log(this.state.chart)
    }
    if(selectedOption.value == "Utility Export (Power)"){
      this.state.chart = "EX"
      console.log(this.state.chart)
    }
  };

  render(){
    const { selectedOption } = this.state;
    return(
      <div className="App" style={{width: "60%", margin: 'auto'}}>      
        <Select
          value={selectedOption}
          onChange={this.handleChange}
          options={options}
        />
        {this.state.chart == "day" && (
          <DayChart/>    
        )}
        {this.state.chart == "week" && (
          <WeekChart/>    
        )}
        {this.state.chart == "month" && (
          <MonthChart/>    
        )}
        {this.state.chart == "PV" && (
          <PVChart/>    
        )}
        {this.state.chart == "TNB" && (
          <TNBChart/>    
        )}
        {this.state.chart == "EX" && (
          <ExportChart/>    
        )}
        {this.state.chart == "Total Power Demand" && (
          <TotalChart/>    
        )}
      </div>
    );
  }
}

export default App;
