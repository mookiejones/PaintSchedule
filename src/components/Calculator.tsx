import * as classnames from 'classnames';
import * as React from 'react';
import { Component } from 'react';

interface CalculatorProps{
  rowData: Array<any>;
  updatePartialQty: (a: any, b: any) => void;
  currentUser: any;
  
  role: any;
}
interface CalculatorState{
  editing: boolean;
}
export class Calculator extends Component<CalculatorProps, CalculatorState>{
    input: any;
    getInitialState(){
      return {
        editing: false
      };
    }
    calcClick(){
      if (this.state.editing){
        var newQty = this.input.value;
  
        if (this.props.rowData[this.props.rowData.length - 1] === this.props.currentUser.name) {
            if (parseInt(newQty) < this.props.rowData[9]) {
                this.props.updatePartialQty(parseInt(newQty), this.props.rowData);
            } else {
                // var el = document.getElementById("alert")
                // $(el).fadeIn(1000);
                // setTimeout(function () {
                //    $(el).fadeOut();
                // }, 8000);
            }
        }
  
        this.input.value = '';
        this.setState({
          editing: !this.state.editing
        });
      }else{
        this.setState({
          editing: !this.state.editing
        });
        this.input.focus();
      }
    }
    render(){
      if (this.props.role === 'load' || this.props.role === 'watch'){
        if (this.props.rowData[this.props.rowData.length - 1] !== '##AVAILABLE##'){
          if (this.props.rowData[this.props.rowData.length - 2] !== '##AVAILABLE##') {
              // tslint:disable-next-line:semicolon
              return (<td><i style={{fontSize: '50px'}} className="fa fa-check-square-o" aria-hidden="true"></i></td>)
          } else {
              // tslint:disable-next-line:semicolon
              return (<td><i style={{fontSize: '50px'}} className="fa fa-truck animate-flicker" id=""></i></td>)
          }
        }else{
          // tslint:disable-next-line:semicolon
          return <td></td>
        }
              // tslint:disable-next-line:semicolon
        return <td className="tap"><i style={{fontSize: '50px'}} className="fa fa-truck animate-flicker" id=""></i></td>
      }else{
        var inputStyle = classnames({
          'hidden': !this.state.editing
        });
  
        if (this.props.rowData[this.props.rowData.length - 1] === this.props.currentUser.name) {
          return (
            <td className="action">
              // tslint:disable-next-line:max-line-length
              <input type="tel" ref={(i) => this.input = i} className={inputStyle} name="quantity" style={{width: '65px'}} />
              <i style={{fontSize: '50px'}} className="fa fa-calculator" onClick={this.calcClick}></i>
            </td>
          );
        }
        else{
          return <td className="tap"></td>;
        }
      }
    }
  }