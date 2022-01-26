import React, {Component} from "react";
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart, Bar } from 'react-chartjs-2'
import { DIRECTION_DOWN } from "hammerjs";

class MonthChart extends Component {
  constructor(props){
    // eslint-disable-next-line no-undef
    super(props);
    this.state = {
      Data : [],

    }
  }

    componentDidMount() {
      fetch('http://127.0.0.1:5000/full')
         .then(res =>{
           return res.json()
         }).then(res => {
          //  console.log(res);
           this.setState({
             Data:res
           })
         }).catch(err => {
           console.log("Error Reading Data" + err);
         });
     }

  render(){
    // console.log(this.state.chartData.datasets[0]['data'])
    // console.log(this.state.Data)
    
    return (
      <div className="chart">
        <Bar
          data = {{datasets: [{
            type: 'bar',
            label: 'PV (Power)',
            data: this.state.Data[0],
            borderColor: 'rgb(0, 199, 140)',
            backgroundColor: 'rgb(0, 199, 140)',
        }, {
            type: 'bar',
            label: 'Utility-TNB (Power)',
            data: this.state.Data[1],
            borderColor: 'rgb(65, 105, 225)',
            backgroundColor: 'rgb(65, 105, 225)',
        }],
        labels: this.state.Data[3]}}
        options = {{
          plugins: {
            title: {
                display: true,
                text: 'Power Demand In Month'
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
export default MonthChart