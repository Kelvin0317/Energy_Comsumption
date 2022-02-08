import React, {Component} from "react";
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart, Bar } from 'react-chartjs-2'
import { DIRECTION_DOWN } from "hammerjs";
import Select from 'react-select';

const options = [
  { value: '0', label: 'Dec 1 2021' },
  { value: '1', label: 'Dec 2 2021' },
  { value: '2', label: 'Dec 3 2021' },
  { value: '3', label: 'Dec 4 2021' },
  { value: '4', label: 'Dec 5 2021' },
  { value: '5', label: 'Dec 6 2021' },
  { value: '6', label: 'Dec 7 2021' },
  { value: '7', label: 'Dec 8 2021' },
  { value: '8', label: 'Dec 9 2021' },
  { value: '9', label: 'Dec 10 2021' },
  { value: '10', label: 'Dec 11 2021' },
  { value: '11', label: 'Dec 12 2021' },
  { value: '12', label: 'Dec 13 2021' },
  { value: '13', label: 'Dec 14 2021' },
  { value: '14', label: 'Dec 15 2021' },
  { value: '15', label: 'Dec 16 2021' },
  { value: '16', label: 'Dec 17 2021' },
  { value: '17', label: 'Dec 18 2021' },
  { value: '18', label: 'Dec 19 2021' },
  { value: '19', label: 'Dec 20 2021' },
  { value: '20', label: 'Dec 21 2021' },
  { value: '21', label: 'Dec 22 2021' },
  { value: '22', label: 'Dec 23 2021' },
  { value: '23', label: 'Dec 24 2021' },
  { value: '24', label: 'Dec 25 2021' },
  { value: '25', label: 'Dec 26 2021' },
  { value: '26', label: 'Dec 27 2021' },
  { value: '27', label: 'Dec 28 2021' },
  { value: '28', label: 'Dec 29 2021' },
  { value: '29', label: 'Dec 30 2021' },
  { value: '30', label: 'Dec 31 2021' },
];

class TotalChart extends Component {

  state = {
    selectedOption: null,
  };

  constructor(props){
    // eslint-disable-next-line no-undef
    super(props);
    this.state = {
      Data : [],
      Total : [],
      Day: [],
      EachDayData: [],
      EachDay: [],
      whichDay: []
    }
  }

    componentDidMount() {
      fetch('https://herokupy12p.herokuapp.com/full')
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
      var Total = this.state.Data[2];
      var Day = this.state.Data[3];
      this.state.Total = [];
      this.state.Day = [];
      this.state.EachDayData = [];
      this.state.EachDay = [];
      this.state.whichDay = selectedOption.label

      for (var i = 0; i <= Total.length; i++) {

        if(i == selectedOption.value ){
          this.state.EachDayData.push(Total[i]);
          this.state.EachDay.push(Day[i]);
        }
        if(i <= selectedOption.value ){
          this.state.Total.push(Total[i]);
          this.state.Day.push(Day[i]);
        }
      }
      console.log(this.state.EachDay)
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
            type: 'line',
            label: 'Total Power Demand(Kwh)',
            data: this.state.Total,
            borderColor: 'rgb(0, 199, 140)',
            backgroundColor: 'rgb(0, 199, 140)',
        }],
        labels: this.state.Day}}
        options = {{
          plugins: {
            title: {
                display: true,
                text: "Power Demand In Months"
            }
        },
          scales: {y: { title: { display: true, text: 'Power Demand (kW)' }}}
        } 
        }
        />
        <Bar
          data = {{datasets: [{
            type: 'bar',
            label: 'Total Power Demand(Kwh)',
            data: this.state.Total,
            borderColor: 'rgb(0, 199, 140)',
            backgroundColor: 'rgb(0, 199, 140)',
        }],
        labels: this.state.Day}}
        options = {{
          plugins: {
            title: {
                display: true,
                text: "Power Demand In Months"
            }
        },
          scales: {y: { title: { display: true, text: 'Power Demand (kW)' }}}
        } 
        }
        />
        <Bar
          data = {{datasets: [{
            type: 'bar',
            label: 'Total Power Demand(Kwh)',
            data: this.state.EachDayData,
            borderColor: 'rgb(0, 199, 140)',
            backgroundColor: 'rgb(0, 199, 140)',
        }],
        labels: this.state.EachDay}}
        options = {{
          plugins: {
            title: {
                display: true,
                text: "Power Demand In " + this.state.whichDay
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
export default TotalChart