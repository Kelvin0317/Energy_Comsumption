import React, {Component} from "react";
import { Button, message } from 'antd';
import * as XLSX from 'xlsx';
import { DataGrid } from '@mui/x-data-grid';
import { CSVLink } from 'react-csv';

const columns = [
    { field: 'id', headerName: 'No', width: 40 },
    { field: 'Date', headerName: 'Date', width: 120 },
    { field: 'Time', headerName: 'Time', width: 80 },
    {
      field: 'PV Energy',
      headerName: 'PV Energy',
      type: 'number',
      width: 110,
    },
    {
        field: 'Utility Import Energy',
        headerName: 'Utility Import Energy',
        type: 'number',
        width: 170,
    },
    {
        field: 'Utility Export Energy',
        headerName: 'Utility Export Energy',
        type: 'number',
        width: 170,
      },
      {
        field: 'Total (Kwh)',
        headerName: 'Total (kWh)',
        type: 'number',
        width: 110,
      }
  ];

  const file = [{id: 0, Date: "Dec 1 2021", Time: ' 12:00AM', "PV Energy": 2, "Utility Import Energy": 2,"Utility Export Energy": 2 },{id: 1, Date: "Dec 1 2021", Time: ' 12:30AM', "PV Energy": 2, "Utility Import Energy": 2,"Utility Export Energy": 2 }]
  
class CreateFile extends Component {
    constructor(props){
        // eslint-disable-next-line no-undef
        super(props);
        this.state = {
            Data : [],
            Download: []
        }
      }
    ExcelDateToJSDate = (date) => {
        const length = this.state.Data.length;
        for (var i = 0; length > i; i++) {
            let converted_date = new Date(Math.round((this.state.Data[i]['Date'] - 25569) * 864e5));
            converted_date = String(converted_date).slice(4, 15)
            date = converted_date.split(" ")
            let day = date[1];
            let month = date[0];
            month = "JanFebMarAprMayJunJulAugSepOctNovDec".indexOf(month) / 3 + 1
            if (month.toString().length <= 1)
                month = '0' + month
            let year = date[2];

            const month_text = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            console.log(month)
            this.state.Data[i]['Date'] = (String(month_text[month-1] + ' ' + parseInt(day) + ' ' + "20" + year.slice(2, 4)))

            // const Total = this.state.Data[i]['PV Energy'] + this.state.Data[i]['Utility Import Energy'] - this.state.Data[i]['Utility Export Energy']
            // const joined = { "Total (Kwh)": Total }
        } 
        // console.log(this.state.Data)
    }

    onImportExcel = file => {
        const { files } = file.target;
        const fileReader = new FileReader();
        fileReader.onload = event => {
          try {
            const { result } = event.target;
            const workbook = XLSX.read(result, { type: 'binary' });
            let data = [];
            for (const sheet in workbook.Sheets) {
              if (workbook.Sheets.hasOwnProperty(sheet)) {
                data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
              }
            }
            console.log(data);
            this.setState({
                Data:data
              })
          } catch (e) {
            message.error(' incorrect file type ！');
          }
        };
        fileReader.readAsBinaryString(files[0]);
    }

    // handleSubmit= (date) => {
    //     const data = this.state.Data
    //     fetch('http://127.0.0.1:3000/api/', {
    //         method: 'POST',
    //         headers: {
    //             'Content-type': 'application/json',
    //         },
    //         body: JSON.stringify(data),
    //         })
    //         .then(res => res.json())
    //         .then(res => console.log(res));
    //     }

  render(){
    return (
      <div className="chart">  
        <button style={{width: "100%", margin: 'auto'}}>
            <CSVLink data={file} filename={"Energy.csv"}>Download the template for fill In your data</CSVLink>
        </button>
        <Button style={{width: "100%", margin: 'auto'}} >
          <input  type='file' accept='.xlsx, .xls' onChange={this.onImportExcel} />
          <span > upload a file - Support. xlsx、.xls file format</span>
        </Button>
        <button onClick={this.ExcelDateToJSDate}>Optimization Date</button>
        <button onClick={this.handleSubmit}> submit </button>
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={this.state.Data}
                columns={columns}
                pageSize={48}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />

        </div>
      </div>
    )
  }
}
export default CreateFile