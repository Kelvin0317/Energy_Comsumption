import React, {Component} from "react";
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart, Bar } from 'react-chartjs-2'
import { DIRECTION_DOWN } from "hammerjs";
import Select from 'react-select';

const options = [
    { value: '0', label: 'Week 1' },
    { value: '1', label: 'Week 2' },
    { value: '2', label: 'Week 3' },
    { value: '3', label: 'Week 4' },
    { value: '4', label: 'Week 5' },
  ];

class WeekChart extends Component {
    state = {
        selectedOption: null,
      };
    
  constructor(props){
    // eslint-disable-next-line no-undef
    super(props);
    this.state = {
      Data : [],
      PV : [],
      TNB : [],
      Day : [],
      Week : []
    }
  }

    componentDidMount() {
      fetch('http://127.0.0.1:5000/week')
         .then(res =>{
           return res.json()
         }).then(res => {
           console.log(res);
           this.setState({
             Data:res
           })
         }).catch(err => {
           console.log("Error Reading Data" + err);
         });
     }

     handleChange = selectedOption => {
        this.setState({ selectedOption });
        var PV = this.state.Data[0];
        var TNB = this.state.Data[1];
        var Day = this.state.Data[2];
        this.state.Week = selectedOption.label

        this.state.PV = [];
        this.state.TNB = [];
        this.state.Day = [];
        for (var i = 0; i < PV.length; i++) {
            if(this.state.Data[3][i] == selectedOption.value){
                this.state.PV.push(PV[i]);
                this.state.TNB.push(TNB[i]);
                this.state.Day.push(Day[i]);
            }
        }
        console.log(this.state.PV)
        console.log(this.state.TNB)
        console.log(this.state.Day)
    };

  render(){
    const { selectedOption } = this.state;

    return (
      <div className="chart">
          <Select
          value={selectedOption}
          onChange={this.handleChange}
          options={options}
        />
        <Bar
          data = {{datasets: [{
            type: 'bar',
            label: 'PV (Power)',
            data: this.state.PV,
            borderColor: 'rgb(0, 199, 140)',
            backgroundColor: 'rgb(0, 199, 140)',
        }, {
            type: 'bar',
            label: 'Utility-TNB (Power)',
            data: this.state.TNB,
            borderColor: 'rgb(65, 105, 225)',
            backgroundColor: 'rgb(65, 105, 225)',
        }],
        labels: this.state.Day}}
        options = {{
          plugins: {
            title: {
                display: true,
                text: "Power Demand In " + this.state.Week
            }
        },
          scales: {y: { title: { display: true, text: 'Power Demand (kW)' }}}
        } 
        }
        />
        <Bar
          data = {{datasets: [{
            type: 'line',
            label: 'PV (Power)',
            data: this.state.PV,
            borderColor: 'rgb(0, 199, 140)',
            backgroundColor: 'rgb(0, 199, 140)',
        }, {
            type: 'line',
            label: 'Utility-TNB (Power)',
            data: this.state.TNB,
            borderColor: 'rgb(65, 105, 225)',
            backgroundColor: 'rgb(65, 105, 225)',
        }],
        labels: this.state.Day}}
        options = {{
          plugins: {
            title: {
                display: true,
                text: "Power Demand In " + this.state.Week
            }
        },
          scales: {y: { title: { display: true, text: 'Power Demand (kW)' }}}
        } 
        }
        />
      </div>
    )
  }
}
export default WeekChart