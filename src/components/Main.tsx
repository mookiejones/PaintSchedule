import * as React from 'react';
import { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { DriverPerformance } from './DriverPerformance';
import { ExcelImport } from './ExcelImport';
import { PaintApp } from './PaintApp';
import { PaintLine } from './PaintLine';
import { PaintScheduleEditor } from './PaintScheduleEditor/PaintScheduleEditor';
import { StyleCodeEditor } from './StyleCodeEditor/StyleCodeEditor';

interface IProps{}
interface IState{}
export class Main extends Component<IProps,IState> {

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


String.prototype.formatUnicorn = String.prototype.formatUnicorn ||
function () {
    "use strict";
    var str = toString();
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
declare interface String{
    hashCode():Number;
}

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
