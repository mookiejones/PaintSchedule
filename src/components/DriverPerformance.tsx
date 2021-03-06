import * as React from 'react'; 
import { Component } from 'react';
import moment from 'moment';
import * as Highcharts from 'highcharts';

import  update from 'react-addons-update';

import DatePicker from 'react-date-picker';
import Calendar from 'react-calendar';
let DateField = DatePicker;
interface NameInterface {
  name: string;
  data: any;
}

function breakIntoSeries(arr: any, format: any){
    let series: any = [];
    let s: NameInterface;
    arr.map(function(el: any, idx: any){
      if (!s.name){
        s.name = el.full_name;
        s.data = [];
      }else {
        if (s.name === el.full_name){
          s.data.push([moment.utc(el.date_handled, format).valueOf(), Math.round((parseInt(el.seconds) / 60) * 100) / 100]);
        }else{
          series.push(update(s, {$merge: {}}));
          s.name = el.full_name;
          s.data = [];
          s.data.push([moment.utc(el.date_handled, format).valueOf(), Math.round((parseInt(el.seconds) / 60) * 100) / 100]);
        }
      }
    });
    return series;
}
interface HCProps{
  modules?: Array<any>;
  container: any;
  options: any;
  type: string;

}
interface DriverProp{}
interface HCState{}
class HC extends Component<HCProps, HCState>{
  chart: any;
    /**
     * When the DOM is ready, create the chart
     */
    componentDidMount() {
        // Extend Highcharts with modules

        if (this.props.modules) {
            this.props.modules.forEach(function (module: any) {
                module(Highcharts);
            });
        }
        // Set container which the chart should render to.
        this.chart = new Highcharts[this.props.type || 'Chart'](
            this.props.container,
            this.props.options
        );
    }

    /**
     * Updates the chart when state changes
     */
    componentDidUpdate(){
      this.chart.update(this.props.options);
    }

    /**
     * Destroy chart before unmount
     */
    componentWillUnmount() {
        this.chart.destroy();
    }
    
    /**
     * Create the div which the chart will be rendered to.
     */
    render() {
        return React.createElement('div', { id: this.props.container });
    }
}

interface DriverState {
  startTime: any;
  endTime: any;
  defaultOptions: any;
  options: any;
  env: string;
  worsePerformers: any;
  underTen: any;
}

export class DriverPerformance extends React.Component<DriverProp, DriverState> {
  getInitialState(){
    let now = moment();
    let then = moment().subtract(2, 'hours');

    return {
      endTime: now,
      startTime: then,
      defaultOptions: {
        chart: {
            type: 'scatter',
            zoomType: 'xy'
        },
        title: {
            text: 'Driver Averages by Day'
        },
        xAxis: {
           allowDecimals: false,
           title: {
             scalable: false
           },
           type: 'datetime'// ,
           // labels: {
          //   formatter() {
          //     return Highcharts.dateFormat('%d-%b', (this.value));
          //   }
          // }
        },
        yAxis: {
          title: {
            text: 'Average Time (Minutes)'
          }
        },
        legend: {
            enabled: false,
            layout: 'horizontal',
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        plotOptions: {
            scatter: {
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br>',
                    pointFormat: '{point.y} minutes'
                }
            }
        },
        series: []
      },
      options: {generated: moment().format('MM/DD/YYYY hh:mm:ss')},
      worsePerformers: [],
      underTen: []
    }
  }
  componentWillMount(){
    this.getDriverAverages();
  }
  componentDidUpdate(prevProps: any, prevState: any){
    if (prevState.startTime !== this.state.startTime || prevState.endTime !== this.state.endTime){
      this.getDriverAverages();
    }
  }
  getDriverAverages(){
    let request = new XMLHttpRequest();
    let url;


    let params: any = {
          startdate: this.state.startTime.format('YYYY-MM-DD HH:mm:ss'),
          enddate: this.state.endTime.format('YYYY-MM-DD HH:mm:ss')
      };
        
    if (this.state.env == 'development'){
      // url = "api/paint/getDriverAverages";
        url = 'api/paint/getDriverAverages?startDate' + params[0] + '&enddate=' + params[1];
    }else{
      // url = "api/paint/getDriverAverages";
        url = `api/paint/getDriverAverages?startDate=${params[0]}&enddate=params[1]`;
    }

    request.open('GET', url, true);
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        let data = JSON.parse(request.response);
        let arr = JSON.parse(data.d);
          // let arr = data;
        let format = 'MM/DD/YYYY hh:mm:ss A';

        let average = {
          name: 'average',
          type: 'spline',
          data: []
        }

        let options: any = update(this.state.defaultOptions, {$merge: {}});
        options.series = breakIntoSeries(arr[0], format);

        for (let i = 0; i < arr[2].length; i++){
            average.data.push([moment(arr[2][i].date_handled, format).valueOf(), parseInt(arr[2][i].avg_seconds)])
        }
        //options.series.push(average);
        options.generated = moment().format('MM/DD/YYYY hh:mm:ss')
        this.setState({
          options: options,
          worsePerformers: arr[1],
          underTen: arr[3]
        });
      } else {

      }
    };

    //let params = {
    //  startdate: this.state.startTime.format("YYYY-MM-DD HH:mm:ss"),
    //  enddate: this.state.endTime.format("YYYY-MM-DD HH:mm:ss")
    //};
    //request.send(JSON.stringify(params));
  }
  render(){
    let Options = (<div style={{display: 'flex'}}>
                    <div style={{marginBottom: '10px'}}>
                      <label>Start Date:</label><br/>
                      <DateField style={{marginLeft: '25px'}}
                        dateFormat="MM/DD/YYYY HH:mm:ss"
                        onChange={(dateString, { dateMoment, timestamp}) => {
                          //document.activeElement.blur()
                          this.setState({startTime: dateMoment});
                        }}
                        forceValidDate={true}
                        updateOnDateClick={true}
                        collapseOnDateClick={false}
                        defaultValue={this.state.startTime.valueOf()}
                      >
                        <Calendar
                          navigation={true}
                          locale="en"
                          forceValidDate={true}
                          highlightWeekends={false}
                          highlightToday={true}
                          weekNumbers={false}
                          weekStartDay={0}
                        />
                      </DateField>
                    </div>
                    <div style={{marginBottom: '10px'}}>
                      <label>End Date:</label><br/>
                      <DateField style={{marginLeft: '25px'}}
                        dateFormat="MM/DD/YYYY HH:mm:ss"
                        onChange={(dateString, { dateMoment, timestamp}) => {
                          // document.activeElement.blur()
                          this.setState({endTime: dateMoment});
                        }}
                        forceValidDate={true}
                        updateOnDateClick={true}
                        collapseOnDateClick={false}
                        defaultValue={this.state.endTime.valueOf()}
                      >
                        <Calendar
                          navigation={true}
                          locale="en"
                          forceValidDate={true}
                          highlightWeekends={false}
                          highlightToday={true}
                          weekNumbers={false}
                          weekStartDay={0}
                        />
                      </DateField>
                    </div>
                  </div>);
    let Chart = (<div>
                  <div>
                    <HC container="chart" key={this.state.options.generated} options={this.state.options} />
                  </div>
                  <div style={{display: 'flex'}}>
                    <div>
                      <h2>Slowest Picks</h2>
                      <table className="table table-bordered table-hover" style={{width: 'auto', margin: '10px'}}>
                        <thead><tr><th>Driver</th><th>Length (seconds)</th></tr></thead>
                        <tbody>{this.state.worsePerformers.map((row, idx) => {return(<tr key={row.name + '-' + idx}><td style={{width: '250px'}}>{row.full_name}</td><td style={{width: '350px'}}>{row.seconds} (~{Math.round(row.seconds / 60 * 100) / 100} minutes)</td></tr>)})}</tbody>
                      </table>
                    </div>
                    <div>
                      <h2>Picks under 10 Seconds</h2>
                      <table className="table table-bordered table-hover" style={{width: 'auto'}}>
                        <thead><tr><th>Driver</th><th>Number of Picks</th></tr></thead>
                        <tbody>{this.state.underTen.map((row, idx) => {return(<tr key={row.full_name + '-' + idx + '-underTen'}><td style={{width: '250px'}}>{row.full_name}</td><td style={{width: '350px'}}>{row.c}</td></tr>)})}</tbody>
                      </table>
                    </div>
                  </div>
                </div>)

    if (!this.state.options.series){
      return(Options);
    }else{
      return(
        <div>
          {Options}
          {Chart}
        </div>
      );
    }

  }
}
