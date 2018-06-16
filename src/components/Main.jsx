import React from 'react';
import { BrowserRouter,Route,Switch } from 'react-router-dom';
import { PaintScheduleEditor } from './PaintScheduleEditor/PaintScheduleEditor';
import { StyleCodeEditor } from './StyleCodeEditor/StyleCodeEditor';
import { ExcelImport } from './ExcelImport';
import { PaintLine } from './PaintLine';
import { PaintApp } from './PaintApp';
import { DriverPerformance } from './DriverPerformance';
export class Main extends React.Component {

render(){
    return (
     
         <BrowserRouter>
        <Switch>
                <Route path="/edit" component={ PaintScheduleEditor }/>
                <Route path="/style-codes" component={ StyleCodeEditor }/>
                <Route path="/excel-import" component={ ExcelImport }/>
                <Route path='/paint-line' component={ PaintLine }/>
                <Route path='/paint-app' component={PaintApp} />
                <Route path='/driver-performance' component={DriverPerformance} />
        </Switch>
        </BrowserRouter>
        
   
)}
}

/*
import $ from 'jquery';
window.jQuery = $;
window.$ = $;

var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router
var IndexRoute = require('react-router').IndexRoute
var Route = require('react-router').Route
var hashHistory = require('react-router').hashHistory

var createReactClass = require('create-react-class');    //required before react version 16 or convert code over into es2015 classes.

var MainView = require('./components/main-view.jsx');
var PaintSchedule = require('./components/paint-schedule/paint-schedule.jsx');
//var PaintScheduleEditor = require('./components/paint-schedule-editor/paint-schedule-editor.jsx');
var StyleCodeEditor = require('./components/style-code-editor/style-code-editor.jsx');
var ProgramColorsEditor = require('./components/program-colors-editor/program-colors-editor.jsx'); 
var PaintApp = require('./components/paint-load-app/paint-app.jsx');
var DriverPerformance = require('./components/driver-performance/driver-performance.jsx');
var mountNode = document.getElementById('container');

export default class App extends React.Component {
    getInitialState() {

    var env = 'production';
    if(window.location.href.includes('localhost')){
      env = 'development'
    }

    return { env: env }
  }
  render(){
    return(
        <Router history={hashHistory}  >
        <Route path="/" component={MainView}>
                <IndexRoute env={this.state.env} component={PaintApp} />           
                <Route env={this.state.env} path="../Home/Schedule"  />
          <Route env={this.state.env} path='/style-codes' component={StyleCodeEditor}/>
          <Route env={this.state.env} path='/program-colors' component={ProgramColorsEditor} />
          <Route env={this.state.env} path='/excel-import' component={ExcelImport} />
          <Route env={this.state.env} path='/paint-line' component={PaintLine} />
          <Route env={this.state.env} path='/paint-app' component={PaintApp} />
          <Route env={this.state.env} path='/driver-performance' component={DriverPerformance} />
        </Route>
      </Router>
    );
  }
});


// <IndexRoute env={this.state.env} component={PaintScheduleEditor} />
// <Route env={this.state.env} path='/edit' component={PaintScheduleEditor} />


String.prototype.formatUnicorn = String.prototype.formatUnicorn ||
function () {
    "use strict";
    var str = this.toString();
    if (arguments.length) {
        var t = typeof arguments[0];
        var key;
        var args = ("string" === t || "number" === t) ?
            Array.prototype.slice.call(arguments)
            : arguments[0];

        for (key in args) {
            str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
        }
    }

    return str;
};

String.prototype.hashCode = function(){
  let hash = 0;
  if (this.length == 0) return hash;
  for (let xi = 0; xi < this.length; xi++) {
      let char = this.charCodeAt(xi);
      hash = ((hash<<5)-hash)+char;
      hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

ReactDOM.render(<App />, mountNode);
*/