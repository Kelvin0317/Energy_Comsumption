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

class DayChart extends Component {

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
      EX : [],
      Tt : [],
      Time : [],
      Day : [],
      whichDay: []
    }
  }

    componentDidMount() {
      fetch('https://herokupy12p.herokuapp.com/')
         .then(res =>{
           return res.json()
         }).then(res => {
        //    console.log(res);
           this.setState({
             Data:res
           })
         }).catch(err => {
           console.log("Error Reading Data" + err);
         });
     }
     
    handleChange = selectedOption => {
        this.setState({ selectedOption });
        var Day = this.state.Data[0];
        var Time = this.state.Data[1]
        var PV = this.state.Data[2];
        var TNB = this.state.Data[3];
        var Ex = this.state.Data[4];
        var Tt = this.state.Data[5];
        this.state.whichDay = selectedOption.label

        this.state.Day = [];
        this.state.Time = [];
        this.state.PV = [];
        this.state.TNB = [];
        this.state.EX = [];
        this.state.Tt = [];

        for (var i = 0; i < PV.length; i++) {
            if(this.state.Data[6][i] == selectedOption.value){
                this.state.Day.push(Day[i]);
                this.state.Time.push(Time[i]);
                this.state.PV.push(PV[i]);
                this.state.TNB.push(TNB[i]);
                this.state.EX.push(Ex[i]);
                this.state.Tt.push(Tt[i]);
            }
        }
        console.log(this.state.Time)
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
            label: 'PV (Power)',
            data: this.state.PV,
            borderColor: 'rgb(0, 199, 140)',
            backgroundColor: 'rgb(0, 199, 140)',
        }, {
            type: 'line',
            label: 'Utility-TNB(Power)',
            data: this.state.TNB,
            borderColor: 'rgb(65, 105, 225)',
            backgroundColor: 'rgb(65, 105, 225)',
        }, {
            type: 'line',
            label: 'Utility-TNB(Export Energy)',
            data: this.state.EX,
            borderColor: 'rgb(255, 227, 132)',
            backgroundColor: 'rgb(255, 227, 132)',
        }, {
            type: 'line',
            label: 'Total Power Demand(Kwh)',
            data: this.state.Tt,
            borderColor: 'rgb(192, 192, 192)',
            backgroundColor: 'rgb(192, 192, 192)',
        }],
        labels: this.state.Time}}
        options = {{
          plugins: {
            title: {
                display: true,
                text: 'Power Demand In ' + this.state.whichDay
            }
        },
          scales: {y: { title: { display: true, text: 'Power Demand (kW)' }}}
        } 
        }
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
            label: 'Utility-TNB(Power)',
            data: this.state.TNB,
            borderColor: 'rgb(65, 105, 225)',
            backgroundColor: 'rgb(65, 105, 225)',
        }, {
            type: 'bar',
            label: 'Utility-TNB(Export Energy)',
            data: this.state.EX,
            borderColor: 'rgb(255, 227, 132)',
            backgroundColor: 'rgb(255, 227, 132)',
        }, {
            type: 'bar',
            label: 'Total Power Demand(Kwh)',
            data: this.state.Tt,
            borderColor: 'rgb(192, 192, 192)',
            backgroundColor: 'rgb(192, 192, 192)',
        }],
        labels: this.state.Time}}
        options = {{
          plugins: {
            title: {
                display: true,
                text: 'Power Demand In '+ this.state.whichDay
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
export default DayChart